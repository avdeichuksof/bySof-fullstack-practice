/* import React, {useState, useEffect} from "react"
import AxiosClient from "../services/axiosClient"
const axiosClient = new AxiosClient() */
import './home.css'
import React from "react"

const Home = () => {

    /* ESTO SE PUEDE USAR PARA MOSTRAR ALGUNOS PRODUCTOS CON LIMIT Y PAGINATE */
    /* 
        const [data, setData] = useState('')
    
        const fetchData = async () => {
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
    
            const baseURL = process.env.REACT_APP_BASE_URL
            try {
                axiosClient.getRequest({
                    url: `${baseURL}`,
                    config: config,
                    callbackSuccess: (res) => {
                        console.log('Successfull request ', res)
                    },
                    calbackError: (error) => {
                        console.error('Error: ', error)
                    }
                })
                setData(result.message)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
     */

    return <div>
        <h1>HOME</h1>
        <div>
            <h2>FALTA:</h2>
            <p> - ver error de recargar pagina y abrir el otra pestaña</p>
            <p> - arreglar que si agregué hasta el stock maximo no se pueda agregar de nuevo nada, que quede desabilitado</p>
            <p> - widget cant prods y ver si le agregamos el precio total ahí</p>
            <p> - filtro de productos</p>
            <p> - contenido de paginas home, about us, y profile</p>
            <p> - ver lo de docs de usuarios si se agrega de alguna forma,
                puede ser que el admin suba foto de prods o foto de perfil de usuario
            </p>
            <p> - toastify o algo de eso</p>
            <p> - poner loaders</p>
            <p> - animaciones en los componentes</p>
            <p> - fijarse de poner que cuando se borra un usuario, se borre su carrito (hecho pero hay que ver si funciona) </p>
            <p> - arreglar errores de login/logout</p>
            <p> - testing</p>

            <h4>PARA USAR TOASTIFY </h4>
            <p>
                Websockets: Si deseas una actualización en tiempo real sin necesidad de solicitar activamente los cambios al servidor, podrías considerar el uso de Websockets. Con Websockets, el servidor puede enviar automáticamente una notificación al cliente cuando se realice un cambio en el carrito, como la eliminación de un producto. Luego, el cliente puede actualizar dinámicamente la interfaz de usuario para reflejar el cambio.
            </p>

        </div>

    </div>
}

export default Home
