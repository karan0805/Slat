import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginOutlet from './components/Routes/LoginOutlet';
import ProtectedOutlet from './components/Routes/ProtectedOutlet';
import ForgotPassword from './pages/Auth/Forgot-Password';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import DashboardAppshell from './layout/DashboardAppshell';
import HomeAppShell from './layout/HomeAppShell';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<LoginOutlet />}>
            <Route
              exact
              path="/"
              element={
                <HomeAppShell>
                  <Home />
                </HomeAppShell>
              }
            />
          </Route>
          <Route path="/auth" element={<LoginOutlet />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          </Route>
        </Routes>

        <Routes>
          <Route path="/dashboard" element={<ProtectedOutlet />}>
            <Route
              path="/dashboard/projects"
              element={
                <DashboardAppshell>
                  <Dashboard />
                </DashboardAppshell>
              }
            />
            <Route
              path="/dashboard/boards"
              element={
                <DashboardAppshell>
                  <Dashboard />
                </DashboardAppshell>
              }
            />
            <Route
              exact
              path="/dashboard"
              element={
                <DashboardAppshell>
                  <Dashboard />
                </DashboardAppshell>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
