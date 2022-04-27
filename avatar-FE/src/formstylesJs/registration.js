function registration(form, event) {

    let user = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("regEmail").value, 
        password: document.getElementById("regPass").value,
        matchingPassword: document.getElementById("matchingRegPass").value

    }


    axios.post(backendUrl+'/avatar/registration', user).then(function(response){

                alert("Please confirm your email by opening the link we've sent you!");
           
        } )

        .catch(function(error){
            if (error.response) {            
                alert(error.response.data.details);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });

}
