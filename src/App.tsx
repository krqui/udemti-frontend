import { Routes, Route, BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import LandingPage from './components/LandingPage/LandingPage'
import Enrolment from './components/Enrolment/Enrolment'
import './App.css'
import 'bulma/css/bulma.min.css'
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<LandingPage></LandingPage>}></Route>
          <Route path='/courses' element={<Home></Home>}></Route>
          <Route path='/enroll' element={<Enrolment></Enrolment>}></Route>
        </Routes>
        {/*<Footer></Footer>*/}
      </BrowserRouter>
    </div>
  )
}

export default App
