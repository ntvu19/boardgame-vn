const paymentSubmit = () => {
    const deliveryMethod = document.querySelector('input[name=delivery-method]').value
    const paymentMethodList = document.querySelectorAll('input[name=payment-method]')
    var paymentMethod = ''

    for (let i = 0; i < paymentMethodList.length; i++) {
        if (paymentMethodList[i].checked) {
            paymentMethod = paymentMethodList[i].value
            break
        }
    }

    $.ajax({
        type: 'put',
        url: '/delivery/api/update-method',
        data: { deliveryMethod, paymentMethod, status: 'Đang giao hàng' },
        statusCode: {
            200: function(response) {
                window.location.href = '/user'
            },
            400: function(response) {

            }
        }
    })

}