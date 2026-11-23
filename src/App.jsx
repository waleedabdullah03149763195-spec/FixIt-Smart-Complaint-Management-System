import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import UserDashboard from './pages/UserDashboard'
import SubmitComplaint from './pages/SubmitComplaint'
import MyComplaints from './pages/MyComplaints'
import ComplaintDetails from './pages/ComplaintDetails'
import Notifications from './pages/Notifications'
import Feedback from './pages/Feedback'
import UserProfile from './pages/UserProfile'
import UserSettings from './pages/UserSettings'
import AdminDashboard from './pages/AdminDashboard'
import AdminComplaints from './pages/AdminComplaints'
import ManageTechnicians from './pages/ManageTechnicians'
import ManageUsers from './pages/ManageUsers'
import ManageDepartments from './pages/ManageDepartments'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/submit-complaint" element={<SubmitComplaint />} />
      <Route path="/user/complaints" element={<MyComplaints />} />
      <Route path="/user/complaints/:id" element={<ComplaintDetails />} />
      <Route path="/user/notifications" element={<Notifications />} />
      <Route path="/user/feedback" element={<Feedback />} />
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/user/settings" element={<UserSettings />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/complaints" element={<AdminComplaints />} />
      <Route path="/admin/technicians" element={<ManageTechnicians />} />
      <Route path="/admin/users" element={<ManageUsers />} />
      <Route path="/admin/departments" element={<ManageDepartments />} />
    </Routes>
  )
}

export default App
