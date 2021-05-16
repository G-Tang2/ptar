import moment from "moment";

const insertIntoRandomIndex = (val:string, arr:string[]) => {
    // insert correct answer
    const randomIndex = Math.floor(Math.random() * (arr.length+1))
    arr.splice(randomIndex, 0, val)
}

const randomNumber:(min:number, max:number)=> number = (min, max) => {
    return Math.floor(Math.random() * (max-min+1)) + min;
}

const randomAge = (answer:string) => {
    // generates an array of size three with random unique integers
    let arr:string[] = [];
    const variance = 3;
    const min = Math.ceil(parseInt(answer) - variance);
    const max = Math.floor(parseInt(answer) + variance);

    while(arr.length < 2){
        let r = randomNumber(min, max).toString();
        if(r !== answer && arr.indexOf(r) === -1) {
            arr.push(r);
        }
    }

    insertIntoRandomIndex(answer, arr);
    
    return arr;
}

const randomDOB = (answer:string) => {
    let arr:string[] = [];

    const m = moment(answer, "DD/MM/YYYY");

    // 0 - change day, 1 - change month, 2 - change year
    while (arr.length < 2) {
        let copyM = moment(m);
        const dateChange = randomNumber(0,2);
        switch(dateChange) {
            case(0):
                copyM.set("date", randomNumber(1, 28));
                break;
            case(1):
                copyM.set("month", randomNumber(1,12));
                break;
            case(2):
                copyM.set("year", randomNumber(parseInt(m.format("YYYY")) - 5, parseInt(m.format("YYYY")) + 5))
                break;
        }
        if(!copyM.isSame(m) && arr.indexOf(copyM.format("DD/MM/YYYY")) === -1) {
            arr.push(copyM.format("DD/MM/YYYY"))
        }
    }
    insertIntoRandomIndex(answer, arr);

    return arr;
}

const randomMonth = (answer:string) => {
    let arr:string[] = [];

    while (arr.length < 2) {
        let month = moment().month(randomNumber(0,11)).format("MMMM");
        if (month !== answer && arr.indexOf(month) === -1) {
            arr.push(month);
        }
    }
    insertIntoRandomIndex(answer, arr);

    return arr;
}

const days = () => {
    return ["Morning", "Afternoon", "Night"]
}

const randomDayOfWeek = (answer:string) => {
    let arr:string[] = [];

    while (arr.length < 2) {
        let day = moment().day(randomNumber(1,7)).format("dddd");
        if (day !== answer && arr.indexOf(day) === -1) {
            arr.push(day);
        }
    }
    insertIntoRandomIndex(answer,arr);

    return arr;
}

const randomYear = (answer:string) => {
    let arr:string[] = [];
    const variance = 3

    while (arr.length < 2) {
        let year = randomNumber(parseInt(answer) - variance, parseInt(answer) + variance).toString();
        if (year !== answer && arr.indexOf(year) === -1) {
            arr.push(year);
        }
    }
    insertIntoRandomIndex(answer,arr);

    return arr;
}

const randomPlaces = (answer:string) => {
    const placesArr = ["Ringwood Private Hospital", "Melbourne Eastern Private Hospital", "The Victoria Clinic", "Royal Melbourne Hospital", "Monash Medical Centre"]
    let arr:string[] = [];
    
    while (arr.length < 2) {
        let place = placesArr[randomNumber(0, placesArr.length - 1)]
        if (place !== answer && arr.indexOf(place) === -1) {
            arr.push(place)
        }
    }
    insertIntoRandomIndex(answer,arr);
    
    return arr;
}

const randomName = (answer:string) => {
    const nameArr = ["Oliver", "Noah", "William", "Leo", "Lucas", "Amelia", "Olivia", "Charlotte", "Isla", "Mia"]
    let arr:string[] = [];

    while (arr.length < 2) {
        let place = nameArr[randomNumber(0, nameArr.length - 1)]
        if (place !== answer && arr.indexOf(place) === -1) {
            arr.push(place)
        }
    }
    insertIntoRandomIndex(answer,arr);
    
    return arr;
}

const MultipleChoice = (questionNo:number, answer:string) => {
    switch(questionNo) {
        // age question
        case(1):
            return randomAge(answer)
        // date of birth question
        case(2):
            return randomDOB(answer)
        // month question
        case(3):
            return randomMonth(answer)
        // time of day (morning, afternoon or night) question
        case(4):
            return days
        // // day of the week question
        case(5):
            return randomDayOfWeek(answer)
        // // year question
        case(6):
            return randomYear(answer)
        // // name of place question
        case(7):
            return randomPlaces(answer)

        // // face question
        // case(8):

        // // name question
        case(9):
            return randomName(answer)

        // // picture question
        // case(10):

        default:
            return []
    }
}


export default MultipleChoice