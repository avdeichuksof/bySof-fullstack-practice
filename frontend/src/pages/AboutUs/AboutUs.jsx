import './aboutUs.css'
import React from 'react'
import lineas from '../../img/lineas.jpg'
import pintando from '../../img/pintando.jpg'
import detalles from '../../img/detalles.jpg'

const AboutUs = () => {
    return (
        <div className='about-container'>
            <h1 className='about-title'>Conocenos</h1>
            <div className="about-content">
                <div className="about-txt" >
                    <p><em>"By Sof"</em> es un emprendimiento que nace de un hobby. Desde chica me gustó dibujar, pero de más grande descubrí el mundo de la pintura. Al practicar fui encontrando nuevos estilos y técnicas y me encantó. <br /> Me llamo Sofi, soy artista autodidacta y nunca me imaginé que mi pasatiempo podría llegar a convertirse en algo que muchas personas pudieran apreciar.</p>
                </div>

                <div className="about-imgs">
                    <h3>¿Querés conocer el proceso de los cuadros?</h3>
                    <p>¡Tocá las imágenes y descubrilo!</p>
                    <div className="imgs-container">
                        <div className="flip-card">
                            <div className="flip-card-content">
                                <div className="flip-card-front">
                                    <img src={lineas} alt="" />
                                </div>
                                <div className="flip-card-back">
                                    <p className='back-txt'>1. Comenzamos con una base de pintura blanca. Luego empezamos a dibujar con la técnica de grillas.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flip-card">
                            <div className="flip-card-content">
                                <div className="flip-card-front">
                                    <img src={pintando} alt="" />
                                </div>
                                <div className="flip-card-back">
                                    <p className='back-txt'>2. Empezamos a pintar, la parte más linda.</p>
                                </div>
                            </div>
                        </div>

                        <div className='flip-card'>
                            <div className="flip-card-content">
                                <div className="flip-card-front">
                                    <img src={detalles} alt="" />
                                </div>
                                <div className="flip-card-back">
                                    <p className='back-txt'>3. Ultimando detalles y luego se barniza</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs