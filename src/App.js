import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginOutlet from './components/Routes/LoginOutlet';
import ProtectedOutlet from './components/Routes/ProtectedOutlet';
import DashboardAppshell from './layout/DashboardAppshell';
import HomeAppShell from './layout/HomeAppShell';
import ForgotPassword from './pages/Auth/Forgot-Password';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<LoginOutlet />}>
            <Route path="/" element={<HomeAppShell />}>
              <Route exact path="/" element={<Home />} />
            </Route>
          </Route>

          <Route path="/auth" element={<LoginOutlet />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          </Route>

          <Route path="/" element={<ProtectedOutlet />}>
            <Route path="/dashboard" element={<DashboardAppshell />}>
              <Route path="/dashboard/projects" element={<Dashboard />} />
              <Route path="/dashboard/boards" element={<Dashboard />} />
              <Route path="/dashboard/inbox" element={<Dashboard />} />
              <Route path="/dashboard/goals" element={<Dashboard />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
