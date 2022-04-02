// Add admin
const addAdmin = () => {
    const addForm = document.forms['add-form']
    const submitBtn = document.querySelector('#btn-add-submit')

    submitBtn.addEventListener('click', () => {
        addForm.submit()
    })
}
addAdmin()

// Delete admin
const deleteAdmin = () => {
    let adminId
    const deleteAdminBtn = document.querySelectorAll('.delete-admin')
    deleteAdminBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            adminId = btn.dataset.id
        })
    })

    const deleteForm = document.forms['delete-admin']
    const submitBtn = document.querySelector('#btn-delete-submit')
    submitBtn.addEventListener('click', () => {
        deleteForm.action = '/admin/admin/delete/' + adminId + '?_method=DELETE'
        deleteForm.submit()
    })

}
deleteAdmin()

// Update admin
const updateAdmin = () => {
    const updateBtn = document.querySelectorAll('.update-admin')
    const editModal = document.querySelectorAll('.edit-modal')
    const submitBtn = document.querySelectorAll('.btn-update-submit')
    for (let i = 0; i < updateBtn.length; i++) {
        updateBtn[i].onclick = () => {
            for (let j = 0; j < editModal.length; j++) {
                editModal[j].style.display = 'block'
                submitBtn[j].onclick = () => {
                    editModal[j].querySelector('form').submit()
                }
                if (i != j) {
                    editModal[j].style.display = 'none'
                }
            }
        }
    }
}
updateAdmin()