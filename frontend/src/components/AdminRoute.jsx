// ===== COMPONENT ADMIN ROUTE =====
// Protège les routes administrateur.
// Vérifie si l’utilisateur est authentifié avant d’autoriser l’accès.

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAdminAuth } from "../services/auth.service";

function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Vérifie la session côté backend
        await checkAdminAuth();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // Affichage pendant la vérification
  if (loading) {
    return <p className="text-center mt-5">Chargement...</p>;
  }

  // Redirection si non authentifié
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Accès autorisé → affiche le contenu protégé
  return children;
}

export default AdminRoute;
