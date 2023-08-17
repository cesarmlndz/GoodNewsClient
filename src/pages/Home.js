import React, { useEffect, useState, useMemo } from 'react';
import '../css/Home.css'
import axios from 'axios';
import calendar from '../assets/calendar.png';
import Listing from '../components/Listing';
import AddModal from '../components/AddModal';
import addImg from '../assets/addImg.png';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Colors } from 'chart.js';
import EditModal from '../components/EditModal';
import { auth, provider } from "../config/firebaseConfig";
import { signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Chart from '../components/Chart';
import Quote from '../components/Quote';
import Calendar from '../components/Calendar';
import Percentage from '../components/Percentage';

export default function Home() {
    ChartJS.register(ArcElement, Tooltip, Legend);
    ChartJS.register(Colors);

    const [listings, setListings] = useState([]);
    const [numberOfPending, setNumberOfPending] = useState(0);

    const [triggerAddModal, setTriggerAddModal] = useState(false);
    const [triggerEditModal, setTriggerEditModal] = useState(false);

    const [listingId, setListingId] = useState();

    const [user] = useAuthState(auth);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (!user) console.log('signed out')
          else {
            console.log('signed in')
            axios.post("http://localhost:5001/getListing", {
                userId: user?.uid
            })
            .then((res) => {
                setListings(res.data);
            }).catch((err) => {
                console.log(err);
            });
          }
        });
       }, [auth.currentUser]);

    const getListingId = (id) => {
        setTriggerEditModal(true);
        setListingId(id);
    }

    const signInWithGoogle =  async () => {
        if (!user) {
            const result = await signInWithPopup(auth, provider);
            console.log(result);

            setTriggerAddModal(true)
        } else {
            setTriggerAddModal(true);
        }
    }

    const signUserOut = async () => {
        await signOut(auth)
    }

    return (
        <div className='home-page'>
            {triggerAddModal && <AddModal listings={listings} setListings={setListings} setTriggerAddModal={setTriggerAddModal} user={user}/>}
            {triggerEditModal && <EditModal listings={listings} setListings={setListings} setTriggerEditModal={setTriggerEditModal} listingId={listingId} user={user}/>}
            <div className='home-page-intro-container'>
                <h1 className='home-page-sub-title'>Take over the job market.</h1>
                <h1 className='home-page-title'>GoodNews!</h1>
                <p>Your ultimate job application tracker! Stay organized and focused on your job search journey with our user-friendly interface, where you can effortlessly monitor your applications, access insightful analytics, and visualize your progress with interactive charts.</p>
            </div>
            <div className='date-container'>
                <img src={calendar}/>
                <h1 className='date'>{new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</h1>
            </div>
            <div className='home-page-all-cards-container'>
                <div className='calendar-container'>
                   <Calendar listings={listings}/>
                </div>
                <div className='listings-card-container'>
                    <div className='plus-btn-container' onClick={signInWithGoogle}><img src={addImg}/></div>
                    <div className='listings-columns'>
                        <div className='listing-column company-row'><h1>Company</h1></div>
                        <div className='listing-column position-row'><h1>Position</h1></div>
                        <div className='listing-column date-row'><h1>Date Applied</h1></div>
                        <div className='listing-column status-row'><h1>Status</h1></div>
                        <div className='listing-column view-row'><h1>View</h1></div>
                        <div className='options-row'></div> 
                    </div>
                    <div className='listings-rows'>
                        {listings.length > 0 ? listings.map((listing, index) => {
                            return (
                                <Listing listing={listing} getListingId={getListingId} setTriggerEditModal={setTriggerEditModal} key={index}/>
                            )
                        }) : <div><h1 style={{fontSize: "1.1rem", color: "white", marginTop: "3rem"}}>No Jobs Added Yet</h1></div>}
                    </div>
                </div>
               <Percentage listings={listings} numberOfPending={numberOfPending}/>
                <div className='chart-card-container'>
                    <h1>Job Status Distribution</h1>
                {listings.length > 0 ? <Chart listings={listings} setNumberOfPending={setNumberOfPending}/> :
                <Doughnut 
                    data={{
                        labels: ['Pending', 'Hired', 'Rejected'],
                        datasets: [{
                            label: 'Job Status Amount',
                            data: [1, 1, 1],
                            borderColor: "#80dc98",
                            hoverOffset: 30,
                        }]
                    }}
                />}
                </div>
                <Quote />
            </div>
        </div>
    )
}