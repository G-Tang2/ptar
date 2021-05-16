const insertIntoRandomIndex = (val:string, arr:string[]) => {
    // insert correct answer
    const randomIndex = Math.floor(Math.random() * (arr.length+1))
    arr.splice(randomIndex, 0, val)
}

const randomAge = (answer:string) => {
    console.log(answer)
    let arr:string[] = [];
    const variance = 3
    const min = Math.ceil(parseInt(answer) - variance)
    const max = Math.floor(parseInt(answer) + variance)

    while(arr.length < 2){
        let r = (Math.floor(Math.random() * (max-min)) + min).toString();
        if(r !== answer && arr.indexOf(r) === -1) arr.push(r);
    }

    insertIntoRandomIndex(answer, arr);
    
    return arr
}

const MultipleChoice = (questionNo:number, answer:string) => {
    switch(questionNo) {
        // age question
        case(1):
            const choices = randomAge(answer)
            return choices
        default:
            return []
    }
}


export default MultipleChoice