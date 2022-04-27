 function user_login(form, response) {


    let user = {
        username: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPass").value 
    }
 

    axios.post(backendUrl+'/login', user).then(function(response) {
        console.log(response.data.role); 
        window.localStorage.setItem('role', response.data.role)
        window.localStorage.setItem('jwt', response.data.jwt)
        //window.location.href ='home.html'
        window.location.replace('/home.html')
    })

    .catch(function(error){
        if (error.response) {
            alert(error.response.data.message);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    });

        
    

}

function user_logout(form, response){

    axios.get(backendUrl+'/logout').then(function(response){
        console.log(response.data)
        window.location.replace('/mainpage.html')
        localStorage.clear();
    })
    .catch(function(error){
        if (error.response) {
            alert(error.response.data.details);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    });
}
