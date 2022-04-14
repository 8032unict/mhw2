const button = document.querySelector('.result button');
const UNCHECKED = 'images/unchecked.png'
const CHECKED = 'images/checked.png'
const boxes = document.querySelectorAll('.box');
const CheckedBoxes = {};

function crossAnswer(event){
    /*tolgo selezione da altri box dello stesso questionId*/
    for(let box of boxes){
        if(event.currentTarget.dataset.questionId === box.dataset.questionId &&
            event.currentTarget.dataset.choiceId !== box.dataset.choiceId){
                box.classList.add('unselected');
                const img = box.querySelector('.checkbox');
                img.src = UNCHECKED;
                if(box.classList.contains('selected')){
                    box.classList.remove('selected');
                    box.classList.add('unselected');
                    const img = box.querySelector('.checkbox');
                    img.src = UNCHECKED;
                }
            }
        else{
            /*seleziona la box cliccata, è una ridondanza metterlo nell'else*/
            event.currentTarget.classList.remove('unselected');
            event.currentTarget.classList.add('selected');
            const img = event.currentTarget.querySelector('.checkbox');
            img.src = CHECKED;
            CheckedBoxes[event.currentTarget.dataset.questionId] = event.currentTarget.dataset.choiceId;
        }
    }


    /*check se le risposte sono state date tutte e tre*/
    if(Object.values(CheckedBoxes).length === 3){
        for(let box of boxes){
            box.removeEventListener('click',crossAnswer);
        }
        getResult();
    }


    

}

function getResult(){
    console.log(CheckedBoxes.one);
    if(CheckedBoxes.one==CheckedBoxes.two || CheckedBoxes.one==CheckedBoxes.three){
        showResult(CheckedBoxes.one);
    }
    else if(CheckedBoxes.two == CheckedBoxes.three){
        showResult(CheckedBoxes.two);
    }
    else{
        showResult(CheckedBoxes.one);
    }
}

function showResult(answer){
    let i = answer;
    let results = document.querySelector('.result');
    let title = results.querySelector('#title');
    let content = results.querySelector('#contents');
    title.textContent = RESULTS_MAP[i].title;
    content.textContent = RESULTS_MAP[i].contents;
    results.classList.remove('hidden');
}

function restartQuiz(event){
    let results = document.querySelector('.result');
    let title = results.querySelector('#title');
    let content = results.querySelector('#contents');
    results.classList.add('hidden');
    title.textContent = '';
    content.textContent='';
    delete CheckedBoxes.one;
    delete CheckedBoxes.two;
    delete CheckedBoxes.three;
    for (let box of boxes){
        box.addEventListener('click',crossAnswer);
        let img = box.querySelector('.checkbox');
        img.src = UNCHECKED;
        if(box.classList.contains('selected') || box.classList.contains('unselected')){
            box.classList.remove('selected');
            box.classList.remove('unselected');
        }
        
        console.log('added');
    }
}
button.addEventListener('click',restartQuiz);

for (const box of boxes){
    box.addEventListener('click',crossAnswer);
    console.log('added');
}

