timerCounter= 0;
timerCheck= "";
drawSketch= "";
answerHolder= "";
score= 0;
function setup() {
    canvas= createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth= window.speechSynthesis;
}
function preload() {
    classifier= ml5.imageClassifier("DoodleNet");
}
function clear() {
    background("white");
}
function draw() {
    strokeWeight(10);
    stroke("black");
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function checkSketch() {
    if(drawSketch == sketch) {
        answerHolder = "set";
        score++;
        document.getElementById("point").innerHTML= "Pontuação" + score;
    }
}
function classifyCanvas() {
    classifier.classify(canvas, gotResults);
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    var result= results[0].label;
    document.getElementById("label").innerHTML= "Nome: " + result.replace("_", " ");
    document.getElementById("confidence").innerHTML= "Precisão: " + Math.round(results[0].confidence * 100) + "%";
    utterThis= new SpeechSynthesisUtterance(result.replace("_", " "));
    synth.speak(utterThis);
}