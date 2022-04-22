const maxElement = 8

const bgFamily = document.querySelector("#v-pills-bgfamily")
const bgChild = document.querySelector("#v-pills-bgchild")
const bgVietnam = document.querySelector('#v-pills-bgvietnam')
const bgUS = document.querySelector('#v-pills-bgUS')

let productSize = 0
let offset = 0


document.addEventListener('DOMContentLoaded', () => {
    loadPage()
    getProductList(offset)
})

const productTableBody = document.querySelector('#product-list');

const loadPage = () => {
    $.get({
        url: '/product/api/product-size',
        success: function (response) {
            productSize = response.productSize

            const paginationBtn = document.querySelector('#pagination-btn')
            const pageNumber = Math.ceil(productSize / maxElement)
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
    const sortBy = document.getElementById("sort").value;
    console.log(sortBy)
    $.get({
        url: `/product/${o}?sortBy=${sortBy}`,
        statusCode: {
            200: function (response) {
                productTableBody.innerHTML = ''
                let elementSize = response.length
                for (let i = 0; i < elementSize; i++) {
                    const element = response[i]
                    productTableBody.innerHTML += `
                    <div class="col-3 card-item">
                        <div class="card">
                            <img src="${element.photo[0]}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">${element.name}</h5>
                                <p class="card-text">${element.description}</p>
                                <div class="card-price">
                                    <p class="card-price-num">${element.price}</p><span> VND</span>
                                </div>
                            </div>
                            <div class="card__overlay">
                                <a href="/product/detail/${element._id}" class="card__overlay-detail">
                                    <i class="fa fa-arrow-circle-right"></i>Xem chi tiết
                                </a>
                            <button class="card__overlay-cart">
                                <i class="fa fa-shopping-cart"></i>Cho vào giỏ
                            </button>
                        </div>
                    </div>`
                }
            },
            400: function (response) {
                console.log(response)
            }
        }
    })
}














// let arrCategory = [bgFamily, bgChild, bgVietnam, bgUS]
// arrCategory.forEach(category => {
//     let listProduct = category.querySelectorAll('.row .card-item')
//     let ulPagination = category.querySelector('.category__right-bottom ul')

//     const loadProduct = () => {
//         for (let i = 0; i < maxElement; i++) {
//             // If the length is less than max element
//             if (i == ulPagination.length - 1) {
//                 break
//             }
//             listProduct[i].removeAttribute('hidden')
//         }
//     }
//     loadProduct()

//     let categoryPageNumber = Math.ceil(listProduct.length / maxElement)
//     for (let i = 0; i < categoryPageNumber; i++) {
//         const li = document.createElement('li')
//         const button = document.createElement('button')
//         li.className = 'page-name'
//         button.className = 'page-link'
//         button.innerText = i + 1
//         button.addEventListener('click', (e) => {
//             listProduct.forEach(el => {
//                 el.setAttribute('hidden', true)
//             })

//             let pageIdx = parseInt(e.target.innerText) - 1
//             for (let j = pageIdx * maxElement; j < (pageIdx + 1) * maxElement; j++) {
//                 if (j == listProduct.length) {
//                     break
//                 }
//                 listProduct[j].removeAttribute('hidden')
//             }
//         })
//         li.appendChild(button)
//         ulPagination.appendChild(li)
//     }
// })


