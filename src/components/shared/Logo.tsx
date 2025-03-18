import { Link } from "react-router-dom";

interface Props {
  isDashboard?: boolean;
}

export const Logo = ({ isDashboard }: Props) => {
  return (
    <Link
      to="/"
      className={`text-2xl font-bold tracking-tighter transition-all ${
        isDashboard && "hover:scale-105"
      }`}
    >
      <p className="hidden lg:block text-pink-300">
        Lorem
        <span className="text-white hover:text-green-400">Ipsum</span>
      </p>

      <p className="flex text-4xl lg:hidden">
        <span className="-skew-x-6">N</span>
        <span className="text-green-400 skew-x-6">C</span>
      </p>
    </Link>
  );
};
