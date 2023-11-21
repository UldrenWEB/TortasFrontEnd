const getData = async () => {
    await fetch("http://localhost:7878/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user: "uldren12",
            password: "1234"
        }),
        credentials: "include"
    })

    // const response = await fetch('https://venta-tortas-dev-htaz.4.us-1.fl0.io/toProcess', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         object: 'products',
    //         method: 'getAll',
    //         params: ['selectAllProduct'],
    //         area: 'sales'
    //     }),
    //     credentials: 'include'

    // })
    // const json = await response.json()


    // return json;
}

export default getData;