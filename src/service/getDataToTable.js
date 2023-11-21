import { URL_BASE } from "../constants/url";

const getData = async ({ body }) => {
    try {

        const url = `${URL_BASE}/toProcess`
        const objPost = {
            method: 'POST',
            cors: 'cors',
            credentials: 'include',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(body)
        }
        const response = await fetch(url, objPost)
        const json = await response.json()

        return json;

    } catch (error) {
        console.error(`Hubo un error al hacer el fetch con la url ${url}`)
        return false;
    }
}

export default getData;