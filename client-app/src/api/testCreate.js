import api from "./axiosInstance";

const BASE_URL = "http://localhost:5066";
const unuversalCategorieId = 1; 


export const saveTest = async (testData) =>
{
    const data = {
        Title: testData.Title,
        PhoneColor: testData.PhoneColor,
        MetaData: {
            Type: testData.MetaData.type,
            Mixed: testData.MetaData.Mixed,
            MixedEach: testData.MetaData.MixedEach,
            GoBack: testData.MetaData.MixedEach
        },
        QuestionKeys: []
    };
    localStorage.setItem("TestData", JSON.stringify(data));
    console.log(localStorage.getItem("TestData"));
}

export const addQuestionKey = async (questionId) =>
{
    const testData = JSON.parse(localStorage.getItem("TestData"));
    testData.QuestionKeys.push(questionId);
    localStorage.setItem("TestData", JSON.stringify(testData));
};

export const removeTestData = async () =>
{
    localStorage.removeItem("TestData");
};

export const saveQuestionForTest = async (questionData) =>
{
    const quest = {
        Content: questionData.Content,
        MetaData: {
            Type: questionData.MetaData.Type,
            Photo: questionData.MetaData.Photo,
            Options: questionData.Options,
            Respond: questionData.Respond, 
        },
        CategorieKeys: [unuversalCategorieId]
    };
    console.log(quest);
    try{
        const response = await api.post("http://localhost:5066/tests/add/question", quest,
            {
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + localStorage.getItem("token")
                }
            }
        )
        addQuestionKey(response.data.questionId);
        //return response.data.questionId;
        return response.data;

    }
    catch(error){
    }
}

export const createTest = async () => 
{
    const testData = JSON.parse(localStorage.getItem("TestData"));
    console.log(testData);
    try{
        const response = await api.post("http://localhost:5066/tests/create/test", testData,
            {
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + localStorage.getItem("token")
                }
            }
        )
        
        return response.data;

    }
    catch(error){
    }

}