// ========= PROTECTION ROUTES ADMIN =========

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAdminAuth } from "../services/auth.service";

function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await checkAdminAuth();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Chargement...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default AdminRoute;
