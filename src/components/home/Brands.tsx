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
    image: "/img/brands/logokappa.jpg",
    alt: "Kappa",
  },
  {
    image: "/img/brands/logotommy.jpg",
    alt: "Tommy Hilfiger",
  },
];

export const Brands = () => {
  return (
    <div className="flex flex-col items-center gap-3 p-10  text-pink-300">
      <h2 className="font-bold text-2xl">Lorem, ipsum.</h2>
      <p className="w-2/3 text-center text-sm md:text-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>

      <div className="grid grip-cols-3 gap-10 mt-6 items-center md:grid-cols-6">
        {brands.map((brand, index) => (
          <div key={index} className="w-18 h-18 ">
            <img
              src={brand.image}
              alt={brand.alt}
              className="w-18 h-15 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
