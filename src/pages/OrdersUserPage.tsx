import { Link } from "react-router-dom";

export const OrdersUserPage = () => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex gap-2">
        <h1 className="text-3xl font-bold">TUS PEDIDOS</h1>
        <span className="w-5 h-5 rounded-full bg-pink-300 text-black text-[11px] flex justify-center items-center mt-1">
          30
        </span>
      </div>
      {[].length === 0 ? (
        <>
          <p className="text-[13px] text-pink-300">
            Todavía no has hecho ningún pedido
          </p>
          <Link
            to="/productos"
            className="bg-pink-300 hover:bg-green-400 text-black uppercase font-semibold tracking-widest text-xs py-4 rounded-full px-10"
          >
            Empezar a comprar
          </Link>
        </>
      ) : (
        <div>TABLA DE ORDENES</div>
      )}
    </div>
  );
};
