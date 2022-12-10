export interface Input {
  name: string
  surname: string
  status: string
  birthdate: string
  nationality: string
  DNI: number
  coursesIds: number[]
}

export interface Nombres {
  abc: string[]
}

export interface Teacher {
  isTeacher: boolean
}

export interface Course {
  title: string
}

export interface Errors {
  name: string
  surname: string
  birthdate: string
  nationality: string
  DNI: string
  coursesIds: string
  status: string
}
