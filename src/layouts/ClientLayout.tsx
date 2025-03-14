import { NavLink, Outlet, replace, useNavigate } from "react-router-dom";
import { signOut } from "../actions";
import { useRoleUser, useUser } from "../hooks";
import { useEffect } from "react";
import { supabase } from "../supabase/client";
import { Loader } from "../components/shared/Loader";
import { HiOutlineExternalLink } from "react-icons/hi";

export const ClientLayout = () => {
  const { session, isLoading: isLoadingSession } = useUser();
  const { data: role, isLoading: isLoadingRole } = useRoleUser(
    session?.user.id as string
  );
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate("/login", { replace: true });
      }
    });
  }, [navigate]);

  if (isLoadingSession || isLoadingRole) return <Loader />;

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="flex flex-col gap-5 text-pink-300">
      <nav className="flex justify-center gap-10 text-sm font-medium">
        <NavLink
          to="/account/pedidos"
          className="hover:underline hover:text-green-400"
        >
          Pedidos
        </NavLink>

        {role === "admin" && (
          <NavLink
            to="/dashboard/productos"
            className="flex items-center gap-1 hover:underline hover:text-green-400"
          >
            Panel de administrador
            <HiOutlineExternalLink size={16} className="inline-block" />
          </NavLink>
        )}

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
