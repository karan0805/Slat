import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JoinOrg from './components/JoinOrg';
import LoginOutlet from './components/Routes/LoginOutlet';
import ProtectedOutlet from './components/Routes/ProtectedOutlet';
import DashboardAppshell from './layout/DashboardAppshell';
import HomeAppShell from './layout/HomeAppShell';
import ForgotPassword from './pages/Auth/Forgot-Password';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import OrganizationSettings from './pages/OrganizationSettings';
import ProfileSettings from './pages/ProfileSettings';
import { ProjectView } from './pages/ProjectView';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Router>
        <Routes>
          <Route path="/auth" element={<LoginOutlet />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ForgotPassword />} />
          </Route>

          <Route path="/dashboard" element={<ProtectedOutlet />}>
            <Route
              path="explore"
              element={
                <DashboardAppshell>
                  <Dashboard />
                </DashboardAppshell>
              }
            />
            <Route
              path="projects"
              element={
                <DashboardAppshell>
                  <Dashboard />
                </DashboardAppshell>
              }
            />
            <Route
              path="project"
              element={
                <DashboardAppshell>
                  <ProjectView />
                </DashboardAppshell>
              }
            />
            <Route
              path="organizations/manage"
              element={
                <DashboardAppshell>
                  <OrganizationSettings />
                </DashboardAppshell>
              }
            ></Route>
            <Route
              path="account/manage"
              element={
                <DashboardAppshell>
                  <ProfileSettings />
                </DashboardAppshell>
              }
            ></Route>
            <Route
              path=""
              element={
                <DashboardAppshell>
                  <Dashboard />
                </DashboardAppshell>
              }
            />
          </Route>

          <Route path="/join" element={<ProtectedOutlet />}>
            <Route
              path="organization/:orgName/:orgId"
              element={
                <DashboardAppshell>
                  <JoinOrg />
                </DashboardAppshell>
              }
            />
          </Route>

          <Route path="/" element={<LoginOutlet />}>
            <Route
              path="/"
              element={
                <HomeAppShell>
                  <Home />
                </HomeAppShell>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
