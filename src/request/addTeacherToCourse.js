import axios from "axios";


const addTeacherToCurse = (token, idUser, idCourse, role) => {

    const headers = {
        'Authorization': token,
        'Accept-Version': '1.0.0',
        'Content-Type' : 'application/json'
    }
    const payload = {
        'idUser': idUser,
        'idCourse': idCourse,
        'role': role,   
    }

    return axios.post('http://localhost:3000/api/courseUser', payload, {headers: headers})
}

export default addTeacherToCurse