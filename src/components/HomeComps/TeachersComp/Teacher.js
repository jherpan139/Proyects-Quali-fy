import React from 'react'
import Button from 'react-bootstrap/Button'
import getCourseTeachersReq from '../../../request/getCourseTeachers'
import CoursesModal from './ModalCourses'

const getCourseTeachers = async (userToken, idUser, coursesList) => {
    let userCourses = []
    await getCourseTeachersReq(userToken, idUser)
    .then((res) => {
        userCourses = userCourses.concat(res.data)
    })
    let coursesData = []
    userCourses.forEach(userCourse => {
        coursesList.forEach(course => {
            if(userCourse.idCourse === course.idCourse){
                coursesData = coursesData.concat({course: course,
                role: userCourse.role})
            }
        });
    });
    return coursesData
}


const Teacher = (props) => {

    const [courses, setCourses] = React.useState([])
    const [modalShow, setModalShow] = React.useState(false)

    React.useEffect(async () => {
        const resp = await getCourseTeachers(props.user.token, props.data.idUser, props.courses)
        setCourses(resp)
    },[])

    return (
        <tr>
            <th scope="row">{props.data.idUser}</th>
            <td>{props.data.name}</td>
            <td>{props.data.surnames}</td>
            <td>{props.data.email}</td>
            {courses.length>0 ? <td><Button variant='success' onClick={() => setModalShow(true)}>Cursos</Button></td>: <td><Button disabled variant='success'>Cursos</Button></td>}


            <CoursesModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                userName={props.data.name}
                courses={courses}
            ></CoursesModal>


        </tr>
        
      )
}
export default Teacher