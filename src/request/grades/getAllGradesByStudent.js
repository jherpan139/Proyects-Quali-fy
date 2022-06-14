import axios from "axios";


const getAllGradesByStudent = (token, idStudent) => {

    const headers = {
        'Authorization': token,
        'Accept-Version': '1.0.0',
        'Content-Type' : 'application/json'
    }

    return axios.get(`http://localhost:3000/api/grades/student/${idStudent}`, {headers: headers})
}

export default getAllGradesByStudent