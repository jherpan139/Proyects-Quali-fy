import React from 'react'
import StudentsModal from './ModalStudents'
import TeachersModal from './ModalTeachers'
import Button from 'react-bootstrap/Button'
import getUserById from '../../../request/getUsersById'

const Course = (props) => {


    const [studentsModalShow, setStudentsModalShow] = React.useState(false);
    const [teachersModalShow, setTeachersModalShow] = React.useState(false);


  return (
    <tr>
        <th scope="row">{props.data.idCourse}</th>
        <td>{props.data.name}</td>

        {props.data.students.length>0 ? <td><Button size='1px' variant="success" onClick={() => setStudentsModalShow(true)}>Estudiantes</Button></td> : 
        <td><Button disabled variant="success">Estudiantes</Button></td>}

        {props.data.users.length>0 ? <td><Button size='1px' variant="success" onClick={() => setTeachersModalShow(true)}>Profesores</Button></td> : 
        <td><Button disabled variant="success">Profesores</Button></td>}
        

        <StudentsModal
        show={studentsModalShow}
        onHide={() => setStudentsModalShow(false)}
        coursename={props.data.name}
        students={props.data.students}
        ></StudentsModal>

        <TeachersModal
        show={teachersModalShow}
        onHide={() => setTeachersModalShow(false)}
        coursename={props.data.name}
        teachers={props.data.users}
        user={props.user}
        ></TeachersModal>
    </tr>

  )
}

export default Course