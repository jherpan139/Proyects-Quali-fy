import React from 'react'
import StudentsModal from './ModalStudents'
import TeachersModal from './ModalTeachers'
import Button from 'react-bootstrap/Button'
import getUserById from '../../../request/getUsersById'


const filterTeachers = (token, teachers, idCourse) => {
  let allowedTeachersArray = []
  teachers.map(async (elem) => {
    if (elem.idCourse === idCourse){
      await getUserById(token, elem.idUser)
      .then((data) => {
        allowedTeachersArray.push({teacher: data.data, role: elem.role})
      })
      .catch(err => console.log(err)) 
    }
  });

  return allowedTeachersArray
}

const Course = (props) => {


    const [studentsModalShow, setStudentsModalShow] = React.useState(false);
    const [teachersModalShow, setTeachersModalShow] = React.useState(false);
    const [teachersList, setTeachersList] = React.useState([])
    const [loading, isLoading] = React.useState(false)

    React.useEffect(() => {
      isLoading(true)
      const teachers =  filterTeachers(props.token, props.teachersData, props.data.idCourse)
      setTeachersList(teachers)
      isLoading(false)
    }, [])

  return (
    <tr>
        <th scope="row">{props.data.idCourse}</th>
        <td>{props.data.name}</td>

        {props.data.students.length>0 ? <td><Button size='1px' variant="success" onClick={() => setStudentsModalShow(true)}>Estudiantes</Button></td> : 
        <td><Button disabled variant="success">Estudiantes</Button></td>}

        {loading ? <td>Cargando...</td> : (teachersList.length>0 ? <td><Button size='1px' variant="success" onClick={() => setTeachersModalShow(true)}>Profesores</Button></td> : 
        <td><Button disabled variant="success">Profesores</Button></td>)}
        

        <StudentsModal
        show={studentsModalShow}
        onHide={() => setStudentsModalShow(false)}
        courseName={props.data.name}
        students={props.data.students}
        ></StudentsModal>

        <TeachersModal
        show={teachersModalShow}
        onHide={() => setTeachersModalShow(false)}
        courseName={props.data.name}
        teachers={teachersList}
        user={props.user}
        ></TeachersModal>
    </tr>

  )
}

export default Course