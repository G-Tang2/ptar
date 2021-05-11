import React, {useState} from "react";
import { useEffect } from "react";
import { Line } from 'react-chartjs-2';

function WptasProgressChart(props) {
    const [wptasScores, setWptasScores] = useState<number[]>([]);
    const [wptasDates, setWptasDates] = useState<string[]>([]);
    const [absScores, setAbsScores] = useState<number[]>([]);
    const [absDates, setAbsDates] = useState<string[]>([]);

    const getWptasTestScores = async () => {
        const pastWptasTestScores:number[] = []
        const pastWptasTestDates:string[] = []
        await fetch(`http://localhost:5000/wptas/test/score/${props.patientId}`)
        .then(async res => await res.json())
        .then(res => {
            // load answers and store them in an array
            for (let i = 0; i < res.length; i++) {
                pastWptasTestScores.push(res[i].test_score)
                pastWptasTestDates.push(res[i].test_date_time)
            }
            setWptasScores(pastWptasTestScores)
            setWptasDates(pastWptasTestDates)
        })
    }

    const getAbsTestScores = async () => {
        const pastWptasTestScores:number[] = []
        const pastWptasTestDates:string[] = []
        await fetch(`http://localhost:5000/abs/test/score/${props.patientId}`)
        .then(async res => await res.json())
        .then(res => {
            // load answers and store them in an array
            for (let i = 0; i < res.length; i++) {
                pastWptasTestScores.push(res[i].test_score)
                pastWptasTestDates.push(res[i].test_date_time)
            }
            setAbsScores(pastWptasTestScores)
            setAbsDates(pastWptasTestDates)
        })
    }

    useEffect(() => {
        getWptasTestScores();
        getAbsTestScores();
    },[])

    const data = {
        // assumes wptas and abs tests are done on the same day
        labels: wptasDates.length > absDates.length ? wptasDates : absDates,
        datasets: [
          {
            type: 'line',
            label: 'WPTAS',
            backgroundColor: 'rgb(0,128,256',
            borderColor: 'rgb(0,128,256',
            borderWidth: 2,
            fill: false,
            data: wptasScores,
          },
          {
            type: 'line',
            label: 'ABS',
            backgroundColor: 'rgb(255,51,51)',
            borderColor: 'rgb(255,51,51)',
            borderWidth: 2,
            data: absScores,
          }
        ],
      };

    return (
        <div>
            <Line type={'line'} data={data}/>
        </div>
    )

}

export default WptasProgressChart;
