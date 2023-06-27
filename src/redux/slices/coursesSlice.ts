import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Courses } from '../../interfaces/Courses'

interface CourseState {
  courses: Courses[]
}

const initialState: CourseState = {
  courses: [],
}

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    getCourses(state, action: PayloadAction<[]>) {
      state.courses = action.payload
    },
  },
})

export const { getCourses } = coursesSlice.actions

export default coursesSlice.reducer
