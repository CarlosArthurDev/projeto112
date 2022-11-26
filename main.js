Webcam.set({
    width:250,
    heigth:300,
     imageFormat:"jpeg",
     quality:90

})

camera=document.getElementById("camera")
Webcam.attach("#camera")

function capturaimg(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="imgcapturada"src="'+data_uri+'"/>'
    })
}
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/-y_lnk2Gj/model.json",modelLoaded)
function modelLoaded(){
    console.log("modelo carregado")
}
function speak(){
    var synt=window.speechSynthesis;
    speak1="a primeira previsao e"+prediction1;
    speak2="a segunda previsao e"+prediction2;
    utterthis=new SpeechSynthesisUtterance(speak1+speak2)
    synt.speak(utterthis)
}
console.log("ml5",ml5.version)

function checkar(){
    img=document.getElementById("imgcapturada");
    classifier.classify(img,gotresult)


}

function gotresult(error,results){
 if(error){
 console.error(error)
 }
 else{
    console.log(results)
    document.getElementById("resultado1").innerHTML=results[0].label
    document.getElementById("resultado2").innerHTML=results[1].label
    prediction1=results[0].label
    prediction2=results[1].label
    speak()
    if(results[0].label=="de boa"){
     document.getElementById("emoji1").innerHTML="&#&#129311"   
    }
    if(results[0].label=="vitoria"){
        document.getElementById("emoji1").innerHTML="&#9996" 
    }  
    if(results[0].label=="like"){
        document.getElementById("emoji1").innerHTML="&#128077" 
    }  
    if(results[1].label=="de boa"){
        document.getElementById("emoji2").innerHTML="&#&#129311"   
       }
       if(results[1].label=="vitoria"){
           document.getElementById("emoji2").innerHTML="&#9996" 
       }  
       if(results[1].label=="like"){
           document.getElementById("emoji2").innerHTML="&#128077" 
       }  
 }
}