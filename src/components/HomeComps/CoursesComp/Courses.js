import React from 'react'
import { UserContext } from '../../../helpers/AuthContext'
import getAllCourses from '../../../request/getAllCourses'
import Course from './Course'
import Cached from '@mui/icons-material/Cached'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Add from '@mui/icons-material/AddCircleRounded'
import Delete from '@mui/icons-material/DeleteRounded'
import Modify from '@mui/icons-material/ChangeCircleRounded'
import getTeachersOfCourses from '../../../request/getTeachersOfCourses'
import CreateCourseModal from './CourseActions/CreateCourse'
import BootstrapTable from 'react-bootstrap-table-next'
import StudentsModal from './ModalStudents'
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ClassIcon from '@mui/icons-material/Class';

const AdminPanel = (props) => {
  return (
    <>
    <tr style={{borderBottom: '2px solid #FFFFFF'}}></tr>
    <tr>
      <th scope='col' colSpan={4} className='text-center'><h4>COURSES ADMIN PANEL</h4></th>
    </tr>
    <tr>
        <th scope='col' colSpan={4} className='text-center'>
          <Button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={() => props.setCreateCourseModal(true)}><Add></Add></Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none' }}><Delete></Delete></Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none' }}><Modify></Modify></Button>
        </th> 
    </tr>
    </>
    )
}

const Courses = () => {

  const listAllCourses = async (userToken) => {
    let coursesArray = []
    await getAllCourses(userToken)
    .then((courses) => {
      coursesArray = coursesArray.concat(courses.data)
    })
    .catch((err) => console.log(err))
    setCoursesList(coursesArray)
  }

  const { user } = React.useContext(UserContext)
  const [coursesList, setCoursesList] = React.useState([])
  const [createCourseModal, setCreateCourseModal] = React.useState(false)
  const [isLoading, setLoading] = React.useState(true)
  const [showModal, setShowModal] = React.useState(false)
  const [modalInfo, setModalInfo] = React.useState([])
  const [show, setShow] = React.useState(false)

  const handleClose = () => setShow(false)
  const handleOpen = () => setShow(true)

  React.useEffect(() => {
    listAllCourses(user.token)
    setLoading(false)
  },[])

  /**    <>
    <Table striped bordered hover variant="dark" style={{align:'center'}}>
      <thead>
        <tr>
          <th scope='col' colSpan={4}><h1 className='text-center'>LISTADO DE CURSOS</h1></th>
        </tr>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Curso</th>
          <th scope="col">Alumnos</th>
          <th scope="col">Profesores</th>
        </tr>
      </thead>
      <tbody>
        {coursesList && coursesList.map((courseData) => {
                return <Course data={courseData} user={user} token={user.token}></Course>
        })}
    

        {user && user.role === 'ADMIN' ? <AdminPanel setCreateCourseModal={setCreateCourseModal}></AdminPanel> : null} 

      </tbody>
    </Table>

    <CreateCourseModal
        show={createCourseModal}
        onHide={() => setCreateCourseModal(false)}
        token={user.token}
    >
    </CreateCourseModal>
</> */

const columns=[{
  dataField:"idCourse",
  text:"#",
  sort: true,
  formatter: courseFormatter
},
{
  dataField:"name",
  text:"Curso",
  sort: true
},
{
  text:"Estudiantes",
  formatter: studentsFormatter
},
{
  text:"Profesores",
  formatter: teachersFormatter
}
]

const rowEvents = {
  onClick: (e, row) => {
    if (row.students.length>0 || row.users.length){
    setModalInfo(row)
    toggleTrueFalse()
    }
  }
}

const toggleTrueFalse = () => {
  setShowModal(handleOpen)
}

function studentsFormatter(cell, row) {
  if (row.students.length>0) {
    return (
      <>
        <p>{row.students.length}</p>
      </>
    )
  } else {
    return (
      <p>No tiene estudiantes asignados</p>  
    )
  }
}

function courseFormatter(cell, row) {
  return (
    <span>
      <ClassIcon color='primary'></ClassIcon>{row.idCourse}
    </span>
  )
}

function teachersFormatter(cell, row) {
  if (row.users.length>0) {
    return (
      <>
        <p>{row.users.length}</p>
      </>
    )
  } else {
    return (
      <p>No tiene profesores asignados</p>  
    )
  }
}

  return (
    <>
    <h1 className='text-center'>LISTADO DE CURSOS</h1>
      <BootstrapTable
      classes="table-dark"
      keyField='idCourse'
      data={coursesList}
      columns={columns}
      striped
      rowEvents={rowEvents}
      pagination={paginationFactory({sizePerPage: 5})}
      >
      </BootstrapTable>
      {show ? <StudentsModal show={show} onHide={handleClose} idCourse={modalInfo.idCourse} coursename={modalInfo.name} students={modalInfo.students} user={user} teachers={modalInfo.users}/> : null}
      <Table className='table table-dark'>
        <tbody>
        {user && user.role === 'ADMIN' ? <AdminPanel setCreateCourseModal={setCreateCourseModal}></AdminPanel> : null}
        </tbody>
      </Table>
      <CreateCourseModal
        show={createCourseModal}
        onHide={() => setCreateCourseModal(false)}
        token={user.token}
      >
      </CreateCourseModal>

</>
  )
}

export default Courses