import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post('http://localhost:4000/login', {email,password});
      setUser(data);
      alert('Login successful');
      navigate('/')
    } catch (error) {
      alert('Login failed');
    }
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
        <div className='mb-64'>
            <h1 className='text-4xl text-center mb-4'>Login</h1>
            <form className='max-w-md mx-auto' action="" onSubmit={handleSubmit}>
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
                <button className='primary'>Login</button>
                <div className='text-center py-2 text-gray-500'>
                    Don't Have An Account Yet?
                    <br />
                    <Link to={'/Register'} className='underline text-black'>Register</Link>
                </div>
            </form>
        </div>        
    </div>
  )
}

export default LoginPage