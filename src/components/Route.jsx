import useURLParams from "../customHooks/useUrlParams";
import Table from "./Table";

//!Componente el cual se encarga de obtener los parametros de la url para poder hacer una consulta SQL con esos parametros
//TODO: Revisar este componente ya que esto se puede hacer en el componente TABLE y que renderice todo ese mismo
const MyRoute = () => {
    const data = useURLParams();

    if (!data) {
        //Se puede hacer aqui un loader mientras cargan los datos
        //Pero no se si esto esta bien 
        // return <div>Cargando...</div>;
    } else {
        return (
            <div>
                <Table data={data} />
            </div>
        );

    }

};

export default MyRoute;






