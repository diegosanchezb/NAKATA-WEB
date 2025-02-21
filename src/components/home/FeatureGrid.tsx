import { BiWorld } from "react-icons/bi";
import { FaHammer } from "react-icons/fa6";
import { HiMiniReceiptRefund } from "react-icons/hi2";
import { MdLocalShipping } from "react-icons/md";

export const FeatureGrid = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 w-full max-w-screen-lg">
        <div className="flex items-center gap-6">
          <MdLocalShipping size={40} className="text-slate-600" />
          <div className="space-y-1">
            <p className="font-semibold">Envío gratis</p>
            <p className="text-sm">En compras mayores a $50.000</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <HiMiniReceiptRefund size={40} className="text-slate-600" />
          <div className="space-y-1">
            <p className="font-semibold">NO hay devoluciones</p>
            <p className="text-sm">Procure comprobar las medidas.</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <FaHammer size={40} className="text-slate-600" />
          <div className="space-y-1">
            <p className="font-semibold">Soporte 24/7</p>
            <p className="text-sm">
              Contamos con atención al cliente las 24HS, en la medida de lo
              posible.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <BiWorld size={40} className="text-slate-600" />
          <div className="space-y-1">
            <p className="font-semibold">Envío gratis</p>
            <p className="text-sm">En compras mayores a $50.000.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
