import { HiOutlineShoppingBag } from "react-icons/hi";
import { useGlobalStore } from "../../store/global.store";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { RiSecurePaymentLine } from "react-icons/ri";
import { CartItem } from "./CartItem";
import { useCartStore } from "../../store/cart.store";

export const Cart = () => {
  const closeSheet = useGlobalStore((state) => state.closeSheet);
  const cartItems = useCartStore((state) => state.items);
  const cleanCart = useCartStore((state) => state.cleanCart);
  const totalItemsInCart = useCartStore((state) => state.totalItemsInCart);

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-7 flex justify-between items-center border-b border-pink-300">
        <span className="flex gap-3 items-center font-bold text-xl">
          <HiOutlineShoppingBag size={25} />
          {totalItemsInCart} artículos
        </span>
        <button onClick={closeSheet}>
          <IoMdClose size={25} className="text-pink-300 cursor-pointer" />
        </button>
      </div>
      {/* LISTA DE PRODUCTOS AÑADIDOS AL CARRITO */}
      {totalItemsInCart > 0 ? (
        <>
          <div className="p-7 overflow-auto flex-1">
            <ul className="space-y-9">
              {cartItems.map((item) => (
                <CartItem item={item} key={item.variantId} />
              ))}
            </ul>
          </div>
          {/* BOTONES ACCIÓN */}
          <div className="mt-4 p-7">
            <Link
              to="/checkout"
              className="w-full bg-pink-300 hover:bg-green-400 text-black py-3.5 rounded-full flex items-center justify-center gap-3"
            >
              <RiSecurePaymentLine size={24} />
              Continuar con la compra
            </Link>
            <button
              onClick={cleanCart}
              className="mt-3 w-full text-black bg-pink-300 hover:bg-green-400 border border-pink-300 rounded-full py-3 cursor-pointer"
            >
              Limpiar carrito
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-7">
          <p className="text-sm font-medium tracking-tight">
            Su carrito está vacío
          </p>
          <Link
            to="/productos"
            className="py-4 bg-pink-300 hover:bg-green-300 rounded-full text-black px-7 uppercase tracking-wides font-semibold"
            onClick={closeSheet}
          >
            Empezar a comprar
          </Link>
        </div>
      )}
    </div>
  );
};
