import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';


const ButtonReports = ({ optionByPath }) => {
    const [options, setOptions] = useState([]);
    const [inputs, setInputs] = useState([]);


    useEffect(() => {
        setOptions(optionByPath);
    }, [optionByPath])

    const handleInputChange = ({ index, value }) => {
        const newInputs = [...inputs]
        newInputs[index] = value;
        setInputs(newInputs)
    }
    const handleButtonInput = ({ index }) => {
        const inputValue = inputs[index]

        console.log(`Input ${index} value: ${inputValue}`)
    }

    return (
        <div className='container'>
            <div>
                {options.map((option, index) => {
                    <div key={option.label}>
                        {option.type === 'text' || option.type === 'number' ? (
                            <div>
                                <input className='input'
                                    type={option.type}
                                    placeholder={option.placeholder}
                                    value={inputs[index] || ''}
                                    onChange={(e) => handleInputChange({ index, value: e.target.value })}
                                />
                                <button
                                    className='btn-input'
                                    onClick={() => handleButtonInput({ index })}
                                >Enviar
                                </button>
                            </div>
                        ) : (
                            <div>
                                <button key={option.label} className='btn' onClick={<Link to={option.to} />}>
                                    {option.label}
                                </button>
                            </div>
                        )}
                    </div>
                })}
            </div>
        </div>
    )

}

export default ButtonReports;