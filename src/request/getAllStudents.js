import axios from "axios";


const getAllStudents = (token) => {

    const headers = {
        'Authorization': token,
        'Accept-Version': '1.0.0',
        'Content-Type' : 'application/json'
    }

    return axios.get(`http://localhost:3000/api/students`, {headers: headers})
}

export default getAllStudents