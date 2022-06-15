import axios from "axios";


const getCoursesById = (token, idCourse) => {

    const headers = {
        'Authorization': token,
        'Accept-Version': '1.0.0',
        'Content-Type' : 'application/json'
    }

    return axios.get(`http://localhost:3000/api/courses/${idCourse}`, {headers: headers})
}

export default getCoursesById