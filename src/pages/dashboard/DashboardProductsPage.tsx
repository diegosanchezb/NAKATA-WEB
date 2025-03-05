import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { TableProduct } from "../../components/dashboard";

export const DashboardProductsPage = () => {
  return (
    <div className="h-full flex flex-col gap-2">
      <Link
        to="/dashboard/products/new"
        className="bg-pink-300 text-black hover:bg-green-400 flex items-center self-end py-[8px] px-3 rounded-md text-sm gap-1 font-semibold"
      >
        <IoMdAddCircleOutline className="inline-block" />
        Nuevo producto
      </Link>

    <TableProduct />

    </div>
  );
};
