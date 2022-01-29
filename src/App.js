import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedOutlet from './components/Routes/ProtectedOutlet';
import ForgotPassword from './pages/Auth/Forgot-Password';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedOutlet />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
