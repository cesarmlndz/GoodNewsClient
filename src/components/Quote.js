import React, { useEffect, useState } from 'react';
import quoteImg from '../assets/quoteImg.png';
import axios from 'axios';

export default function Quote() {
    const [quote, setQuote] = useState("");

    useEffect(() => {
        axios.get("https://api.quotable.io/random")
        .then((res) => {
            setQuote(res.data);
        })
        .catch((err) => console.log(err))
    }, []);

    return (
        <div className='quote-card-container'>
            <img src={quoteImg}/>
            <h1>{quote?.content}</h1>
            <p>- {quote?.author}</p>
        </div>
    )
}