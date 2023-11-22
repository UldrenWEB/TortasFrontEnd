import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'

const ButtonReports = ({ optionByPath, setParams }) => {
    const [inputs, setInputs] = useState([]);

    const handleInputChange = ({ index, value }) => {
        const newInputs = [...inputs]
        newInputs[index] = value;
        setInputs(newInputs)
    }
    const handleButtonInput = ({ index }) => {
        const inputValue = inputs[index]

        console.log(`Input ${index} value: ${inputValue}`)
    }

    const handleButtonClick = ({ option }) => {
        window.location.href = option.to;
    }

    return (
        <div className='container'>
            <div>
                {optionByPath.map((option, index) => {
                    return (
                        <div key={option.label}>
                            {option.type === 'text' || option.type === 'number' ? (
                                <div>
                                    <input
                                        className='input'
                                        type={option.type}
                                        placeholder={option.placeholder}
                                        value={inputs[index] || ''}
                                        onChange={(e) => handleInputChange({ index, value: e.target.value })}
                                    />
                                    <button className='btn-input' onClick={() => handleButtonInput({ index })}>
                                        Enviar
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button onClick={() => handleButtonClick({ option })} className='btn dark'>
                                        {option.label}
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );

}

export default ButtonReports;