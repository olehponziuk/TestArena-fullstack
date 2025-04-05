import { loginUser, saveUserData } from "../api/auth";
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestion, getResult, getTakeTest, isFirstQuestion, isLastQuestion, nextQuestion, prevQuestion, saveAttempt, setResultForAttempt } from "../api/testsApi";

function TypeTake({sendData})
{
    const [questData, setQuestData] = useState(null)
    const [resultData, setResult] = useState({
        metaData: {
            type: "test",
            respond: [],
            saved: false
        }
    });

    useEffect(() => {
        const result = getResult();
        const question = getQuestion();
        
        setResult(prev => ({
            ...prev,
            id: result.id,
            metaData: {
                ...prev.metaData,
                type: "test",
                respond: result.metaData.respond,
                saved: result.metaData.saved
            }
        }));
        setQuestData(question);
    }, []);

    
    

    const handleChange = (e, id) => {
            const newRes = {...resultData,
            metaData: {
              ...resultData.metaData,
              respond: [id],
            }
          };
        setResult(newRes);
        sendData(newRes);
    };
    
    

    let abc = 'a'.charCodeAt();
    return (<>
    <form className="space-y-4">
  {
  questData?.metaData.Options.map((option) => (
    <div key={option.id} className="flex flex-row">
      <button
        type="button" 
        className={`w-8 h-8 rounded-full transition ${
          resultData?.metaData.respond?.[0] === option.id
            ? "bg-green-500 text-white"
            : "bg-gray-300 text-black"
        }`}
        onClick={(e) => handleChange(e, option.id)}
      >
        {String.fromCharCode(abc++)}
      </button>
      <p className="w-full p-2">
        {option.value}
      </p>
    </div>
  ))}
</form>

    </>
);}

function TypeMultiTake({sendData})
{
    const [questData, setQuestData] = useState(null)
    const [resultData, setResult] = useState({
        metaData: {
            type: "multitest",
            respond: [],
            saved: false
        }
    });

    useEffect(() => {
        const result = getResult();
        const question = getQuestion();
    
        setQuestData(question);
        
        setResult(prev => ({
            ...prev,
            id: result.id,
            metaData: {
                ...prev.metaData,
                type: "test",
                respond: result.metaData.respond,
                saved: result.metaData.saved
            }
        }));
    }, []);
    
    const handleChange = (e, id) => {
        const newResult = {
            ...resultData,
            metaData: {
              ...resultData.metaData,
              respond: [...(resultData.metaData.respond || []), id], 
            }
        };
        setResult(newResult)
        sendData(newResult);
    };

    
    

    let abc = 'a'.charCodeAt();
    return (<>
    <form className="space-y-4">
  {
  questData?.metaData.Options.map((option) => (
    <div key={option.id} className="flex flex-row">
      <button
        type="button" 
        className={`w-8 h-8 rounded-full transition ${
          resultData?.metaData?.respond?.includes(option.id)
            ? "bg-green-500 text-white"
            : "bg-gray-300 text-black"
        }`}
        onClick={(e) => handleChange(e, option.id)}
      >
        {String.fromCharCode(abc++)}
      </button>
      <p className="w-full p-2">
        {option.value}
      </p>
    </div>
  ))}
</form>

    </>
);}

function TypeComplianceTake()
{return (
    <>compliance</>
);}

function TypeTextAreaTake({sendData})
{
    const [questData, setQuestData] = useState(null)
    const [resultData, setResult] = useState({
        metaData: {
            type: "textarea",
            respond: [],
            saved: false
        }
    });

    useEffect(() => {
        const result = getResult();
        const question = getQuestion();
    
        setQuestData(question);
        
        setResult(prev => ({
            ...prev,
            id: result.id,
            metaData: {
                ...prev.metaData,
                type: "textarea",
                respond: result.metaData.respond,
                saved: result.metaData.saved
            }
        }));
    }, []);


    const handleChange = (e) => {
        const {value} = e.target;
        const newResult = {
            ...resultData,
            metaData: {
              ...resultData.metaData,
              respond: [value], 
            }
        };
        setResult(newResult)
        sendData(newResult);
    };

    return (
    <><form className="space-y-4">
    <div>
      <label className="block text-gray-700 font-medium">Respond:</label>
      <input
        type="text"
        name="Title"
        value={resultData?.metaData?.respond[0]}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    </form>
</>
);}


function TestTaker()
{
        const [resultData, setResult] = useState();
        const [questData, setQuestData] = useState(null);
        const [saved, setSaved] = useState(false);
        const [goBack, setGoBack] = useState(false);
        const [isLast, setLast] = useState();
        const [isFirst, setFirst] = useState(false);

        const navigate = useNavigate();
        
        useEffect(() => {
            setQuestData(getQuestion());
            setSaved(getResult().metaData.saved);
            setGoBack(getTakeTest().metaData.GoBack);
            setLast(isLastQuestion());
            setFirst(isFirstQuestion());
          }, []);
          
        
            
        const handleChild = (data) => {
            setResult(data);
        }
        const handleSave = (e) => {
            e.preventDefault();
            setSaved(true);
            resultData.metaData.saved = true;
            console.log(resultData);
            setResultForAttempt(resultData);
        }
    
        const handleNext = (e) =>
        {
            e.preventDefault();
            nextQuestion();
            navigate(0);
          
        }
        const handleBack = (e) =>
        {
            e.preventDefault();
            prevQuestion();
            navigate(0);
        }

        const handleComplate = async (e) =>
        {
            e.preventDefault();
            const attemptData = localStorage.getItem("AttemptData");
            console.log("HHHJ")
            console.log(attemptData ? JSON.parse(attemptData) : "AttemptData не знайдено");
            saveAttempt();
            navigate("/result");
        }
    
        return (
            <main className="flex-grow flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 m-[0.5rem] max-w-4xl min-h-[650px] w-full border-2 border-green-500">
            <h2 className="text-xl font-bold mb-4 break-words">{questData?.content}</h2>
          <form className="space-y-4">
        <div>
        <label className="block text-gray-700 font-medium">Variants:</label>
        {questData?.metaData.Type === "test" && <TypeTake sendData={handleChild}/>}
        {questData?.metaData.Type === "multitest" && <TypeMultiTake sendData={handleChild}/>}
        {questData?.metaData.Type === "compliance" && <TypeComplianceTake/>}
        {questData?.metaData.Type === "textarea" && <TypeTextAreaTake sendData={handleChild}/>}
        </div>
    
        <div className="flex justify-between items-center w-full px-4">
  {/* Кнопка "Зберегти" (ліворуч) */}
  <button
    type="button"
    className={`${
      saved ? "bg-black/60" : "bg-black"
    } text-white py-2 px-8 rounded-lg hover:${
      saved ? "bg-black/60" : "bg-black/80"
    } transition duration-300 ease-in-out shadow-md`}
    onClick={handleSave}
  >
    {saved ? "Збережено" : "Зберегти"}
  </button>

  {/* Контейнер для кнопок "Назад", "Далі" та "Завершити" (праворуч) */}
  <div className="flex space-x-4">
    {/* Кнопка "Назад" */}
    {goBack && !isFirst && (
      <button
        type="button"
        onClick={handleBack}
        className="bg-black text-white py-2 px-8 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out shadow-md"
      >
        Назад
      </button>
    )}

    {/* Кнопка "Далі" або "Завершити" */}
    {isLast ? (
      <button
        type="button"
        className="bg-black text-white py-2 px-6 rounded-lg hover:bg-black/60 transition duration-300 ease-in-out shadow-md"
        onClick={handleComplate}
      >
        Завершити
      </button>
    ) : (
      <button
        type="button"
        onClick={handleNext}
        className="bg-green-500 text-white py-2 px-8 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out shadow-md"
      >
        Далі
      </button>
    )}
</div>      
    </div>
    
    
          </form>
            </div>
          </main>
        );
}

export default TestTaker;