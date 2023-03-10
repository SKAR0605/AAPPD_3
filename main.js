var accuracy;
var results1;
var results2;
var results3;
localStorage.setItem("Results" , "");
function clear(){
  localStorage.setItem("Results" , "");
  localStorage.setItem("Accuracy", "");
}
Webcam.set({
    width : 350,
    height : 350,
    image_format : 'png',
    png_quality : 90
}
);
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
    console.log("ml5 version:'" , ml5.version);
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/4DX2OoOMN/model.json',modelLoaded);
    function modelLoaded(){
        console.log('Model Loaded!');
    }
}
function check(){
    console.log("doing check");
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}
function gotResult(error,results){
    console.log("getting result");
    if(error){
        console.error(error);
    } else{
        console.log(results);
        console.log(results[0].label);
        var results1 = results[0].label;
        console.log(results[0].confidence);
        if(results1 == "Light"){
            localStorage.setItem("Results" , "Light");
        }
        else{0
            localStorage.setItem("Results" , "No Light");
        }
        var accuracy = results[0].confidence.toFixed(2)*100;
        localStorage.setItem("Confidence" , accuracy);
        var results2 = localStorage.getItem("Results");
        document.getElementById("resulttext").innerHTML = "Results : " + results2;
        console.log(results2);
        sendData();
    }}
    function sendData(){
        var time = Date();
        console.log(time);
        results23 = localStorage.getItem("Results");
        var result = "Neuron Inactive";
        if(results23 == "Light"){
            result = "Neuron Active";
        }
        firebase.database().ref("Status Report" + time).push({
            Status : result,
       })
    }