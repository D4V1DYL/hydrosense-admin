import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "config";

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/auth/login");
          return;
        }

        await axios.get(`${config.apiBaseUrl}/auth/check-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token expired or unauthorized
          localStorage.removeItem("token");
          navigate("/auth/login");
        } else {
          console.error("Error checking token", error);
        }
      }
    };

    checkAuth();
  }, [navigate]);
};

export default useAuth;