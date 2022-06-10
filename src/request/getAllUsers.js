import axios from "axios";


const getAllUsers = (token) => {

    const headers = {
        'Authorization': token,
        'Accept-Version': '1.0.0',
        'Content-Type' : 'application/json'
    }

    return axios.get('http://localhost:3000/api/users', {headers: headers})
}

export default getAllUsers