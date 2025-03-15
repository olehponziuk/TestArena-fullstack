import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getUserName } from '../api/profile';


function Header4() {
    const navigate = useNavigate();

    return (
        <header className="top-0 left-0 w-full bg-white/70 text-black py-[1.3rem] px-6 shadow-md flex items-center">
        <div id='TA' className="text-xl font-bold">TestArena</div>
        <nav className="flex space-x-4 ml-2 px-5">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Головна</Link>
          <Link to="/tests" className="text-gray-600 hover:text-gray-900">Тести</Link>
          <Link to="/" className="text-gray-600 hover:text-gray-900">Вчителю</Link>
          <Link to="/" className="text-gray-600 hover:text-gray-900">Питання</Link>
          <Link to="/" className="text-gray-600 hover:text-gray-900">Категорії</Link>
        </nav>

        <div className="ml-auto" >
        <div className="flex flex-row items-center space-x-2" onClick={event => {return navigate("/home")}}>
  <span className="text-gray-800 font-medium">{getUserName()}</span>
  <img 
    src="/noimg.jpg" 
    alt="ImgProfil" 
    className="w-[2.1rem] h-[2.1rem] rounded-full border border-gray-300 shadow-sm"
  />
</div>
        </div>

      </header>
      
  
    );
}

export default Header4;