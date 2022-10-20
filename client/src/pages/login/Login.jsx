import { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post('/auth/login', {
        email,
        password,
      });
      dispatch(loginSuccess(res.data));
      setTimeout(() => {
        navigate('/');
      }, 3000);

      setSuccess(true);
      setError(false);
      setEmail('');
      setPassword('');
    } catch (err) {
      dispatch(loginFailure());
      setSuccess(false);
      setError(true);
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

            <button className='loginButton' onClick={handleLogin}>
              Log In
            </button>
            <span className='loginForgot'>Forgot Password?</span>
            <button className='loginRegisterButton'>
              <Link to='/register' className='styledLink'>
                Create a New Account
              </Link>
            </button>
            {error && (
              <p style={{ textAlign: 'center' }}>
                There is an error, please try again!
              </p>
            )}
            {success && (
              <p style={{ textAlign: 'center' }}>
                Login success, redirecting to home page...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
