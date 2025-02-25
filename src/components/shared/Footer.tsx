import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { socialLinks } from "../../constants/links";

export const Footer = () => {
  return (
    <footer className="py-10  px-15 flex justify-between gap-15 text-pink-300 text-sm flex-wrap mt-5 md:flex-nowrap rounded-lg border border-pink-300">
      <Link
        to="https://www.instagram.com/diesanchezb/"
        target="_blank"
        className={`text-3xl font-bold tracking-tighter text-pink-300 hover:text-green-400 flex-1 mt-10`}
      >
        NakataClothes
      </Link>

      <div className="flex flex-col gap-4 flex-1">
        <p className="font-bold uppercase tracking-tighter">
          Suscribite gil de mierda
        </p>
        <p className="text-xs font-medium">Recibe promociones exclusivas</p>

        <div className="border border-pink-300 flex items-center gap-2 px-3 py-2 rounded-full">
          <input
            type="email"
            placeholder="Correo Electrónico"
            className="pl-2 text-white w-full focus:outline-none"
          />

          <button className="text-pink-300 cursor-pointer">
            <BiChevronRight size={22} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        <p className="font-bold uppercase tracking-tighter">Políticas</p>

        <nav className="flex flex-col gap-2 text-xs font-medium">
          <Link to="/celulares" className="hover:text-green-400">
            Productos
          </Link>
          <Link to="#" className="hover:text-green-400">
            Políticas de privacidad
          </Link>
          <Link to="#" className="hover:text-green-400">
            Términos de uso
          </Link>
        </nav>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        <p className="font-bold uppercase tracking-tighter">
          Seguinos en nuestras redes sociales
        </p>

        <p className="text-xs leading-6">
          Y enterate de todas nuestras novedades
        </p>

        <div className="flex">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-black bg-pink-300 border border-black w-full h-full py-3.5 flex items-center justify-center transition-all hover:bg-green-400"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
