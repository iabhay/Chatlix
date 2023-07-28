import React, { useState } from 'react'
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useNavigate } from 'react-router-dom';
// const flatted = require('flatted');
const Form = ({
  isSignInPage= true,
}) => {
  const [data, setData] = useState({
    ...(!isSignInPage && {
      name:'',
    }),
    email:'',
    mobile:'',
    password:''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e)=> {
    console.log(data)
    e.preventDefault();
      const res = await fetch(`https://chatlix.onrender.com/api/${isSignInPage ? 'login' : 'register'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      });
      if(res.status === 400){
        alert('Invalid Credentials!');
      }
      else{
        const resData = await res.json();
        if(resData.token){
          localStorage.setItem('user:token', resData.token);
          localStorage.setItem('user:details', JSON.stringify(resData.user));
          navigate('/');
        }
      }
  }
  return (
    <div className="bg-light h-screen flex justify-center items-center ">
    <div className="bg-white w-[600px] h-[800px] shadow-lg rounded-lg flex flex-col justify-center items-center">
    <div className="text-3xl font-bold mb-2">WELCOME {isSignInPage && "BACK"}</div>
    <div className="text-2xl font-light mb-8">{isSignInPage && "LOG IN"}{!isSignInPage && "SIGN UP"} NOW</div>
   <form className="flex flex-col justify-center items-center w-full " onSubmit={(e)=> handleSubmit(e)}>
    {!isSignInPage && <Input label="Full Name" name="name" placeholder="Enter your name" className='mb-6' value ={data.name} onChange={(e)=>setData({...data, name:e.target.value})}   /> }
    {<Input label="Email" name="email" type='email' placeholder="Enter your email" className='mb-6' value ={data.email} onChange={(e)=>setData({...data, email:e.target.value})}/>}
    <Input label="Mobile Number" name="mobile" placeholder="Enter your Mobile Number" className='mb-6' value ={data.mobile} onChange={(e)=>setData({...data, mobile:e.target.value})}/>
    <Input label="Password" name="password" placeholder="Enter your Password" className='mb-8' value ={data.password} onChange={(e)=>setData({...data, password:e.target.value})}/>
    <Button label={isSignInPage ? "Log In": "Sign Up"} className="mb-5" type='submit'/>
    </form>
    <div>{isSignInPage ? "Create an Account ": "Already have an account? "}<span className='text-primary cursor-pointer underline' onClick={()=>navigate(`/users/${isSignInPage ? 'sign_up' : 'sign_in'}`)}>{isSignInPage? "Sign Up":"Sign In"}</span></div>
    </div>
    </div>
  )
}

export default Form;
