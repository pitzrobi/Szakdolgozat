function checkPassword(form) {
    event.preventDefault();
    password1 = form.password1.value;
    password2 = form.password2.value;

    if (password1 == '')
        alert ('Please enter password!');
          
    else if (password2 == '')
        alert ('Please confirm your password!');
             
    else if (password1 != password2) {
        alert ('\nPassword did not match! Please try again...')
        return false;
    }

    else {
        axios.post('http://192.168.50.41:8080/avatar/registration', user).then(function(response){
            console.log(response) 
        })
        .catch(function(error){
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
    

    }


}