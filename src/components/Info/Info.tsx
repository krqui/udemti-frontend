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
const Info = ({
  name,
  surname,
  status,
  birthdate,
  nationality,
  DNI,
  createdAt,
  updatedAt,
  courses,
}: Datos) => {
  return (
    <div>
      <p>{name}</p>
      <p>{surname}</p>
      <p>{status}</p>
      <p>{birthdate}</p>
      <p>{nationality}</p>
      <p>{DNI}</p>
    </div>
  )
}

export default Info
