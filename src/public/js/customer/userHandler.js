window.onload = () => {
    loadOrderList()
}

const loadOrderList = () => {
    const orderDOM = document.querySelector('#v-pills-order table tbody')
    $.get({
        url: '/delivery/api/get-order',
        success: function(response) {
            console.log(response)
            orderDOM.innerHTML = ''
            for (let i = 0; i < response.length; i++) {
                orderDOM.innerHTML += `
                    <tr>
                        <th scope="row">${i+1}</th>
                        <td>${response[i].createAt}</td>
                        <td>${response[i].deliveryMethod}</td>
                        <td>${response[i].paymentMethod}</td>
                        <td>${response[i].status}</td>
                    </tr>`
            }
        }
    })
}