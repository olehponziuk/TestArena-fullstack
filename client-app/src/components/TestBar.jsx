import { loginUser, saveUserData } from "../api/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfilePhoto, getUserName } from "../api/profile";
import TestsList from "./TestsList";


function TestBar()
{
    const navigate = useNavigate();
    return (
        <main className="flex-grow flex items-center justify-center">
        <div className="bg-white/70 shadow-lg rounded-lg p-8 m-[0.5rem] max-w-6xl w-full min-h-[40rem]">
        <div className="flex flex-row bg-white shadow-lg rounded-lg p-2 my-[0.1rem]  w-full">
          <div className="text-1xl font-semibold mx-[2rem] my-[1rem]">Створи свій власний тест та розповсюджуй його!</div>
          <div className="ml-auto">
            <button className="bg-black hover:bg-green-600 text-white px-4 py-4 rounded" onClick={async event => {return navigate("/tests/test/create")}}>
                Створити
            </button>
        </div>
        </div>
          <TestsList/>
        </div>
      </main>
    );
}

export default TestBar;