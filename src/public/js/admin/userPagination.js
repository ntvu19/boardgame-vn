let userSize = 0
let offset = 0

const userTableBody = document.querySelector('#user-list')

document.addEventListener('DOMContentLoaded', () => {
    loadPage()
    getUserList(offset)
})

const loadPage = () => {
    $.get({
        url: '/admin/api/user-size',
        success: function(response) {
            userSize = response.userSize
            const paginationBtn = document.querySelector('#pagination-btn')
            const pageNumber = Math.ceil(userSize / 4)

            for (let i = 0; i < pageNumber; i++) {
                const li = document.createElement('li')
                const button = document.createElement('button')
                li.className = 'page-item'
                button.className = 'page-link'
                button.innerText = i + 1
                button.addEventListener('click', (e) => {
                    userTableBody.innerHTML = ''
                    getUserList(i)
                })
                li.appendChild(button)
                paginationBtn.appendChild(li)
            }
        }
    })
}

const getUserList = (o) => {
    const sortBy = document.getElementById("sort").value;
    // const fieldSort = document.getElementById("field").value;
    $.get({
        url: '/admin/user/list/' + o,
        statusCode: {
            200: function(response) {
                console.log(response)
                let elementSize = response.length
                userTableBody.innerHTML += ''
                for (let i = 0; i < elementSize; i++) {
                    const element = response[i]
                    userTableBody.innerHTML += `
                    <tr>
                        <td>${element.fullName}</td>
                        <td style="text-align: center;">${element.username}</td>
                        <td>${element.email}</td>
                        <td>${element.address}</td>
                        <td>
                            <a href="/admin/block-user/${element._id}?block=${ element.blocked ? false:true}" class="${element.blocked ?  'btn btn-secondary': 'btn btn-primary'}">${ element.blocked ? "Disable":"Active"}</a>
                        </td>
                    </tr>`
                }
            },
            400: function(response) {
                console.log(response)
            }
        }
    })
}