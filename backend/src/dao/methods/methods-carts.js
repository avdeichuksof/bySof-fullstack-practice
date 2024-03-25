import Cart from '../models/model-cart.js'

class CartMethods {

    getCarts = async () => {
        const carts = await Cart.find({})
        return carts
    }

    getCartById = async (id) => {
        const cartFound = await Cart.findOne({_id: id}).populate('products.product').lean()
        return cartFound
    }

    createCart = async () => {
        const newCart = new Cart()
        return newCart.save()
    }

    updateCart = async (id) => {
        await Cart.updateOne({_id: id}, {products: []})
    }

    updateProductsInCart = async (id, products) => {
        const updatedProducts = await Cart.updateOne({_id: id}, {products})
        return updatedProducts
    }

    updateProductQuantity = async (cartId, prodId, quantity) => {
        return await Cart.findOneAndUpdate(
            {_id: cartId, 'products.product': prodId},
            {$set: {'products.$.quantity': quantity}}
        )
    }

    emptyCart = async (id) => {
        const cartEmpty = await Cart.findByIdAndUpdate(id, { products: [] }, { new: true })
        return cartEmpty
    }

    deleteCart = async (id) => {
        const deleteCart = await Cart.deleteOne({_id: id})
        return deleteCart
    }

}

export default CartMethods