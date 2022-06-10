import axios from "axios";


const createCourse = (token, courseName) => {

    const headers = {
        'Authorization': token,
        'Accept-Version': '1.0.0',
        'Content-Type' : 'application/json'
    }

    const payload = {
        name: courseName 
    }

    return axios.post('http://localhost:3000/api/courses', payload, {headers: headers})
}

export default createCourse



