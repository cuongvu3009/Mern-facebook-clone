import { useState } from 'react';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/auth/register', {
        username,
        email,
        password,
      });
      console.log(res.data);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      setSuccess(true);
      setError(false);
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(true);
      setSuccess(false);
      console.log(err);
    }
  };

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>MernSocial</h3>
          <span className='loginDesc'>
            Connect with friends and the world around you on MernSocial.
          </span>
        </div>
        <div className='loginRight'>
          <div className='loginBox'>
            <input
              placeholder='Username'
              className='loginInput'
              type='text'
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder='Email'
              className='loginInput'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder='Password'
              className='loginInput'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className='loginButton' onClick={handleRegister}>
              Sign Up
            </button>

            <button className='loginRegisterButton'>
              <Link to='/login' className='styledLink'>
                Log into Account
              </Link>
            </button>

            {error && (
              <p style={{ textAlign: 'center' }}>
                There is an error, please try again!
              </p>
            )}
            {success && (
              <p style={{ textAlign: 'center' }}>
                Register success, You can now login, redirecting to login
                page...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
