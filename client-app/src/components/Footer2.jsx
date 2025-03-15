import React from 'react';

function Footer2() {
    return (
        <footer className="bottom-0 left-0 w-full bg-white/50 text-black py-9 px-6 shadow-md flex justify-between items-center backdrop-blur-md">
            <div className="text-sm">© 2025 TestArena. All rights reserved.</div>
            
            <div className="flex space-x-4">
                <a href="/terms" className="text-gray-600 hover:text-gray-900">Terms</a>
                <a href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy</a>
            </div>
        </footer>
    );
}

export default Footer2;
