import { Separator } from "../shared/Separator";

const availableBrands = [
  "Apple",
  "Samsung",
  "Realme",
  "Huawei",
  "Gay el que lee",
  "Honor",
  "Motorola",
];

interface Props {
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
}

export const ContainerFilter = ({
  selectedBrands,
  setSelectedBrands,
}: Props) => {
  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div className="p-4 border border-pink-300 rounded-lg h-fit col-span-2 lg:col-span-1 mr-15">
      <h3 className="font-semibold text-xl mb-4 text-pink-300">Filtros</h3>

      <Separator />

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          {availableBrands.map((brand) => (
            <label key={brand} className="inline-flex items-center">
              <input
                type="checkbox"
                className="text-pink-300 border-pink-300 focus:ring-black accent-black"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
              <span className="ml-2 text-pink-300 text-sm cursor-pointer">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
