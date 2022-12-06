import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  fetchAllCourses,
  fetchStudentsById,
} from '../../redux/thunks/studentsThunks'
import { Input, Nombres } from '../Enrolment/model'
import axios from 'axios'
import sss from '../Admin/admin.module.scss'
import Info from '../Info/Info'
let norepeat2: [number] = [0]
const Admin = () => {
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
  let currentEstud = studentsById.slice(0, 1)

  const [inputUpdate, setInputUpdate] = useState<Input>({
    name: '',
    surname: '',
    status: 'Enrolled',
    birthdate: '',
    nationality: '',
    DNI: 0,
    coursesIds: [],
  })
  console.log(inputUpdate)
  const [nombres2, setNombres2] = useState<Nombres>({
    abc: [],
  })

  function handleInput(e: any) {
    setInputUpdate({
      ...inputUpdate,
      [e.target.name]: e.target.value,
    })
  }

  const handleDNI = (e: any) => {
    setInputUpdate({
      ...inputUpdate,
      DNI: Number(e.target.value),
    })
  }

  const handleCourse = (e: any) => {
    e.preventDefault()
    if (norepeat2.includes(e.target.value)) {
      return ''
    } else {
      setInputUpdate({
        ...inputUpdate,
        coursesIds: [...inputUpdate.coursesIds, Number(e.target.value)],
      })
      norepeat2.push(e.target.value)
      console.log(`no repeat ahora contiene: ${norepeat2}`)
      console.log(`ya que se guardo el id ${e.target.value}`)
      let elnombre = courses[e.target.value - 1]
      console.log(elnombre)
      setNombres2({
        ...nombres2,
        abc: [...nombres2.abc, elnombre.title],
      })
    }
  }

  const resetCourses = (e: any) => {
    e.preventDefault()
    setInputUpdate({
      ...inputUpdate,
      coursesIds: [],
    })
    setNombres2({
      abc: [],
    })
    norepeat2 = [0]
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (inputUpdate.name === '') return alert('LLenar el formulario')
    axios.patch(`/students/update/${idnumber}`, inputUpdate)

    setInputUpdate({
      name: '',
      surname: '',
      status: '',
      birthdate: '',
      nationality: '',
      DNI: 0,
      coursesIds: [],
    })
    console.log(inputUpdate)
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
          <div>
            {currentEstud.map(e => {
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
          <div>
            <form autoComplete='off' onSubmit={e => handleSubmit(e)}>
              <div className={sss.enrolment__container__main__form__userbox}>
                <input
                  type='text'
                  name='name'
                  value={inputUpdate.name}
                  required
                  onChange={e => handleInput(e)}></input>
                <label>Name(s)</label>
              </div>
              <div className={sss.enrolment__container__main__form__userbox}>
                <input
                  type='text'
                  name='surname'
                  value={inputUpdate.surname}
                  onChange={e => handleInput(e)}
                  required></input>
                <label>Lastname(s)</label>
              </div>
              <div className={sss.enrolment__container__main__form__userbox}>
                <input
                  type='text'
                  name='birthdate'
                  value={inputUpdate.birthdate}
                  onChange={e => handleInput(e)}
                  required></input>
                <label>Birthdate</label>
              </div>
              <div className={sss.enrolment__container__main__form__userbox}>
                <input
                  type='text'
                  name='nationality'
                  value={inputUpdate.nationality}
                  onChange={e => handleInput(e)}
                  required></input>
                <label>Nationality</label>
              </div>
              <div className={sss.enrolment__container__main__form__userbox}>
                <input
                  type='text'
                  name='DNI'
                  value={inputUpdate.DNI}
                  onChange={e => handleDNI(e)}
                  required></input>
                <label>DNI</label>
              </div>
              <div className={sss.enrolment__container__main__form__userbox}>
                <p className={sss.course__title}>Course</p>
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
              </div>
              <div>
                <p className={sss.coursesselected}>
                  Los cursos seleccionados son:
                </p>
                {nombres2.abc &&
                  nombres2.abc.map(el => {
                    return <p className={sss.coursesselected__item}>{el}</p>
                  })}
                <p className={sss.coursesask}>
                  ¿Resetear los cursos seleccionados a matricular? Si la
                  respuesta es no, hacer caso omiso.
                </p>
                <button
                  type='button'
                  className='button is-info is-active'
                  onClick={e => resetCourses(e)}>
                  Si
                </button>
              </div>

              <div></div>
              <button className='submit' type='submit'>
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
    </div>
  )
}

export default Admin
