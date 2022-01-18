fetch('http://127.0.0.1:5000/api/user') // Mode 
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Error: ' + response.status)
                return
            }
            response.json().then(data => {
                console.log(data)
            })
        }
    )
    .catch(err => {
        console.log('Error: ', err)
    })