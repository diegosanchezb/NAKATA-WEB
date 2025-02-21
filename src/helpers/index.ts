import { Color, Product, VariantProduct } from "../interfaces";

//FUNCIÓN PARA FORMATEAR PRECIOS
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

//FUNCIÓN PARA PREPARAR PRODUCTOS
export const prepareProducts = (products: Product[]) => {
  return products.map((product) => {
    const colors = product.variants.reduce(
      (acc: Color[], variant: VariantProduct) => {
        const existingColor = acc.find((item) => item.color === variant.color);

        if (existingColor) {
          existingColor.price = Math.min(existingColor.price, variant.price);
        } else {
          acc.push({
            color: variant.color,
            price: variant.price,
            name: variant.color_name,
          });
        }
        return acc;
      },
      []
    );

    // OBTENER PRECIO MÁS BAJO
    const price = Math.min(...colors.map((item) => item.price));

    return {
      ...product,
      price,
      colors: colors.map(({ name, color }) => ({ name, color })),
      variants: product.variants,
    };
  });
};
