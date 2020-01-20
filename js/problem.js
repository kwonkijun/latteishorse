const ltSection = document.querySelector('#lt-section');
const ltStartButton = document.querySelector('#lt-startButton');

const MAX_STAGE = 2;

let stage = 0;
let point = 0;
let problem = [
    {
        header : "사건이 일어난 해는? ",
        content : ['2010', '2011', '2012', '2013'],
        answer : '2010'
    },
    {
        header : "사건이 일어난 장소는? ",
        content : ['수원','서울', '대구', '몰라'],
        answer : '수원'
    },
    {
        header : "사건이 일어난 날 10시에 어디로 갔는가? ",
        content : ['헌팅포차', '나이트', '게스트하우스', '바다'],
        answer : '게스트하우스'
    }
]

function goNextStage(){
    ltSection.innerHTML = "";
    stage ++;
    createStage();
}

function createMessage(text){
    if(stage === MAX_STAGE){
        text = text.split('다음 문제로 이동합니다')[0] + `맞은개수 ${point}개`;
        const div = document.createElement('div');
        const message = document.createElement('h1');
        div.id="lt-message";
        message.innerText = text;
        div.appendChild(message);
        ltSection.appendChild(div);    
    }else{
        const div = document.createElement('div');
        const message = document.createElement('h1');
        div.id="lt-message";
        message.innerText = text;
        div.appendChild(message);
        ltSection.appendChild(div);
        setTimeout(goNextStage, 2000);
    }
}

function checkAnswer(value){
    let text ="";
    if(problem[stage].answer === value){
        text = "맞았습니다! 다음 문제로 이동합니다";
        point ++;
        createMessage(text);
    }else{ 
        text = "틀렸습니다! 다음 문제로 이동합니다";
        createMessage(text);
    }
}

function disableClickEvent(ltButtons){
    for(let i = 0 ; i < ltButtons.length ; i++){
        ltButtons[i].disabled = true;
    }
}

function createClickEvent(ltButtons){
    for(let i = 0 ; i < ltButtons.length ; i++){
        ltButtons[i].addEventListener('click', (e)=>{
            disableClickEvent(ltButtons);
            checkAnswer(e.target.innerText);
        })
    }  
}

function createAnswers(){
    const div = document.createElement('div');
    const button1 = document.createElement('button');
    const button2 = document.createElement('button');
    const button3 = document.createElement('button');
    const button4 = document.createElement('button');
    div.id="lt-answers";
    button1.innerText = problem[stage].content[0];
    button2.innerText = problem[stage].content[1];
    button3.innerText = problem[stage].content[2];
    button4.innerText = problem[stage].content[3];
    div.appendChild(button1);
    div.appendChild(button2);
    div.appendChild(button3);
    div.appendChild(button4);
    ltSection.appendChild(div);
    const ltProblem = document.querySelector('#lt-answers');
    const ltButtons = ltProblem.querySelectorAll('button');
    createClickEvent(ltButtons);
}

function createProblem(){
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    div.id = "lt-headline";
    h2.innerText = `문제 ${stage+1}) ${problem[stage].header}`;
    img.src = `images/${stage}.jpg`;
    div.appendChild(h2);
    div.appendChild(img);
    ltSection.appendChild(div);
}

function createStage(){
    createProblem();
    createAnswers();
}

function createStartButtonEvent(){
    ltStartButton.addEventListener('click', ()=>{
        ltStartButton.classList.add('display-none');
        ltSection.classList.remove('display-none');
        setTimeout(createStage, 1000);
    })
}

function init(){
    createStartButtonEvent();
}

init();
