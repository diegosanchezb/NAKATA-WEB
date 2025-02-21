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
    <div className="flex flex-col items-center gap-3 pt-16 pb-12">
      <h2 className="font-bold text-2xl">Marcas disponibles</h2>
      <p className="w-2/3 text-center text-sm md:text-base">
        Contamos con variedad de prendas de primeras marcas
      </p>

      <div className="grid grip-cols-3 gap-6 mt-8 items-center md:grid-cols-6">
        {brands.map((brand, index) => (
          <div key={index}>
            <img src={brand.image} alt={brand.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};
