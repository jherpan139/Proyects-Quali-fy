import axios from "axios";


const verifyToken = (token) => {

    const headers = {
        'Accept-Version': '1.0.0',
        'Content-Type' : 'application/json',
        'Authorization': token,
    }

    return axios.get(`http://localhost:3000/api/users/verify/user`, {headers: headers})
}

export default verifyToken