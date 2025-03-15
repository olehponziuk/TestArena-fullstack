import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Header3() {
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
      </header>
      
  
    );
}

export default Header3;