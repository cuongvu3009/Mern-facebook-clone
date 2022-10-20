import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route
            path='/'
            exact
            element={
              currentUser ? <Home /> : <Navigate to='/login' replace={true} />
            }
          />
          <Route
            path='/login'
            exact
            element={
              !currentUser ? <Login /> : <Navigate to='/' replace={true} />
            }
          />
          <Route
            path='/register'
            exact
            element={
              !currentUser ? <Register /> : <Navigate to='/' replace={true} />
            }
          />
          <Route
            path='/:id'
            exact
            element={
              currentUser ? (
                <Profile />
              ) : (
                <Navigate to='/login' replace={true} />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
