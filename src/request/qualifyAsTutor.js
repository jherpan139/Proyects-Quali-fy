import axios from "axios";


const qualifyAsTutor = (token, idStudent, finalGrade) => {

    const headers = {
        'Authorization': token,
        'Accept-Version': '1.0.0',
        'Content-Type' : 'application/json'
    }
    const payload = {
        'final_grade': finalGrade
    }

    return axios.post(`http://localhost:3000/api/students/${idStudent}/finalQualify?grade=${finalGrade}`, {headers: headers})
}

export default qualifyAsTutor