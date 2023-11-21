import { useEffect } from "react"

const Login = ({setLogger, setDataNav, navigate, isLogged}) =>{

    useEffect(()=>{
        if(isLogged){
            navigate('/home')
        }
    }, [])

    return(
        <section>
            login
        </section>
    )
}

export default Login