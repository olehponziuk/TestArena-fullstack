import api from "./axiosInstance";

const BASE_URL = "http://localhost:5066"; 

const saveToken = (token) =>
{
    localStorage.setItem("token", token)
    //api.defaults.headers.common["Authorization"] = 'Bearer ${token}';
}



export const signUser = async (formData) =>
{
    try{
        const response = await api.post("http://localhost:5066/auth/registration", formData);
        return response.data;
    }
    catch(error){
      //??????
    }
}

export const loginUser = async (formData) =>
{
    try{
        const response = await api.post("http://localhost:5066/auth/login", formData);
        saveToken(response.data.token);
        saveUserData();

        return response.data;
    }
    catch(error){
        //???
    }
}

export const saveUserData = async() =>
    {
        localStorage.setItem("isAuth", true);
        const response = await api.get("http://localhost:5066/home/data",{
            headers:{
                Authorization : 'Bearer ' + localStorage.getItem("token")
            }
        });
        console.log(response.data);
        localStorage.setItem("username", response.data.userName);
    
    }

