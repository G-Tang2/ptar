const randomAge = (answer:string) => {
    console.log(answer)
    const arr:string[] = [];
    const variance = 3
    const min = Math.ceil(parseInt(answer) - variance)
    const max = Math.floor(parseInt(answer) + variance)

    while(arr.length < 2){
        let r = (Math.floor(Math.random() * (max-min)) + min).toString();
        if(r !== answer && arr.indexOf(r) === -1) arr.push(r);
    }

    // insert correct answer
    let randomIndex = Math.floor(Math.random() * 3)
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