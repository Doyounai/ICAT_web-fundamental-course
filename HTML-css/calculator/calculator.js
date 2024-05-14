const resultDom = document.getElementById('result');
const formulaDom = document.getElementById('formula');

let numberTemp = '';
let formula = [];

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

const onSummitClick = () => {
    if(formula.length <= 0){
        return;
    }

    if(numberTemp !== ''){
        formula.push(Number(numberTemp));
    }else{
        formula.pop();
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