import React, { useState } from 'react';
import '../css/Modal.css';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

export default function AddModal(props) {
    const [listingForm, setListingForm] = useState({
        listingId: uuidv4(),
        companyName: "",
        positionTitle: "",
        dateApplied: "",
        jobStatus: "Pending",
        viewLink: "",
        userId: props.user.uid
    });

    const addJob = () => {
        if (listingForm) {
            axios.post("http://localhost:5001/listing", {
                listing_id: listingForm.listingId,
                company_name: listingForm.companyName,
                position_title: listingForm.positionTitle,
                date_applied: listingForm.dateApplied,
                job_status: listingForm.jobStatus,
                job_link: listingForm.viewLink,
                user_id: listingForm.userId
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });

            const newListing = {
                listing_id: listingForm.listingId,
                company_name: listingForm.companyName,
                position_title: listingForm.positionTitle,
                date_applied: listingForm.dateApplied,
                job_status: listingForm.jobStatus,
                job_link: listingForm.viewLink,
                user_id: listingForm.userId
            }
        
            props.setListings([...props.listings, newListing]);
            props.setTriggerAddModal(false);
        }
    }

    return (
        <div className='overlay'>
            <div className='modal-card'>
                <h1>Add Job</h1>
                <div className='add-job-form'>
                    <input placeholder='Company Name' onChange={(e) => setListingForm({...listingForm, companyName: e.target.value})} required></input>
                    <input placeholder='Position Title' onChange={(e) => setListingForm({...listingForm, positionTitle: e.target.value})} required></input>
                    <input type='date' onChange={(e) => setListingForm({...listingForm, dateApplied: e.target.value})} required></input>
                   <select className='add-job-select' onChange={(e) => setListingForm({...listingForm, jobStatus: e.target.value})} defaultValue='Pending'>
                        <option value='Pending'>Pending</option>
                        <option value='Hired'>Hired</option>
                        <option value='Rejected'>Rejected</option>
                   </select>
                    <input placeholder='Link to Application' onChange={(e) => setListingForm({...listingForm, viewLink: e.target.value})} required></input>
                    <div className='add-job-form-btns'>
                        <button className='back-btn' onClick={() => props.setTriggerAddModal(false)}>Back</button>
                        <button 
                        className={(listingForm.companyName) && 
                        listingForm.positionTitle && 
                        listingForm.dateApplied && 
                        listingForm.jobStatus &&
                        listingForm.viewLink ?
                        'continue-btn' 
                        : 'disabled-btn'} 
                        onClick={addJob}
                        disabled={!listingForm.companyName || !listingForm.positionTitle || !listingForm.dateApplied || !listingForm.jobStatus || !listingForm.viewLink || !listingForm.userId}
                        >Add</button>
                    </div>
                </div> 
            </div>
    </div>
    )
    }
