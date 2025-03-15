import React from "react";
import Footer2 from "../components/Footer2";
import Header4 from "../components/Header4";
import TestBar from "../components/TestBar";
import { Routes, Route } from "react-router-dom";
import TestCreateStart from "../components/TestCreateStart";
import QuestionCreate from "../components/QuestionCreate";
import TestTaker from "../components/TestTaker";


function TestPage()
{
    return (
        <>
        <Header4/> 
        <Routes>
            <Route path="/" element={<TestBar/>} />
            <Route path="/test/create"  element={<TestCreateStart/>} />
            <Route path="/question/create" element={<QuestionCreate/>} />
            <Route path="/test/take" element={<TestTaker/>} />
        </Routes>
        <Footer2/>
        </>
    );

};

export default TestPage; 
// 