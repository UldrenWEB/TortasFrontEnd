import React, { useState, useEffect } from 'react'
import fetcho from '../service/fetcho';

const ButtonReports = ({ optionByPath }) => {
    const [inputs, setInputs] = useState([]);
    const [selectOptions, setSelectOptions] = useState([]);
    const { options } = optionByPath;

    useEffect(() => {
        const fetchSelectOptions = async () => {
            // Realiza la solicitud para obtener las opciones del select

            const selectOptionCorrect = options.find(obj => obj.type === 'select')

            if (selectOptionCorrect) {

                const [nameModule, nameObject, nameMethod, params] = selectOptionCorrect.method

                const result = await fetcho({
                    url: '/toProcess',
                    method: 'POST',
                    body: {
                        area: nameModule,
                        object: nameObject,
                        method: nameMethod,
                        params: params
                    }
                })

                // Actualiza el estado con las opciones recibidas
                if (result.error || !result) {
                    console.log('Hubo un error al realizar la consulta', result.error)
                    return null;
                }

                setSelectOptions(result);
            }
        };

        // Verifica si alguna opción es de tipo "select"
        const hasSelectOption = options.some((option) => option.type === 'select');

        if (hasSelectOption) {
            fetchSelectOptions();
        }
    }, []);

    const handleInputChange = ({ index, value }) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const handleButtonInput = ({ index, option }) => {
        const inputValue = inputs[index];
        console.log(`Input ${index} value: ${inputValue}`);

        window.location.href = `${option.to}&params=${inputValue}`
    };

    const handleButtonClick = ({ option }) => {
        window.location.href = option.to;
    };

    return (
        <div className='container'>
            <div>
                {options.map((option, index) => {
                    return (
                        <div key={option.label}>
                            {option.type === 'text' ||
                                option.type === 'number' ||
                                option.type === 'date' ? (
                                <div>
                                    <input
                                        className='input'
                                        type={option.type}
                                        placeholder={option.placeholder}
                                        value={inputs[index] || ''}
                                        onChange={(e) =>
                                            handleInputChange({ index, value: e.target.value })
                                        }
                                    />
                                    <button
                                        className='btn-input'
                                        onClick={() => handleButtonInput({ index, option })}
                                    >
                                        Enviar
                                    </button>
                                </div>
                            ) : option.type === 'select' ? (
                                <div>
                                    <select
                                        className='select'
                                        value={inputs[index] || ''}
                                        onChange={(e) => handleInputChange({ index, value: e.target.value })}
                                    >
                                        <option disabled value="">
                                            {option.placeholder}
                                        </option>
                                        {selectOptions.map((selectOption) => (
                                            <option key={selectOption.id} value={selectOption.id}>
                                                {selectOption['descripcion']}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        className='btn-input'
                                        onClick={() => handleButtonInput({ index, option })}
                                    >
                                        Enviar
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        onClick={() => handleButtonClick({ option })}
                                        className='btn'
                                    >
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
};

export default ButtonReports