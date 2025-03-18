import { BiWorld } from "react-icons/bi";
import { FaHammer } from "react-icons/fa6";
import { HiMiniReceiptRefund } from "react-icons/hi2";
import { MdLocalShipping } from "react-icons/md";

export const FeatureGrid = () => {
  return (
    <div className="relative flex justify-center text-pink-300 p-5 mb-41">
      <div className="grid mt-2 mb-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 max-w-screen-lg">
        <div className="flex items-center gap-6">
          <MdLocalShipping
            size={40}
            className="text-pink-300 hover:text-green-400"
          />
          <div className="space-y-1">
            <p className="font-semibold">Lorem, ipsum.</p>
            <p className="text-sm">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <HiMiniReceiptRefund
            size={40}
            className="text-pink-300 hover:text-green-400"
          />
          <div className="space-y-1">
            <p className="font-semibold">Lorem, ipsum dolor.</p>
            <p className="text-sm">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <FaHammer size={50} className="text-pink-300 hover:text-green-400" />
          <div className="space-y-1">
            <p className="font-semibold">Lorem, ipsum.</p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <BiWorld size={40} className="text-pink-300 hover:text-green-400" />
          <div className="space-y-1">
            <p className="font-semibold">Lorem, ipsum.</p>
            <p className="text-sm">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
