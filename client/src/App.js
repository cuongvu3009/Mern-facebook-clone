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
import SinglePost from './pages/singlePost/SinglePost';

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='App'>
      <Router>
        <Routes>
          {/* user routes */}
          <Route
            path='/'
            exact
            element={
              currentUser ? <Home /> : <Navigate to='/login' replace={true} />
            }
          />
          <Route
            path='/:id'
            element={
              currentUser ? (
                <Profile />
              ) : (
                <Navigate to='/login' replace={true} />
              )
            }
          />
          <Route
            path='/post/:id'
            element={
              currentUser ? (
                <SinglePost />
              ) : (
                <Navigate to='/login' replace={true} />
              )
            }
          />

          {/* public routes */}
          <Route
            path='/login'
            element={
              !currentUser ? <Login /> : <Navigate to='/' replace={true} />
            }
          />
          <Route
            path='/register'
            element={
              !currentUser ? <Register /> : <Navigate to='/' replace={true} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
