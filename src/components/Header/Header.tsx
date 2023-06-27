import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  resetFilters,
  resetObjectFilter,
  saveFilterObject,
} from '../../redux/slices/studentsSlice'
import {
  fetchAllCourses,
  fetchAllStudents,
  fetchStudentsByFilters,
} from '../../redux/thunks/studentsThunks'
import SearchBar from '../SearchBar/SearchBar'
import hstyles from './header.module.scss'
const Header = () => {
  const dispatch = useAppDispatch()
  const { courses } = useAppSelector(state => state.courses)
  const { students } = useAppSelector(state => state.students)
  const { filterObject } = useAppSelector(state => state.students)

  let filterValues = Object.values(filterObject)

  const nationalities = students.map(e => e.nationality)
  const nationalitiesReduced = nationalities.filter(function (ele, pos) {
    return nationalities.indexOf(ele) == pos
  })

  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    dispatch(
      saveFilterObject({
        key: e.currentTarget.name,
        value: e.currentTarget.value,
      }),
    )
  }

  const handleReset = () => {
    dispatch(resetObjectFilter())
    dispatch(resetFilters())
    dispatch(fetchAllStudents())
  }
  const handleFilters = () => {
    dispatch(fetchStudentsByFilters(filterObject))
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
          {/*TAREAS PENDIENTES:
          
              4. configurar para deployar el back
              5. mandar pull request del back
              7. mejorar css responsive
              8. subir el front a la nube*/}
          <li key='courses'>
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
          <li key='status'>
            Status
            <ul>
              <li key='status1'>
                <button
                  className='button is-danger'
                  name='status'
                  value='Enrolled'
                  onClick={handleOnClick}>
                  Enrolled
                </button>
              </li>
              <li key='status2'>
                <button
                  className='button is-danger'
                  name='status'
                  value='Disenrolled'
                  onClick={handleOnClick}>
                  Disenrolled
                </button>
              </li>
              <li key='status3'>
                <button
                  className='button is-danger'
                  name='status'
                  value='NotEnrolled'
                  onClick={handleOnClick}>
                  Notenrolled
                </button>
              </li>
            </ul>
          </li>
          <li key='nationality'>
            Nationality
            <ul>
              {nationalitiesReduced.map(e => (
                <li key={e}>
                  <button
                    className='button is-danger'
                    name='nationality'
                    value={e}
                    onClick={handleOnClick}>
                    {e}
                  </button>
                </li>
              ))}
            </ul>
          </li>
          <li key='sortname'>
            Sort by
            <ul>
              <li key='AZ'>
                <button
                  className='button is-danger'
                  value='AZ'
                  name='sortName'
                  onClick={handleOnClick}>
                  Name: from A to Z
                </button>
              </li>
              <li key='ZA'>
                <button
                  className='button is-danger'
                  value='ZA'
                  name='sortName'
                  onClick={handleOnClick}>
                  Name: from Z to A
                </button>
              </li>
              <li key='SAZ'>
                <button
                  className='button is-danger'
                  value='SAZ'
                  name='sortName'
                  onClick={handleOnClick}>
                  Surname: from A to Z
                </button>
              </li>
              <li key='SZA'>
                <button
                  className='button is-danger'
                  value='SZA'
                  name='sortName'
                  onClick={handleOnClick}>
                  Surname: from Z to A
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className={hstyles.toFilter}>
        <div className={hstyles.toFilter__box}>
          {filterValues.length ? (
            filterValues.map(filter => (
              <span className={hstyles.toFilter__box__button}>{filter}</span>
            ))
          ) : (
            <div className={hstyles.nofilter}>
              You have not selected any filters yet.
            </div>
          )}
        </div>
        {filterValues.length ? (
          <button onClick={handleFilters}>Filter</button>
        ) : null}
        {filterValues.length ? (
          <button onClick={handleReset}>Reset</button>
        ) : null}
      </div>
    </div>
  )
}
export default Header
