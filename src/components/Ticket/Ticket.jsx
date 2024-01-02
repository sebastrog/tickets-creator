import PropTypes from 'prop-types';
import { Animate } from "react-simple-animate";
import { format } from 'date-fns';
import { FiClock, FiTrash2, FiThumbsUp } from "react-icons/fi";
import Gif from '../Gif/Gif';


const handleDificulty = (dificulty) => {
  if(dificulty === "hard") return "bg-red-500";
  if(dificulty === "normal") return "bg-orange-500";
  return "bg-green-600"
}

const Ticket = ({ticket, data, setData, notify}) => {
  const { title, description, date, dificulty, gifDificulty } = ticket;

  const handleDeleteTicket = (id) => {
    const newData = data && data.filter(ticket => ticket.id !== id);
    setData(newData)
    localStorage.setItem('tickets', JSON.stringify(newData));
    notify("Ticket eliminado con éxito!")
  }

  const handleCompleteTicket = (id) => {
    const newData = data && data.map(ticket => {
      if(ticket.id === id) {
        return {
          ...ticket,
          status: !ticket.status
        }
      }
      return ticket
    });
    
    setData(newData);
    localStorage.setItem('tickets', JSON.stringify(newData));
    notify(`${ticket.status ? "El ticket no ha sido completado" : "Ticket completado con éxito"}`)
  }

  return (
    <Animate
      play={true}
      duration={.500}
      delay={.100}
      start={{ opacity: 0, transform: "translateY(10px)" }}
      end={{ opacity: 1, transform: "translateY(0)" }}
      easeType="cubic-bezier(0.445, 0.05, 0.55, 0.95)"
    >
      <div className="p-4 rounded-lg w-full bg-white">
        <button 
          className={`absolute -top-3 right-4 w-6 h-6 rounded-full flex items-center justify-center duration-200 hover:-translate-y-1 outline-none ${ticket.status ? "bg-sky-500 text-white" : "bg-white"}`}
          onClick={() => handleCompleteTicket(ticket.id)}
        >
          <FiThumbsUp />
        </button>

        <button 
          className="absolute -top-3 -right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center text-red-400 duration-200 hover:-translate-y-1"
          onClick={() => handleDeleteTicket(ticket.id)}
        >
          <FiTrash2 />
        </button>

        <div className="md:flex">
          <div className="md:w-3/5 pr-5">
            <h2 className="text-lg font-bold uppercase mb-3">{title}</h2>
            <p className="text-sm mb-3">{description}</p>
            <div className="flex items-center gap-1 text-sm mb-3 text-zinc-500 italic"><FiClock /> <p>{format(date, 'yyyy-MM-dd')}</p></div>
            <div className={`rounded-full px-8 py-1 text-white inline-block text-sm font-medium ${handleDificulty(dificulty)}`}>dificultad: {dificulty}</div>
          </div>

          <div className="md:w-2/5 mt-8 md:mt-0">
            <Gif gif={gifDificulty} />
          </div>
        </div>
      </div>
    </Animate>
  )
}

Ticket.propTypes = {
  ticket: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
}

export default Ticket