import axios from "axios";


const getTeachersOfCourses = (token) => {

    const headers = {
        'Authorization': token,
        'Accept-Version': '1.0.0',
        'Content-Type' : 'application/json'
    }

    return axios.get(`http://localhost:3000/api/courseUser`, {headers: headers})
}

export default getTeachersOfCourses