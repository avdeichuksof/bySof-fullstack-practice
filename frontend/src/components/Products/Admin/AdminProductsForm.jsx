import './adminProductsForm.css'
import React from 'react'

import Button from '../../Buttons/Button'

const AdminProductsForm = ({ onSubmit, onChange, value, btnText }) => {
    return (
        <div className="product-form-container">
            <form onSubmit={onSubmit}>
                <div className="product-form-item">
                    <input type="text" name="title" value={value.title} onChange={onChange} required />
                    <label htmlFor="title">título</label>
                </div>
                <div className="product-form-item">
                    <input type="text" name="thumbnail" value={value.thumbnail} onChange={onChange} required />
                    <label htmlFor="thumbnail">imágen</label>
                </div>

                <div className="items-box">
                    <div className="product-form-item">
                        <input type='number' name="price" value={value.price} onChange={onChange} required />
                        <label htmlFor="price">precio</label>
                    </div>
                    <div className="product-form-item">
                        <input type="text" name="size" value={value.size} onChange={onChange} required />
                        <label htmlFor="size">tamaño</label>
                    </div>
                </div>

                <div className="items-box radios">
                    <fieldset>
                        <legend>categoría</legend>
                        <div className="radio-container">
                            <div className="radio-input">
                                <input type="radio" id='arcilla' name="category" value='arcilla' onChange={onChange} />
                                <label htmlFor="arcilla">Arcilla</label>
                            </div>
                            <div className="radio-input">
                                <input type="radio" id='cajitas' name="category" value='cajitas' onChange={onChange} />
                                <label htmlFor="cajitas">Cajitas</label>
                            </div>
                            <div className="radio-input">
                                <input type="radio" id='cuadros' name="category" value='cuadros' onChange={onChange} />
                                <label htmlFor="cuadros">Cuadros</label>
                            </div>
                            <div className="radio-input">
                                <input type="radio" id='personalizado' name="category" value='personalizado' onChange={onChange} />
                                <label htmlFor="personalizado">Personalizado</label>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>subcategoría</legend>
                        <div className="radio-input">
                            <input type="radio" id='famous' name="subcategory" value='famous' onChange={onChange} />
                            <label htmlFor="famous">Famous</label>
                        </div>
                        <div className="radio-input">
                            <input type="radio" id='flowery' name="subcategory" value='flowery' onChange={onChange} />
                            <label htmlFor="flowery">Flowery</label>
                        </div>
                        <div className="radio-input">
                            <input type="radio" id='geometric' name="subcategory" value='geometric' onChange={onChange} />
                            <label htmlFor="geometric">Geometric</label>
                        </div>
                        <div className="radio-input">
                            <input type="radio" id='hobbies' name="subcategory" value='hobbies' onChange={onChange} />
                            <label htmlFor="hobbies">Hobbies</label>
                        </div>
                        <div className="radio-input">
                            <input type="radio" id='tv' name="subcategory" value='tv' onChange={onChange} />
                            <label htmlFor="tv">TV</label>
                        </div>
                        <div className="radio-input">
                            <input type="radio" id='varios' name="subcategory" value='varios' onChange={onChange} />
                            <label htmlFor="varios">Varios</label>
                        </div>
                    </fieldset>
                </div>

                <div className="items-box">
                    <div className="product-form-item">
                        <input type="number" name="stock" value={value.stock} onChange={onChange} required />
                        <label htmlFor="stock">stock</label>
                    </div>
                    <div className="product-form-item">
                        <input type="text" name="code" value={value.code} onChange={onChange} required />
                        <label htmlFor="code">code</label>
                    </div>
                </div>

                <div className="form-btn-container">
                    <Button className='btn-session' type='submit' content={btnText} />
                </div>

            </form>
        </div>
    )
}

export default AdminProductsForm