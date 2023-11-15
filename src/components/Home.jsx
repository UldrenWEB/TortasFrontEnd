import { Link } from "react-router-dom";

const Home = () => {
    return (
        <button>
            <Link to={"/prueba"}>Ir a prueba</Link>
        </button>
    )
}

export default Home;