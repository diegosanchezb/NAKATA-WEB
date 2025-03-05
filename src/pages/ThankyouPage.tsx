import { Link, useNavigate, useParams } from "react-router-dom";
import { useOrder, useUser } from "../hooks";
import { Loader } from "../components/shared/Loader";
import { CiCircleCheck } from "react-icons/ci";
import { formatPrice } from "../helpers";
import { useEffect } from "react";
import { supabase } from "../supabase/client";

export const ThankyouPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useOrder(Number(id));
  const { isLoading: isLoadingSession } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate("/login");
      }
    });
  }, [navigate]);

  if (isError) return <div>Error al procesar la orden</div>;
  if (isLoading || !data || isLoadingSession) return <Loader />;

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-center flex-col px-10 py-12">
        <Link
          to="/"
          className="text-3xl font-bold self-center tracking-tighter transition-all md:text-4xl"
        >
          <p>Nakata</p> <span className="text-green-400">Clothes</span>
        </Link>
      </header>

      <main className="container mx-auto flex-1 flex flex-col items-center gap-10">
        <div className="flex gap-3 items-center">
          <CiCircleCheck size={40} />
          <p className="text-3xl">
            ¡Gracias {data.customer.full_name} por tu compra!
          </p>
        </div>
        <div className="border border-pink-300 w-full md:w-[600px] p-5 rounded-md space-y-3">
          <h3 className="font-medium">Tu pedido está confirmado</h3>
          <p className="text-sm">
            Gracias por confiar en nosotros. Para realizar la transferencia te
            compartimos los siguientes datos:
          </p>
          <div className="space-y-0.5 text-sm">
            <p>Banco provincia</p>
            <p>Razón social: Buzos</p>
            <p>DNI: 44049293</p>
            <p>Tipo de cuenta: Corriente</p>
            <p>Número de tarjeta: 4444 4444 4444 4444</p>
          </div>
          <p className="text-sm">
            Para evitar confusiones, una vez realizada la transferencia envianos
            tu comprobante a nuestro{" "}
            <a
              href="https://api.whatsapp.com/send?phone=542284522717"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 underline"
            >
              WhatsApp
            </a>{" "}
            o a{" "}
            <a
              href="mailto:ejemplo@gmail.com"
              className="text-green-400 underline"
              target="_blank"
            >
              nuestro gmail
            </a>
            . Una vez recibido, podremos proseguir con el envío de tu pedido.
          </p>
        </div>

        <div className="border-pink-300 border w-full p-5 rounded-md space-y-3 md:w-[600px] justify-between">
          <h3 className="font-medium">Detalles del pedido</h3>
          <div className="flex flex-col gap-5">
            <ul className="space-y-3">
              {data.orderItems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center gap-3"
                >
                  <div className="flex">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <p className="font-semibold">{item.productName}</p>
                      <p className="text-sm font-medium text-pink-300 mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <p className="text-[13px] text-pink-300">
                        {item.storage} / {item.color_name}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-between">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">
                {formatPrice(data.totalAmount)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col text-sm">
              <p className="font-semibold">Email de contacto:</p>
              <p>{data.customer.email}</p>
            </div>
            <div className="flex flex-col text-sm">
              <p className="font-semibold">Métodos de pago:</p>
              <p>Transferencia bancaria - {formatPrice(data.totalAmount)}</p>
            </div>
            <div className="flex flex-col text-sm">
              <p className="font-semibold">Dirección de entrega</p>
              <p>{data.address.addressLine1}</p>
              <p>{data.address.addressLine2 && data.address.addressLine2}</p>
              <p>{data.address.country}</p>
              <p>{data.address.state}</p>
              <p>{data.address.city}</p>
              <p>{data.address.postalCode}</p>
            </div>

            <div className="flex flex-col text-sm">
              <p className="font-semibold">Método de envío</p>
              <p>A domicilio</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center w-full mb-5 gap-3 sm:flex-row md:w-[600px] md:gap-0">
          <p className="text-sm">
            Ante cualquier inconveniente no dudes en{" "}
            <a
              href="https://www.instagram.com/diesanchezb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 underline"
            >
              contactarnos
            </a>
          </p>
          <Link
            to="/productos"
            className="py-2.5 text-sm rounded-md px-3 tracking-tight font-semibold border border-pink-300 bg-pink-300 hover:bg-green-400 text-black"
          >
            Seguir comprando
          </Link>
        </div>
      </main>
    </div>
  );
};
