import './aboutUs.css'
import React from 'react'

const AboutUs = () => {
    return (
        <div className='about-container'>
            <h1 className='about-title'>Conocenos</h1>
            <div className="about-content">
                <div className="about-txt" >
                    <p><em>"By Sof"</em> es un emprendimiento que nace de un hobby. Desde chica me gustó dibujar, pero de más grande descubrí el mundo de la pintura. Al practicar fui encontrando nuevos estilos y técnicas y me encantó. <br />
                        Me llamo Sofi, soy artista autodidacta y nunca me imaginé que mi pasatiempo podría llegar a convertirse en algo que muchas personas pudieran apreciar.</p>
                </div>

                <div className="about-imgs" >
                    <h3 id='proceso'>¿Querés conocer el proceso de los cuadros?</h3>

                    <div className="about-process">
                        <p className='number'>1</p>
                        <p className='process-text'>Teniendo ya el diseño, elegimos la medida de fibrofácil que mejor se adapte.</p>
                    </div>
                    <div className="about-process">
                        <p className='number'>2</p>
                        <p className='process-text'>Pintamos una capa de blanco sobre el fibrofácil y comenzamos a trazar el grillado para luego dibujar guiándonos de éste.</p>
                    </div>
                    <div className="about-process">
                        <p className='number'>3</p>
                        <p className='process-text'>Cuando terminamos el dibujo, empieza la etapa más linda. ¡A pintar!</p>
                    </div>
                    <div className="about-process last-child">
                        <p className='number'>4</p>
                        <p className='process-text'>Luego de ultimar todos los detalles, barnizamos y ya está listo para entregarse.</p>
                    </div>
                </div>
                {/* <section className='process-final-text'>
                    imagencita <br />   
                    Cada paso está lleno de amor y dedicación para que puedas obtener la mejor calidad en tus pedidos.
                    <br />
                    imagencita
                </section> */}
            </div>
        </div>
    )
}

export default AboutUs