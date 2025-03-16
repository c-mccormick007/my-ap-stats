import { useState } from 'react'
import './App.css'
import StatsPage from './components/StatsPage.jsx';


const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const correctPassword = import.meta.env.VITE_AP_STAT_PASSWORD;

  const handleLogin = (event) => {
    event.preventDefault();
    const inputPassword = event.target.password.value;
    if (inputPassword === correctPassword){
      setIsAuthenticated(true);
    }else{
      alert("Incorrect password. Try again.")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-900 text-white">
      {!isAuthenticated ? (
        <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Enter Password</h2>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border border-gray-600 rounded text-black"
            required
          />
          <button type="submit" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
      ) : (
        <StatsPage />
      )}
    </div>
  );
}

export default App;