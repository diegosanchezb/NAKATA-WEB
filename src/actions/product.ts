import { extractFilePath } from "../helpers";
import { ProductInput } from "../interfaces";
import { supabase } from "../supabase/client";

export const getProducts = async (page: number) => {
  const itemsPerPage = 10;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const {
    data: products,
    error,
    count,
  } = await supabase
    .from("products")
    .select("*, variants(*)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return { products, count };
};

export const getFilteredProducts = async ({
  page = 1,
  brands = [],
}: {
  page: number;
  brands: string[];
}) => {
  const itemsPerPage = 10;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  let query = supabase
    .from("products")
    .select("*, variants(*)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (brands.length > 0) {
    query = query.in("brand", brands);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return { data, count };
};

export const getRecentProducts = async () => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*, variants(*)")
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return products;
};

export const getRandomProducts = async () => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*, variants(*)")
    .limit(20);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 4);

  return randomProducts;
};

export const getProductBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*, variants(*)")
    .eq("slug", slug)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
};

export const searchProducts = async (searchTerm: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*, variants(*)")
    .ilike("name", `%${searchTerm}%`);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
};

// ADMINISTRADOR
export const createProduct = async (productInput: ProductInput) => {
  try {
    const { data: product, error: productError } = await supabase
      .from("products")
      .insert({
        name: productInput.name,
        brand: productInput.brand,
        slug: productInput.slug,
        features: productInput.features,
        description: productInput.description,
        images: [],
      })
      .select()
      .single();

    if (productError) throw new Error(productError.message);

    const folderName = product.id;
    const uploadedImages = await Promise.all(
      productInput.images.map(async (image) => {
        const { data, error } = await supabase.storage
          .from("product-images")
          .upload(`${folderName}/${product.id}-${image.name}`, image);

        if (error) throw new Error(error.message);
        const imageUrl = `${
          supabase.storage.from("product-images").getPublicUrl(data.path).data
            .publicUrl
        }`;
        return imageUrl;
      })
    );

    const { error: updatedError } = await supabase
      .from("products")
      .update({
        images: uploadedImages,
      })
      .eq("id", product.id);
    if (updatedError) throw new Error(updatedError.message);

    const variants = productInput.variants.map((variant) => ({
      product_id: product.id,
      stock: variant.stock,
      price: variant.price,
      storage: variant.storage,
      color: variant.color,
      color_name: variant.colorName,
    }));

    const { error: variantsError } = await supabase
      .from("variants")
      .insert(variants);
    if (variantsError) throw new Error(variantsError.message);

    return product;
  } catch (error) {
    console.log(error);
    throw new Error("Error inesperado, vuelta a intentarlo");
  }
};

export const deleteProduct = async (productId: string) => {
  //1. ELIMINAR VARIANTES DEL PRODUCTO
  const { error: variantsError } = await supabase
    .from("variants")
    .delete()
    .eq("product_id", productId);
  if (variantsError) throw new Error(variantsError.message);

  //OBTENER IMÁGENES ANTES DE ELIMINARLO
  const { data: productImages, error: productImagesError } = await supabase
    .from("products")
    .select("images")
    .eq("id", productId)
    .single();
  if (productImagesError) throw new Error(productImagesError.message);

  //ELIMINAR EL PRODUCTO
  const { error: productDeleteError } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);
  if (productDeleteError) throw new Error(productDeleteError.message);

  //ELIMINAR IMAGENES DEL BUCKET
  if (productImages.images.length > 0) {
    const folderName = productId;
    const paths = productImages.images.map((image) => {
      const fileName = image.split("/").pop();
      return `${folderName}/${fileName}`;
    });

    const { error: storageError } = await supabase.storage
      .from("product-images")
      .remove(paths);
    if (storageError) throw new Error(storageError.message);
  }

  return true;
};

export const updateProduct = async (
  productId: string,
  productInput: ProductInput
) => {
  //1. OBTENER LAS IMÁGENES ACTUALES DEL PRODUCTO
  const { data: currentProduct, error: currentProductError } = await supabase
    .from("products")
    .select("images")
    .eq("id", productId)
    .single();
  if (currentProductError) throw new Error(currentProductError.message);

  const existingImages = currentProduct.images || [];

  //2. ACTUALIZAR INFO INDIVIDUAL DEL PRODUCTO
  const { data: updatedProduct, error: productError } = await supabase
    .from("products")
    .update({
      name: productInput.name,
      brand: productInput.brand,
      slug: productInput.slug,
      features: productInput.features,
      description: productInput.description,
    })
    .eq("id", productId)
    .select()
    .single();
  if (productError) throw new Error(productError.message);

  //3. MANEJO DE IMÁGENES
  const folderName = productId;
  const validImages = productInput.images.filter((image) => image);

  const imagesToDelete = existingImages.filter(
    (image) => !validImages.includes(image)
  );

  const filesToDelete = imagesToDelete.map(extractFilePath);

  if (filesToDelete.length > 0) {
    const { error: deleteImagesError } = await supabase.storage
      .from("product-images")
      .remove(filesToDelete);
    if (deleteImagesError) {
      console.log(deleteImagesError.message);
      throw new Error(deleteImagesError.message);
    } else {
      console.log(`Imágenes eliminadas: ${filesToDelete.join(", ")}`);
    }
  }

  const uploadedImages = await Promise.all(
    validImages.map(async (image) => {
      if (image instanceof File) {
        const { data, error } = await supabase.storage
          .from("product-images")
          .upload(`${folderName}/${productId}-${image.name}`, image);

        if (error) throw new Error(error.message);

        const imageUrl = supabase.storage
          .from("product-images")
          .getPublicUrl(data.path).data.publicUrl;
        return imageUrl;
      } else if (typeof image === "string") {
        return image;
      } else {
        throw new Error("Tipo de imagen no soportada");
      }
    })
  );

  //4. ACTUALIZAR PRODUCTO CON IMÁGENES ACTUALIZADAS
  const { error: updateImagesError } = await supabase
    .from("products")
    .update({ images: uploadedImages })
    .eq("id", productId);
  if (updateImagesError) throw new Error(updateImagesError.message);

  //5. ACTUALIZAR VARIANTES DEL PRODUCTO
  const existingVariants = productInput.variants.filter((v) => v.id);
  const newVariants = productInput.variants.filter((v) => !v.id);

  if (existingVariants.length > 0) {
    const { error: updateVariantsError } = await supabase
      .from("variants")
      .upsert(
        existingVariants.map((variant) => ({
          id: variant.id,
          product_id: productId,
          stock: variant.stock,
          price: variant.price,
          storage: variant.storage,
          color: variant.color,
          color_name: variant.colorName,
        })),
        {
          onConflict: "id",
        }
      );
    if (updateVariantsError) throw new Error(updateVariantsError.message);
  }

  let newVariantsIds: string[] = [];

  if (newVariants.length > 0) {
    const { data, error: insertVariantsError } = await supabase
      .from("variants")
      .insert(
        newVariants.map((variant) => ({
          product_id: productId,
          stock: variant.stock,
          price: variant.price,
          storage: variant.storage,
          color: variant.color,
          color_name: variant.colorName,
        }))
      )
      .select();

    if (insertVariantsError) throw new Error(insertVariantsError.message);
    newVariantsIds = data.map((variant) => variant.id);
  }

  const currentVariantIds = [
    ...existingVariants.map((v) => v.id),
    ...newVariantsIds,
  ];

  const { error: deleteVariantsError } = await supabase
    .from("variants")
    .delete()
    .eq("product_id", productId)
    .not(
      "id",
      "in",
      `(${currentVariantIds ? currentVariantIds.join(",") : 0})`
    );
  if (deleteVariantsError) throw new Error(deleteVariantsError.message);

  return updatedProduct;
};
