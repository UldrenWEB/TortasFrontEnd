import Cookies from "js-cookie"

export const verifyLoginCookie = ({ setLogger, navigate }) => {
    const logged = Cookies.get("connect.sid") ? true : false;
    setLogger(logged);

    return logged ? navigate("/home") : navigate("/");
} 

export const verifyMethodsNav = ({ setLogger, navigate, setDataNav}) => {
    const permisosNav = JSON.parse(localStorage.getItem('permisosNav'))

    if (!permisosNav) {
        setLogger(false)
        return navigate('/login')
    }

    setDataNav(permisosNav)
    return 
}

export const verifyLogout = ({ setLogger, setData, result }) => { 
    Cookies.remove('connect.sid')
    localStorage.removeItem('permisosNav')  
    setLogger(false)
    setData(result.message)
}
