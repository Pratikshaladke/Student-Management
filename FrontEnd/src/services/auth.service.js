import axios from "axios";

let axiosConfig = {
    headers:{
        'Content-Type' : 'application/json',
    }
}
const API_URL = "http://localhost:2775/";

//login
export const teacherLogin = async ({email,password}) => {
    try{
        const response =  await axios.post (API_URL + "teacher/teacherLogin",{
            email,
            password
                },axiosConfig)
                if(response.data.status === true){
                    localStorage.setItem('users',JSON.stringify(response.data));
                    
                    return response   
                }else{
                    return response;
                }
    }catch(e){
            return null;
    }
}

// show list of students
export const showList = async () => {
    return axios.get(API_URL + "student/studentList",axiosConfig)
}

// update
export const updateStudent = async (data,_id) => {
    console.log(data);
  return await axios.put(API_URL + "student/updateStudent", {
      _id,
      name:data.name,
      email:data.email,
      grade:data.grade,
      image:data.image,
      percentage:data.percentage
  }, axiosConfig)
}

//login
export const studentLogin = async ({email,password}) => {
    try{
        const response =  await axios.post (API_URL + "student/studentLogin",{
            email,
            password
                },axiosConfig)
                if(response.data.status === true){
                    localStorage.setItem('users',JSON.stringify(response.data));
                    
                    return response   
                }else{
                    return response;
                }
    }catch(e){
            return null;
    }
}