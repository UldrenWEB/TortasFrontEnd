import NavUpInfo from "./NavUpInfo";
import "../styles/HomeLogged.css";

const HomeLogged = ({
    setLoading,
    infoUser: {
        name = "Enmanuel Colina",
        avatar = "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2"
    } = {},
}) => {
    return (
        <section className="container-home-logged">
            <NavUpInfo name={name} avatar={avatar} />

        <div className="content-home">
            
        </div>
        </section>
    );
};

export default HomeLogged;