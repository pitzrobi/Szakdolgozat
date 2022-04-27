function downloadimg(){
    console.log("ASDASD")
     const canvas = document.getElementById("canvas");
     const image = canvas.toDataURL();
     const link=  document.getElementById("downloadbtn");
     link.href = image
     link.download = "image.png";
     link.click();
 
    

    // document.getElementById("downloadbtn").addEventListener("click",download);
}
downloadimg()