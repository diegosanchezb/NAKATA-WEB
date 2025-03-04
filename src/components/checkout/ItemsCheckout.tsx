import { formatPrice } from "../../helpers";
import { useCartStore } from "../../store/cart.store";

export const ItemsCheckout = () => {
  const cartItems = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);

  return (
    <div>
      <ul className="space-y-5">
        {cartItems.map((item) => (
          <li
            key={item.variantId}
            className="flex justify-between items-center gap-5"
          >
            <div className="flex relative border border-green-400 rounded-md">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-contain"
              />
              <span className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center text-xs absolute -right-1 -top-2 font-medium">
                {item.quantity}
              </span>
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex justify-between">
                <p className="font-semibold">{item.name}</p>
                <p className="font-medium">
                  {formatPrice(item.price)}
                </p>
              </div>

              <div className="flex gap-3">
                <p className="text-[14px]">
                  {item.storage} / {item.color}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

        <div className="mt-4 p-7 space-y-5">
            <div className="flex justify-between">
                <p className="text-sm font-medium">Envío:</p>
                <p className="text-m font-medium uppercase">gratis</p>
            </div>
            <div className="flex justify-between font-semibold text-lg">
                <p>Total:</p>
                <p>{formatPrice(totalAmount)}</p>
            </div>
        </div>

    </div>
  );
};
