const resultDom = document.getElementById('result');
const formulaDom = document.getElementById('formula');
const hisContentDom  = document.getElementById('history-content');

let numberTemp = '';
let formula = [];

let historys = [];

const updateFormulaDisplay = () => {
    const result = formula.reduce((acc, val) => {
        return acc + val;
    }, '');

    formulaDom.innerText = result + numberTemp;
}

const onClearButtonClick = () => {
    numberTemp = '';
    formula = [];

    resultDom.innerText = '';
    updateFormulaDisplay();
}

const onDeleteButtonClick = () => {
    if(numberTemp != ''){
        numberTemp = numberTemp.slice(0, -1);
    }else{
        formula.pop();
    }

    updateFormulaDisplay();
}

const onNumberButtonClick = (value) => {
    numberTemp += value;

    updateFormulaDisplay();
}

const onOparatorButtonClick = (oparator) => {
    if(numberTemp !== ''){
        formula.push(Number(numberTemp));
         numberTemp = '';
    }
    if(formula.length > 0){
        if(isLastAreOparator()){
            formula[formula.length - 1] = oparator
        }else{
            formula.push(oparator);
        }
    }

    updateFormulaDisplay();

}

let isFromHistory = false;

const onSummitClick = () => {
    if(formula.length <= 0){
        return;
    }

    console.log(isFromHistory);
    if(!isFromHistory){
        if(numberTemp !== ''){
            formula.push(Number(numberTemp));
        }else{  
            formula.pop();
        }
        saveHistory(formula);
    }

    let formulaDisplay = [...formula];
    let result = 0;

    for(let i = 0; i < formula.length; i++){
        let temp = 0;

        if(formula[i] === '*' | formula[i] === '/' ) {
            if(formula[i] === '/' && formula[i + 1] === 0){
                onClearButtonClick();
                formulaDom.innerText = formulaDisplay;
                resultDom.innerText = 'Nan';
                return;
            }

            temp = (formula[i] === '*')?
                formula[i - 1] * formula[i + 1] :
                formula[i - 1] / formula[i + 1];

            formula.splice(i - 1, 3);
            
            formulaTemp = [
                ...formula.slice(0, i-1), 
                temp, 
                ...formula.slice(i-1)
            ];
            formula = formulaTemp;
            i -= 1;
        }
    }

    for(let i = 0; i < formula.length; i++){
        let temp = 0;

        if(formula[i] === '+' | formula[i] === '-' ) {
            temp = (formula[i] === '+')?
                formula[i - 1] + formula[i + 1] :
                formula[i - 1] - formula[i + 1];

            formula.splice(i - 1, 3);
            formulaTemp = [
                ...formula.slice(0, i-1), 
                temp, 
                ...formula.slice(i-1)
            ];
            formula = formulaTemp;
            i -= 1;
        }
    }

    result = formula[0];

    onClearButtonClick();

    formulaDom.innerText = formulaDisplay.reduce((acc, val) => {
        return acc + val
    }, '');
    resultDom.innerText = result;

    isFromHistory = false;
}

const saveHistory = (formulaP) => {

    historys.push([...formulaP]);
    hisContentDom.innerHTML = '';
    
    historys.forEach((item, index) => {
        const button = document.createElement('button');
        button.innerText = item.reduce((acc, val) => {
            return acc + val;
        }, '');

        button.className = 'history-button';
        button.value = (index).toString();

        button.addEventListener('click', (event) => {
            onClearButtonClick();
            isFromHistory = true;
            console.log(historys[event.target.value]);
            formula = [...historys[event.target.value]];
            onSummitClick();
            // updateFormulaDisplay();
        }, false);

        hisContentDom.appendChild(button);
    });
}

const isLastAreOparator = () => {
    if(formula.length <= 0){
        return false;
    }

    return (
        formula[formula.length - 1] === '+' | 
        formula[formula.length - 1] === '-' |
        formula[formula.length - 1] === '*' |
        formula[formula.length - 1] === '/' 
    );
}