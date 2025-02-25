import { Link, NavLink } from "react-router-dom";
import { navbarLinks } from "../../constants/links";
import { HiOutlineSearch, HiOutlineShoppingBag } from "react-icons/hi";
import { FaBarsStaggered } from "react-icons/fa6";
import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <header className=" text-pink-300 py-5 flex items-center border-b border-pink-300 justify-between lg:px-12">
      <Logo />
      <nav className="space-x-20 hidden md:flex">
        {navbarLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.href}
            className={({ isActive }) =>
              `${
                isActive ? "" : ""
              } trasition-all duration-300 font-medium hover:text-green-400`
            }
          >
            {link.title}
          </NavLink>
        ))}
      </nav>

      <div className="flex gap-5 items-center">
        <button>
          <HiOutlineSearch size={25} />
        </button>
        <div className="relative">
          <Link
            to="/account"
            className="border-2 border-pink-300 w-9 h-9 rounded-full grid place-items-center text-lg font-bold"
          >
            R
          </Link>
        </div>
        <button className="relative">
          <span className="absolute -bottom-2 -right-2 w-5 grid place-items-center bg-pink-300 text-white text-xs rounded-full">
            0
          </span>
          <HiOutlineShoppingBag size={25} />
        </button>
      </div>
      <button className="md:hidden">
        <FaBarsStaggered size={25} />
      </button>
    </header>
  );
};
