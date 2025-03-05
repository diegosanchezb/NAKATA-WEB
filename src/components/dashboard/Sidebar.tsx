import { NavLink } from "react-router-dom";
import { dashboardLinks } from "../../constants/links";
import { Logo } from "../shared/Logo";
import { IoIosLogOut } from "react-icons/io";
import { signOut } from "../../actions";

export const Sidebar = () => {
  const handleLogOut = async () => {
    await signOut();
  };

  return (
    <div className="w-[120px] bg-stone-800 text-white flex flex-col gap-10 items-center p-5 fixed h-screen lg:w-[250px]">
      <Logo isDashboard />

      <nav className="w-full space-y-5 flex-1">
        {dashboardLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.href}
            className={({ isActive }) =>
              `flex items-center justify-center gap-3 pl-0 py-3 transition-all duration-300 rounded-md ${
                isActive
                  ? "text-black bg-pink-300"
                  : "hover:text-black hover:bg-pink-300"
              } lg:pl-5 lg:justify-start`
            }
          >
            {link.icon}
            <p className="font-semibold hidden lg:block">{link.title}</p>
          </NavLink>
        ))}
      </nav>

      <button
        className="bg-red-500 hover:bg-red-600 cursor-pointer w-full py-[10px] rounded-md flex items-center justify-center gap-2 font-semibold text-sm"
        onClick={handleLogOut}
      >
        <span className="hidden lg:block">Cerrar sesión</span>
        <IoIosLogOut size={20} className="inline-block" />
      </button>
    </div>
  );
};
