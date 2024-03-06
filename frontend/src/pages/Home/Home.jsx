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
            <p> - function para totalprice en carrito</p>
            <p> - filtro de productos</p>
            <p> - agregar en vista de admin un boton para poner un id y borrar un carrito</p>
            <p> - contenido de paginas home, about us, carrito y profile</p>
            <p> - ver lo de docs de usuarios si se agrega de alguna forma,
                puede ser que el admin suba foto de prods o foto de perfil de usuario
            </p>
            <p> - toastify o algo de eso</p>
            <p> - animaciones en los componentes</p>
            <p> - fijarse de poner que cuando se borra un usuario, se borre su carrito (hecho pero hay que ver si funciona) </p>
            <p> - testing</p>

        </div>

    </div>
}

export default Home