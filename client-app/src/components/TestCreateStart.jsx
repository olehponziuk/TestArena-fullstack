import { loginUser, saveUserData } from "../api/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfilePhoto, getUserName } from "../api/profile";
import { saveTest } from "../api/testCreate";

function TestCreateStart()
{
    const [testData, setData] = useState({
        Title: "",
        PhoneColor: "grey",
        MetaData: {
            type: "liner",
            Mixed: false,
            MixedEach: false,
            GoBack: false
        }
    });
    const navigate = useNavigate();

    const colors = [
        "red", "blue", "green", "amber", "violet", "orange"
    ];
    const types = ["liner", "short"];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
      
        setData((prevData) => {
          if (type === "checkbox") {
            return {
              ...prevData,
              MetaData: { ...prevData.MetaData, [name]: checked },
            };
          } else if (name === "Type") {
            return {
              ...prevData,
              MetaData: { ...prevData.MetaData, type: value },
            };
          } else {
            return {
              ...prevData,
              [name]: value,
            };
          }
        });
      };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        saveTest(testData);
        navigate("/tests/question/create");
    }

    return (
        <main className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 m-[0.5rem] max-w-4xl min-h-[650px] w-full border-2 border-green-500">
        <h2 className="text-xl font-bold mb-4">Параметри тесту:</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Назва:</label>
          <input
            type="text"
            name="Title"
            value={testData.Title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Виберіть колір:</label>
          <select
            name="PhoneColor"
            value={testData.PhoneColor}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Оберіть колір</option>
            {colors.map((color) => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Виберіть Тип:</label>
          <select
            name="Type"
            value={testData.MetaData.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            {types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Тип:</label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="Mixed"
                checked={testData.MetaData.Mixed}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span>перетасувати питання</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="MixedEach"
                checked={testData.MetaData.MixedEach}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span>перетасувати варіанти в кожному питанні</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="GoBack"
                checked={testData.MetaData.GoBack}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span>моливість повертатися назад</span>
            </label>
          </div>
        </div>
        <div className="flex justify-end">
  <button
    type="submit"
    className="bg-green-500 text-white py-2 px-[8rem] rounded-lg hover:bg-green-600 transition duration-300 ease-in-out shadow-md"
  >
    Додати питання
  </button>
</div>


      </form>
        </div>
      </main>
    );
}

export default TestCreateStart;