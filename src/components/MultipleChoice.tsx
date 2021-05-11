const randomAge = (answer:string) => {
    const arr:string[] = [];
    const variance = 10
    const min = parseInt(answer) - variance
    const max = parseInt(answer) + variance

    while(arr.length < 2){
        let r = (Math.floor(Math.random() * max) + min).toString();
        if(r !== answer && arr.indexOf(r) === -1) arr.push(r);
    }

    let randomIndex = Math.floor(Math.random() * 2)
    arr.splice(randomIndex, 0, answer)
    
    return arr
}

const MultipleChoice = (questionNo:number, answer:string) => {
    switch(questionNo) {
        case(1):
            const choices = randomAge(answer)
            return choices
        default:
            return []
    }
}


export default MultipleChoice