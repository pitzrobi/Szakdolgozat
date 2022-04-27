function newPassEmail(form, response){
  
    //const conf = {headers: {'Content-Type': 'application/json'}};
    // const email = JSON.stringify(document.getElementById("loginEmail").value)
    let email = {
        email: document.getElementById("loginEmail").value
    }
    console.log(email)
        axios.post(backendUrl+'/avatar/user/resetPassword',email)
        .then(function(response){
            console.log(response.data);
            console.log(email)
            window.location.replace('newpassword.html')
    
        })
        .catch(function(error){
            if (error.response) {
                alert(error.response.data.details);
                console.log(error.response.status);
                console.log(error.response.headers);
            
        }})
    
}