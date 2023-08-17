import React, { useEffect , useState} from 'react';
import axios from 'axios';

export default function Percentage(props) {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        axios.post("http://localhost:5001/getJobStatusNum", {
            listings: props.listings
       }).then((res) => {
            setPercentage(Math.trunc((res.data.numberOfPending / props.listings.length) * 100));
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

        setPercentage(Math.trunc((jobStatusNumsVar.numberOfPending / props.listings.length) * 100));
    }, [props.listings]);

    return (
        <div className='percentage-card-container'>
            {props.listings.length > 0 ? <h1>{`${percentage}`}%</h1> : <h1>0%</h1>}
            <p>of your job applications have a job status value of pending.</p>
        </div>
    )
}