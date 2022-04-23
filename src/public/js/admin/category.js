const categoryTableBody = document.querySelector('#v-pills-danhmuc table tbody')

const addCategory = () => {
    const addCategoryForm = document.querySelector('#add-category form')
    const btnSubmit = document.querySelector('#add-category-submit')
    btnSubmit.addEventListener('click', () => {
        addCategoryForm.submit()
    })
}
addCategory()

const deleteCategory = (categoryId) => {
    const btnDeleteCategory = document.querySelector('#delete-category-submit')
    btnDeleteCategory.addEventListener('click', () => {
        $.ajax({
            url: '/admin/category/delete/' + categoryId,
            type: 'delete',
            success: function(response) {
                window.location.href = '/admin/category'
                    // console.log(response)
            }
        })
    })
}

const updateCategory = (categoryId) => {
    const editCategoryBody = document.querySelector('#update-category .modal-body')
    $.get({
        url: '/admin/category/detail/' + categoryId,
        success: function(response) {
            editCategoryBody.innerHTML = `
                <form action="/admin/category/update/${response._id}?_method=put" method="post">
                    <label for="">Tên danh mục<span style="color: red;">*</span></label> <br>
                    <input type="text" name="category_name" value="${response.category_name}"><br>
                </form>`

            const submitBtn = document.querySelector('#update-category-submit')
            submitBtn.addEventListener('click', () => {
                editCategoryBody.querySelector('form').submit()
            })
        }
    })
}