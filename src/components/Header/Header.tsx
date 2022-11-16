import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  resetFilters,
  resetObjectFilter,
  saveFilterObject,
} from '../../redux/slices/studentsSlice'
import {
  fetchAllCourses,
  fetchStudentsFilteredByCourses,
} from '../../redux/thunks/studentsThunks'
import SearchBar from '../SearchBar/SearchBar'
import hstyles from './header.module.scss'
const Header = () => {
  const dispatch = useAppDispatch()
  const { courses } = useAppSelector(state => state.courses)
  // const { filterEmpty } = useAppSelector(state => state.students)
  const { filterObject } = useAppSelector(state => state.students)

  let filterValues = Object.values(filterObject)

  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    dispatch(
      saveFilterObject({
        key: e.currentTarget.name,
        value: e.currentTarget.value,
      }),
    )
    console.log(filterValues)
  }

  const handleReset = () => {
    dispatch(resetObjectFilter())
    dispatch(resetFilters())
  }
  const handleFilters = () => {
    dispatch(fetchStudentsFilteredByCourses(filterObject))
  }

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(fetchAllCourses())
    }
  }, [dispatch])
  return (
    <div className={hstyles.headerContainer}>
      <SearchBar></SearchBar>
      <div className={hstyles.filtersContainer}>
        <ul>
          <li key='h'>
            Courses
            <ul>
              {courses.map(e => (
                <li key={e.id}>
                  <button
                    className='button is-danger'
                    name='course'
                    value={e.title}
                    onClick={handleOnClick}>{`${e.title}`}</button>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>

      <div className={hstyles.toFilter}>
        {filterValues.length
          ? filterValues.map(filter => (
              <div>
                <span>{filter}</span>
                <button onClick={handleFilters}>Filter</button>
                <button onClick={handleReset}>Reset</button>
              </div>
            ))
          : null}
      </div>
    </div>
  )
}
export default Header
