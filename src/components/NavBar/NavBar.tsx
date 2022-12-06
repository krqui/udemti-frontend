import { Link } from 'react-router-dom'
import ss from './navBar.module.scss'
const NavBar = () => {
  return (
    <div className={ss.container}>
      <div className={ss.container__logo}>
        <Link to='../'>
          <p>Udemti Inc.</p>
        </Link>
      </div>
      <nav className={ss.nav}>
        <ul className={ss.nav__links}>
          <li>
            <a href='../'>Academics</a>
          </li>
          <li>
            <a href='../'>Research</a>
          </li>
          <li>
            <a href='../'>Campus</a>
          </li>
          <li>
            <a href='../'>About</a>
          </li>
          <li>
            <a href='../'>Intranet</a>
          </li>
        </ul>
      </nav>
      <div className={ss.nav__buttons}>
        <a className={ss.cta} href='/admin/0'>
          <button className={ss.cta__button}>Admin</button>
        </a>
        <a className={ss.cta} href='#'>
          <button className={ss.cta__button}>Contact</button>
        </a>
      </div>
    </div>
  )
}

export default NavBar
