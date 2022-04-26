window.onload = () => {
    loadCartData()
}

const addToCart = (productId) => {
    $.post({
        url: '/cart/add',
        data: { productId: productId },
        statusCode: {
            200: function(response) {
                console.log(response)
            },
            400: function(response) {
                // console.log(response)
            }
        }
    })
}

const loadCartData = () => {
    const cartContentLeft = document.querySelector('.cart__content-left table tbody')
    const DOM_SumOfProduct = document.querySelector('#sumOfProduct')
    const DOM_SumOfPrice = document.querySelector('#sumOfPrice')

    $.get({
        url: '/cart/api/cart-data',
        statusCode: {
            200: function(response) {
                const productArr = response.products
                var sumOfProduct = productArr.length
                var sumOfPrice = 0

                cartContentLeft.innerHTML = ''
                for (let i = 0; i < sumOfProduct; i++) {
                    cartContentLeft.innerHTML += `
                        <tr>
                            <td><img src="${productArr[i].photo}" alt=""></td>
                            <td><p>${productArr[i].name}</p></td>
                            <td><input class="quantity" type="number" value="${productArr[i].quantity}" min="1" onchange="changeQuantity(this, '${productArr[i].productId}');"></td>
                            <td><p><strong class="unit-price">${productArr[i].price}</strong> <sup>đ</sup></p></td>
                            <td><span onclick="deleteProductInCart(this, '${productArr[i].productId}');">x</span></td>
                        </tr>`

                    sumOfPrice += (productArr[i].quantity * productArr[i].price)
                }

                DOM_SumOfProduct.innerText = sumOfProduct
                DOM_SumOfPrice.innerHTML = `${sumOfPrice} <sup>đ</sup>`
            },
            400: function(response) {
                // console.log(response)
            }
        }
    })
}



const changeQuantity = (e, productId) => {
    const DOM_SumOfPrice = document.querySelector('#sumOfPrice')
    const quantityArr = document.querySelectorAll('.quantity')
    const unitPriceArr = document.querySelectorAll('.unit-price')

    var sumOfPrice = 0
    for (let i = 0; i < quantityArr.length; i++) {
        sumOfPrice += (parseInt(quantityArr[i].value) * parseInt(unitPriceArr[i].innerText))
    }

    DOM_SumOfPrice.innerHTML = `${sumOfPrice} <sup>đ</sup>`

    // Update database
    $.ajax({
        type: 'put',
        url: '/cart/api/cart-edit',
        data: { productId: productId, quantity: parseInt(e.value) },
        statusCode: {
            200: function(response) {

            },
            400: function(response) {

            }
        }
    })
}

const deleteProductInCart = (e, productId) => {
    const DOM_SumOfProduct = document.querySelector('#sumOfProduct')
    const DOM_SumOfPrice = document.querySelector('#sumOfPrice')

    // Remove product
    const removedProduct = e.parentElement.parentElement
    removedProduct.parentNode.removeChild(removedProduct)

    // Update sum of quantities
    DOM_SumOfProduct.innerText = parseInt(DOM_SumOfProduct.innerText) - 1

    // Update sum of prices
    const quantityArr = document.querySelectorAll('.quantity')
    const unitPriceArr = document.querySelectorAll('.unit-price')
    var sumOfPrice = 0

    for (let i = 0; i < quantityArr.length; i++) {
        sumOfPrice += (parseInt(quantityArr[i].value) * parseInt(unitPriceArr[i].innerText))
    }
    DOM_SumOfPrice.innerHTML = `${sumOfPrice} <sup>đ</sup>`

    // Update database
    $.ajax({
        type: 'delete',
        url: '/cart/api/remove-product',
        data: { productId }
    })

}