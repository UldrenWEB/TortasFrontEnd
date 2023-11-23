import { Switch } from "antd";
import "../styles/MagicForms.css";
import { useEffect, useRef, useState } from "react";

const MagicForms = ({ infoData, mapaInfo }) => {
  const mapa = useRef(new Map());

  useEffect(() => {
    if (mapa.current.size === infoData.length) {
      mapaInfo(mapa.current);
    }
  }, [infoData, mapaInfo]);

  return (
    <div className="container-inputs-magics">
      {infoData.map((element, key) => {
        const { type, label, id, placeholder } = element;
        const [info, setInfo] = useState({ value: '', options: [] });

        const handleChange = (e) => {
          // console.log(e.target.value)
          setInfo({ ...info, value: e.target.value });
        };

        const elementFinal = (
          <div className="container-input-magic" key={key}>
            <label>{label}</label>

            {type.toLowerCase() === "select" ? (
              <select id={id} value={info.value} onChange={handleChange}>
                <option value="">Seleccione</option>
                {info.options}
              </select>
            ) : type.toLowerCase() === "switch" ? (
              <Switch id={id} checked={info.value} onChange={handleChange} />
            ) : (
              <input type={type} id={id} placeholder={placeholder} value={info.value} onChange={handleChange} />
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