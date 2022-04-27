const instance = axios.create();
instance.defaults.headers.common["Authorization"] = getAuthToken();
instance
    .get("src/permission.js")
    .then(function (res) {
        console.log(response.data.jwt,
            res.data.headers
        );
    })
    .catch(function(error){
        if (error.response) {
            alert(error.response.data.details);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    });
function getAuthToken() {
    const token = localStorage.getItem("jwt");
    return token;
}


// --------------------------------------------------------------------

var headCount=2;
var bodyCount=2;
var legCount=2;
let headpath=`head${headCount}.png`
var bodypath=`body${bodyCount}.png`
var legpath=`leg${legCount}.png`


function changeClothes(data){

    if(data==1) {

        if(headCount==3){
            headCount = 1;
            
        }
        else{
            headCount++;
        }
    }
    if(data==2) {

        if(bodyCount==3){
            bodyCount = 1;
            
        }
        else{
            bodyCount++;
        }
    }
    if(data==3) {

        if(legCount==3){
            legCount = 1;
            
        }
        else{
            legCount++;
        }
    }

    changeDraw(headCount,bodyCount,legCount);
    
}


function drawHead(data){
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var head = new Image();
    head.src=`resources/img/head${data}.png`

    head.onload=function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(head,0,0);
    }

}
function changeDraw(h,b,l){
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    
    var head = new Image();
    head.src=`resources/img/head${h}.png`;
    var body = new Image();
    body.src=`resources/img/body${b}.png`;
    var leg = new Image();
    leg.src = `resources/img/leg${l}.png`;


  var images = [head,body,leg];
  var imageCount = images.length;
  var imagesLoaded = 0;

for(var i=0; i<imageCount; i++){
    images[i].onload = function(){
        imagesLoaded++;
        if(imagesLoaded == imageCount){
            allLoaded();
        }
    }
}

function allLoaded(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(head,0,0);
    ctx.drawImage(body,0,0);
    ctx.drawImage(leg,0,0);
}

}




function draw(){
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var base =  new Image();
    base.src = 'resources/img/base.png';
    var head = new Image();
    head.src='resources/img/'+headpath;
    var body = new Image();
    body.src='resources/img/'+bodypath;
    var leg = new Image();
    leg.src = 'resources/img/'+legpath;
    base.onload = function(){
        ctx.canvas.width =  base.width;
        ctx.canvas.height = base.height;
        
    }
   
  var images = [head,body,leg];
  var imageCount = images.length;
  var imagesLoaded = 0;

for(var i=0; i<imageCount; i++){
    images[i].onload = function(){
        imagesLoaded++;
        if(imagesLoaded == imageCount){
            allLoaded();
        }
    }
}

function allLoaded(){
    ctx.drawImage(head,0,0);
    ctx.drawImage(body,0,0);
    ctx.drawImage(leg,0,0);
}
console.log("drawwwww")
}

window.onload = function() {
   draw();
};


function saveModel(){

    let model = {
        bodyId: headCount,
        headId: bodyCount,
        legId: legCount
    }
    const token = getAuthToken();

    axios.post(backendUrl+'/builder/save', model, {headers:{"Authorization" : `Bearer ${token}`}}).then(function(response) {
        console.log(response.data); 
       
    })

    .catch(function(error){
        if (error.response) {
            alert(error.response.data.message);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    });

}