import { useForm } from "react-hook-form";
import { AddressFormValues, addressSchema } from "../../lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputAddress } from "./InputAddress";
import { ItemsCheckout } from "./ItemsCheckout";
import { useCreatedOrder } from "../../hooks";
import { useCartStore } from "../../store/cart.store";
import { ImSpinner2 } from "react-icons/im";

export const FormCheckout = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
  });

  const { mutate: createOrder, isPending } = useCreatedOrder();
  const cleanCart = useCartStore((state) => state.cleanCart);
  const cartItems = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);

  const onSubmit = handleSubmit((data) => {
    const orderInput = {
      address: data,
      cartItems: cartItems.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
    };

    createOrder(orderInput, {
      onSuccess: () => {
        cleanCart();
      },
    });
  });

  if (isPending) {
    return (
      <div className="flex flex-col gap-3 h-screen items-center justify-center">
        <ImSpinner2 className="animate-spin h-10 w-10" />
        <p className="text-sm font-medium">Estamos procesando tu pedido</p>
      </div>
    );
  }

  return (
    <div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold tracking-normal">Entrega</h3>

          <InputAddress
            register={register}
            errors={errors}
            name="addressLine1"
            placeholder="Dirección principal"
          />
          <InputAddress
            register={register}
            errors={errors}
            name="addressLine2"
            placeholder="Dirección adicional (opcional)"
          />
          <InputAddress
            register={register}
            errors={errors}
            name="state"
            placeholder="Provincia"
          />
          <InputAddress
            register={register}
            errors={errors}
            name="city"
            placeholder="Ciudad/Localidad"
          />
          <InputAddress
            register={register}
            errors={errors}
            name="postalCode"
            placeholder="Código postal"
          />

          <select
            className="border border-pink-300 rounded-md p-3"
            {...register("country")}
          >
            <option value="Argentina">Argentina</option>
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">Métodos de envío</p>
          <div className="flex justify-between items-center text-sm border border-pink-300 py-4 rounded-md px-6">
            <span className="font-normal">Standard</span>
            <span className="font-semibold">Gratis</span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between items-center text-sm border border-pink-300 py-4 rounded-ss-md rounded-se-md px-6">
            <span>Transferencia bancaria</span>
          </div>
          <div className="text-[13px] p-5 space-y-0.5 border-pink-300 rounded-es-md rounded-ee-md">
            <p>Compra a través de transferencia bancaria</p>
            <p>Banco state</p>
            <p>Razón social: Buzos</p>
            <p>DNI: 44049293</p>
            <p>Tipo de cuenta: Corriente</p>
            <p>Número de tarjeta: 4444 4444 4444 4444</p>
            <p>
              La información será compartida nuevamente una vez que se haya
              finalizado la compra.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="font-semibold text-2xl">Resúmen del pedido</h3>
          <ItemsCheckout />
        </div>

        <button className="bg-pink-300 hover:bg-green-400 cursor-pointer text-black py-3.5 font-bold -tracking-wide rounded-md mt-2 uppercase">
          Finalizar pedido
        </button>
      </form>
    </div>
  );
};
