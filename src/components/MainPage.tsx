import React, {useState} from "react";
import UpcomingTest from './UpcomingTest';
import Progress from "./Progress";
import PastTest from "./PastTest";

function MainPage() {
    const [results, setResults] = useState([]);
    // retrieve data from database


    return (<div className='main-page-container'>
        <UpcomingTest />
        <Progress results={[]} />
        <PastTest 
            wptasResults={[{date:"01/01/21", examiner:"J.S", score:10}, {date:"22/01/21", examiner:"S.J", score:9}]}
            absResults={[{date:"01/01/21", examiner:"J.J", score:1}, {date:"22/01/21", examiner:"S.J", score:4}]}
            />
    </div>)
}

export default MainPage;