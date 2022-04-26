// Category
const categoryFilter = document.querySelector('#category-filter')
const categoryList = categoryFilter.querySelectorAll('option')
let currentCategory = categoryList[0]

categoryFilter.addEventListener('change', () => {
    currentCategory = categoryList[categoryFilter.selectedIndex]
})

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
        contentType: 'multipart/form-data',
        success: function(response) {
            editProductBody.innerHTML = `
                <form action="/admin/product/update/${response._id}?_method=PUT" method="POST">
                    <label for="">Tên sản phẩm<span style="color: red;">*</span></label> <br>
                    <input type="text" name="name" value="${response.name}"><br>
                    <label for="">Giá<span style="color: red;">*</span></label> <br>
                    <input type="text" name="price" value="${response.price}"><br>
                    <label for="">Danh mục<span style="color:red;">*</span></label> <br>
                    <select name="categoryId">${categoryFilter.innerHTML}</select> <br>

                    <label for="">Số lượng hàng<span style="color: red;">*</span></label> <br>
                    <input type="number" name="stock" value="${response.stock}"><br>
                    <label for="">Số người chơi<span style="color: red;">*</span></label> <br>
                    <input type="text" name="numberOfPlayer" value="${response.conditions.numberOfPlayer}"><br>
                    <label for="">Thời gian chơi<span style="color: red;">*</span></label> <br>
                    <input type="text" name="playingTime" value="${response.conditions.playingTime}"><br>
                    <label for="">Độ tuổi<span style="color: red;">*</span></label> <br>
                    <input type="text" name="age" value="${response.conditions.age}"><br>
                    <label for="">Thể loại<span style="color: red;">*</span></label> <br>
                    <input type="text" name="genres" value="${response.conditions.genres}"><br>

                    <label for="">Mô tả sản phẩm<span style="color: red;">*</span></label> <br>
                    <textarea name="description" rows="6">${response.description}</textarea><br>

                    <label for="">Ảnh<span style="color: red;">*</span></label> <br>
                    <div class="row">
                        <div class="col-sm-9 ml-auto">
                            <img src="${response.photo[0]}"> <br>                            
                        </div>
                        <div class="col-sm-3 ml-auto"> 
                            <input type="file" class="form-control" name="image1" id="image1">                            
                        </div>
                        <div class="col-sm-9 ml-auto">
                            <img src="${response.photo[1]}"> <br>
                            
                        </div>
                        <div class="col-sm-3 ml-auto"> 
                            <input type="file" class="form-control" name="image2" id="image2">                            
                        </div>
                        <div class="col-sm-9 ml-auto">
                            <img src="${response.photo[2]}"> <br>
                            
                        </div>
                        <div class="col-sm-3 ml-auto"> 
                            <input type="file" class="form-control" name="image3" id="image3">
                            
                        </div>
                        <div class="col-sm-9 ml-auto">
                            <img src="${response.photo[3]}"> <br>
                            
                        </div>
                        <div class="col-sm-3 ml-auto"> 
                            <input type="file" class="form-control" name="image4" id="image4">
                            
                        </div>
                        <div class="col-sm-9 ml-auto">
                            <img src="${response.photo[4]}"> <br>
                            
                        </div>
                        <div class="col-sm-3 ml-auto"> 
                            <input type="file" class="form-control" name="image5" id="image5">
                            
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                        <button id="btn-update-product" class="btn btn-primary">Cập nhật</button>
                    </div>
                </form>`

            for (let i = 0; i < categoryList.length; i++) {
                if (response.categoryId === categoryList[i].value) {
                    editProductBody.querySelector('select[name=categoryId]').selectedIndex = i
                    break
                }
            }

        }
    })
}

