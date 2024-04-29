import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  checkAuthentication,
  getAuthUserInfo,
} from "../../slices/authenticationSlice";
import deleteCookie from "../../utils/deleteCookie";
import NotifyWarning from "../../utils/notifications/NotifyWarning";

const LogoutTimer = ({ timeoutInMinutes }) => {
  const [logoutTimer, setLogoutTimer] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Reset the timer whenever there's user activity
    const resetTimer = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
      setLogoutTimer(setTimeout(logout, timeoutInMinutes * 60 * 1000));
    };

    // Event listeners to detect user activity
    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Initialize the timer
    resetTimer();

    // Cleanup function to remove event listeners
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearTimeout(logoutTimer);
    };
  }, [timeoutInMinutes]);

  const logout = () => {
    deleteCookie("token");
    deleteCookie("authUser");
    dispatch(checkAuthentication());
    dispatch(getAuthUserInfo(null));
    window.location.href = "/login";
    NotifyWarning("You have been logged out due to inactivity.");
  };

  return null; // This component doesn't render anything visible
};

export default LogoutTimer;
