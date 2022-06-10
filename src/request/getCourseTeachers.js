import axios from "axios";


const getCourseTeachers = (token, id) => {

    const headers = {
        'Authorization': token,
        'Accept-Version': '1.0.0',
        'Content-Type' : 'application/json'
    }

    return axios.get(`http://localhost:3000/api/courseUser/${id}`, {headers: headers})
}

export default getCourseTeachers