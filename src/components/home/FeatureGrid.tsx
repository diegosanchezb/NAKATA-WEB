import { BiWorld } from "react-icons/bi";
import { FaHammer } from "react-icons/fa6";
import { HiMiniReceiptRefund } from "react-icons/hi2";
import { MdLocalShipping } from "react-icons/md";

export const FeatureGrid = () => {
  return (
    <div className="flex justify-center rounded-lg border border-pink-300 text-pink-300 p-5">
      <div className="grid mt-2 mb-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 max-w-screen-lg">
        <div className="flex items-center gap-6">
          <MdLocalShipping
            size={40}
            className="text-pink-300 hover:text-green-400"
          />
          <div className="space-y-1">
            <p className="font-semibold">Envío gratis</p>
            <p className="text-sm">En compras mayores a $50.000</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <HiMiniReceiptRefund
            size={40}
            className="text-pink-300 hover:text-green-400"
          />
          <div className="space-y-1">
            <p className="font-semibold">NO hay devoluciones</p>
            <p className="text-sm">Procure comprobar las medidas.</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <FaHammer size={65} className="text-pink-300 hover:text-green-400" />
          <div className="space-y-1">
            <p className="font-semibold">Soporte 24/7</p>
            <p className="text-sm">
              Contamos con atención al cliente las 24HS.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <BiWorld size={40} className="text-pink-300 hover:text-green-400" />
          <div className="space-y-1">
            <p className="font-semibold">Hola XD</p>
            <p className="text-sm">En compras mayores a $50.000.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
