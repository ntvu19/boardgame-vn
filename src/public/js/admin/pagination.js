let productSize = 0
let offset = 0

const productTableBody = document.querySelector('#product-list')

document.addEventListener('DOMContentLoaded', () => {
    loadPage()
    getProductList(offset)
})

const loadPage = () => {
    $.get({
        url: '/admin/api/product-size',
        success: function(response) {
            productSize = response.productSize
            const paginationBtn = document.querySelector('#pagination-btn')
            const pageNumber = Math.ceil(productSize / 4)
            for (let i = 0; i < pageNumber; i++) {
                const li = document.createElement('li')
                const button = document.createElement('button')
                li.className = 'page-item'
                button.className = 'page-link'
                button.innerText = i + 1
                button.addEventListener('click', (e) => {
                    productTableBody.innerHTML = ''
                    getProductList(i)
                })
                li.appendChild(button)
                paginationBtn.appendChild(li)
            }
        }
    })
}

const getProductList = (o) => {
    $.get({
        url: '/admin/product/' + o,
        statusCode: {
            200: function(response) {
                let elementSize = response.length
                for (let i = 0; i < elementSize; i++) {
                    const element = response[i]
                    productTableBody.innerHTML += `
                    <tr>
                        <th scope="row">${o * 4 + i + 1}</th>
                        <td class="table__img"><img src="${element.photo[0]}" alt=""></td>
                        <td>${element.name}</td>
                        <td>${element.description}</td>
                        <td>${element.price}<sup>đ</sup></td>
                        <td>
                            <div class="table__btn row">
                                <div class="col-6 table__btn-left">
                                    <button class="update-product" onclick="updateProduct('${element._id}')" data-toggle="modal" data-target="#update-product-modal">Sửa</button>
                                </div>
                                <div class="col-6 table__btn-right">
                                    <button class="delete-product" onclick="deleteProduct('${element._id}')" data-toggle="modal" data-target="#delete-product-confirm">Xoá</button>
                                </div>
                            </div>
                        </td>
                    </tr>`
                }
            },
            400: function(response) {
                //console.log(response)
            }
        }
    })
}

