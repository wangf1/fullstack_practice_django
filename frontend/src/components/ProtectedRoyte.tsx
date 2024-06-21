import { JwtPayload, jwtDecode } from "jwt-decode";
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

interface ProtectedRouteProps {
  children: ReactNode;
}

interface RefreshTokenResponse {
  data: {
    access: string;
  };
  status: number;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const response: RefreshTokenResponse = await api.post("/auth/refresh", {
        refresh: refreshToken,
      });
      if (response.status === 200) {
        const {
          data: { access },
        } = response;
        localStorage.setItem(ACCESS_TOKEN, access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    const auth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setIsAuthorized(false);
        return;
      }
      const decoded: JwtPayload = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Math.floor(Date.now() / 1000);
      if (tokenExpiration && tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    };

    auth().catch((error) => {
      console.log(error);
      setIsAuthorized(false);
    });
  }, []);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
