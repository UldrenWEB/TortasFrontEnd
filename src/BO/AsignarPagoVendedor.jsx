import {useState, useEffect} from 'react';
import getMapInputs from '../service/getMapInputs';
import fetchDataPost from '../service/fetchDataPost';
import infoInputsBo from '../constants/infoInputsBO';
import MagicForms from '../components/MagicForms';
import ButtonVe from '../components/ButtonVe';
import ModalSession from '../components/ModalSession';
import ModalBase from '../components/ModalBase';


const EditarPersona = ({setLoading}) => {
    const [mapaInfo, setMapaInfo] = useState(null);
    const [dataPersons, setDataPersons] = useState(null);
    const [dataIdPerson, setDataIdPerson] = useState(null);
    const [isErrorSession, setIsErrorSession] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataModal, setDataModal] = useState(null);   

    const handleClick = () =>{
        
    }
}