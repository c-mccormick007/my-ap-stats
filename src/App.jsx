import { useRef, useState } from 'react';
import './App.css';
import StatsPage from './components/StatsPage.jsx';
import Loader from './components/Loader.jsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isServerDelayed, setIsServerDelayed] = useState(false);
  const timeoutRef = useRef(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsFetching(true);

    timeoutRef.current = setTimeout(() => {
      setIsServerDelayed(true);
    }, 7000);

    const inputPassword = event.target.password.value;
    try {
      const res = await fetch("https://my-ap-stats-server.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: inputPassword })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
      } else {
        alert("Incorrect password. Try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Try again later.");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-neutral-900 text-white overflow-hidden">
      {!isAuthenticated ? (
        <form
          onSubmit={handleLogin}
          className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-blue-500 rounded-2xl shadow-[0_0_20px_rgba(0,150,255,0.4)] p-8 max-w-md w-full animate-fade-in-up"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-400 tracking-wide">
            Login
          </h2>

          {isFetching ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader />
              {isServerDelayed && (
                <p className="text-yellow-300 text-center">
                  Server is waking up. This may take a moment. 😴
                </p>
              )}
            </div>
          ) : (
            <>
            <input
              type="password"
              name="password"
              placeholder="Enter your password..."
              className="w-full p-3 mb-6 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white font-semibold shadow-md"
              disabled={isFetching}
            >
              Access Dashboard
            </button>
            </>
          )}
        </form>
      ) : (
        <StatsPage />
      )}
    </div>
  );
};

export default App;
