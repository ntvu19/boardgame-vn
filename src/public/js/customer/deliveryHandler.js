window.onload = () => {
    loadCartData()
}

const loadCartData = () => {
    const deliveryRight = document.querySelector('.deliveryPage__right')
    const productData = deliveryRight.querySelector('tbody')
    const sumOfPriceDOM = document.querySelector('#sumOfPrice')

    $.get({
        url: '/cart/api/cart-data',
        statusCode: {
            200: function(response) {
                const products = response.products
                productData.innerHTML = ''

                for (let i = 0; i < products.length; i++) {
                    productData.innerHTML += `
                        <tr>
                            <td>${products[i].name}</td>
                            <td class="quantity">${products[i].quantity}</td>
                            <td><span class="price">${products[i].price}</span><sup>đ</sup></td>
                        </tr>`
                }

                const quantityArr = document.querySelectorAll('.quantity')
                const priceArr = document.querySelectorAll('.price')
                var sumOfPrice = 0

                for (let i = 0; i < quantityArr.length; i++) {
                    sumOfPrice += (parseInt(quantityArr[i].innerText) * parseInt(priceArr[i].innerText))
                }

                sumOfPriceDOM.innerHTML = `${sumOfPrice}<sup>đ</sup>`
            },
            400: function(response) {

            }
        }
    })
}

const deliveryInfoSubmit = () => {
    const name = document.querySelector('input[name=name]').value
    const phone = document.querySelector('input[name=phone]').value
    const address = document.querySelector('input[name=address]').value

    $.post({
        url: '/delivery/api/new-order',
        data: { name, phone, address },
        statusCode: {
            200: function(response) {
                window.location.href = '/payment'
            },
            400: function(response) {

            }
        }
    })
}