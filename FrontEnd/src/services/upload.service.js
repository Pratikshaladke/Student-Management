import axios from 'axios';

export const uploadFile = async(formData) => {
    return axios.post("http://localhost:2775/student/uploadfile",
    formData,
    {}
    )

}