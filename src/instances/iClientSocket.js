import Client from "../socketIO/client";

//!Logica de las zonas disponibles, ya que los rooms va por zonas
//!Es decir las rutas de cada vendedor y segun las rutas seran los nombres de los rooms 


const iClient = new Client({
    url: 'https://wsq5tmzj-7878.use.devtunnels.ms',
    rooms: ['el prado', 'sur', 'prolongacion']
})

export default iClient;






