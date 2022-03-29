const maxElement = 8
const bgFamily = document.querySelector("#v-pills-bgfamily")
const bgChild = document.querySelector("#v-pills-bgchild")
const bgVietnam = document.querySelector('#v-pills-bgvietnam')
const bgUS = document.querySelector('#v-pills-bgUS')

let arrCategory = [bgFamily, bgChild, bgVietnam, bgUS]
arrCategory.forEach(category => {
    let listProduct = category.querySelectorAll('.row .card-item')
    let ulPagination = category.querySelector('.category__right-bottom ul')

    const loadProduct = () => {
        for (let i = 0; i < maxElement; i++) {
            // If the length is less than max element
            if (i == ulPagination.length - 1) {
                break
            }
            listProduct[i].removeAttribute('hidden')
        }
    }
    loadProduct()

    let categoryPageNumber = Math.ceil(listProduct.length / maxElement)
    for (let i = 0; i < categoryPageNumber; i++) {
        const li = document.createElement('li')
        const button = document.createElement('button')
        li.className = 'page-name'
        button.className = 'page-link'
        button.innerText = i + 1
        button.addEventListener('click', (e) => {
            listProduct.forEach(el => {
                el.setAttribute('hidden', true)
            })

            let pageIdx = parseInt(e.target.innerText) - 1
            for (let j = pageIdx * maxElement; j < (pageIdx + 1) * maxElement; j++) {
                if (j == listProduct.length) {
                    break
                }
                listProduct[j].removeAttribute('hidden')
            }
        })
        li.appendChild(button)
        ulPagination.appendChild(li)
    }
})