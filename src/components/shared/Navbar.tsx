import { Link, NavLink } from "react-router-dom";
import { navbarLinks } from "../../constants/links";
import {
  HiOutlineSearch,
  HiOutlineShoppingBag,
  HiOutlineUser,
} from "react-icons/hi";
import { FaBarsStaggered } from "react-icons/fa6";
import { Logo } from "./Logo";
import { useGlobalStore } from "../../store/global.store";
import { useCartStore } from "../../store/cart.store";
import { useCustomer, useUser } from "../../hooks";
import { LuLoader } from "react-icons/lu";

export const Navbar = () => {
  const openSheet = useGlobalStore((state) => state.openSheet);
  const totalItemsInCart = useCartStore((state) => state.totalItemsInCart);
  const setActiveNavMobile = useGlobalStore(
    (state) => state.setActiveNavMobile
  );
  const { session, isLoading } = useUser();
  const userId = session?.user.id;
  const {data: customer} = useCustomer(userId!)

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
        <button
          className="cursor-pointer hover:text-green-400"
          onClick={() => openSheet("search")}
        >
          <HiOutlineSearch size={30} />
        </button>

        {isLoading ? (
          <LuLoader className="animate-spin" size={60} />
        ) : session ? (
          <div className="relative">
            <Link
              to="/account"
              className="border-2 border-pink-300 w-10 h-9 rounded-full grid place-items-center text-lg font-bold hover:text-green-400 hover:border-green-400"
            >
              {customer && customer.full_name[0]}
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <HiOutlineUser size={30} className="hover:text-green-400" />
          </Link>
        )}

        <button
          className="relative cursor-pointer hover:text-green-400"
          onClick={() => openSheet("cart")}
        >
          <span className="absolute -bottom-2 -right-2 w-5 grid place-items-center bg-pink-300 text-white text-xs rounded-full">
            {totalItemsInCart}
          </span>
          <HiOutlineShoppingBag size={33} />
        </button>
      </div>
      <button className="md:hidden" onClick={() => setActiveNavMobile(true)}>
        <FaBarsStaggered size={25} />
      </button>
    </header>
  );
};
