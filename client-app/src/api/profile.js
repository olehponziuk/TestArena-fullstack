import api from "./axiosInstance";

const BASE_URL = "http://localhost:5066";

export const getUserName = () =>
{
    if (true) {
        return localStorage.getItem("username");
    }
    else
        return "Geast";                
}

export const getProfilePhoto = () =>
{
    return "";               
}
