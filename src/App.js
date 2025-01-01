import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import FormBuilder from './components/FormBuilder';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    if (currentUser) {
      navigate('/form-builder');
    }
    });
    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <>
      <NavBar toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login-signup" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/form-builder" element={<FormBuilder />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute> 
            }
          />
          <Route
            path="/form-builder"
            element={
              <ProtectedRoute user={user}>
                <FormBuilder />
              </ProtectedRoute>
            }
          />
      </Routes>
    </>
  );
};

export default App;