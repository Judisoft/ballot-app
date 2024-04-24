import React from "react";
import Notification from "./components/Notification";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div>
      <Notification />
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  );
};

export default App;
