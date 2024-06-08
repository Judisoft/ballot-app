import React from "react";
import { Routes, Route } from "react-router-dom";
import Ballot from "../pages/Ballot";
import Homepage from "../pages/Homepage";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import CreateGroup from "../pages/groups/CreateGroup";
import AddMember from "../pages/groups/AddMember";
import BallotGroups from "../pages/BallotGroups";
import ProtectedRoute from "./ProtectedRoute";
import AuthRouteGuard from "./AuthRouteGuard";
import BallotResult from "../pages/BallotResult";
import Contact from "../pages/Contact";
import UserGuide from "../pages/UserGuide";
import About from "../pages/About";
import ResetPassword from "../pages/auth/ResetPassword";
import ChangePassword from "../pages/auth/ChangePassword";
import AdminDashboard from "../pages/admin/AdminDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/user-guide" element={<UserGuide />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/login"
        element={
          <AuthRouteGuard redirectTo="/ballot">
            <Login />
          </AuthRouteGuard>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute redirectTo="/login">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <AuthRouteGuard redirectTo="/ballot">
            <ResetPassword />
          </AuthRouteGuard>
        }
      />
      <Route
        path="/reset-password/:token"
        element={
          <AuthRouteGuard redirectTo="/ballot">
            <ChangePassword />
          </AuthRouteGuard>
        }
      />
      <Route
        path="/register"
        element={
          <AuthRouteGuard redirectTo="/ballot">
            <Register />
          </AuthRouteGuard>
        }
      />
      <Route
        path="/ballot"
        element={
          <ProtectedRoute redirectTo="/login">
            <Ballot />
          </ProtectedRoute>
        }
      />
      <Route
        path="/groups/add-member"
        element={
          <ProtectedRoute redirectTo="/login">
            <AddMember />
          </ProtectedRoute>
        }
      />
      <Route
        path="/groups"
        element={
          <ProtectedRoute redirectTo="/login">
            <CreateGroup />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ballots/groups"
        element={
          <ProtectedRoute redirectTo="/login">
            <BallotGroups />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ballots/:group/result"
        element={
          <ProtectedRoute redirectTo="/login">
            <BallotResult />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
