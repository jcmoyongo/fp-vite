import React, { useState, useContext } from 'react';
import Select from 'react-select';
import { GameContext } from '../context/GameContext';


const SelectComponent = () => {
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
     
    const {scheduleList, handleChange} = useContext(GameContext);

    const Checkbox = ({ children, ...props }) => (
        <label style={{ marginRight: '1em' }}>
          <input type="checkbox" {...props} />
          {children}
        </label>
      );

    return (    
        <div className="flex flex-wrap justify-center items-center">
          <Select
            placeholder="Choisir une date de match..."
            className="basic-single"
            classNamePrefix="select"
            isLoading={isLoading}
            isClearable={isClearable}
            options={ scheduleList}
            onChange={handleChange} /> 
            {/*<div
                style={{
                color: 'hsl(0, 0%, 40%)',
                display: 'inline-block',
                fontSize: 12,
                fontStyle: 'italic',
                marginTop: '1em',
                }}
            >
                <Checkbox
                    checked={isClearable}
                    onChange={() => setIsClearable((state) => !state)}
                >
                    Clearable
                </Checkbox>
            </div>*/}

        </div>

    );
}

export default SelectComponent;