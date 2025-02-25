export const Newsletter = () => {
  return (
    <div className="relative bg-gray-500 text-white py-20">
      {/* IMÁGEN */}
      <div
        className="absolute inset-0 bg-cover opacity-70 h-full"
        style={{
          backgroundImage: "url(/img/newsletter.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center -100px",
        }}
      />

      {/* CONTENIDO */}
      <div className="container z-10 relative p-5 ml-10 md:p-0">
        <div className="w-full text-pink-300  p-11 space-y-4 md:w-[50%] lg:w-[40%] rounded-lg border border-pink-300">
          <p className="text-xs uppercase font-semibold">
            Suscribite a nuestro boletín y recibí data sobre promociones y drops
          </p>
          <p className="text-xs font-medium w-[80%] leading-5">
            Introduce tu correo para recibir ofertas
          </p>
          <form className="flex flex-col xl:flex-row gap-5">
            <input
              type="email"
              className="border border-pink-300 focus:outline-none rounded-full py-3 px-5 w-full text-xs font-medium"
              placeholder="Correo electrónico"
            />
            <button className="bg-pink-300 text-black border border-pink-300 hover:bg-green-400 font-semibold rounded-full uppercase tracking-wider py-3 text-xs xl:px-5 cursor-pointer">
              Suscribirme
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
