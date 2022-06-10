import React from 'react'
import Button from 'react-bootstrap/Button'
import getCourseTeachersReq from '../../../request/getCourseTeachers'
import { useNavigate } from 'react-router-dom'

const getCourseTeachers = async (user, idCourse) => {
    let courses = []
    await getCourseTeachersReq(user.token, user.idUser)
    .then((res) => {
        courses = courses.concat(res.data)
    })
    let isTeacher = {
        isTeacher: false,
        isTutor: false
    };
    courses.forEach(elem => {
        if (elem.idCourse === idCourse){
            if (elem.role === 1){
                isTeacher = {
                    isTeacher: true,
                    isTutor: true,
                } 
            } else {
                isTeacher = {
                    isTeacher: true,
                    isTutor: false,
                } 
            }
        } 
    });
    return isTeacher
}


const Student = (props) => {

    const [isTeacher, setIsTeacher] = React.useState(false)
    const [isTutor, setIsTutor] = React.useState(false)
    const navigate = useNavigate()

    React.useEffect(async () => {
        const { isTeacher, isTutor } = await getCourseTeachers(props.user, props.data.idCourse)
        setIsTeacher(isTeacher)
        setIsTutor(isTutor)
    },[])

    return (
        <tr>
            <th scope="row">{props.data.idStudent}</th>
            <td>{props.data.name}</td>
            <td>{props.data.surnames}</td>
            <td>{props.data.dni}</td>
            <td>{props.data.email}</td>
            <td>{props.data.course.name}</td>
            {isTeacher ? <td><Button variant='success' onClick={() => navigate('qualify', {state: {student: props.data, tutor: isTutor}})}>Calificar</Button></td> : <td><Button disabled variant='success'>Calificar</Button></td>}
        </tr>
    
      )
}
//Solo podrá calificar a un alumno si es profesor de su curso.
export default Student