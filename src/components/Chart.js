import React, { useEffect, useState, memo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Colors } from 'chart.js';
import axios from 'axios';

export default function Chart(props) {   
    ChartJS.register(ArcElement, Tooltip, Legend);
    ChartJS.register(Colors);

    const [jobStatusNums, setJobStatusNums] = useState({
        numberOfPending: 0,
        numberOfHired: 0,
        numberOfRejected: 0
    }); 

    useEffect(() => {
       axios.post("http://localhost:5001/getJobStatusNum", {
            listings: props.listings
       }).then((res) => {
            setJobStatusNums(res.data);
            props.setNumberOfPending(res.data.numberOfPending);
       }).catch((err) => console.log(err));

       let jobStatusNumsVar = {
            numberOfPending: 0,
            numberOfHired: 0,
            numberOfRejected: 0
        };

        for (let i = 0; i < props.listings.length; i++) {
            if (props.listings[i].job_status === "Pending") jobStatusNumsVar = {...jobStatusNumsVar, numberOfPending: jobStatusNumsVar.numberOfPending += 1};
            else if (props.listings[i].job_status === "Hired")  jobStatusNumsVar = {...jobStatusNumsVar, numberOfHired: jobStatusNumsVar.numberOfHired += 1};
            else jobStatusNumsVar = {...jobStatusNumsVar, numberOfRejected: jobStatusNumsVar.numberOfRejected += 1};
        }

        setJobStatusNums(jobStatusNumsVar);
        props.setNumberOfPending(jobStatusNumsVar.numberOfPending);

     }, [props.listings]);

    return (
        <Doughnut
            data={{
                labels: ['Pending', 'Hired', 'Rejected'],
                datasets: [{
                    label: 'Job Status Amount',
                    data: [jobStatusNums.numberOfPending, jobStatusNums.numberOfHired, jobStatusNums.numberOfRejected],
                    borderColor: "#80dc98",
                    hoverOffset: 30,
                    backgroundColor: [
                        'rgba(251, 251, 127, 0.7)',
                        '#80dc98',
                        'rgba(255, 108, 108, 0.7)',
                    ]
                }]
            }}
        />
    )
}