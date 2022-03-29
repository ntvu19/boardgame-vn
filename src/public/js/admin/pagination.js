/**
 * v-pills-home
 * v-pills-danhmuc
 * v-pills-sanpham
 * v-pills-donhang
 * v-pills-doanhthu
 * v-pills-customer
 * v-pills-admin
 * v-pills-bug
 */

const maxElement = 4

const productElement = document.querySelector('#v-pills-sanpham table tbody').rows
let productSize = productElement.length
let pageNumber = Math.ceil(productSize / maxElement)
const ulPagination = document.querySelector('#v-pills-sanpham nav ul')

loadProduct = () => {
    for (let i = 0; i < maxElement; i++) {
        if (i == productSize - 1) {
            break
        }
        productElement[i].removeAttribute('hidden')
    }
}
loadProduct()

for (let i = 0; i < pageNumber; i++) {
    const li = document.createElement('li')
    const button = document.createElement('button')
    li.className = 'page-item'
    button.className = 'page-link'
    button.innerText = i + 1
    button.addEventListener('click', (e) => {
        for (let j = 0; j < productSize; j++) {
            productElement[j].setAttribute('hidden', true)
        }

        let pageIdx = parseInt(e.target.innerText) - 1
        for (let j = pageIdx * maxElement; j < (pageIdx + 1) * maxElement; j++) {
            if (j == productSize) {
                break
            }
            productElement[j].removeAttribute('hidden')
        }

    })
    li.appendChild(button)
    ulPagination.appendChild(li)
}