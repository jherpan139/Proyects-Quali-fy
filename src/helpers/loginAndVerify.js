import verifyToken from "../request/verifyToken";
import loginUser from "../request/login";


const loginAndVerify = async (email, passwd) => {
    let userValue = ''

    await loginUser(email, passwd)
    .then( async (resp) => {
      await verifyToken(resp.data.token)
      .then((userInfo) => {
        userValue = { 
            user: userInfo.data,
        }
      })
      .catch((err) => console.log(err))
    })
    .catch(err => {console.log(err)}) 

    return userValue;
}

export default loginAndVerify