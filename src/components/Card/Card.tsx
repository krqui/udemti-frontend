import { Students } from '../../interfaces/Students'
import Profile from '../../assets/images/profile.png'
import styles from '../Card/card.module.scss'
import axios from 'axios'
const Card = ({
  name,
  surname,
  status,
  id,
  DNI,
  nationality,
  courses,
}: Students) => {
  const handleOnClick = (e: any) => {
    axios.delete(`/students/${e.target.value}`)
    return alert('Please, press F5')
  }

  return (
    <div key={DNI} className={styles.divCard}>
      <div className={styles.line}>
        <div className={styles.user}>
          <div className={styles.profile}>
            <img src={Profile}></img>
          </div>
          <div className={styles.details}>
            <h3 className={styles.name}>{name}</h3>
            <h3 className={styles.surname}>{surname}</h3>
          </div>
        </div>

        <div className={styles.status}>
          {status == 'Enrolled' ? (
            <span className={styles.enrolled}></span>
          ) : status == 'NotEnrolled' ? (
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
            {courses.map((f: any) => (
              <p key={f.id}>{`${f.title} ,`}</p>
            ))}
          </div>
        </div>
        <div className={styles.buttons}>
          <span></span>
          <button
            className={styles.buttons__delete}
            value={Number(id)}
            onClick={e => handleOnClick(e)}>
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

export default Card
