import { Students } from '../../interfaces/Students'
import Profile from '../../assets/images/profile.png'
import styles from '../Card/card.module.scss'
import { ApiMethods } from '../../redux/http-provider'
import React from 'react'

const Card: React.FC<Students> = ({
  name,
  surname,
  status,
  id,
  DNI,
  nationality,
  courses,
}: Students) => {
  const handleOnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (event && event.target) {
      try {
        ApiMethods.Delete(
          '/students',
          Number((event.target as HTMLButtonElement).value),
        )
        return alert('Please, press F5')
      } catch (e) {
        throw e
      }
    }
  }

  return (
    <div key={DNI} className={styles.divCard}>
      <div className={styles.line}>
        <div className={styles.user}>
          <div className={styles.profile}>
            <img alt='ProfilePicture' src={Profile}></img>
          </div>
          <div className={styles.details}>
            <h3 className={styles.name}>{name}</h3>
            <h3 className={styles.surname}>{surname}</h3>
          </div>
        </div>

        <div className={styles.status}>
          {status === 'Enrolled' ? (
            <span className={styles.enrolled}></span>
          ) : status === 'NotEnrolled' ? (
            <span className={styles.nomatriculado}></span>
          ) : (
            <span className={styles.retirado}></span>
          )}
          <p>{status}</p>
        </div>
        <div className={styles.DNI}>
          <span></span>
          <p>{DNI}</p>
        </div>
        <div className={styles.nationality}>
          <span></span>
          <p>{nationality}</p>
        </div>
        <div className={styles.c}>
          <div className={styles.coursesIds}>
            {courses.map((f:{[key:string]:string}) => (
              <p key={f.id}>{`${f.title} ,`}</p>
            ))}
          </div>
        </div>
        <div className={styles.buttons}>
          <span></span>
          <button
            className={styles.buttons__delete}
            value={Number(id)}
            onClick={handleOnClick}>
            X
          </button>

          <a href={`../admin/${id}`}>
            <button type='button' className={styles.buttons__info}>
              info
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}
/*
 onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handleOnClick(e)
            }*/
export default Card
