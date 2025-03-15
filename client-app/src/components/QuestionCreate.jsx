import { loginUser, saveUserData } from "../api/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {saveQuestionForTest, createTest, removeTestData} from "../api/testCreate";

function TypeTest({sendData})
{
    const [options, setOption] = useState([{id: 1, value: ""}]);
    const [respond, setRespond] = useState([]);
    const addOption = (e) => {
        setOption([...options, {id: options.length + 1, value: ""}]);
    }
    const handleChange = (e, id) => {
        const newOptions = options.map((option) =>
        option.id === id ? {...option, value: e.target.value} : option);
        setOption(newOptions);
        sendData({Options: newOptions, Respond: respond});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(options);
    };

    const handleRespond = (e, id) => {
        setRespond(prev => {
            const newRespond = id;
            sendData({Options: options, Respond: [newRespond]});
            return newRespond;
        });
    };
    return (<>
    <form onSubmit={handleSubmit} className="space-y-4">
    {options.map((option)=> (
        <div key={option.id} className="flex flex-row">
        <button type="button" className={`w-8 h-8 rounded-full ${
          respond === option.id? "bg-green-500 text-white" : "bg-gray-300 text-black"
        } transition`} bg- onClick={(e) => handleRespond(e,option.id)}>p</button>
        <input
        type="text"
        value={option.value}
        onChange={(e) => handleChange(e, option.id)}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      </div>
    ))}
    </form>
    <div >
    <button
      type="button"
      onClick={addOption}
      className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition my-[2rem]"
    >
      +
    </button>
  </div></>
);}

function TypeMultiTest({sendData})
{
    const [options, setOption] = useState([{id: 1, value: ""}]);
    const [respond, setRespond] = useState([]);
    const addOption = (e) => {
        setOption([...options, {id: options.length + 1, value: ""}]);
    }
    const handleChange = (e, id) => {
        const newOptions = options.map((option) =>
        option.id === id ? {...option, value: e.target.value} : option);
        setOption(newOptions);
        sendData({Options: newOptions, Respond: respond});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(options);
    };

    const handleRespond = (e, id) => {
        setRespond(prev => {
            const newRespond = [...prev, id];
            sendData({Options: options, Respond: newRespond});
            return newRespond;
        });
    };
    
    return (<>
    <form onSubmit={handleSubmit} className="space-y-4">
    {options.map((option)=> (
        <div key={option.id} className="flex flex-row">
        <button type="button" className={`w-8 h-8 rounded-full ${
          respond.includes(option.id)? "bg-green-500 text-white" : "bg-gray-300 text-black"
        } transition`} bg- onClick={(e) => handleRespond(e,option.id)}>p</button>
        <input
        type="text"
        value={option.value}
        onChange={(e) => handleChange(e, option.id)}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      </div>
    ))}
    </form>
    <div >
    <button
      type="button"
      onClick={addOption}
      className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition my-[2rem]"
    >
      +
    </button>
  </div></>
);}

function TypeCompliance()
{return (
    <>compliance</>
);}

function TypeTextArea({sendData})
{
    const [area, setArea] = useState({Options: [],Respond: ""});

    const handleChange = (e) => {
        const {value} = e.target;
        setArea(prev => {
            sendData({Options: [],Respond: value})
        return {Options: [],Respond: [value]}})
    };

    return (
    <><form className="space-y-4">
    <div>
      <label className="block text-gray-700 font-medium">Назва:</label>
      <input
        type="text"
        name="Title"
        value={area.Respond[0]}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    </form>
</>
);}


function QuestionCreate()
{
        const [questData, setData] = useState({
            Content: "",
            MetaData: {
                Type: "test",
                Photo: false,
            },
            Options: [],
            Respond: [0]
        });
        const [saved, setSaved] = useState(false);

        const navigate = useNavigate();

        const types = ["test", "multitest", "compliance", "textarea"];
    
        const handleChange = (e) => {
            const { name, value} = e.target;
          
            setData((prevData) => {
            if (name === "Type") {
                return {
                  ...prevData,
                  MetaData: { ...prevData.MetaData, Type: value },
                };
              } else {
                return {
                  ...prevData,
                  [name]: value,
                };
              }
            });
            console.log(questData);
          };
          const handleChild = (data) => {
            setData(prevData => ({
                ...prevData,
                Options: data.Options,
                Respond: data.Respond
            }));
            
          }
        const handleSave = (e) => {
            e.preventDefault();
            setSaved(true);
            saveQuestionForTest(questData);
        }
    
        const handleSubmit = (e) =>
        {
            e.preventDefault();
            console.log(localStorage.getItem("TestData"));
            navigate(0);
          
        }

        const handleComplate = async (e) =>
        {
            e.preventDefault();
            const data = await createTest();
            if(data.success === true){
                removeTestData();
                navigate("/tests");
                console.log("ddd");
            }
            else{
                console.log("aaa");
                navigate(0);
            }

        }
    
        return (
            <main className="flex-grow flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 m-[0.5rem] max-w-4xl min-h-[650px] w-full border-2 border-green-500">
            <h2 className="text-xl font-bold mb-4">Параметри question:</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Опис питання:</label>
            <textarea
            name="Content"
            value={questData.Content}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded resize-none min-h-[120px]"
            placeholder="Введіть опис питання..."
            required/>
        </div>

            <div>
              <label className="block text-gray-700 font-medium">Тип питання:</label>
              <select name="Type" value={questData.MetaData.Type} onChange={handleChange}className="w-full p-2 border border-gray-300 rounded"
            required>
                {types.map((type) => (<option key={type} value={type}>{type}</option>))}
          </select>
            </div>
        <div>
        <label className="block text-gray-700 font-medium">Variants:</label>
        {questData.MetaData.Type === "test" && <TypeTest sendData={handleChild}/>}
        {questData.MetaData.Type === "multitest" && <TypeMultiTest sendData={handleChild}/>}
        {questData.MetaData.Type === "compliance" && <TypeCompliance/>}
        {questData.MetaData.Type === "textarea" && <TypeTextArea sendData={handleChild}/>}
        </div>
    
            
            <div className="flex justify-end"><button
        type="button"
        className={"bg-black text-white py-2 px-[1rem] mr-[8rem] ml-[0rem] rounded-lg hover:bg-black/60 transition duration-300 ease-in-out shadow-md"} 
        onClick={handleComplate}>Завершити</button>
            <button
        type="button"
        className={` ${saved ?"bg-black/60": "bg-black"} text-white py-2 px-[5rem] mx-[2rem] rounded-lg hover:${saved ?"bg-black/60": "bg-black/80"} transition duration-300 ease-in-out shadow-md`} 
        onClick={handleSave}>{saved === true? "Збережено":"Зберегти"}</button>
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-[5rem] rounded-lg hover:bg-green-600 transition duration-300 ease-in-out shadow-md"
      >
        Додати питання
      </button>
    </div>
    
    
          </form>
            </div>
          </main>
        );
}

export default QuestionCreate;