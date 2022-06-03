import { createContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { auth } from './config/firebase';

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        navigate('/dashboard')
        return setLoading(false)
      }
      setUser({})
      navigate('/')
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if(!user) setLoading(true)
  }, [user])
  



  return (
    <>
      { loading ? <div className='d-flex w-100 vh-100'><span className='spinner-border m-auto'/></div> :
        <UserContext.Provider value={user} >
          <Routes>
            <Route path='' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </UserContext.Provider >}
    </>
  );
}

export default App;
