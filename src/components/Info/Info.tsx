import styles from './info.module.scss'
interface Datos {
  name: string
  surname: string
  status: string
  birthdate: string
  nationality: string
  DNI: number
  createdAt: string
  updatedAt: string
  courses: [string]
}
const Info = ({ name, surname, birthdate, nationality, DNI }: Datos) => {
  return (
    <div className={styles.student}>
      <h3 className={styles.student__title}>Current student information</h3>
      <div className={styles.student__props}>
        <p className={styles.student__props__name}>Name: {name}</p>
        <p className={styles.student__props__surname}>Surname: {surname}</p>
        <p className={styles.student__props__birthdate}>Birthdate: {birthdate}</p>
        <p className={styles.student__props__nationality}>Nationality: {nationality}</p>
        <p className={styles.student__props__DNI}>DNI: {DNI}</p>
      </div>
    </div>
  )
}

export default Info
