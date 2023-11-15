import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <div>
            <h1>Esta es la pagina inicio con el componente navBar</h1>
            <ul>
                <li><Link to='/home'>Ir a inicio</Link></li>
                <li><Link to='/'>Ir a home</Link></li>
            </ul>
        </div>
    )
}

export default NavBar;