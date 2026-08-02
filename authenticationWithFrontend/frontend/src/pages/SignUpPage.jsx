import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'

function SignUpPage({setUser}) {
    const [form, setForm] = useState({
        "firstname" : "",
        "lastname" : "",
        "email" : '',
        "password" : '',
    })
    const [error, setError] = useState("")
    
    
    
    
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
         if (!form.email || !form.password) {  
        setError('please fill all fields')
        return
            }
        try {
            const res = await axios.post('http://localhost:8000/user/signup', form)
console.log('signup response:', res.data)  

            localStorage.setItem('token', res.data.data.token) 

            setUser(res.data.data.user)
            navigate('/')
        } catch (error) {
            console.log('error:', error)
            setError('invalid credentials')
        }
    }
  return (
    <div className='h-screen w-full flex justify-center items-center '>
        <div className='bg-neutral-300 rounded-lg  w-lg  shadow-2xl shadow-neutral-800 p-5 flex flex-col items-center'>
            <div className='flex gap-4 mt-6  text-2xl'>
                    <NavLink to='/login' className={({isActive}) => isActive?"font-bold text-black": "text-gray-500"} >LOGIN</NavLink>
                    <NavLink to='/signup' className={({isActive}) => isActive?"font-bold text-black": "text-gray-500"} >SIGNUP</NavLink>
            </div>
                <form className='flex flex-col items-center h-full gap-12' onSubmit={handleSubmit}>
                    
                    {error && <div className='text-red-500 mb-4'>{error}</div>}
                     
                    <div className='flex justify-center items-center gap-10'>
                        <h1>First Name :</h1>
                        <input type="text" placeholder='john' className='bg-neutral-100 rounded-2xl px-4 py-2 w-70 outline-none'
                                value={form.firstname} onChange={(e) => setForm({...form, firstname : e.target.value})}/>
                    </div>
                    
                    
                    <div className='flex justify-center items-center gap-10'>
                        <h1>Last Name :</h1>
                        <input type="text" placeholder='martin' className='bg-neutral-100 rounded-2xl px-4 py-2 w-70 outline-none'
                                value={form.lastname} onChange={(e) => setForm({...form, lastname : e.target.value})}/>
                    </div>
                    
                    <div className='flex justify-center items-center gap-10'>
                        <h1>email :</h1>
                        <input type="email" placeholder='xyz@gmail.com' className='bg-neutral-100 rounded-2xl px-4 py-2 w-70 outline-none'
                                value={form.email} onChange={(e) => setForm({...form, email : e.target.value})}/>
                    </div>
                    <div className='flex justify-center items-center gap-5'>
                        <h1>Password :</h1>
                        <input type="password" placeholder='password' className='bg-neutral-100 rounded-2xl px-4 py-2 w-70 outline-none'
                                value={form.password} onChange={(e) => setForm({...form, password : e.target.value})}/>
                    </div>
                    <button className='flex justify-center items-center bg-neutral-500 
                    w-20 h-10 px-4 py-2 rounded-lg  text-white cursor-pointer active:scale-90'>SignUp</button>
                </form>
        </div>
    </div>
  )
}

export default SignUpPage