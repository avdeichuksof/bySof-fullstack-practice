import './adminProductsForm.css'
import React from 'react'


const AdminProductsForm = ({onSubmit, onChange, value, btnText}) => {
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

                    <div className="product-form-item">
                        <fieldset>
                            <legend>categoría</legend>
                            <div className="radio-container">
                                <div className="radio-input">
                                    <input type="radio" id='famous' name="category" value='famous' onChange={onChange} />
                                    <label htmlFor="famous">Famous</label>
                                </div>
                                <div className="radio-input">
                                    <input type="radio" id='flowery' name="category" value='flowery' onChange={onChange} />
                                    <label htmlFor="flowery">Flowery</label>
                                </div>
                                <div className="radio-input">
                                    <input type="radio" id='geometric' name="category" value='geometric' onChange={onChange} />
                                    <label htmlFor="geometric">Geometric</label>
                                </div>
                                <div className="radio-input">
                                    <input type="radio" id='hobbies' name="category" value='hobbies' onChange={onChange} />
                                    <label htmlFor="hobbies">Hobbies</label>
                                </div>
                                <div className="radio-input">
                                    <input type="radio" id='tv' name="category" value='tv' onChange={onChange} />
                                    <label htmlFor="tv">TV</label>
                                </div>
                                <div className="radio-input">
                                    <input type="radio" id='varios' name="category" value='varios' onChange={onChange} />
                                    <label htmlFor="varios">Varios</label>
                                </div>
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

                    <button type='submit' className='product-form-btn'>{btnText}</button>
                </form>
            </div>
    )}

export default AdminProductsForm