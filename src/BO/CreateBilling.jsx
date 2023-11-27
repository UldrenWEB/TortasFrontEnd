import { useEffect, useState } from 'react'
import getMapInputs from '../service/getMapInputs'
import fetchDataPost from '../service/fetchDataPost'
import infoInputsBo from '../constants/infoInputsBo'
import MagicForms from '../components/MagicForms'
import ButtonVe from '../components/ButtonVe'
import ModalSession from '../components/ModalSession'
import ModalBase from '../components/ModalBase'
import getDateNow from '../service/getDateNow'
import {
    objsFetch,
    createBillingObj,
    createBillingDataFetch
} from '../constants/dataFetchs'

const dataTypePay = [
    {
        id: 1,
        name: 'De contado'
    },
    {
        id: 2,
        name: 'Credito'
    }
]

const CreateBilling = ({ setLoading }) => {
    const [mapaInfo, setMapaInfo] = useState(null);
    const [dataTipoPago, setDataTipoPago] = useState(null);
    const [dataFechaLimite, setDataFechaLimite] = useState(null);
    const [dataProducts, setDataProducts] = useState(null);
    const [dataSellers, setDataSellers] = useState(null);
    const [dataPersons, setDataPersons] = useState(null);
    const [dataModal, setDataModal] = useState(null);

    const [isErrorSession, setIsErrorSession] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [arrayProducts, setArrayProducts] = useState([]);

    const handleClickProducts = () => {
        const idProduct = mapaInfo.get('inProducto').info['value']
        setArrayProducts([...arrayProducts, idProduct])

        console.log(`Se añadio el producto: ${idProduct}`)
    }

    const handleClickDeleteProduct = () => {
        const idProductDelete = mapaInfo.get('inProducto').info['value']
        const index = arrayProducts.findIndex((p) => p === idProductDelete);

        if (index !== -1) {
            const updatedItems = [...arrayProducts]
            updatedItems.splice(index, 1)

            setArrayProducts(updatedItems)
            console.log(`Se elimino el producto: ${idProductDelete}`)
        }
    }

    const handleClick = async () => {
        const arrayInputs = ['inVendedor', 'inCliente', 'inTipoPago', 'inFecha']
        const data = getMapInputs({ mapaInfo, idInputs: arrayInputs })
        const dataFetch = createBillingDataFetch({ arrayProducts, data })
        const obj = createBillingObj({ dataFetch })

        const result = await fetchDataPost({ ...obj, setLoading })
        console.log('Aqui resultado del fetch para insertar facturas', result);

        if (result?.errorSession) setIsErrorSession(true);
        if (result?.error) {
            setDataModal(result.error);
            setIsModalVisible(true);
            return;
        }

        if (typeof result === "string") {
            setDataModal(result);
            setIsModalVisible(true);
        } else if (!result) {
            setDataModal("No se creo la nueva factura");
            setIsModalVisible(true);
        } else {
            setDataModal("Se creo la factura");
            setIsModalVisible(true);
        }
    }

    useEffect(() => {
        const objSellers = objsFetch.objGetAllSellers;

        const getAllSellers = async () => {
            const data = await fetchDataPost({ ...objSellers, setLoading });
            if (data?.errorSession) setIsErrorSession(true);

            const sellers = data.map((item) => {
                return (
                    <option
                        value={item.id_person}
                        key={item.id_person}
                    >{`${item.na_person.toUpperCase()} ${item.ln_person.toUpperCase()}`}</option>
                );
            });

            setDataSellers(sellers);
        };
        getAllSellers();
    }, []);

    //Cargar vendedores
    useEffect(() => {
        if (!mapaInfo || !dataSellers) return;

        mapaInfo.get('inVendedor').setInfo({
            value: '',
            options: dataSellers
        })

    }, [mapaInfo, dataSellers])

    //Obtener todas las personas
    useEffect(() => {
        const objPersons = objsFetch.objGetAllPerson;

        const getAllPersons = async () => {
            const data = await fetchDataPost({ ...objPersons, setLoading })

            if (data?.errorSession) setIsErrorSession(true)

            const dataMap = data.map(item => {
                return (
                    <option value={item.id_person} key={item.id_person}>
                        {`${item.na_person} ${item.ln_person}`}
                    </option>
                )
            })

            setDataPersons(dataMap);
        }
        getAllPersons();
    }, [])

    //Cargar todas las personas en el select
    useEffect(() => {
        if (!mapaInfo || !dataPersons) return;

        mapaInfo.get('inCliente').setInfo({
            value: '',
            options: dataPersons
        })

    }, [mapaInfo, dataPersons])

    useEffect(() => {
        const objProducts = objsFetch.objGetAllProducts;
        const getAllProducts = async () => {
            const data = await fetchDataPost({ ...objProducts, setLoading })
            if (data?.errorSession) setIsErrorSession(true)

            const dataMap = data.map(item => {
                return (
                    <option value={item.id_product} key={item.id_product}>
                        {item.de_product}
                    </option>
                )
            })
            setDataProducts(dataMap)
        }
        getAllProducts();
    }, [])

    //Cargar todos los productos en el select
    useEffect(() => {
        if (!mapaInfo || !dataProducts) return;

        mapaInfo.get('inProducto').setInfo({
            value: '',
            options: dataProducts
        })

    }, [mapaInfo, dataProducts])
    useEffect(() => {
        const typePay = dataTypePay.map(obj => {
            return (
                <option value={obj.id} key={obj.id}>
                    {obj.name}
                </option>
            )
        })
        setDataTipoPago(typePay)
    }, [])
    //Cargar los dos tipos de pago
    useEffect(() => {
        if (!mapaInfo || !dataTipoPago) return;

        mapaInfo.get('inTipoPago').setInfo({
            value: "",
            options: dataTipoPago
        })

    }, [mapaInfo, dataTipoPago])

    //Cargar el input con la fecha limite
    useEffect(() => {
        if (!mapaInfo || !dataFechaLimite) return;

        mapaInfo.get('inFecha').setInfo({
            value: dataFechaLimite,
            options: dataFechaLimite
        })

    }, [mapaInfo, dataFechaLimite])

    const handleChangeTipoPago = (e) => {
        const idTipoPago = e.target.value;
        if (idTipoPago == 2) {
            setDataFechaLimite(getDateNow('mm/dd/yyyy', 12));
        }
    }

    const eventHandlers = {
        inTipoPago: handleChangeTipoPago
    }

    if (isErrorSession) return <ModalSession />;
    if (isModalVisible && dataModal)
        return (
            <ModalBase setIsModalVisible={setIsModalVisible} content={dataModal} />
        );
    return (
        <section className='container-magic-forms'>
            <div className="container-form-magic">
                <h1>Crear Factura</h1>
                <MagicForms
                    infoData={infoInputsBo.CreateBilling}
                    mapaInfo={setMapaInfo}
                    eventHandlers={eventHandlers}
                />
                <ButtonVe content={"Enviar"} click={handleClick} />
                <ButtonVe content={"Add"} click={handleClickProducts} />
                <ButtonVe content={"Del"} click={handleClickDeleteProduct} />
            </div>
        </section>
    )
}

export default CreateBilling;