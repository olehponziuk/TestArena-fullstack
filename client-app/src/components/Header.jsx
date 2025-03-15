import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    return (
    <header className="fixed top-0 left-0 w-full bg-white/70 text-black py-4 px-6 shadow-md flex justify-between items-center">
    <div id='TA' className="text-xl font-bold">TestArena</div>
  
    <div className="flex space-x-4">
      <button className="bg-black hover:bg-green-600 text-white px-4 py-2 rounded" onClick={async event => {return navigate("/login")}}>
        LogIn
      </button>
      <button className="bg-black hover:bg-green-600 text-white px-4 py-2 rounded" onClick={async event => {return navigate("/sign")}} >
        SignUp
      </button>
    </div>
  </header>
  
    );
}

export default Header;