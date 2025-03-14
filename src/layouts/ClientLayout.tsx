import { NavLink, Outlet, replace, useNavigate } from "react-router-dom";
import { signOut } from "../actions";
import { useUser } from "../hooks";
import { useEffect } from "react";
import { supabase } from "../supabase/client";
import { Loader } from "../components/shared/Loader";

export const ClientLayout = () => {
  const { session, isLoading: isLoadingSession } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate("/login", { replace: true });
      }
    });
  }, [navigate]);

  if (isLoadingSession) return <Loader />;

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="flex flex-col gap-5 text-pink-300">
      <nav className="flex justify-center gap-10 text-sm font-medium">
        <NavLink
          to="/account/pedidos"
          className={({ isActive }) =>
            `${isActive ? "underline hover:text-green-400" : "hover:underline"}`
          }
        >
          Pedidos
        </NavLink>

        <button
          className="hover:underline hover:text-green-400 cursor-pointer"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </nav>

      <main className="container mt-12 flex-1">
        <Outlet />
      </main>
    </div>
  );
};
