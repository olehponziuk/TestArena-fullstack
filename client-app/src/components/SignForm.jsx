import React from "react";
import { useState} from "react";
import {useNavigate} from "react-router-dom";
import {signUser} from "../api/auth";

function SignForm()
{
    const [formData, setData] = useState({
        UserName: "",
        Email : "",
        Phone : "",
        Password : ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({...formData, [name] : value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await signUser(formData);
        if (data.success === true){
            navigate("/login");
        }
        else
        navigate("/nodata");

    };

    return (
        <div className="min-h-screen flex items-center justify-center">
  <div className="bg-white/80 p-8 rounded-lg shadow-lg max-w-md w-full">
    <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">Register</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="UserName" className="block text-left font-semibold text-gray-600 mb-1">Username:</label>
        <input
          type="text"
          name="UserName"
          id="UserName"
          value={formData.UserName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        />
      </div>
      <div>
        <label htmlFor="Email" className="block text-left font-semibold text-gray-600 mb-1">Email:</label>
        <input
          type="email"
          name="Email"
          id="Email"
          value={formData.Email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        />
      </div>
      <div>
        <label htmlFor="Phone" className="block text-left font-semibold text-gray-600 mb-1">Phone:</label>
        <input
          type="tel"
          name="Phone"
          id="Phone"
          value={formData.Phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        />
      </div>
      <div>
        <label htmlFor="Password" className="block text-left font-semibold text-gray-600 mb-1">Password:</label>
        <input
          type="password"
          name="Password"
          id="Password"
          value={formData.Password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        />
      </div>
      <button type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all">
        Register
      </button>
    </form>
  </div>
</div>
    );
}

export default SignForm;