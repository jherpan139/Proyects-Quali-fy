import React from 'react'
import {UserContext} from '../../../helpers/AuthContext'
import getAllStudents from '../../../request/getAllStudents'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Student from './Student'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Add from '@mui/icons-material/AddCircleRounded'
import Delete from '@mui/icons-material/DeleteRounded'
import { useNavigate } from 'react-router-dom'
import Modify from '@mui/icons-material/ChangeCircleRounded'
import CreateStudentModal from './StudentAction/CreateStudent'
import Alert from 'react-bootstrap/Alert'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import getCourseTeachersReq from '../../../request/getCourseTeachers'
import PersonIcon from '@mui/icons-material/Person';

const listAllStudents = async (userToken) => {
  let studentsArray = []
  await getAllStudents(userToken)
  .then((students) => {
    studentsArray = studentsArray.concat(students.data)
  })
  .catch((err) => console.log(err))
  return studentsArray
}

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

const AdminPanel = (props) => {
  return (
    <>
    <tr style={{borderBottom: '2px solid #FFFFFF'}}></tr>
    <tr>
      <th scope='col' colSpan={7} className='text-center'><h4>STUDENT PANEL</h4></th>
    </tr>
    <tr>
        <th scope='col' colSpan={7} className='text-center'>
          <Button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={() => props.setCreateStudentModal(true)}><Add></Add></Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none' }}><Delete></Delete></Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none' }}><Modify></Modify></Button>
        </th> 
    </tr>
    </>
    )
}

const Qualify = () => {


  const [ createStudentModal, setCreateStudentModal] = React.useState(false)
  const { user } = React.useContext(UserContext) || JSON.parse(localStorage.getItem('user'))
  const [studentsList, setStudentsList] = React.useState([])
  const [modalInfo, setModalInfo] = React.useState([])
  const [showModal, setShowModal] = React.useState(false)
  const [show, setShow] = React.useState(false)
  const [isTeacher, setIsTeacher] = React.useState(false)
  const [isTutor, setIsTutor] = React.useState(false)
  const [showAlert, setShowAlert] = React.useState(false)

  const navigate = useNavigate()

  const handleClose = () => setShow(false)
  const handleOpen = () => setShow(true)


  React.useEffect(async () => {
    const students = await listAllStudents(user.token)
    setStudentsList(students)
  },[])

  const { SearchBar } = Search;

  function studentsFormatter(cell, row) {
    return (
    <span>
      <PersonIcon color='primary'></PersonIcon> {row.idStudent}
    </span>
    )
  }

  const columns=[{
    dataField:"idStudent",
    text:"#",
    sort: true,
    searchable: false,
    formatter: studentsFormatter
  },
  {
    dataField:"name",
    text:"Nombre",
    sort: true
  },
  {
    dataField:"surnames",
    text:"Apellidos",
    sort: true
  },
  {
    dataField:"dni",
    text:"DNI",
    searchable: false
  },
  {
    dataField:"email",
    text:"Email",
    searchable: false
  },
  {
    dataField:"course.name",
    text:"Curso",
    searchable: false
  }

  ]
  
  const rowEvents = {
    onClick: async (e, row) => {
      const { isTeacher, isTutor } = await getCourseTeachers(user, row.idCourse)
      setIsTeacher(isTeacher)
      setIsTutor(isTutor)
      if (isTeacher){
      navigate('qualify', {state: {student: row, tutor: isTutor}})
      } else {
          setShowAlert(true)
      }

    }
  }
  
  
    return (
      <>

        <ToolkitProvider
         keyField='idStudent'
         data={studentsList}
         columns={columns}
         search
        >
          { props => (
             <div>
             <SearchBar { ...props.searchProps }
                className="asa"
                style={ { color: 'white', backgroundColor: 'black' } }
                placeholder="Busca un alumno por nombre o apellidos"
             />
             <hr />
             <h1 className='text-center'>LISTADO DE ESTUDIANTES</h1>
             <BootstrapTable
                classes="table-dark"
                pagination={paginationFactory({sizePerPage: 5})}
                striped
                rowEvents={rowEvents}
               { ...props.baseProps }
             />
           </div>
          )}
        </ToolkitProvider>

        <Table className='table table-dark'>
          <tbody>
          {user && user.role === 'ADMIN' ? <AdminPanel setCreateStudentModal={setCreateStudentModal}></AdminPanel> : null}
          </tbody>
        </Table>
        <CreateStudentModal
          show={createStudentModal}
          onHide={() => setCreateStudentModal(false)}
          token={user.token}
        >
        </CreateStudentModal>
        <div className='d-flex justify-content-center'>
        {showAlert ?  <Alert variant="danger" onClose={() =>{ setShowAlert(false)}} dismissible>Oops! No es tu alumno...</Alert>: null}
        </div>
  </>
    )
  }

export default Qualify