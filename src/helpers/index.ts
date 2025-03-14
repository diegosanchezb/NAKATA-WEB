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

//FUNCIÓN PARA FORMATEAR FECHA A FORMATO LOCAL
export const formatDateLong = (date: string): string => {
  const dateObject = new Date(date);

  return dateObject.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

//FUNCIÓN PARA FORMATEAR LA FECHA
export const formatDate = (date: string): string => {
  const dateObject = new Date(date);

  return dateObject.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  });
};

//FUNCIÓN PARA OBTENER ESTADO DEL PEDIDO EN ESPAÑOL
export const getStatus = (status: string): string => {
  switch (status) {
    case "Pending":
      return "Pendiente";
    case "Paid":
      return "Pagado";
    case "Shipped":
      return "Enviado";
    case "Delivered":
      return "Entregado";
    default:
      return status;
  }
};

//FUNCIÓN PARA GENERAR SLUG DE PRODUCTOS
export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const extractFilePath = (url: string) => {
  const parts = url.split("/storage/v1/object/public/product-images/");
  // EJEMPLO PARTS: ['/storage/v1/ object/public/product-images/', '02930920302302030293023-iphone-12-pro-max.jpg']

  if (parts.length !== 2) {
    throw new Error(`URL de imagen no válida: ${url}`);
  }

  return parts[1];
};
