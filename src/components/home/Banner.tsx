import { Link } from "react-router-dom";

export const Banner = () => {
  return (
    <div className="relative text-white">
      {/* IMAGEN DE FONDO */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 min-h-screen"
        style={{ backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 1)), url(/img/banner.jpg)" }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 opacity-50" />

      {/* CONTENIDO */}
      <div className="relative z-10 flex flex-col items-center justify-center py-20 px-4 text-center lg:py-40 lg:px-8">
        <h1 className="text-3xl font-bold mb-4 lg:text-5xl text-pink-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </h1>

        <p className="text-lg mb-8 lg:text-xl text-pink-300">
          Lorem ipsum dolor sit amet.
        </p>

        <Link
          to="/productos"
          className="bg-pink-300 hover:bg-green-400 text-black font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out"
        >
          Lorem, ipsum.
        </Link>
      </div>
    </div>
  );
};
