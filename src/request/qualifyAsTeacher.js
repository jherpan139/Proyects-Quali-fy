import axios from "axios";


const qualifyAsTeacher = (token, idUser, idStudent, finalGrade, overallComment, presentationGrade, presentationComment, documentationGrade, documentationComment,
    demonstrationGrade, demonstrationComment, questionsGrade, questionsComment, researchGrade, researchComment ) => {

    const headers = {
        'Authorization': token,
        'Accept-Version': '1.0.0',
        'Content-Type' : 'application/json'
    }
    const payload = {
        'idTeacher': idUser,
        'idStudent': idStudent,
        'final_grade': finalGrade,   
        'overall_comment': overallComment,
        'presentation_grade': presentationGrade,
        'presentation_comment': presentationComment,
        'documentation_grade': documentationGrade,
        'documentation_comment': documentationComment,
        'demonstration_grade': demonstrationGrade,
        'demonstration_comment': demonstrationComment,
        'questions_grade': questionsGrade,
        'questions_comment': questionsComment,
        'research_grade': researchGrade,
        'research_comment': researchComment
    }

    return axios.post('http://localhost:3000/api/grades/teacher/qualify', payload, {headers: headers})
}

export default qualifyAsTeacher