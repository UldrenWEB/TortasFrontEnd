import "../styles/ReportsHandler.css"
import ButtonVe from "./ButtonVe"

const ReportsHandler = () => {
  return (
    <section className="container-reports-handler">
        <div className="container-cards">
            <h2>Reportes</h2>
            <div className="container-buttons">
                <ButtonVe content={"Rutas"} click={()=>window.location.href="/reports?filter=routes&main=true"}/>
                <ButtonVe content={"Productos"} click={()=>window.location.href="/reports?filter=products&main=true"}/>
                <ButtonVe content={"Locales"} click={()=>window.location.href="/reports?filter=local&main=true"} />
                <ButtonVe content={"Facturas"} click={()=>window.location.href="/reports?filter=bills&main=true"} />
                <ButtonVe content={"Vendedores"} click={()=>window.location.href="/reports?filter=seller&main=true"}/>
                <ButtonVe content={"Personas"} click={()=>window.location.href="/reports?filter=person&main=true"}/>
            </div>
        </div>
    </section>
  )
}

export default ReportsHandler