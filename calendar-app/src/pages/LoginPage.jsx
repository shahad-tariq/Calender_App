import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser , clearAuthStatus  } from '../features/auth/authSlice'

import { useNavigate } from 'react-router-dom';

import '../src/styles/shared.css'
import '../src/styles/login.css'

import slide1 from '../assets/react.svg'
import slide2 from '../assets/react.svg'
import slide3 from '../assets/react.svg'



const schema = z.object({
  username: z.string(),
  password: z.string()
    .min(6, 'Password must be at least 6 chars')
    .regex(/^[A-Z]/, "Password must start with a capital letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector(StoreState => StoreState.authentication);

  const { register, handleSubmit, watch , formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { username: '', password: '' }
  });

  const [show, setShow] = useState(false);



// slides 
const slides = [
  {
    image: slide1,
    caption: "Add New Appointments",
  },
  {
    image: slide2,
    caption: "Manage Your Schedule Easily",
  },
  {
    image: slide3,
    caption: "Track Patients & Records",
  },
];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex(p => (p + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, [slides.length]);




  const onSubmit = async (values) => {
    try {
        const userData = await dispatch(loginUser(values)).unwrap();
        
        navigate('/main', { replace: true });
    } catch (e) {
       console.error('login failed:', e);
    }
  };

  const username = watch('username');
  const password = watch('password');

  useEffect(() => {
     if (status === 'failed' || status === 'succeeded') {
        dispatch(clearAuthStatus());
      }
  }, [username, password]);

  const isLoading = status === 'loading';

  return (
    <div className="login-wrap">


      <div className="login-hero">
        <div className="hero-card">
          {slides.map((slide, i) => (
            <img
              key={i}
              src={slide.image}
              alt={slide.caption}
              className={`slide ${i === index ? "active" : ""}`}
            />
          ))}
        </div>

        <div className="hero-caption">{slides[index].caption}</div>

        <div className="pager" role="tablist" aria-label="slider dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>




      <div className="login-card">
        <h1 className="brand">I Clinic System</h1>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
         
          <div className="field">
            <label>Username</label>
            <div className="input-wrap">
              <input
                className="input"
                type="text"
                placeholder="Enter username ..."
                {...register('username')}
              />
            </div>
            {errors.username && <div className="error">{errors.username.message}</div>}
          </div>

          
          <div className="field">
            <label>Password</label>
            <div className="input-wrap">
              <input
                className="input"
                type={show ? 'text' : 'password'}
                placeholder="Enter password ..."
                {...register('password')}
              />
              <button
                type="button"
                className="toggle"
                onClick={() => setShow(v => !v)}
                aria-label="Toggle password"
                title={show ? 'Hide password' : 'Show password'}
              >
                {show ? 'hidden' : 'show'}
              </button>
            </div>
            {errors.password && <div className="error">{errors.password.message}</div>}
          </div>

        {status === 'failed' && <div className="popup error">{String(error)}</div>}
        {status === 'succeeded' && <div className="popup success">Login successful! </div>}

          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? 'Loading…' : 'LOGIN'}
          </button>
        </form>

      </div>
    </div>
  );
}
