import React, { useState, useContext, useEffect } from 'react';
import Select from 'react-select';
import { GameContext } from '../context/GameContext';


const SelectComponent = () => {
    const [isClearable, setIsClearable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
     
    const {scheduleList, handleChange, selectedDate, series} = useContext(GameContext);

    const Checkbox = ({ children, ...props }) => (
        <label style={{ marginRight: '1em' }}>
          <input type="checkbox" {...props} />
          {children}
        </label>
      );
    
    return (    
        <div className="flex my-1 w-full">
          <Select
            placeholder="Choisir une date..."
            className="basic-single rounded-l-lg"
            classNamePrefix="select"
            isLoading={isLoading}
            isClearable={isClearable}
            options={ scheduleList}
            onChange={handleChange} 
            theme={(theme) => ({
                ...theme,
                borderRadius: 5,
                colors: {
                  ...theme.colors,
                  primary25: '#e5faff',
                  primary: '#00a2c7',
                },
              })}
            /> 
        </div>

    );
}

export default SelectComponent;