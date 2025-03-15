import Header from '../components/Header';
import axi from '../api/axiosInstance';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';

function Start()
{
    return (
    <>
    <div>
        <Header/>
        
        <Footer/>
    </div>
    </>);
}

export default Start;