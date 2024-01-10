import Cart from '../dao/models/model-cart.js'
import CartMethods from '../dao/methods/methods-carts.js'
const cartMethods = new CartMethods()

class CartService {

    #cartExists = async (id) => {
        const cartFound = await cartMethods.getCartById(id)
        if(!cartFound) throw new Error('Cart not found. Invalid ID')
        return cartFound
    }

    getCarts = async () => {
        try {
            const carts = await cartMethods.getCarts()
            return carts
        } catch (error) {
            throw new Error(error.message)
        }
    }

    getCartById = async (id) => {
        try {
            const cartFound = await cartMethods.getCartById(id)
            return cartFound
        } catch (error) {
            throw new Error(error.message)
        }
    }

    createCart = async () => {
        try {
            const newCart = await cartMethods.createCart()
            return newCart
        } catch (error) {
            throw new Error(error.message)
        }
    }

    addProductToCart = async (cartId, prodId, quantity) => {
        try {
            const cart = await Cart.findById(cartId)

            if(cart){
                const productAlreadyInCart = cart.products.find(p => p.product._id.toString() === prodId)
                
                if(productAlreadyInCart){
                    if((productAlreadyInCart.quantity + quantity) > productAlreadyInCart.stock){
                        /*** AGREGAR UNA ALERT  ***/
                        return {message: 'Not enough stock'}
                    }else{
                        productAlreadyInCart.quantity += quantity
                        await cart.save()
                        /*** AGREGAR UNA ALERT  ***/
                        return {message: 'Product quantity increased'}
                    }
                }else{
                    const addProduct = {$push: {products: {product: prodId, quantity: quantity}}}

                    await Cart.updateOne({_id: cartId}, addProduct)
                    /*** AGREGAR UNA ALERT  ***/
                    return {message: 'Product added to cart'}
                }
            }

        } catch (error) {
            throw new Error(error.message)
        }
    }

    updateProduct = async (cartId, products) => {
        try {
            const cartFound = await this.#cartExists(cartId)
            if(!cartFound) return {message: 'Cart not found'}

            await cartMethods.updateProductsInCart(cartId, products)
            return {message:'Products in cart updated'. cartFound}
        } catch (error) {
            throw new Error(error.message)
        }
    }

    updateProductQuantity = async (cartId, prodId, quantity) => {
        try {
            const cartFound = await this.#cartExists(cartId)

            if(cartFound) {
                const productFound = cartFound.products.find((item) => item.product.toString() === prodId)
            
                if(productFound){
                    await cartMethods.updateProductQuantity(cartId, prodId, quantity)
                    return ({message: 'Quantity updated'})
                }else{
                    throw new Error('Product not found')
                }
            }else{
                throw new Error('Cart not found')
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    updateCart = async (cartId, prodId, userCart) => {
        try {
            if(prodId === null){
                //si no se pasa ningun id de producto actualiza el carrito completo
                const cart = await this.#cartExists(cartId)

                const updateCart = cart.products = userCart.products
                await cart.save()

                console.log('Products in cart updated')
                return updateCart
            }else{
                // si se pasa un producto y existe en el carrito, se aumenta la cantidad
                const cart = await this.#cartExists(cartId)

                const productExists = cart.products.find((pid) => pid._id === prodId)

                if(productExists){
                    productExists.quantity = userCart.quantity
                }else{
                    throw new Error('Product not found in cart')
                }
                await cart.save()
                return cart
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    deleteProductFromCart = async (cartId, prodId) => {
        try {
            const cartFound = await this.#cartExists(cartId)

            if(cartFound){
                // buscamos si el producto está en el carrito
                const productExists = cartFound.products.find((item) => item.product.toString() === prodId)

                // si está lo eliminamos
                if(productExists) {
                    cartFound.products.splice(productExists, 1)
                    await cartFound.save()
                    return cartFound
                }else{
                    return false
                }
            }else{
                throw new Error('Cart not found')
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    deleteCart = async (cartId) => {
        try {
            const cart = await this.#cartExists(cartId)

            if(cart){
                const deleteCart = await cartMethods.deleteCart(cart)
                console.log('Cart deleted')
                return deleteCart
            }else{
                throw new Error('Cart not found')
            }

        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export default CartService