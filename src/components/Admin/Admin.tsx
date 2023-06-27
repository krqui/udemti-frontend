import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  fetchAllCourses,
  fetchStudentsById,
} from '../../redux/thunks/studentsThunks'
import { Input, Nombres, Errors } from '../Enrolment/model'
import sss from '../Admin/admin.module.scss'
import Info from '../Info/Info'
import { ApiMethods } from '../../redux/http-provider'
let coursesInCache: [number] = [0]
const Admin: React.FC = () => {
  let { id } = useParams()
  const idnumber = Number(id)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllCourses())
    if (idnumber > 0) {
      dispatch(fetchStudentsById(idnumber))
    }
  }, [dispatch])

  const { courses } = useAppSelector((state: RootState) => state.courses)
  const { studentsById } = useAppSelector(state => state.students)
  const studentMatched = studentsById.slice(0, 1)

  const [inputUpdate, setInputUpdate] = useState<Input>({
    name: '',
    surname: '',
    status: 'Enrolled',
    birthdate: '',
    nationality: '',
    DNI: '',
    coursesIds: [],
  })
  const [newCoursesAdded, setNewCourses] = useState<Nombres>({
    abc: [],
  })
  const [Errors, setErrors] = useState<Errors>({
    name: '',
    surname: '',
    birthdate: '',
    nationality: '',
    DNI: '',
    coursesIds: '',
    status: '',
  })

  function validate(inputUpdate: Input) {
    let errors = {
      name: '',
      surname: '',
      birthdate: '',
      nationality: '',
      DNI: '',
      coursesIds: '',
      status: '',
    }
    if (inputUpdate.name[0] === ' ') {
      errors.name = 'Should not have space behind.'
    } else if (!inputUpdate.name) {
      errors.name = 'Missing name!'
    } else if (!/^([^0-9]*)$/.test(inputUpdate.name)) {
      errors.name = "You can't type numbers!"
    }
    if (inputUpdate.surname[0] === ' ') {
      errors.surname = 'Should not have space behind.'
    } else if (!inputUpdate.surname) {
      errors.surname = 'Missing surname!'
    } else if (!/^([^0-9]*)$/.test(inputUpdate.surname)) {
      errors.surname = "You can't type numbers!"
    }
    if (inputUpdate.birthdate[0] === ' ') {
      errors.birthdate = 'Should not have space behind!'
    } else if (!inputUpdate.birthdate) {
      errors.birthdate = 'Missing date!'
    } else if (
      !/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/.test(
        inputUpdate.birthdate,
      )
    ) {
      errors.birthdate = 'Wrong format!. Example: MM-DD-YYYY'
    }
    if (!inputUpdate.nationality) {
      errors.nationality = 'Missing nationality!'
    } else if (inputUpdate.nationality[0] === ' ') {
      errors.nationality = 'Should not have space behind!'
    } else if (!/^([^0-9]*)$/.test(inputUpdate.nationality)) {
      errors.nationality = "You can't type numbers!"
    }
    if (!inputUpdate.DNI) {
      errors.DNI = 'Missing DNI'
    } else if (inputUpdate.DNI[0] === ' ') {
      errors.DNI = 'Shoud not have space behind!'
    } else if (inputUpdate.DNI.length !== 8) {
      errors.DNI = 'DNI must have 8 digits'
    }
    if (inputUpdate.coursesIds.length < 2) {
      errors.coursesIds =
        'You must select at least Two (2) courses to register.'
    }
    if (!inputUpdate.status) {
      errors.status = 'You must select a payment option.'
    }

    return errors
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInputUpdate({
      ...inputUpdate,
      [e.target.name]: e.target.value,
    })
    setErrors(
      validate({
        ...inputUpdate,
        [e.target.name]: e.target.value,
      }),
    )
  }

  const handleDNI = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUpdate({
      ...inputUpdate,
      DNI: e.target.value,
    })
    setErrors(
      validate({
        ...inputUpdate,
        DNI: e.target.value,
      }),
    )
  }

  const handleCourse = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const idUpdatedCourse = Number((e.target as HTMLButtonElement).value)
    if (coursesInCache.includes(idUpdatedCourse)) {
      return ''
    } else {
      setInputUpdate({
        ...inputUpdate,
        coursesIds: [...inputUpdate.coursesIds, Number(idUpdatedCourse)],
      })
      setErrors(
        validate({
          ...inputUpdate,
          coursesIds: [...inputUpdate.coursesIds, Number(idUpdatedCourse)],
        }),
      )
      coursesInCache.push(idUpdatedCourse)
      //console.log(`no repeat ahora contiene: ${coursesInCache}`)
      //console.log(`ya que se guardo el id ${idUpdatedCourse}`)
      let courseJustAdded = courses[idUpdatedCourse - 1]
      setNewCourses({
        ...newCoursesAdded,
        abc: [...newCoursesAdded.abc, courseJustAdded.title],
      })
    }
  }

  const resetCourses = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setInputUpdate({
      ...inputUpdate,
      coursesIds: [],
    })
    setNewCourses({
      abc: [],
    })
    coursesInCache = [0]
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputUpdate.name === '') return alert('LLenar el formulario')
    try {
      ApiMethods.Patch('/students/update', idnumber, inputUpdate)
    } catch (e) {
      throw e
    }

    setInputUpdate({
      name: '',
      surname: '',
      status: '',
      birthdate: '',
      nationality: '',
      DNI: '',
      coursesIds: [],
    })
    return alert('created. Please press F5 to recharge the website')
  }

  return (
    <div className={sss.container}>
      <div className={sss.container__top}>
        <div className={sss.container__top__title}>
          <h2 className={sss.title}>You are in admin section</h2>
        </div>
        <div className={sss.container__top__subtitle}>
          <h3 className={sss.subtitle}>
            Please type your email and password to get access.
          </h3>
        </div>
      </div>
      <div className={sss.container__body}>
        <div className={sss.container__body__students}>
          <div className={sss.container__body__students__block}>
            {studentMatched.map(e => {
              return (
                <Info
                  name={e.name}
                  surname={e.surname}
                  status={e.status}
                  birthdate={e.birthdate}
                  nationality={e.nationality}
                  DNI={e.DNI}
                  createdAt={e.createdAt}
                  updatedAt={e.updatedAt}
                  courses={e.courses}></Info>
              )
            })}
          </div>
        </div>
        <div className={sss.container__body__update}>
          <div className={sss.container__body__update__block}>
            <form
              className={sss.update__form}
              autoComplete='off'
              onSubmit={e => handleSubmit(e)}>
              <h3 className={sss.update__form__title}>
                New student information
              </h3>
              <div className={sss.update__form__d}>
                <div className={sss.update__form__div}>
                  <input
                    className={sss.update__form__div__input}
                    type='text'
                    name='name'
                    value={inputUpdate.name}
                    required
                    onChange={e => handleInput(e)}></input>
                  {Errors.name && <p className={sss.error}>{Errors.name}</p>}
                </div>
                <div className={sss.update__form__div}>
                  <input
                    className={sss.update__form__div__input}
                    type='text'
                    name='surname'
                    value={inputUpdate.surname}
                    onChange={e => handleInput(e)}
                    required></input>
                  {Errors.surname && (
                    <p className={sss.error}>{Errors.surname}</p>
                  )}
                </div>
                <div className={sss.update__form__div}>
                  <input
                    className={sss.update__form__div__input}
                    type='text'
                    name='birthdate'
                    value={inputUpdate.birthdate}
                    onChange={e => handleInput(e)}
                    required></input>
                  {Errors.birthdate && (
                    <p className={sss.error}>{Errors.birthdate}</p>
                  )}
                </div>
                <div className={sss.update__form__div}>
                  <input
                    className={sss.update__form__div__input}
                    type='text'
                    name='nationality'
                    value={inputUpdate.nationality}
                    onChange={e => handleInput(e)}
                    required></input>
                  {Errors.nationality && (
                    <p className={sss.error}>{Errors.nationality}</p>
                  )}
                </div>
                <div className={sss.update__form__div}>
                  <input
                    className={sss.update__form__div__input}
                    type='text'
                    name='DNI'
                    value={inputUpdate.DNI}
                    onChange={e => handleDNI(e)}
                    required></input>
                  {Errors.DNI && <p className={sss.error}>{Errors.DNI}</p>}
                </div>
              </div>
              <div className={sss.update__form__courses}>
                <p className={sss.course__title}>To update: select your new courses.</p>
                <div
                  className={sss.enrolment__container__main__form__buttondiv}>
                  {courses &&
                    courses.map(cou => {
                      return (
                        <button
                          type='button'
                          className='button is-success is-active'
                          value={Number(cou.id)}
                          onClick={e => handleCourse(e)}>
                          {cou.title}
                        </button>
                      )
                    })}
                </div>
                {Errors.coursesIds && (
                  <p className={sss.error}>{Errors.coursesIds}</p>
                )}
              </div>
              <div className={sss.coursesselected}>
                <p className={sss.coursesselected__text}>
                  Los cursos seleccionados son:
                </p>
                {newCoursesAdded.abc &&
                  newCoursesAdded.abc.map(el => {
                    return <li className={sss.coursesselected__item}>{el}</li>
                  })}
                <p className={sss.coursesask}>
                  Do you want to reset the selected courses to register with us?
                  If not, please ignore this message.
                </p>
                <button
                  type='button'
                  className='button is-info is-active'
                  onClick={e => resetCourses(e)}>
                  Si
                </button>
              </div>

              <div></div>
              <button
                className='submit'
                type='submit'
                disabled={
                  !Errors.name &&
                  !Errors.surname &&
                  !Errors.birthdate &&
                  !Errors.DNI &&
                  !Errors.coursesIds &&
                  !Errors.status &&
                  !Errors.nationality
                    ? false
                    : true
                }>
                <a>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Submit
                </a>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className={sss.container__courses}></div>
    </div>
  )
}

export default Admin
