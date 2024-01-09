import React, { useState } from 'react'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/register', {
        name,
        email,
        password,
      });
      alert('Registration successful. Now you can log in');
      navigate('/')
    } catch (err) {
      alert('Registration failed. Please try again later');
    }
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form className='max-w-md mx-auto' action="" onSubmit={registerUser}>
          <input
            type="text"
            placeholder='Arun'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder='your@email.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='primary'>Register</button>
          <div className='text-center py-2 text-gray-500'>
            Already a member?
            <br />
            <Link to={'/Login'} className='underline text-black'>Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage