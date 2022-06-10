import axios from "axios";


const loginUser = (email, password) => {


    const headers = {
        'Accept-Version': '1.0.0',
        'Content-Type' : 'application/json'
    }
    const payload = {
        'email': email,
        'password': password       
    }

    return axios.post(`http://localhost:3000/api/users/login`, payload, {headers: headers})
}

export default loginUser