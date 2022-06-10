import axios from "axios";


const getAllCourses = (token) => {

    const headers = {
        'Authorization': token,
        'Accept-Version': '1.0.0',
        'Content-Type' : 'application/json'
    }

    return axios.get(`http://localhost:3000/api/courses`, {headers: headers})
}

export default getAllCourses