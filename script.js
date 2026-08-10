const quiz=[

{
question:"Which language runs in the browser?",
answers:["Python","Java","JavaScript","C++"],
correct:2
},

{
question:"What does HTML stand for?",
answers:[
"Hyper Text Markup Language",
"Home Tool Markup Language",
"HighText Machine Language",
"Hyperlinks Text Markup"
],
correct:0
},

{
question:"Which CSS property changes text color?",
answers:[
"font-color",
"color",
"text-color",
"background"
],
correct:1
},

{
question:"Which company developed JavaScript?",
answers:[
"Google",
"Microsoft",
"Netscape",
"Apple"
],
correct:2
},

{
question:"Which keyword declares a constant?",
answers:[
"var",
"let",
"const",
"static"
],
correct:2
}

];

let current=0;

let score=0;

let selected=[];

let time=15;

let interval;

const question=document.getElementById("question");
const answers=document.getElementById("answers");

function loadQuestion(){

clearInterval(interval);

time=15;

document.getElementById("timer").innerHTML=time;

interval=setInterval(timer,1000);

document.getElementById("questionNumber").innerHTML=
`Question ${current+1}/${quiz.length}`;

document.getElementById("progressBar").style.width=
((current)/quiz.length)*100+"%";

question.innerHTML=quiz[current].question;

answers.innerHTML="";

quiz[current].answers.forEach((ans,index)=>{

const btn=document.createElement("button");

btn.innerHTML=ans;

btn.onclick=()=>select(index,btn);

answers.appendChild(btn);

});

}

function select(index,btn){

if(selected[current]!=null) return;

selected[current]=index;

if(index==quiz[current].correct){

btn.classList.add("correct");

score++;

}else{

btn.classList.add("wrong");

answers.children[quiz[current].correct]
.classList.add("correct");

}

}

document.getElementById("next").onclick=()=>{

if(current<quiz.length-1){

current++;

loadQuestion();

}else{

finishQuiz();

}

}

document.getElementById("prev").onclick=()=>{

if(current>0){

current--;

loadQuestion();

}

}

function timer(){

time--;

document.getElementById("timer").innerHTML=time;

if(time==0){

current<quiz.length-1?

(current++,loadQuestion())

:

finishQuiz();

}

}

function finishQuiz(){

clearInterval(interval);

document.querySelector(".quiz-box").classList.add("hidden");

document.getElementById("result").classList.remove("hidden");

let percent=Math.round(score/quiz.length*100);

document.getElementById("score").innerHTML=

`${score}/${quiz.length} (${percent}%)`;

let msg="";

if(percent>=90) msg="🏆 Excellent!";

else if(percent>=70) msg="🎉 Great Job!";

else if(percent>=50) msg="🙂 Good Attempt!";

else msg="📚 Keep Practicing!";

document.getElementById("message").innerHTML=msg;

}

function restartQuiz(){

location.reload();

}

loadQuestion();