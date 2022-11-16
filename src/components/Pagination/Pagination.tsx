import { Students } from '../../interfaces/Students'
import pp from './pagination.module.scss'
//import React, { Dispatch, ReactChild, SetStateAction } from 'react'
// Probé colocarle a asignarle a changePage los siguientes types:
//changePage: React.ChangeEvent<React.SetStateAction<number>>
//changePage: Dispatch<SetStateAction<number>>
//changePage:(pageNumber:number)=> void;
type Prups = {
  studentsPerPage: number
  students: Students[]
  changePage: any
  currentPage: number
  children: []
}
// Explicacion de por qué coloqué en prups (changePage:any)
// Aqui busqué y traté de pasar las propiedades de Pagination como props destructurados.
// Primero googlé y googlé pero no encontré respuesta para definir el tipado de setCurrentPage.
// Luego de ello, tuve otro problema, me arrojaba:
// Type {children: Element} has no properties in common with type IntrinsicAttributes & Props.
//
const Pagination = ({
  studentsPerPage,
  students,
  changePage,
  currentPage,
}: Prups) => {
  const pages = []

  const handlePrevious = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage >= 1) {
      changePage(currentPage + 1)
    }
  }

  for (let i = 0; i < Math.ceil(students.length / studentsPerPage); i++) {
    pages.push(i + 1)
  }
  return (
    <div className={pp.container}>
      <ul className={pp.container__ul}>
        <li>
          <span onClick={handlePrevious}>
            <i></i>
          </span>
        </li>
        {pages &&
          pages.map(page =>
            page === currentPage ? (
              <li className={pp.buttonContainer} key={page}>
                <button className='button is-link is-focused'>{page}</button>
              </li>
            ) : (
              <li className={pp.buttonContainer} key={page}>
                <button
                  className='button is-link is-focused'
                  onClick={() => changePage(page)}>
                  {page}
                </button>
              </li>
            ),
          )}
        <li>
          <span onClick={handleNext}>
            <i></i>
          </span>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
