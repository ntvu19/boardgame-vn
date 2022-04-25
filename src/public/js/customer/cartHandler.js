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
                            <td><input type="number" value="${productArr[i].quantity}" min="1"></td>
                            <td><p>${productArr[i].price} <sup>đ</sup></p></td>
                            <td><span>x</span></td>
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