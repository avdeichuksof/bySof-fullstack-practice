import './home.css'
import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

import illustration from '../../img/illustration.png'

import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()


import ProductCard from '../../components/Products/ProductCard/ProductCard'

const Home = () => {
    const baseURL = 'http://localhost:8080'
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    // alternar entre textos en .info-text
    const [showFrontTxt, setShowFrontTxt] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setShowFrontTxt(prev => !prev)
        }, 5000)

        return () => clearInterval(interval)
    }, [])


    return (
        <div className='home-container'>
            <div className="titles">
                <h1 className='home-title'>By Sof</h1>
                <h3 className='home-subtitle'>Tu inspiración, <br />nuestra creación.</h3>
                <a href="/about#proceso">
                    Conocé el proceso
                    <svg viewBox="0 0 48 48"><path clipRule="evenodd" d="M46.443 6.719C40.506 15.546 22.623 33.4 22.623 33.4l-.007-.007c-.042.046-.08.094-.125.139-1.124 1.122-2.649 1.576-4.114 1.403.471 1.972-.026 4.137-1.529 5.678 0 0-7.52 9.299-15.854 3.44 0 0 4.494-1.259 4.885-4.885 0 0-.6-3.654 2.699-7.04a5.74 5.74 0 0 1 5.445-1.596c-.152-1.444.303-2.94 1.411-4.047.044-.045.093-.083.139-.126l-.007-.007S33.438 8.488 42.278 2.559a2.991 2.991 0 0 1 3.854.31 2.98 2.98 0 0 1 .311 3.85zM15.456 33.486c-.742-.742-1.704-1.165-2.733-1.165a3.809 3.809 0 0 0-2.744 1.171c-2.535 2.602-2.155 5.584-2.145 5.677-.218 2.02-1.363 3.741-2.557 4.776.422.077.849.116 1.285.116 4.75 0 8.752-4.66 8.789-4.704.001 0 2.739-3.236.105-5.871zm.538-3.478c0 .796.289 1.546.854 2.109.565.564 1.348.891 2.146.891s1.519-.326 2.066-.874l1.554-1.57.274-.28-4.197-4.197-.287.279-1.557 1.537c-.564.562-.853 1.309-.853 2.105zM44.72 4.286A.974.974 0 0 0 44.027 4c-.212 0-.414.064-.635.222-6.218 4.17-17.999 15.367-23.301 20.503l4.159 4.159c5.14-5.296 16.364-17.083 20.568-23.332a.974.974 0 0 0-.098-1.266z" fillRule="evenodd" fill="#ffffff" className="fill-000000"></path></svg>
                </a>
            </div>
            <div className="home-content">
                <section className='products-info'>
                    <img src={illustration} alt="ilustración de atril" className="illustration" />
                    <div className='info-text'>
                        <div className='slide-text-container'/* {showFrontTxt ? 'first-text' : 'second-text'} */>
                            <p className='slide-text'> {showFrontTxt ?
                                <>
                                    ¿Querés darle vida a algún espacio de tu casa? <br />
                                    ¡Descubrí nuestras obras de arte!
                                </>
                                : <>
                                    ¿Querés sorprender con un regalo único? 
                                    <br /> 
                                    ¡Explora nuestra colección de elementos hechos en arcilla!
                                </>}
                            </p>
                        </div>
                        <Link to='/products' className='link'><button className='info-btn'>Ver productos</button></Link>
                    </div>
                </section>
                <h2 className='categories-title'>Explorá nuestros productos</h2>
                <section className='categories-display'>
                    <Link className='link' to='/products?category=arcilla'>
                        <div className='category-box arcilla'>
                            <p>Arcilla</p>
                        </div>
                    </Link>
                    <Link className='link' to='/products?category=cajitas'>
                        <div className='category-box cajitas'>
                            <p>Cajitas</p>
                        </div>
                    </Link>
                    <Link className='link' to='/products?category=cuadros'>
                        <div className='category-box cuadros'>
                            <p>Cuadros</p>
                        </div>
                    </Link>
                    <Link className='link' to='/products?category=personalizados'>
                        <div className='category-box personalizado'>
                            <p>Personalizá</p>
                        </div>
                    </Link>
                </section>
                <section className='info-display'>
                    <div className="info-box">
                        <img width="100" height="100" src="https://img.icons8.com/ios/100/easel.png" alt="easel" />
                        <p>Personalizá tus diseños <br />como más te guste.</p>
                    </div>
                    <div className="info-box">
                        <img width="100" height="100" src="https://img.icons8.com/ios/100/bank-card-front-side--v1.png" alt="bank-card-front-side--v1" />
                        <p>Aceptamos transferencia, efectivo, <br />débito y crédito</p>
                    </div>
                    <div className="info-box">
                        <img width="100" height="100" src="https://img.icons8.com/wired/100/in-transit.png" alt="in-transit" />
                        <p>Envio  gratuito a todo el país</p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home

{/* <div className="falta">
    <h2>FALTA:</h2>
    <p> - usar stripe para finalizar compra</p>
    <p> - Dockerizar backend </p>
    <p> - ver error de recargar pagina y abrir el otra pestaña</p>
    <p> - arreglar que si agregué hasta el stock maximo no se pueda agregar de nuevo nada, que quede desabilitado</p>
    <p> - widget cant prods y ver si le agregamos el precio total ahí</p>
    <p> - ver lo de docs de usuarios si se agrega de alguna forma,
        puede ser que el admin suba foto de prods o foto de perfil de usuario
    </p>
    <p> - toastify o algo de eso</p>
    <p> - animaciones en los componentes</p>
    <p> - testing</p>
    <br />
    <br />
    <h4>PARA USAR TOASTIFY </h4>
    <p>
        Websockets: Si deseas una actualización en tiempo real sin necesidad de solicitar activamente los cambios al servidor, podrías considerar el uso de Websockets. Con Websockets, el servidor puede enviar automáticamente una notificación al cliente cuando se realice un cambio en el carrito, como la eliminación de un producto. Luego, el cliente puede actualizar dinámicamente la interfaz de usuario para reflejar el cambio.
    </p>
</div> */}
