import { Link } from 'react-router-dom'
import s from './LandingPage.module.scss'
const LandingPage = () => {
  return (
    <div className={s.containermax}>
      <div className={s.header}>
        <div className={s.header__container}>
          <h1 className={s.header__container__title}>Welcome to Udemti</h1>
          <h2 className={s.header__container__subtitle}>
            Please, select an option ...
          </h2>
        </div>
      </div>

      <div className={s.body}>
        <div className={s.picture}>
          <div className={s.picture__container}>
            <img src='https://res.cloudinary.com/dby5zzxin/image/upload/v1666667051/udemti/x9zs51niyv2uli5jq3ua.jpg'></img>
          </div>
        </div>

        <div className={s.options}>
          <div className={s.select__students} id='stails'>
            <button className={s.select__students__button}>
              <Link to='/courses'>Go to Students List</Link>
            </button>
          </div>
          <div className={s.select__register}>
            <button className={s.select__register__button}>
              <Link to='/enroll'>Register in a course.</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
