import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import DashboardLayout from "./Components/layout/DashboardLayout";

import Home from "./Pages/Home";
import Loginpage from "./Pages/Loginpage";
import Registerpage from "./Pages/Registerpage";
import NotFound from "./Pages/Notfound";
import AddDonation from "./Pages/Donor/AddDonation";
import MyDonations from "./Pages/Donor/MyDonations";
import AddVolunteer from "./Pages/AddVolunteer";
import ListVolunteer from "./Pages/ListVolunteer";
import Ngos from "./Pages/Ngos";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Profile";
import Analytics from "./Pages/Analytics";
import NgoDashboard from "./Pages/NgoDashboard";
import NgoAccepted from "./Pages/NgoAccepted";
import AdminDashboard from "./Pages/AdminDashboard";
import DonorDashboard from "./Pages/DonorDashboard";
import VolunteerDashboard from "./Pages/VolunteerDashboard";
import AvailablePickupList from "./Pages/AvailablePickupList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =============== PUBLIC ROUTES =============== */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/add-volunteer" element={<AddVolunteer />} />
        <Route path="/ngos" element={<Ngos />} />

        

        {/* =============== DONOR ROUTES =============== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="donor">
              <DashboardLayout>
                <DonorDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/add-donation"
          element={
            <ProtectedRoute allowedRole="donor">
              <DashboardLayout>
                <AddDonation />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/add-donation/:id"
          element={
            <ProtectedRoute allowedRole="donor">
              <DashboardLayout>
                <AddDonation />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/my-donations"
          element={
            <ProtectedRoute allowedRole="donor">
              <DashboardLayout>
                <MyDonations />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute allowedRole="donor">
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* =============== VOLUNTEER ROUTES =============== */}
        <Route
          path="/volunteer"
          element={
            <ProtectedRoute allowedRole="volunteer">
              <DashboardLayout>
                <VolunteerDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

    
        <Route
          path="/volunteer/pickups"
          element={
            <ProtectedRoute allowedRole="volunteer">
              <DashboardLayout>
                <AvailablePickupList />
                
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/volunteer/profile"
          element={
            <ProtectedRoute allowedRole="volunteer">
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* =============== ADMIN ROUTES =============== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/donations"
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardLayout>
                <MyDonations type="all" />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/available"
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardLayout>
                <MyDonations type="available" />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/accepted"
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardLayout>
                <MyDonations type="accepted" />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/ngos"
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardLayout>
                <Ngos />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/volunteers"
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardLayout>
                <ListVolunteer />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/volunteers/add"
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardLayout>
                <AddVolunteer />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* =============== NGO ROUTES =============== */}
        <Route
          path="/ngo"
          element={
            <ProtectedRoute allowedRole="ngo">
              <DashboardLayout>
                <NgoDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ngo/available"
          element={
            <ProtectedRoute allowedRole="ngo">
              <DashboardLayout>
                <MyDonations type="available" />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ngo/accepted"
          element={
            <ProtectedRoute allowedRole="ngo">
              <DashboardLayout>
                <NgoAccepted />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ngo/profile"
          element={
            <ProtectedRoute allowedRole="ngo">
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ===============  CATCH ROUTE =============== */}
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;