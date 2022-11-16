import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Students } from '../../interfaces/Students'

interface StudentState {
  students: Students[]
  studentsById: {}
  searchEmpty: boolean
  filterEmpty: boolean
  studentsCopy: Students[]
  filterObject: { [key: string]: string }
}

const initialState: StudentState = {
  students: [],
  studentsCopy: [],
  studentsById: {},
  searchEmpty: false,
  filterEmpty: false,
  filterObject: {},
}

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    getStudents(state, action: PayloadAction<[]>) {
      state.students = action.payload
    },
    getStudentsById(state, action) {
      state.studentsById = action.payload
    },
    searchStudent(state, action: PayloadAction<[]>) {
      if (action.payload.length === 0) {
        state.searchEmpty = true
        state.students = action.payload
      } else {
        state.searchEmpty = false
        state.students = action.payload
      }
    },
    resetSearch: state => {
      state.students = state.studentsCopy
      state.searchEmpty = false
    },
    getFilters(state, action) {
      if (action.payload.length === 0) {
        state.filterEmpty = true
        state.students = action.payload
      } else {
        state.filterEmpty = false
        state.students = action.payload
      }
    },
    saveFilterObject(state, action) {
      state.filterObject[action.payload.key] = action.payload.value
    },
    resetFilters(state) {
      state.filterObject = {}
    },
    resetObjectFilter: state => {
      state.filterObject = {}
    },
  },
})

export const {
  getStudents,
  getStudentsById,
  searchStudent,
  resetSearch,
  saveFilterObject,
  getFilters,
  resetObjectFilter,
  resetFilters,
} = studentSlice.actions

export default studentSlice.reducer
