export interface Students {
  name: string
  surname: string
  status: string
  birthdate: string
  createdAt: string
  nationality: string
  DNI: number
  courses: []
  id: number
}

export interface StudentsById {
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
