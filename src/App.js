import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ballot from "./pages/Ballot";
import Homepage from "./pages/Homepage";
import Notification from "./components/Notification";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import CreateGroup from "./pages/groups/CreateGroup";
import AddMember from "./pages/groups/AddMember";
import BallotGroups from "./pages/BallotGroups";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRouteGuard from "./components/AuthRouteGuard";
import Navbar from "./components/Navbar";
import BallotResult from "./pages/BallotResult";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Notification />
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/contact" element={<Contact />} />
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

          {/* <Route element={<ProtectedRoute />}>
            <Route path="/ballot" element={<Ballot />} />
            <Route path="/groups/add-member" element={<AddMember />} />
            <Route path="/groups" element={<CreateGroup />} />
            <Route path="/ballots/groups" element={<BallotGroups />} />
            <Route path="/ballots/:group/result" element={<BallotResult />} />
          </Route> */}
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
