import { PreparedProducts } from "../../interfaces";
import { CardProduct } from "../products/CardProduct";

interface Props {
  title: string;
  products: PreparedProducts[];
}

export const ProductGrid = ({ title, products }: Props) => {
  return (
    <div className="my-32">
      <h2 className="text-2xl font-semibold text-center mb-8 md:text-3xl lg:text-4xl">
        {title}
      </h2>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <CardProduct
              key={product.id}
              name={product.name}
              price={product.price}
              colors={product.colors}
              img={product.images[0]}
              slug={product.slug}
              variants={product.variants}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
