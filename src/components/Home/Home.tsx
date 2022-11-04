import sc from './home.module.scss'
import { useEffect } from 'react'
//redux
import { fetchAllStudents } from '../../redux/thunks/studentsThunks'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import StudentsList from '../StudentsList/StudentsList'
import Header from '../Header/Header'
const Home = () => {
  const dispatch = useAppDispatch()
  const { students } = useAppSelector(state => state.students)
  const { filterEmpty } = useAppSelector(state => state.students)

  useEffect(() => {
    if (students.length === 0 && !filterEmpty) dispatch(fetchAllStudents())
  }, [dispatch])

  return (
    <div className={sc.container}>
      <Header></Header>
      <StudentsList students={students}></StudentsList>
      <div className={sc.pagination}></div>
    </div>
  )
}

export default Home
