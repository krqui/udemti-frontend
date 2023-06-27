import React, { PropsWithChildren, FC, useEffect, useState } from 'react'
import { ReactFCWithChildren } from '../../redux/store'
import Swal, { SweetAlertResult } from 'sweetalert2'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { resetSearch } from '../../redux/slices/studentsSlice'
import {
  fetchAllStudents,
  //,
  fetchStudentsByParams,
} from '../../redux/thunks/studentsThunks'
import s from './searchbar.module.scss'

/*interface ISearchBar {
  children: ReactFCWithChildren
}*/

const SearchBar = () => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState<string>('')
  const [dni, setDNI] = useState<string>('')
  const { searchEmpty } = useAppSelector(state => state.students)

  const handleAlert = () => {
    Swal.fire(
      'Sorry!',
      'No students were found with this characteristic',
      'success',
    ).then((res: SweetAlertResult) => {
      if (res) {
        dispatch(resetSearch())
      }
    })
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleInput2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setDNI(e.target.value)
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (name.length === 0) {
      return Swal.fire(
        'Sorry,',
        'student name/surname is required',
        'error',
      ).then((res: SweetAlertResult) => {
        if (res) {
          dispatch(resetSearch())
        }
      })
    } else {
      e.preventDefault()
      dispatch(fetchStudentsByParams('name', name))
    }
  }

  const handleSubmit2 = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (dni.length === 0) {
      return Swal.fire('Sorry,', 'student DNI is required', 'error').then(
        (res: SweetAlertResult) => {
          if (res) {
            dispatch(resetSearch())
          }
        },
      )
    } else {
      e.preventDefault()
      dispatch(fetchStudentsByParams('dni', dni))
    }
  }
  const reset = () => {
    setName('')
    setDNI('')
    dispatch(fetchAllStudents())
  }

  const nothing = () => {
    return ''
  }

  return (
    <div className={s.search_precontainer}>
      <div className={s.search_container}>
        <input
          type='search'
          name='search'
          placeholder='Student name/surname...'
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

        <button className='button is-warning' onClick={e => reset()}>
          Reset
        </button>

        {`${searchEmpty ? handleAlert() : nothing()}`}
        {/* 
          ↑ Si no lo pongo entre corchetes, me sale un problema de react child perteneciente a React 18.2.0, el cual he tratado
          de resolverlo pero no me sale}. He probado con varias interfaces a asignar a esta funcion (SearchBar) con la propiedad children: 
      */}
      </div>
      <div className={s.search_container}>
        <input
          type='text'
          name='search'
          placeholder='Student DNI...'
          className={s.search_input}
          value={dni}
          onChange={e => handleInput2(e)}></input>

        <a className={s.search_btn}>
          <button
            className={s.search_btnn}
            type='submit'
            onClick={e => handleSubmit2(e)}>
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
    </div>
  )
}
export default SearchBar
