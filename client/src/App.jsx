
import { Routes, Route } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import { UserContextProvider } from './UserContext'
import axios from 'axios'
import ProfilePage from './pages/ProfilePage'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'
import PlacePage from './pages/PlacePage'
import BookingsPage from './pages/BookingsPage'
import BookingPage from './pages/BookingPage'

axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element = {<Layout />}>
          <Route path='/' element = {<IndexPage />}/>
          <Route path='/Login' element = {<LoginPage />} />
          <Route path='/Register' element={<RegisterPage />} /> 
          <Route path='/Profile' element = {<ProfilePage />} />
          <Route path='/Profile/Accommodations' element = {<PlacesPage />} />
          <Route path='/Profile/Accommodations/New' element = {<PlacesFormPage />} />
          <Route path='/Profile/Accommodations/:id' element = {<PlacesFormPage />} />
          <Route path='/Place/:id'element ={<PlacePage />} />
          <Route path='/Profile/Bookings' element={<BookingsPage />} />
          <Route path='/Profile/Bookings/:id' element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
    
  )
}

export default App
