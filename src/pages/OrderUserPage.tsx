import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../hooks";
import { Loader } from "../components/shared/Loader";
import { IoIosArrowBack } from "react-icons/io";
import { formatDateLong, formatPrice } from "../helpers";

const tableHeaders = ["Producto", "Cantidad", "Total"];

export const OrderUserPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading } = useOrder(Number(id!));
  const navigate = useNavigate();

  if (isLoading || !order) return <Loader />;


  return (
    <div>
      <div className="flex flex-col justify-between items-center gap-5 md:flex-row md:gap-0">
        <button
          className="border-1 rounded-full py-2 cursor-pointer text-black bg-pink-300 border-black flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-widest hover:bg-green-400 transition-all"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack size={16} />
          Volver a los pedidos
        </button>

        <div className="flex flex-col items-center gap-1.5 ml-40">
          <h1 className="text-3xl font-bold text-center">Pedido #{id}</h1>
          <p className="text-sm">{formatDateLong(order.created_at)}</p>
        </div>

        <div></div>
        <div></div>
      </div>

      <div className="flex flex-col mt-10 mb-5 gap-10">
        <table className="text-sm w-full caption-bottom overflow-auto">
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className="h-12 text-center uppercase tracking-wide font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {order.orderItems.map((product, index) => (
              <tr key={index} className="border-b border-pink-300">
                <td className="p-4 font-medium tracking-tighter flex gap-3 items-center">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="h-20 w-20 object-contain rounded-lg"
                  />
                  <div className="space-y-2">
                    <h3>{product.productName}</h3>
                    <p className="text-xs">
                      {product.color_name} / {product.storage}
                    </p>
                    <p className="text-sm">{formatPrice(product.price)}</p>
                  </div>
                </td>
                <td className="p-4 font-medium tracking-tighter text-center">
                  {product.quantity}
                </td>
                <td className="p-4 font-medium tracking-tighter text-center">
                  {formatPrice(product.price * product.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col gap-3 text-sm self-end w-1/2">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>{formatPrice(order.totalAmount)}</p>
          </div>
          <div className="flex justify-between">
            <p>Envío (estandar)</p>
            <p>{formatPrice(0)}</p>
          </div>
          <div className="flex justify-between font-semibold">
            <p>Total</p>
            <p>{formatPrice(order.totalAmount)}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">Dirección</h2>
          <div className="border border-pink-300 p-5 flex flex-col gap-5">
            <div className="space-y-1">
              <h3 className="font-medium">Cliente:</h3>
              <p>{order.customer.full_name}</p>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <h3 className="font-medium text-base">Envío:</h3>
              <p>{order.address.addressLine1}</p>
              <p>
                {order.address.addressLine2 && order.address.addressLine2}
              </p>
              <p>{order.address.country}</p>
              <p>{order.address.state}</p>
              <p>{order.address.city}</p>
              <p>{order.address.postalCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

