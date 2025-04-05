import { stringify } from "postcss";
import api from "./axiosInstance";

const BASE_URL = "http://localhost:5066"; 

export const getTestsList = async () =>
{
    try{
        const response = await api.get("http://localhost:5066/tests/list",{
            headers:{
                Authorization : 'Bearer ' + localStorage.getItem("token")
            }
        });
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.log("rvhfbvr");                                                 
    }
}

export const startTest = async (testId) => 
{
    try{
        const response = await api.get("http://localhost:5066/tests/start",{
            params: {
                testId: testId
            },
            headers:{
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            }
        });
        console.log("ppp" + response.data);
        localStorage.setItem("Questions", JSON.stringify(response.data.questions.result));
        localStorage.setItem("TakeData", JSON.stringify({
            testId: response.data.testId,
            title: response.data.title,
            metaData: response.data.metaData
        }));

        let results = response.data.questions.result.map(res => ({
            id: res.id,
            metaData: {
                respond: [],
                savad: false
        }
        }))
        localStorage.setItem("AttemptData", JSON.stringify({
            testId: response.data.testId,
            results: results
        }))
        localStorage.setItem("QuestionPointer", 0);
        localStorage.setItem("CountQuestions", response.data.questions.result.length)
        
        return response.data;
    }catch(error){
        console.log(error.message + "GGGHHHHVVVV");
    }
}

export const isLastQuestion = () =>
{
    const count = Number(localStorage.getItem("CountQuestions"));
    const pointer = Number(localStorage.getItem("QuestionPointer"));

    if (pointer === count - 1)
        return true;
    else
        return false;
}

export const isFirstQuestion = () =>
    {
        const pointer = Number(localStorage.getItem("QuestionPointer"));
    
        if (pointer === 0)
            return true;
        else
            return false;
    }

export const getQuestion = () =>
{
    const pointer = Number(localStorage.getItem("QuestionPointer"));
    return (JSON.parse(localStorage.getItem("Questions")))[pointer];
}

export const getResult = () =>
{
    const pointer = Number(localStorage.getItem("QuestionPointer"));
    let results = JSON.parse(localStorage.getItem("AttemptData")).results;
    return results[pointer];
}

export const getTakeTest = () =>
{
    return (JSON.parse(localStorage.getItem("TakeData")));
}

export const setQuestion = (data) =>
{
    const pointer = Number(localStorage.getItem("QuestionPointer"));
    let questions = (JSON.parse(localStorage.getItem("Questions")));
    questions[pointer] = data;
    localStorage.setItem("Questions", JSON.stringify(questions));
}
    
export const setResultForAttempt = (res) =>
{
    const pointer = Number(localStorage.getItem("QuestionPointer"));
    let attempData = JSON.parse(localStorage.getItem("AttemptData"));
    attempData.results[pointer] = {
        id: res.id,
        metaData: {
            type: res.metaData.type,
            respond: res.metaData.respond,
            saved: true
    }
    };
    localStorage.setItem("AttemptData", JSON.stringify(attempData));
    const attemptData = localStorage.getItem("AttemptData");
    //console.log(attemptData ? JSON.parse(attemptData) : "AttemptData не знайдено");
}

export const nextQuestion = () =>
{
    let pointer = Number(localStorage.getItem("QuestionPointer"));
    pointer++;
    localStorage.setItem("QuestionPointer", JSON.stringify(pointer));
}

export const prevQuestion = () =>
{
        let pointer = Number(localStorage.getItem("QuestionPointer"));
        pointer--;
        localStorage.setItem("QuestionPointer", JSON.stringify(pointer)); 
}

const clearTakeData = () =>
{
    localStorage.removeItem("TakeData");
    localStorage.removeItem("QuestionPointer");
    localStorage.removeItem("Questions");
    localStorage.removeItem("CountQuestions");
    localStorage.removeItem("AttemptData");
}
export const saveAttempt = async () => 
{
    try{
        const attemp = JSON.parse(localStorage.getItem("AttemptData"));
        console.log("ATTMP: " + attemp.testId )
        const response = await api.post("http://localhost:5066/results/create/new", attemp,
            {
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + localStorage.getItem("token")
                }
            }
        );
       clearTakeData();
       
        localStorage.setItem("Score", JSON.stringify(response.data.score));
        localStorage.setItem("MaxValue", JSON.stringify(response.data.maxValue));
        localStorage.setItem("Value", JSON.stringify(response.data.value));

    }
    catch{

    }
}
