const searchForm = document.querySelector('.myNavbar__form-search')


searchForm.onsubmit = () => {
    const searchData = searchForm.querySelector('input').value
    console.log("ok");
    $.get({
        url: '/product/search',
        data: { 'search': searchData },
        statusCode: {
            
            200: function(response) {
                console.log(response)
            },
            400: function(response) {
                console.log(response)
            }
        }
    })
}