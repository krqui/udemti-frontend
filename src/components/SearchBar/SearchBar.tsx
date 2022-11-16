import React, { PropsWithChildren, FC, useEffect, useState } from 'react'
import { ReactFCWithChildren } from '../../redux/store'
import Swal from 'sweetalert2'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { resetSearch } from '../../redux/slices/studentsSlice'
import {
  fetchAllStudents,
  fetchStudentsByName,
} from '../../redux/thunks/studentsThunks'
import s from './searchbar.module.scss'

/*interface ISearchBar {
  children: ReactFCWithChildren
}*/

const SearchBar = () => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState<string>('')
  const { searchEmpty } = useAppSelector(state => state.students)

  const handleAlert = () => {
    Swal.fire(
      'Sorry!',
      'No students were found with this characteristic',
      'success',
    ).then((res: any) => {
      if (res) {
        dispatch(resetSearch())
      }
    })
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (name.length === 0) {
      return Swal.fire(
        'Sorry,',
        'student name/surname is required',
        'error',
      ).then((res: any) => {
        if (res) {
          dispatch(resetSearch())
        }
      })
    } else {
      e.preventDefault()
      dispatch(fetchStudentsByName(name))
    }
  }

  const reset = () => {
    setName('')
    dispatch(fetchAllStudents())
  }

  const nothing = () => {
    return ''
  }

  return (
    <div className={s.search_container}>
      <input
        type='text'
        name='search'
        placeholder='Student name...'
        className={s.search_input}
        value={name}
        onChange={e => handleInput(e)}></input>

      <a className={s.search_btn}>
        <button
          className={s.search_btnn}
          type='submit'
          onClick={e => handleSubmit(e)}>
          <i className='fas fa-search'></i>
        </button>
      </a>

      <button className='button is-warning ' onClick={e => reset()}>
        Reset
      </button>

      {`${searchEmpty ? handleAlert() : nothing()}`}
      {/* 
          ↑ Si no lo pongo entre corchetes, me sale un problema de react child perteneciente a React 18.2.0, el cual he tratado
          de resolverlo pero no me sale}. He probado con varias interfaces a asignar a esta funcion (SearchBar) con la propiedad children: 
      */}
    </div>
  )
}
export default SearchBar
