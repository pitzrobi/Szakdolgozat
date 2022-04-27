function getUserDetails(form, response){
/*
let auth = {
    'Bearer': getAuthToken()
   
}
*/
const token = getAuthToken();
//console.log(token)
//console.log(auth)

    axios.get(backendUrl+'/avatar/user/profile/details', {headers:{"Authorization" : `Bearer ${token}`}})
    .then(function(response){
        console.log(response.data);

        document.getElementById("intputFirstName").value=response.data.firstName;
        document.getElementById("inputLastName").value=response.data.lastName;
        document.getElementById("exampleInputEmail").value=response.data.email;
        document.getElementById("mainName").textContent=response.data.firstName+" "+response.data.lastName
       

    })
    .catch(function(error){
        if (error.response) {
            alert(error.response.data.details);
            console.log(error.response.status);
            console.log(error.response.headers);
        
    }})


}
function editUserDetails(form, response){
    /*
    let auth = {
        'Bearer': getAuthToken()
       
    }
    */
    const token = getAuthToken();
    //console.log(token)
    //console.log(auth)
    let user = {
        firstName: document.getElementById("intputFirstName").value,
        lastName: document.getElementById("inputLastName").value 
    }
    
        axios.post(backendUrl+'/avatar/user/profile/edit',user, {headers:{"Authorization" : `Bearer ${token}`}})
        .then(function(response){
            console.log(response.data);
    
        })
        .catch(function(error){
            if (error.response) {
                alert(error.response.data.details);
                console.log(error.response.status);
                console.log(error.response.headers);
            
        }})
    
    
    }


