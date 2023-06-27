import { useState } from 'react'
import { Students } from '../../interfaces/Students'
import Pagination from '../Pagination/Pagination'
import Card from '../Card/Card'
import { Triangle } from 'react-loader-spinner'
import styles from './studentsList.module.scss'

interface Props {
  students: Students[]
}

export const data = [
  {
    Component: Triangle,
    props: {
      color: '#B881FF',
    },
    name: 'Triangle',
  },
]

const StudentsList = ({ students }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const studentsPerPage = 10;
  const lastIndex = currentPage * studentsPerPage
  const firstIndex = lastIndex - studentsPerPage
  const currentStudents = students.slice(firstIndex, lastIndex)
  // console.log(currentStudents);
  // If the current page number is higher than the total of pages, and we aren't in page 1 ...
  // Means that if we apply a filter which renders a max of 6 pages and we were on page 7, we'll be redirected to page 1.
  if (
    currentPage > Math.ceil(students.length / studentsPerPage) &&
    currentPage !== 1
  ) {
    setCurrentPage(1)
  }

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <div className={styles.Pagination}>
        <Pagination
          studentsPerPage={studentsPerPage}
          students={students}
          changePage={changePage}
          currentPage={currentPage}>
          </Pagination>
      </div>

      <div className={styles.box}>
        <div className={styles.box__headers}>
          <div className={styles.box__headers__item}>
            <div className={styles.titless}>
              <p className={styles.titless__name}>Name/Surname</p>
              <p className={styles.titless__status}>Status</p>
              <p className={styles.titless__dni}>DNI</p>
              <p className={styles.titless__nationality}>Nationality</p>
              <p className={styles.titless__courses}>Courses</p>
            </div>
          </div>
        </div>

        <div className={styles.box__elements}>
          {currentStudents?.length === 0 && (
            <div>
              {data.map((loader, index) => (
                <div className={styles.loading} data-tip={loader.name}>
                  <loader.Component {...loader.props} />
                </div>
              ))}
            </div>
          )}
          {currentStudents.map(e => {
            return (
              <Card
                key={e.DNI}
                name={e.name}
                surname={e.surname}
                status={e.status}
                birthdate={e.birthdate}
                DNI={e.DNI}
                createdAt={e.createdAt}
                nationality={e.nationality}
                courses={e.courses}
                id={e.id}></Card>
            )
          })}
        </div>
      </div>

      <div className={styles.Pagination}>
        <Pagination
          studentsPerPage={studentsPerPage}
          students={students}
          changePage={changePage}
          currentPage={currentPage}>
          </Pagination>
      </div>
    </>
  )
}

export default StudentsList