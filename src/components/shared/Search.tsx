import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useGlobalStore } from "../../store/global.store";
import { formatPrice } from "../../helpers";
import { searchProducts } from "../../actions";
import { Product } from "../../interfaces";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const closeSheet = useGlobalStore((state) => state.closeSheet);

  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      const products = await searchProducts(searchTerm);
      setSearchResults(products);
    }
  };

  return (
    <>
      <div className="bg-black py-5 px-7 flex gap-10 items-center border-b text-pínk-300 border-pink-300">
        <form
          className="flex gap-3 items-center flex-1"
          onSubmit={handleSearch}
        >
          <HiOutlineSearch size={22} className="text-pink-300" />
          <input
            type="text"
            placeholder="¿Qué producto necesitas?"
            className="outline-none w-full text-sm text-pink-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <button onClick={closeSheet}>
          <IoMdClose size={25} className="text-pink-300 cursor-pointer" />
        </button>
      </div>

      <div className="p-5 bg-black">
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((product) => (
              <li className="py-2 group" key={product.id}>
                <button
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => {
                    navigate(`/productos/${product.slug}`);
                    closeSheet();
                  }}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-20 w-20 object-contain p-3 border-pink-300 "
                  />

                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-pink-300 font-semibold group-hover:underline">
                      {product.name}
                    </p>

                    <p className="text-[13px] text-pink-300">
                      {product.variants[0].storage} /{" "}
                      {product.variants[0].color_name}
                    </p>

                    <p className="text-sm font-medium text-pink-300">
                      {formatPrice(product.variants[0].price)}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm bg-black text-pink-300">
            No se encontraron resultados
          </p>
        )}
      </div>
    </>
  );
};
