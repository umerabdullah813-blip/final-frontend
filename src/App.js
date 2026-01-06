import './App.css';
import Dashboard from './Dashboard';
import Login from './Login';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
     {isLoggedIn ? (
  <Dashboard onLogout={() => setIsLoggedIn(false)} />
) : (
  <Login onLogin={() => setIsLoggedIn(true)} />
)}

    </>
  );
}

export default App;
