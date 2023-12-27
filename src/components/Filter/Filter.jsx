import PropTypes from 'prop-types';
import { Animate } from "react-simple-animate";

import { useEffect } from 'react';
import { INPUT, LABEL } from "./Filter-tailwind";

const ticketDificulty = ["easy", "normal", "hard"];
const ticketStatus = ["completados", "no-completados"];

const Filter = ({filters, setFilters, data, setFilteredData}) => {
  
  const handleCheckChange = (element) => {
    let newFilters = [...filters];
    const index = newFilters.findIndex(filter => filter.id === element.id);
  
    newFilters[index] = {
      ...element,
      checked: !element.checked,
    };
  
    setFilters(newFilters);
  };

  const applyFilters = (filters, data) => {
    const localStorageData = [...data];
    
    const checkedDifficultyFilters = filters
      .filter(filter => filter.checked === true && ticketDificulty.includes(filter.id))
      .map(filter => filter.id);
  
    const checkedStatusFilters = filters
      .filter(filter => filter.checked === true && ticketStatus.includes(filter.id))
      .map(filter => filter.id);
  
    const filteredData = localStorageData.filter((ticket) => {
      const isDifficultyMatch = checkedDifficultyFilters.length === 0 || checkedDifficultyFilters.includes(ticket.dificulty);
      const isStatusMatch = checkedStatusFilters.length === 0 ||
        (checkedStatusFilters.includes("completados") && ticket.status) ||
        (checkedStatusFilters.includes("no-completados") && !ticket.status);
  
      return isDifficultyMatch && isStatusMatch;
    });
  
    setFilteredData(filteredData);
  };

  useEffect(() => {
    applyFilters(filters, data);
  }, [filters, data]); 

  return (
    <Animate
      play={true}
      duration={.500}
      delay={0}
      start={{ opacity: 0, transform: "translateY(10px)" }}
      end={{ opacity: 1, transform: "translateY(0)" }}
      easeType="cubic-bezier(0.445, 0.05, 0.55, 0.95)"
    >
      <div className="px-4 py-2">
        <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-white">
          {filters.map(filter => (
            <li
              key={filter.id}
              className={`w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600 last:border-0`}
            >
              <div className="flex items-center ps-3">
                <input
                  id={filter.id}
                  type="checkbox"
                  value={filter.id}
                  checked={filter.checked}
                  onChange={() => handleCheckChange(filter)}
                  className={INPUT}
                />
                <label htmlFor={filter.id} className={LABEL}>
                  {filter.label}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Animate>
  )
}

Filter.propTypes = {
  data: PropTypes.array.isRequired,
  setFilteredData: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired
}

export default Filter