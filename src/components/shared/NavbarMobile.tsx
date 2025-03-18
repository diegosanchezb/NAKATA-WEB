import { IoMdClose } from "react-icons/io";
import { useGlobalStore } from "../../store/global.store";
import { Link, NavLink } from "react-router-dom";
import { navbarLinks } from "../../constants/links";

export const NavbarMobile = () => {
  const setActiveNavMobile = useGlobalStore(
    (state) => state.setActiveNavMobile
  );

  return (
    <div className="bg-black text-pink-300 h-screen w-full shado-lg fixed z-50 flex justify-center py-32">
      <button
        className="absolute top-5 right-5"
        onClick={() => setActiveNavMobile(false)}
      >
        <IoMdClose size={30} className="text-pink-300" />
      </button>

      <div className="flex flex-col gap-20">
        <Link
          to="/"
          className="text-4xl font-bold tracking-tighter transition-all"
          onClick={() => setActiveNavMobile(false)}
        >
          <p>Lorem</p>
          <span className="text-green-400">Ipsum</span>
        </Link>
        <nav className="flex flex-col items-center gap-5">
          {navbarLinks.map((item) => (
            <NavLink
              to={item.href}
              key={item.id}
              className={({ isActive }) => `
              ${isActive} ? 'text-green-400 underline' : ''} transition-all duration-300 font-semibold text-xl hover:text-green-400 hover:underline
              `}
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};
