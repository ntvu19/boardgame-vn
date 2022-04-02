// Add product
const addProduct = () => {
    const addProductForm = document.forms['add-product-form']
    const addProductBtn = document.querySelector('#btn-add-product')
    addProductBtn.addEventListener('click', () => {
        addProductForm.submit()
    })
}
addProduct()

// Delete product
const deleteProduct = () => {
    let productId
    const deleteProductBtn = document.querySelectorAll('.delete-product')
    deleteProductBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            productId = btn.dataset.id
        })
    })

    const deleteProductForm = document.forms['delete-product-form']
    const confirmDeleteProduct = document.querySelector('#btn-delete-product')
    confirmDeleteProduct.addEventListener('click', () => {
        deleteProductForm.action = '/admin/product/delete/' + productId + '?_method=DELETE'
        deleteProductForm.submit()
    })
}
deleteProduct()

// Update product
const updateProduct = () => {
    const editProductBtn = document.querySelectorAll('.update-product')
    const editProductModal = document.querySelectorAll('.edit-modal')
    const editProductConfirm = document.querySelectorAll('.btn-update-product')

    for (let i = 0; i < editProductBtn.length; i++) {
        editProductBtn[i].onclick = () => {
            for (let j = 0; j < editProductModal.length; j++) {
                editProductModal[j].style.display = 'block'
                editProductConfirm[j].onclick = () => {
                    editProductModal[j].querySelector('form').submit()
                }
                if (i != j) {
                    editProductModal[j].style.display = 'none'
                }
            }
        }
    }
}
updateProduct()