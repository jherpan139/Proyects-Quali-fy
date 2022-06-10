import axios from "axios";


const registerUser = (token, email, name, surname, role, password) => {


    const headers = {
        'Authorization': token,
        'Accept-Version': '1.0.0',
        'Content-Type' : 'application/json'
    }
    const payload = {
        'email': email,
        'name': name,
        'surnames': surname,
        'role': role,
        'password': password       
    }

    return axios.post(`http://localhost:3000/api/users/signup`, payload, {headers: headers})
}

export default registerUser