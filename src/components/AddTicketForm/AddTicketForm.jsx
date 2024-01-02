import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Formik } from "formik";
import * as Yup from 'yup';
import { FiX } from "react-icons/fi";

import Spinner from '../Spinner';
import { generateUniqueId } from '../../utils/generateUid';
import { INPUT, LABEL } from './AddTicketForm-tailwind';

const apiKey = 'OCHO8lvGSN8IGASKNVI9IPfV1hd4QJSp';

const handleError = (error) => {
  return <span className="absolute foundry-medium -bottom-5 left-0 text-[#ff7e7e] text-xs"> {error} </span>
}

const handleGifQuery = (dificulty) => {
  if(dificulty === "hard") return "everything is fine";
  if(dificulty === "normal") return "is not easy";
  return "easy"
}

const AddTicketForm = ({setModal, data, setData, notify}) => {
  const [sending, setSending] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-40">
    <div className="p-5 w-[90%] md:w-[500px]">
      <div className="bg-white py-8 px-5 drop-shadow-2xl rounded-xl relative">
        <button 
          className="absolute top-2 right-2 text-zinc-400"
          onClick={() => setModal(null)}
        >
          <FiX />
        </button>

        <div className="px-4">
          <h3 className="text-2xl font-bold mb-8">Agregar ticket</h3>

          <Formik
            initialValues={{
              title: '',
              description: '',
              dificulty: 'easy',
              date: new Date(),
              gifDificulty: "",
              id: generateUniqueId(),
              status: false,
            }}
            validationSchema={
              Yup.object().shape({
                title: Yup.string().max(50, `máximo 200 caracteres`).required('Ingrese nombre del ticket'),
                description: Yup.string().max(200, `máximo 200 caracteres`).required('Ingrese descripción del ticket'),
                dificulty: Yup.string().required()
              })
            }
            onSubmit={
              async (values) => {
                setSending(true);

                try {
                  const response = await axios.get(`https://api.giphy.com/v1/gifs/search?q=${handleGifQuery(values.dificulty)}&api_key=${apiKey}&limit=40`);
                  if (response.data && response.data.data && response.data.data.length > 0) {
                    const gifArray = response.data.data;
                    const randomIndex = Math.floor(Math.random() * gifArray.length);
                    const randomGif = gifArray[randomIndex];

                    const newData = [
                      {
                        ...values,
                        gifDificulty: randomGif.images.original.url,
                      },
                      ...data
                    ]

                    setTimeout(() => {
                      setData(newData);
                      localStorage.setItem('tickets', JSON.stringify(newData));
                      setModal(null);
                      notify("ticket agregado con éxito!")
                    }, 1000);
                    
                  }
                  
                } catch (error) {
                  console.log(error);
                  setSending(false);
                  notify("Ha ocurrido un error, intentalo de nuevo!");
                  setModal(null);
                }
              }
            }
          >
            {({
              errors,
              handleChange,
              handleSubmit
            }) => (
              <form onSubmit={handleSubmit} className="flex flex-cols flex-wrap gap-10">
                
                <div className="relative w-full">
                  <div className="w-full">
                    <input type="text" id="title" className={INPUT} onChange={handleChange} placeholder=" " />
                    <label htmlFor="title" className={LABEL}>Nombre del ticket</label>
                  </div>

                  { errors.title ? handleError(errors.title) : null }
                </div>

                <div className="relative w-full">
                  <div className="w-full">
                    <input type="text" id="description" className={INPUT} onChange={handleChange} placeholder=" " />
                    <label htmlFor="description" className={LABEL}>Descripción del ticket</label>
                  </div>
                  
                  { errors.description ? handleError(errors.description) : null }
                </div>

                <div className="relative w-full">
                  <div className="w-full">
                    <select id="dificulty" onChange={handleChange} className="border-b-2 text-sm border-zinc-500 outline-none w-full">
                      <option value="easy">Fácil</option>
                      <option value="normal">Normal</option>
                      <option value="hard">Difícil</option>
                    </select>
                  </div>

                  { errors.dificulty ? handleError(errors.dificulty) : null }
                </div>

                <div className="relative w-full">
                  <button 
                    type="submit"
                    className="py-2 px-6 text-white disabled:bg-zinc-400 disabled:translate-y-0 bg-sky-500 rounded-full font-bold m-auto flex items-center gap-2 duration-100 hover:-translate-y-1 relative"
                    disabled={sending}
                  >
                    <span>Agregar</span>

                    {sending && (
                      <div className="absolute -right-7 top-2.5">
                        <Spinner />
                      </div>
                    )}
                  </button>

                  
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  </div>
  )
}

AddTicketForm.propTypes = {
  setModal: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
}

export default AddTicketForm