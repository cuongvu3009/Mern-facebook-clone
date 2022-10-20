import { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

            <button className='loginButton'>Sign Up</button>

            <button className='loginRegisterButton'>
              <Link to='/login' className='styledLink'>
                Log into Account
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
