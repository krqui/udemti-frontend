import axios from 'axios'
import { Dispatch } from 'redux'
import { getFilters, getStudents, searchStudent } from '../slices/studentsSlice'
import { getCourses } from '../slices/coursesSlice'

const fetchAllStudents = () => (dispatch: Dispatch) => {
  axios
    .get('/students')
    .then(response => {
      dispatch(getStudents(response.data))
    })
    .catch(error => console.log(error))
}

const fetchStudentsByName = (name: string) => (dispatch: Dispatch) => {
  axios
    .get(`/students?name=${name}`)
    .then(response => {
      dispatch(searchStudent(response.data))
    })
    .catch(error => console.log(error))
}

const fetchAllCourses = () => (dispatch: Dispatch) => {
  axios
    .get('/courses')
    .then(response => {
      dispatch(getCourses(response.data))
    })
    .catch(error => console.log(error))
}

const fetchStudentsFilteredByCourses =
  (filters: { [key: string]: string }) => (dispatch: Dispatch) => {
    axios
      .get(`/students?course=${filters.course}`)
      .then(response => dispatch(getFilters(response.data)))
      .catch(error => console.log(error))
  }

export {
  fetchAllStudents,
  fetchStudentsByName,
  fetchAllCourses,
  fetchStudentsFilteredByCourses,
}
