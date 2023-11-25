import { Switch } from "antd";
import "../styles/MagicForms.css";
import { useEffect, useRef, useState} from "react";

const MagicForms = ({ infoData, mapaInfo, eventHandlers }) => {
  const mapa = useRef(new Map());
  const [isChecked, setIsChecked] = useState(false)


  useEffect(() => {
    if (mapa.current.size === infoData.length) {
      mapaInfo(mapa.current);
    }
  }, [infoData, mapaInfo]);

  return (
    <div className="container-inputs-magics">
      {infoData.map((element, key) => {
        const { type, label, id, placeholder, readOnly,...rest } = element;
        const [info, setInfo] = useState({ value: type.toLowerCase() === "switch" ? false : "", options: [] });

        const handleChange = (e) => {
          if (eventHandlers && eventHandlers[id]) {
            eventHandlers[id](e);
          }
          if(type.toLowerCase() === "switch"){
            const newCheckedValue = !isChecked;
            setIsChecked(newCheckedValue);
            setInfo({...info, value: newCheckedValue});
            return;
          } 
          setInfo({ ...info, value: e.target.value });
        };

        const elementFinal = (
          <div className="container-input-magic" key={key}>
            <label>{label}</label>

            {type.toLowerCase() === "select" ? (
                <select id={id} value={info.value} onChange={handleChange} readOnly={readOnly} {...rest}>
                <option value="" key={`${id}-null`}>Seleccione</option>
                {info.options}
              </select>
            ) : type.toLowerCase() === "switch" ? (
              <Switch id={id}  checked={isChecked} value={isChecked} readOnly={readOnly} onChange={handleChange} 
                {...rest} />
            ) : (
              <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={info.value}
                onChange={handleChange}
                readOnly={readOnly}
                {...rest}
              />
            )}
          </div>
        );

        mapa.current.set(id, { info, setInfo });
        return elementFinal;
      })}
    </div>
  );
};

export default MagicForms;