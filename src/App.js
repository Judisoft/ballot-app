import React from "react";
import Notification from "./components/Notification";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import LogoutTimer from "./pages/auth/LogoutTimer";

const App = () => {
  return (
    <div>
      <LogoutTimer timeoutInMinutes={60} />
      <Notification />
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  );
};

export default App;
