window.onload = () => {
    $('.message a').click(function() {
        $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
    });
    register()
}

const register = () => {
    const fullName = document.querySelector('.register-form input[name=fullName]')
    const email = document.querySelector('.register-form input[name=email]')
    const username = document.querySelector('.register-form input[name=username]')
    const passwordArr = document.querySelectorAll('.register-form input[type=password]')

    $('#register-btn').click(() => {
        if (passwordArr[0].value !== passwordArr[1].value) {
            alert('Password is not match!')
            return;
        }

        const formData = {
            fullName: fullName.value,
            email: email.value,
            username: username.value,
            password: passwordArr[0].value
        }

        $.post({
            url: '/admin/register',
            data: formData,
            statusCode: {
                200: function(response) {
                    window.location.href = '/admin'
                },
                403: function(response) {
                    alert(response.responseJSON.message)
                }
            }
        })
    })
}