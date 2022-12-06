import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { fetchAllCourses } from '../../redux/thunks/studentsThunks'
import { Input, Nombres, Teacher, Course, Errors } from './model'
import axios from 'axios'
import su from '../Enrolment/enrolment.module.scss'
let norepeat: [number] = [0]
let valueBoolean = false

const Enrolment: React.FC = () => {
  const dispatch = useAppDispatch()
  const [input, setInput] = useState<Input>({
    name: '',
    surname: '',
    status: '',
    birthdate: '',
    nationality: '',
    DNI: 0,
    coursesIds: [],
  })
  const [nombres, setNombres] = useState<Nombres>({
    abc: [],
  })

  const [teacher, setTeacher] = useState<Teacher>({
    isTeacher: false,
  })
  const [newCourse, setNewCourse] = useState<Course>({
    title: '',
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

  const { courses } = useAppSelector((state: RootState) => state.courses)
  const { students } = useAppSelector((state: RootState) => state.students)

  useEffect(() => {
    dispatch(fetchAllCourses())
  }, [dispatch])

  function validate(input: any) {
    let errors = {
      name: '',
      surname: '',
      birthdate: '',
      nationality: '',
      DNI: '',
      coursesIds: '',
      status: '',
    }
    if (input.name[0] === ' ') {
      errors.name = 'Should not have space behind.'
    } else if (!input.name) {
      errors.name = 'Missing name!'
    } else if (!/^([^0-9]*)$/.test(input.name)) {
      errors.name = "You can't type numbers!"
    }
    if (input.surname[0] === ' ') {
      errors.surname = 'Should not have space behind.'
    } else if (!input.surname) {
      errors.surname = 'Missing surname!'
    } else if (!/^([^0-9]*)$/.test(input.surname)) {
      errors.surname = "You can't type numbers!"
    }
    if (input.birthdate[0] === ' ') {
      errors.birthdate = 'Should not have space behind!'
    } else if (!input.birthdate) {
      errors.birthdate = 'Missing date!'
    } else if (
      !/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/.test(
        input.birthdate,
      )
    ) {
      errors.birthdate = 'Wrong format!. Example: MM-DD-YYYY'
    }
    if (!input.nationality) {
      errors.nationality = 'Missing nationality!'
    } else if (input.nationality[0] === ' ') {
      errors.nationality = 'Should not have space behind!'
    } else if (!/^([^0-9]*)$/.test(input.nationality)) {
      errors.nationality = "You can't type numbers!"
    }
    if (!input.DNI) {
      errors.DNI = 'Missing DNI'
    } else if (input.DNI[0] === ' ') {
      errors.DNI = 'Shoud not have space behind!'
    } else if (input.DNI.length !== 8) {
      errors.DNI = 'DNI must have 8 digits'
    }
    if (input.coursesIds.length < 2) {
      errors.coursesIds =
        'You must select at least Two (2) courses to register.'
    }
    if (!input.status) {
      errors.status = 'You must select a payment option.'
    }

    return errors
  }

  function handleInput(e: any) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      }),
    )
  }

  const handleDNI = (e: any) => {
    setInput({
      ...input,
      DNI: Number(e.target.value),
    })
    setErrors(
      validate({
        ...input,
        DNI: e.target.value,
      }),
    )
  }

  const handleCourse = (e: any) => {
    e.preventDefault()
    if (norepeat.includes(e.target.value)) {
      return ''
    } else {
      setInput({
        ...input,
        coursesIds: [...input.coursesIds, Number(e.target.value)],
      })
      setErrors(
        validate({
          ...input,
          coursesIds: [...input.coursesIds, Number(e.target.value)],
        }),
      )
      norepeat.push(e.target.value)
      console.log(`no repeat ahora contiene: ${norepeat}`)
      console.log(`ya que se guardo el id ${e.target.value}`)
      let elnombre = courses[e.target.value - 1]
      console.log(elnombre)
      setNombres({
        ...nombres,
        abc: [...nombres.abc, elnombre.title],
      })
    }
  }

  const resetCourses = (e: any) => {
    e.preventDefault()
    setInput({
      ...input,
      coursesIds: [],
    })
    setNombres({
      abc: [],
    })
    norepeat = [0]
  }
  const handleStatus = (e: any) => {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      }),
    )
  }
  const handleTeacher = (e: any) => {
    e.preventDefault()
    if (e.target.value === 'true') {
      valueBoolean = true
      console.log(`El valor ingresado es ${valueBoolean}`)
    } else if (e.target.value === 'false') {
      valueBoolean = false
      console.log(`El valor ingresado es ${valueBoolean}`)
    }
    setTeacher({
      isTeacher: valueBoolean,
    })
  }
  const handleRegisterCourse = (e: any) => {
    e.preventDefault()
    let noSpaces = e.target.value.replaceAll(' ', '-')
    console.log(noSpaces)
    setNewCourse({
      title: noSpaces,
    })
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (input.name === '') return alert('LLenar el formulario')
    axios.post('/students', input)

    setInput({
      name: '',
      surname: '',
      status: '',
      birthdate: '',
      nationality: '',
      DNI: 0,
      coursesIds: [],
    })
    return alert('created')
  }
  const handleSubmitCourse = (e: any) => {
    e.preventDefault()
    if (newCourse.title === '') return alert('Llena el input')
    axios.post('courses/createCourse', newCourse)

    setNewCourse({
      title: '',
    })
    return alert('course created')
  }
  return (
    <div className={su.enrolment__container}>
      <div className={su.enrolment__container__main}>
        <div className={su.enrolment__container__main__title}>
          <h2 className={su.enrolment__title}>Register now! Fill the form!</h2>
          <h3 className={su.enrolment__subtitle}>
            If you register before Christmas, you will receive a special
            discount.
          </h3>
        </div>
        <div className={su.enrolment__container__main__form}>
          <h2>Fill the following field with information about you</h2>
          <form autoComplete='off' onSubmit={e => handleSubmit(e)}>
            <div className={su.enrolment__container__main__form__userbox}>
              <input
                type='text'
                name='name'
                value={input.name}
                required
                onChange={e => handleInput(e)}></input>
              <label>Name(s)</label>
              {Errors.name && <p className={su.error}>{Errors.name}</p>}
            </div>
            <div className={su.enrolment__container__main__form__userbox}>
              <input
                type='text'
                name='surname'
                value={input.surname}
                onChange={e => handleInput(e)}
                required></input>
              <label>Lastname(s)</label>
              {Errors.surname && <p className={su.error}>{Errors.surname}</p>}
            </div>
            <div className={su.enrolment__container__main__form__userbox}>
              <input
                type='text'
                name='birthdate'
                value={input.birthdate}
                onChange={e => handleInput(e)}
                required></input>
              <label>Birthdate</label>
              {Errors.birthdate && (
                <p className={su.error}>{Errors.birthdate}</p>
              )}
            </div>
            <div className={su.enrolment__container__main__form__userbox}>
              <input
                type='text'
                name='nationality'
                value={input.nationality}
                onChange={e => handleInput(e)}
                required></input>
              <label>Nationality</label>
              {Errors.nationality && (
                <p className={su.error}>{Errors.nationality}</p>
              )}
            </div>
            <div className={su.enrolment__container__main__form__userbox}>
              <input
                type='text'
                name='DNI'
                value={input.DNI}
                onChange={e => handleDNI(e)}
                required></input>
              <label>DNI</label>
              {Errors.DNI && <p className={su.error}>{Errors.DNI}</p>}
            </div>
            <div className={su.enrolment__container__main__form__userbox}>
              <p className={su.course__title}>Course</p>
              <div className={su.enrolment__container__main__form__buttondiv}>
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
                <p className={su.error}>{Errors.coursesIds}</p>
              )}
            </div>
            <div>
              <p className={su.coursesselected}>Courses selected are:</p>
              {nombres.abc &&
                nombres.abc.map(el => {
                  return <p className={su.coursesselected__item}>{el}</p>
                })}
              <p className={su.coursesask}>
                Do you want to reset the selected courses to enroll with us? If
                not, ignore this message.
              </p>
              <button
                type='button'
                className='button is-info is-active'
                onClick={e => resetCourses(e)}>
                Yes
              </button>
            </div>
            <div className={su.enrolment__container__main__form__userbox}>
              <p className={su.course__title}>Pay now? or Pay later?</p>
              <div className={su.enrolment__container__main__form__buttondiv2}>
                <button
                  type='button'
                  name='status'
                  className='button is-info is-active'
                  value='Enrolled'
                  onClick={e => handleStatus(e)}>
                  Pay now.
                </button>
                <button
                  type='button'
                  name='status'
                  className='button is-info is-active'
                  value='NotEnrolled'
                  onClick={e => handleStatus(e)}>
                  Pay later.
                </button>
                {Errors.status && <p className={su.error}>{Errors.status}</p>}
                {input.status == '' ? (
                  <p></p>
                ) : input.status == 'Enrolled' ? (
                  <p className={su.payment}>You have selected to pay now.</p>
                ) : (
                  <p className={su.payment}>
                    You have selected to pay later. You must visit us no later
                    than January 2 to make the payment at our headquarters.
                  </p>
                )}
              </div>
            </div>
            <button
              className={su.submit}
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
              {/*The "Button" is "rendered: by <a> */}
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
        <div className={su.teacher}>
          <p className={su.teacher__title}>
            Are you a teacher and want to implement your course?
          </p>
          <div className={su.teacher__container}>
            <div className={su.teacher__container__button}>
              <button
                type='button'
                value='true'
                className='button is-link is-focused'
                onClick={e => handleTeacher(e)}>
                Yes
              </button>
              <button
                type='button'
                value='false'
                className='button is-link is-focused'
                onClick={e => handleTeacher(e)}>
                No
              </button>
            </div>
            {teacher.isTeacher == false ? (
              <p className={su.teacher__container__option}></p>
            ) : (
              <div className={su.teacher__container__input}>
                <form autoComplete='off' onSubmit={e => handleSubmitCourse(e)}>
                  <input
                    type='text'
                    placeholder='Please, type your course name.'
                    value={newCourse.title}
                    required
                    onChange={e => handleRegisterCourse(e)}></input>
                  <button
                    className={su.teacher__container__input__submit}
                    type='submit'>
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Enrolment
