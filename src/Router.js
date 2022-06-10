import React from "react";
import { Routes, Route, useNavigate,  } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import NotAllowed from "./components/NotAllowed";
import { UserContext } from "./helpers/AuthContext";
import Students from "./components/HomeComps/QualifyStudentComp/Students";
import Courses from "./components/HomeComps/CoursesComp/Courses";
import User from "./components/HomeComps/User"
import verifyToken from "./request/verifyToken";
import Teachers from "./components/HomeComps/TeachersComp/Teachers";
import QualifyMenu from "./components/HomeComps/QualifyStudentComp/QualifyMenu";

const Router = () => {

  const verify = async () => {
    const tempUser = JSON.parse(localStorage.getItem('user'))
    let isOk = false

    if (tempUser){
    await verifyToken(tempUser.token)
    .then((res) => {
      isOk = true
      localStorage.setItem('user', JSON.stringify(res.data))
    }).catch(() => {isOk = false; console.log('fallo'); setUser(null); window.localStorage.clear()})

    return isOk
  }
}

  const [user, setUser] = React.useState(null);
  const value = React.useMemo(() => ({ user, setUser }), [user, setUser]);
  const navigate = useNavigate()

  React.useEffect( () => {

    const interval = setInterval(async () => {
      await verify()
      setUser(JSON.parse(localStorage.getItem('user')))

    }, 10000);
    return () => clearInterval(interval);
    //cambiarlo para que sea valido el token, no para que exista el user y guardarlo en localStorage

  },[])

  React.useEffect(() => {
    if (!user){
      navigate('/')
    }
  },[user])


//      {userToken ? navigate("home"): navigate("/")}
  return (
    <UserContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="notallowed" element={<NotAllowed/>}></Route>
          <Route path="home/*" element={<Home user={user}/>}>
            <Route path="teachers" element={<Teachers/>}></Route>
            <Route path="profile" element={<User/>}></Route>
            <Route path="students/*" element={<Students/>}>
              <Route path="qualify" element={<QualifyMenu/>}></Route>
            </Route>
          </Route>
       </Routes>

    </UserContext.Provider>
  );
};

export default Router;
