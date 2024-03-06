import './faqs.css'
import React, { useState } from 'react'
import AccordionItem from '../../components/AccordionItem/AccordionItem'

/* LAS RTAS QUE TENGAN PASOS PUEDEN SER LISTITAS */

const Faqs = () => {
    const [active, setActive] = useState(null)

    const activeHandler = (index) => {
        setActive((prev) => prev === index ? null : index)
    }

    return (
        <div className="faqs-container">
            <div className="titles-container">
                <h1 className='title-faqs'>FAQs</h1>
                <h4 className='subtitle-faqs'>Preguntas Frecuentes</h4>
            </div>
            <div className="accordion">
                <AccordionItem
                    index={0}
                    isActive={active === 0}
                    onClick={() => activeHandler(0)}
                    question={'¿Qué debo tener en cuenta al encargar un cuadro?'}
                    answer={'Lo más importante a tener en cuenta al encargar un cuadro es el tiempo de demora que pueda llegar a tener. ¡No querríamos que se pase de alguna ocasión especial!'} />
                <AccordionItem
                    index={1}
                    isActive={active === 1}
                    onClick={() => activeHandler(1)}
                    question={'¿Cúanto tiempo demoran los pedidos?'}
                    answer={'Dependiendo del diseño. Los cuadros oneline demoran aproximadamente una semana. Los cuadros personalizados entre una semana a un mes, dependiendo del nivel de detalle y dificultad. Tené esto en cuenta a la hora de encargar algún pedido para una fecha especial.'} />
                <AccordionItem
                    index={2}
                    isActive={active === 2}
                    onClick={() => activeHandler(2)}
                    question={'¿Puedo personalizar el diseño del cuadro?'}
                    answer={'Para cuadros personalizados podés enviarnos un mail contándonos tu idea y te asesoramos.'} />
                <AccordionItem
                    index={3}
                    isActive={active === 3}
                    onClick={() => activeHandler(3)}
                    question={'¿Puedo elegir el color de fondo y/o de líneas en los cuadros oneline?'}
                    answer={'Por supuesto, podés elegir el color que más te guste. Tené en cuenta a la hora de elegir los colores que tengan un buen contraste. Por ejemplo, líneas claras-fondo oscuro o viceversa. Cuando encargues el cuadro, te vamos a dar un ID de compra y vas a tener que enviarnos un email o Whatsapp indicándonos ese ID, para poder verificarlo y los colores que te gustarían'} />
                <AccordionItem
                    index={4}
                    isActive={active === 4}
                    onClick={() => activeHandler(4)}
                    question={'¿Cuál es el proceso para solicitar un cuadro?'}
                    answer={'Para solicitar un cuadro deberás ingresar en la pestaña Productos seleccioná el diseño que mas te guste, o bien podés enviarnos tu idea a nuestro mail, whatsapp o instagram. Luego seleccioná el tamaño, la cantidad y si lo necesitas para una fecha especial (tené en cuenta que dependiendo de la dificultad del diseño puede tardar más de lo esperado, así que encarganos con tiempo). Luego hacé clic en agregar al carrito. Seleccioná la forma de pago y lugar de envío. ¡Y listo!'} />
                <AccordionItem
                    index={5}
                    isActive={active === 5}
                    onClick={() => activeHandler(5)}
                    question={'¿Cuáles son los medios de pago?'}
                    answer={'Se puede abonar mediante transferencia, MercadoPago, tajeta de débito o crédito.'} />
            </div>
        </div>
    )
}


export default Faqs