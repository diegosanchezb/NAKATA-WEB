import { Link } from "react-router-dom";
import { useCartStore } from "../store/cart.store";
import { FormCheckout } from "../components/checkout/FormCheckout";
import { ItemsCheckout } from "../components/checkout/ItemsCheckout";

export const CheckoutPage = () => {
  const totalItems = useCartStore((state) => state.totalItemsInCart);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 100px)",
      }}
    >
      <header className="h-[80px] text-pink-300 items-center justify-center flex-col px-10 border-b border-pink-300">
        <Link
          to="/"
          className="text-4xl font-bold self-center tracking-tighter transition-all md:text-5xl md:self-start"
        >
          Nakata <span className="text-green-400">Clothes</span>
        </Link>
      </header>

      <main className="w-full h-full flex relative">
        {totalItems === 0 ? (
          <div
            className="flex flex-col items-center justify-center gap-5 w-full"
            style={{
              height: "calc(100vh - 100px)",
            }}
          >
            <p className="text-sm font-medium tracking-tight">
              Su carrito está vacío
            </p>
            <Link
              to="/productos"
              className="py-4 bg-pink-300 hover:bg-green-300 rounded-full text-black px-7 uppercase tracking-wides font-semibold"
            >
              Empezar a comprar
            </Link>
          </div>
        ) : (
          <>
            <div className="w-full md:w-[50%] p-10">
              {/* FORMULARIO DE DIRECCIÓN */}
              <FormCheckout />
            </div>
            <div
              className="bg-zinc-950 w-[50%] sticky top-0 right-0 p-10 hidden md:block"
              style={{ minHeight: "calc(100vh - 100px" }}
            >
              <ItemsCheckout />
            </div>
          </>
        )}
      </main>
    </div>
  );
};
