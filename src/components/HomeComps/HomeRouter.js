import { Routes, Route } from "react-router-dom";
import React from 'react'
import User from "./User"
import Courses from "./CoursesComp/Courses"
import Students from "./QualifyStudentComp/Students"
import HomeUserMenu from "./HomeUserMenu"
import Teachers from "./TeachersComp/Teachers";
import QualifyMenu from "./QualifyStudentComp/QualifyMenu";


const HomeRouter = () => {
  return (
    <Routes>
          <Route path="students" element={<Students/>}></Route>
          <Route path="/" element={<Courses/>}></Route>
          <Route path="profile" element={<HomeUserMenu/>}></Route>
          <Route path="teachers" element={<Teachers/>}></Route>
          <Route path="students/qualify" element={<QualifyMenu/>}></Route>
    </Routes>
  )
}

export default HomeRouter