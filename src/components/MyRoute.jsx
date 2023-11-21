import useURLParams from "../customHooks/useUrlParams";
import Table from "./Table";
import ButtonReports from "./ButtonReports";
import DefaultComponent from './DefaultComponent'


const MyRoute = () => {
    const { data, options, isMain, defaultComponent } = useURLParams();



    if (!data) {
        // Se puede hacer aqui un loader mientras cargan los datos
        // Pero no se si esto esta bien
        return <div>Cargando...</div>;
    } else {
        return (
            <div>
                {defaultComponent ? (
                    <DefaultComponent />
                ) : (
                    <>
                        {isMain ? (
                            <ButtonReports optionByPath={options} />
                        ) : (
                            <Table data={data} />
                        )}
                    </>
                )}
            </div>
        );

    }

};

export default MyRoute;






