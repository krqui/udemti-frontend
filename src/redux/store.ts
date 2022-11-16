import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import studentsSlice from './slices/studentsSlice'
import React, { PropsWithChildren } from 'react'
import coursesSlice from './slices/coursesSlice'

const store = configureStore({
  reducer: {
    students: studentsSlice,
    courses: coursesSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ReactFCWithChildren = React.FC<PropsWithChildren>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
