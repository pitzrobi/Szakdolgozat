function getModels(){

    const token = getAuthToken();

    axios.get(backendUrl+'/avatar/user/profile/saved', {headers:{"Authorization" : `Bearer ${token}`}}).then(function(response) {
      
        var canvasCount=0;
        var title = document.getElementById('welcome');
        var text = document.getElementById('create');
        var button = document.getElementById('getStarted');
        
        if (response.data==0){
           
           title.innerText = "Welcome"
           text.innerText = "Create your first avatar!"
           button.style.visibility='visible';
            console.log("lefut");
            
        }
        else{
            button.style.visibility='hidden';
            
            for(var i=0; i<response.data.length;i++){
                
                headCount=response.data[i].head;
                bodyCount=response.data[i].body;
                legCount=response.data[i].leg;
                var headpath=`head${headCount}.png`
                var bodypath=`body${bodyCount}.png`
                var legpath=`leg${legCount}.png`
                
            var doc = document.getElementById('row');
           
            var html = `<div class="column">
                
                    <div class="card" style="width:200px">
                        <canvas id="canvas${canvasCount}">
                        
                        </canvas>
                        <div class="card-body">
                        <a id="downl${canvasCount}" href="" onclick="downloadCanvas(${canvasCount})" class="btn btn-primary">Download</a>
                        </div>
                    </div>
                </div>`
            doc.innerHTML+=html;
            
            draw(canvasCount,headpath,bodypath,legpath);
  
             console.log(canvasCount);
             canvasCount++;
            
            }

        }
       
    })

    .catch(function(error){
        if (error.response) {
            alert(error.response.data.message);
            console.log(error.response.status);
            console.log(error.response.headers);
        }

        
    });
    function draw(hanyadik,fej,test,lab){
        
        var c = document.getElementById(`canvas${hanyadik}`);
        
        var ctx = c.getContext("2d");
        var base =  new Image();
        base.src = 'resources/img/base.png';
        var head = new Image();
        head.src='resources/img/'+fej;
        var body = new Image();
        body.src='resources/img/'+test;
        var leg = new Image();
        leg.src = 'resources/img/'+lab;
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
}

    

}

function downloadCanvas(number){
 console.log("jou")
 const canvas = document.getElementById(`canvas${number}`);
 console.log(canvas.id)
 const image = canvas.toDataURL();
 const link=  document.getElementById(`downl${number}`);
 link.href = image
 link.download = "image.png";
 link.click();
 document.getElementById(`downl${number}`).addEventListener("click",downloadCanvas);

}