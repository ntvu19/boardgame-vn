let cart = [];

module.exports = class Cart{
    static save(product){
        if(cart){
            const existProductIndex = cart.products.findIndex(p => p.id == product.id); //check product is existing in cart
            if(existProductIndex >= 0) { //exist in cart already
                const existProduct = cart.products[existProductIndex];
                existProduct.qty += 1;
                // const existqty = existProduct.qty;
                // existProduct.qty = existqty + 1;
                // cart.products[existProductIndex] = existProduct;
                cart.totalPrice += product.price;

            } else { //not exist
                product.qty = 1;
                cart.products.push(product);
                cart.totalPrice += product.price;
            }
        } else{
            cart = {products: [], totalPrice: 0};

            product.qty = 1;
            cart.products.push(product);
            cart.totalPrice = product.price;
        }
    }

    static getCart(){
        return cart;
    }
}