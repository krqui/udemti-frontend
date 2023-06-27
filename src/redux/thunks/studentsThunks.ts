import axios from 'axios'
import { Dispatch } from 'redux'
import {
  getFilters,
  getStudents,
  getStudentsById,
  searchStudent,
} from '../slices/studentsSlice'
import { getCourses } from '../slices/coursesSlice'
import { ApiMethods } from '../http-provider'

const fetchAllStudents = () => async (dispatch: Dispatch) => {
  try {
    const result = await ApiMethods.Get('/students')
    dispatch(getStudents(result))
  } catch (e) {
    throw e
  }
}

const fetchStudentsByParams =
  (query: string, uniqueparam: string) => async (dispatch: Dispatch) => {
    try {
      const result: [] = await ApiMethods.GetParams(
        '/students?',
        query,
        uniqueparam,
      )
      dispatch(searchStudent(result))
    } catch (e) {
      throw e
    }
  }

const fetchStudentsById = (id: number) => async (dispatch: Dispatch) => {
  try {
    const result: [] = await ApiMethods.GetById('/students', id)
    dispatch(getStudentsById(result))
  } catch (e) {
    throw e
  }
}

const fetchAllCourses = () => async (dispatch: Dispatch) => {
  try {
    const result = await ApiMethods.GetCourses('/courses')
    dispatch(getCourses(result))
  } catch (e) {
    throw e
  }
}

const fetchStudentsByFilters =
  (filters: { [key: string]: string }) => async (dispatch: Dispatch) => {
    try {
      const result = await ApiMethods.GetStudentsByFilters(
        '/students?',
        filters,
      )
      dispatch(getFilters(result))
    } catch (e) {
      throw e
    }
  }

export {
  fetchAllStudents,
  fetchStudentsByParams,
  fetchAllCourses,
  fetchStudentsByFilters,
  fetchStudentsById,
}
