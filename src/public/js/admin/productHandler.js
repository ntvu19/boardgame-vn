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
const deleteProduct = (productId) => {
    const confirmDeleteProduct = document.querySelector('#btn-delete-product')
    confirmDeleteProduct.addEventListener('click', () => {
        $.ajax({
            url: '/admin/product/delete/' + productId,
            type: 'delete',
            success: function(response) {
                //console.log(response)
                window.location.href = '/admin/product'
            }
        })
    })
}

// Show edit product modal
const updateProduct = (productId) => {
    const editProductBody = document.querySelector('#update-product-modal .modal-body')
    $.get({
        url: '/admin/product/detail/' + productId,
        success: function(response) {
            editProductBody.innerHTML = `
                <form action="/admin/product/update/${response._id}?_method=PUT" method="POST">
                    <label for="">Tên sản phẩm<span style="color: red;">*</span></label> <br>
                    <input type="text" name="name" value=${response.name}"><br>
                    <label for="">Giá<span style="color: red;">*</span></label> <br>
                    <input type="text" name="price" value="${response.price}"><br>
                    <label for="">Mô tả sản phẩm<span style="color: red;">*</span></label> <br>
                    <textarea name="description" rows="6">${response.description}</textarea><br>
                </form>`

            const submitBtn = document.querySelector('#btn-update-product')
            submitBtn.onclick = () => {
                editProductBody.querySelector('form').submit()
            }
        }
    })
}