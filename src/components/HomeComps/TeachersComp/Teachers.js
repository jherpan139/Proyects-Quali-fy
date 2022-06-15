import React from 'react'
import {UserContext} from '../../../helpers/AuthContext'
import getAllUsers from '../../../request/getAllUsers'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Teacher from './Teacher'
import getAllCourses from '../../../request/getAllCourses'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Add from '@mui/icons-material/AddCircleRounded'
import Delete from '@mui/icons-material/DeleteRounded'
import Modify from '@mui/icons-material/ChangeCircleRounded'
import CreateTeacherModal from './TeacherAction/CreateTeacher'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import getCourseTeachersReq from '../../../request/getCourseTeachers'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CoursesModal from './ModalCourses'

const listAllUsers = async (userToken) => {
  let usersArray = []
  await getAllUsers(userToken)
  .then((users) => {
    usersArray = usersArray.concat(users.data)
  })
  .catch((err) => console.log(err))
  return usersArray
}

const listAllCourses = async(userToken) => {
  let coursesArray = []
  await getAllCourses(userToken)
  .then((courses) => {
    coursesArray = coursesArray.concat(courses.data)
  })
  .catch((err) => console.log(err))
  return coursesArray
}

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

const AdminPanel = (props) => {
  return (
    <>
    <tr style={{borderBottom: '2px solid #FFFFFF'}}></tr>
    <tr>
      <th scope='col' colSpan={5} className='text-center'><h4>TEACHERS PANEL</h4></th>
    </tr>
    <tr>
        <th scope='col' colSpan={5} className='text-center'>
          <Button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={() => props.showCreateTeacherModal(true)}><Add></Add></Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none' }}><Delete></Delete></Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none' }}><Modify></Modify></Button>
        </th> 
    </tr>
    </>
    )
}

const Teachers = () => {

  const { user } = React.useContext(UserContext) || JSON.parse(localStorage.getItem('user'))
  const [showCreateTeacherModal, setShowCreateTeacherModal] = React.useState(false)
  const [teachersList, setTeachersList] = React.useState([])
  const [coursesList, setCoursesList] = React.useState([])
  const [modalInfo, setModalInfo] = React.useState([])
  const [show, setShow] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [modalName, setModalName] = React.useState('')

  const handleClose = () => setShow(false)
  const handleOpen = () => setShow(true)

  React.useEffect(async () => {
    const users = await listAllUsers(user.token)
    const courses = await listAllCourses(user.token)
    setTeachersList(users)
    setCoursesList(courses)
  },[])

  const { SearchBar } = Search;
  

  function teachersFormatter(cell, row) {
    return (
      <span>
        <AdminPanelSettingsIcon color='primary'></AdminPanelSettingsIcon>{row.idUser}
      </span>
    )
  }

  const columns=[{
    dataField:"idUser",
    text:"#",
    sort: true,
    searchable: false,
    formatter: teachersFormatter
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
    dataField:"email",
    text:"Email",
    searchable: false
  },

  ]

  const toggleTrueFalse = () => {
    setShowModal(handleOpen)
  }
  
  const rowEvents = {
    onClick: async (e, row) => {
      console.log(row)
      const resp = await getCourseTeachers(user.token, row.idUser, coursesList)
      
      if (resp && resp.length>0){
        setModalInfo(resp)
        setModalName(row.name+' '+row.surnames)
        toggleTrueFalse()
      }
    }
  }

    return (
      <>
        <ToolkitProvider
         keyField='idUser'
         data={teachersList}
         columns={columns}
         search
        >
          { props => (
             <div>
             <SearchBar { ...props.searchProps }
                style={ { color: 'white', backgroundColor: 'black' } }
                placeholder="Busca un profesor por nombre o apellidos"
             />
             <hr />
             <h1 className='text-center'>LISTADO DE PROFESORES</h1>
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

        {show ? <CoursesModal show={show} onHide={handleClose} username={modalName} courses={modalInfo}/> : null}

        <Table className='table table-dark'>
          <tbody>
          {user && user.role === 'ADMIN' ? <AdminPanel showCreateTeacherModal={setShowCreateTeacherModal}></AdminPanel> : null}
          </tbody>
        </Table>
        <CreateTeacherModal
        show={showCreateTeacherModal}
        onHide={() => setShowCreateTeacherModal(false)}
        token={user.token}
        role={user.role}
        >
        </CreateTeacherModal>
  </>
    )
  

  }

export default Teachers