import React from "react";

import LogoutIcon from '@mui/icons-material/Logout';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { UserContext } from '../../helpers/AuthContext';
import { Link, Navigate, useNavigate } from "react-router-dom";
import SchoolIcon from '@mui/icons-material/School';


const Header = () => {
  const navigate = useNavigate()
  const { user,setUser } = React.useContext(UserContext)

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    navigate("/")

  }

  return (
    <nav className="navbar fixed-top navbar-dark bg-dark">
      <span className="navbar-brand mb-0 h1" style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 10}}>
        <Link className="nav-link text-white" to="">Classroom <SchoolIcon color='primary'/></Link>
        </span>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link className="nav-link text-white" to="">Menú</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="teachers">Profesorado</Link>
        </li>
        <li className="nav-item" >
          <Link className="nav-link text-white" to="students">Calificar</Link>
        </li>
        <li className="nav-item">
        <DropdownButton style={{ marginRight: 10}} variant="warning" id="dropdown-basic-button" title={user?.email}>
          <Dropdown.Item><Link style={{textDecoration:'none'}} to='profile'>Mi perfil</Link></Dropdown.Item>
          <Dropdown.Item><Link style={{textDecoration:'none'}} to='my_courses'>Mis cursos</Link></Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
        </DropdownButton>
        </li>
      </ul>
    </nav>
  );
};
  
export default Header;