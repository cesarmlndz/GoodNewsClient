import React from 'react';
import '../css/Listing.css';
import options from '../assets/options.png';

export default function Listing(props) {
  return (
    <div className='listing-container'>
        <div className='listing-row company-row'><h1>{props.listing.company_name}</h1></div>
        <div className='listing-row position-row'><h1>{props.listing.position_title}</h1></div>
        <div className='listing-row date-row'><h1>{props.listing.date_applied}</h1></div>
        <div className='listing-row status-row'><h1 
        style={props.listing.job_status === "Hired" ? {color: "#80dc98"}
        : props.listing.job_status === "Rejected" ? {color: "rgb(254, 62, 62)"} : {}}>{props.listing.job_status}</h1></div>
        <div className='listing-row view-row'><a href={props.listing.job_link} target='_blank' id='listing-view-btn'>View</a></div>
        <div className='listing-row options-row'><img className='trash-img' src={options} onClick={() => props.getListingId(props.listing.listing_id)}/></div>
    </div>
  )
}