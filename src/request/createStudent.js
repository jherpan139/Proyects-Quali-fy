import axios from "axios";


const createStudent = (token, email, name, surname, dni, idCourse) => {

    const headers = {
        'Authorization': token,
        'Accept-Version': '1.0.0',
        'Content-Type' : 'application/json'
    }
    const payload = {
        'email': email,
        'name': name,
        'surnames': surname,
        'dni': dni,
        'idCourse': idCourse       
    }

    return axios.post('http://localhost:3000/api/students', payload, {headers: headers})
}

export default createStudent