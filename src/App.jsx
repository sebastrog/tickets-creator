import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { FiFileText, FiPlus, FiFilter } from "react-icons/fi";

import Modal from "./components/Modal";
import Ticket from './components/Ticket';
import AddTicketForm from "./components/AddTicketForm";
import Filter from "./components/Filter";

import background from '/background.png';

const storedDataAsString = localStorage.getItem('tickets');

const notify = (copy) => toast(copy);

function App() {
  const [data, setData] = useState(storedDataAsString ? JSON.parse(storedDataAsString) : []);
  const [filteredData, setFilteredData] = useState([]);
  const [modal, setModal] = useState(null);
  const [toggleFilter, setToggleFilter] = useState(null);

  const [filters, setFilters] = useState([
    {
      label: "Completados",
      id: "completados",
      checked: false,
    },
    {
      label: "No completados",
      id: "no-completados",
      checked: false,
    },
    {
      label: "Fáciles",
      id: "easy",
      checked: false,
    },
    {
      label: "Normales",
      id: "normal",
      checked: false,
    },
    {
      label: "Difíciles",
      checked: false,
      id: "hard",
    }
  ]);

  return (
    <>
      <Toaster />

      <main className="relative min-h-screen z-10 pb-20 md:pb-0">
        <div className="p-8">
          <div className="fixed top-0 left-0 w-full h-full z-10">
            <img
              src={background} alt="background"
              className="object-cover w-full h-full opacity-20"
            />
          </div>

          <div className="w-[95%] md:w-[600px] m-auto relative z-20">
            <h1 className="text-4xl font-bold text-white text-center mb-8">Crea tu ticket!</h1>

            <div className="p-8 rounded-lg bg-[#e3f3ff] drop-shadow-xl">
              {filteredData?.length > 0 ? (
                <div className="flex flex-cols flex-wrap gap-8 mb-8 [&>div]:w-full">
                  {filteredData?.map(ticket => (
                    <Ticket 
                      key={ticket.id}
                      ticket={ticket}
                      data={data}
                      setData={setData}
                      setFilteredData={setFilteredData}
                      notify={notify}
                    />
                  ))}
                </div>
              ) : (
                <>
                  {data?.length > 0 && (
                    <div className="flex flex-cols flex-wrap gap-8 mb-8 [&>div]:w-full">
                      {data?.map(ticket => (
                        <Ticket 
                          key={ticket.id}
                          ticket={ticket}
                          data={data}
                          setData={setData}
                          notify={notify}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
              
              {data?.length < 1 &&  (
                <h2 className="text-2xl font-bold text-center mb-8">Todavía no se han generado tickets</h2>
              )}

              <button 
                className="py-2 px-4 text-white bg-sky-500 rounded-full font-bold m-auto flex items-center gap-2 duration-100 hover:-translate-y-1"
                onClick={() => setModal(
                  <AddTicketForm 
                    setModal={setModal} 
                    setData={setData} 
                    data={data}
                    notify={notify}
                  />
                )}
              >
                <span>Agregar ticket</span>
                <FiFileText />
              </button>
            </div>
          </div>
        </div>

        {data?.length > 0 && toggleFilter && (
          <div className="fixed bottom-24 right-24 z-40">
            <Filter
              data={data}
              setData={setData}
              filters={filters}
              setFilters={setFilters}      
              setFilteredData={setFilteredData}      
            />
          </div>
        )}
        
        {data?.length > 0 && (
          <button 
            className="fixed bottom-10 right-24 w-12 h-12 flex items-center justify-center bg-white rounded-full z-40 outline-none duration-200 hover:drop-shadow-lg"
            onClick={() => setToggleFilter(!toggleFilter)}
          >
            <FiFilter />
          </button>
        )}

        <button 
          className="fixed bottom-10 right-10 w-12 h-12 flex items-center justify-center bg-white rounded-full z-40 outline-none duration-200 hover:rotate-90 hover:drop-shadow-lg"
          onClick={() => setModal(
            <AddTicketForm 
              setModal={setModal} 
              setData={setData} 
              data={data}
              notify={notify}
            />
          )}
        >
          <FiPlus />
        </button>
      </main>
      
      <div className="relative z-40">
        {modal && <Modal> {modal} </Modal>}
      </div>
    </>
  )
}

export default App
