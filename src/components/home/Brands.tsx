const brands = [
  {
    image: "/img/brands/logonike.jpg",
    alt: "Nike",
  },
  {
    image: "/img/brands/logoadidas.jpg",
    alt: "Adidas",
  },
  {
    image: "/img/brands/logopuma.png",
    alt: "Puma",
  },
  {
    image: "/img/brands/logojordan.jpg",
    alt: "Jordan",
  },
  {
    image: "/img/brands/logochampion.jpg",
    alt: "Champion",
  },
  {
    image: "/img/brands/logotommy.jpg",
    alt: "Tommy Hilfiger",
  },
];

export const Brands = () => {
  return (
    <div className="flex flex-col items-center gap-3 p-10  text-pink-300">
      <h2 className="font-bold text-2xl">MARCAS DISPONIBLES</h2>
      <p className="w-2/3 text-center text-sm md:text-base">
        Algunas de las marcas que podrás encontrar en nuestros productos
      </p>

      <div className="grid grip-cols-3 gap-10 mt-6 items-center md:grid-cols-6">
        {brands.map((brand, index) => (
          <div key={index}>
            <img src={brand.image} alt={brand.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};
