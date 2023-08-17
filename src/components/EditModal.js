import React, { useState } from 'react';
import '../css/Modal.css';
import axios from 'axios';

export default function EditModal(props) {
    const [listingForm, setListingForm] = useState({
        companyName: "",
        positionTitle: "",
        dateApplied: "",
        jobStatus: "Pending",
        viewLink: "",
        userId: props.user.uid
    });

    const editJob = () => {
        if (listingForm) {
            axios.put(`http://localhost:5001/listing/${props.listingId}`, {
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

            const listingToEdit = props.listings.find((listing) => listing.listing_id === props.listingId);

            const editedListing = {
                ...listingToEdit,
                company_name: listingForm.companyName,
                position_title: listingForm.positionTitle,
                date_applied: listingForm.dateApplied,
                job_status: listingForm.jobStatus,
                job_link: listingForm.viewLink,
            };

            const listings = props.listings.filter((listing) => listing.listing_id !== props.listingId);
            listings.push(editedListing);
            console.log(listings);

            props.setListings(listings);
            props.setTriggerEditModal(false);
        }
    }

    const deleteJob = () => {
        axios.delete(`http://localhost:5001/listing/${props.listingId}`)
            .then((res) => {
                console.log(res);
            }).catch((err) => {
            });

            props.setListings(props.listings.filter((listing) => listing.listing_id !== props.listingId));

            props.setTriggerEditModal(false);
    }

    return (
        <div className='overlay'>
            <div className='modal-card'>
                <h1>Edit Job</h1>
                <div className='add-job-form'>
                    <input placeholder='Company Name' onChange={(e) => setListingForm({...listingForm, companyName: e.target.value})} required></input>
                    <input placeholder='Position Title' onChange={(e) => setListingForm({...listingForm, positionTitle: e.target.value})} required></input>
                    <input type='date' onChange={(e) => setListingForm({...listingForm, dateApplied: e.target.value})} required></input>
                   <select className='add-job-select' onChange={(e) => setListingForm({...listingForm, jobStatus: e.target.value})} defaultValue="Pending">
                        <option value='Pending'>Pending</option>
                        <option value='Hired'>Hired</option>
                        <option value='Rejected'>Rejected</option>
                   </select>
                    <input placeholder='Link to Application' onChange={(e) => setListingForm({...listingForm, viewLink: e.target.value})} required></input>
                    <div className='add-job-form-btns'>
                        <button className='back-btn' onClick={() => props.setTriggerEditModal(false)}>Back</button>
                        <button 
                        className={(listingForm.companyName) && 
                        listingForm.positionTitle && 
                        listingForm.dateApplied && 
                        listingForm.jobStatus &&
                        listingForm.viewLink ?
                        'continue-btn' 
                        : 'disabled-btn'} 
                        onClick={editJob}
                        disabled={!listingForm.companyName || !listingForm.positionTitle || !listingForm.dateApplied || !listingForm.jobStatus || !listingForm.viewLink || !listingForm.userId}
                        >Edit</button>
                    </div>
                    <h1>OR</h1>
                    <h2 className='delete-btn' onClick={deleteJob}>DELETE</h2>
                </div> 
            </div>
    </div>
    )
    }
