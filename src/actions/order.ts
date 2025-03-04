import { OrderInput } from "../interfaces";
import { supabase } from "../supabase/client";

export const createOrder = async (order: OrderInput) => {
  // OBTENER USUARIO AUTENTICADO + CLIENTE
  const { data, error: errorUser } = await supabase.auth.getUser();
  if (errorUser) {
    console.log(errorUser.message);
    throw new Error(errorUser.message);
  }

  const userId = data.user.id;
  const { data: customer, error: errorCustomer } = await supabase
    .from("customers")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (errorCustomer) {
    console.log(errorCustomer);
    throw new Error(errorCustomer.message);
  }

  const customerId = customer.id;

  // VERIFICAR STOCK SUFICIENTE PARA CADA VARIANTE
  for (const item of order.cartItems) {
    const { data: variantData, error: variantError } = await supabase
      .from("variants")
      .select("stock")
      .eq("id", item.variantId);
    if (variantError) {
      console.log(variantError);
      throw new Error(variantError.message);
    }
    if (variantData.stock < item.quantity) {
      throw new Error("No hay stock del producto solicitado");
    }
  }

  //GUARDAR DIRECCIÓN DE ENVÍO
  const { data: addressData, error: addressError } = await supabase
    .from("addresses")
    .insert({
      address_line1: order.address.addressLine1,
      address_line2: order.address.addressLine2,
      city: order.address.city,
      state: order.address.state,
      postal_code: order.address.postalCode,
      country: order.address.country,
      customer_id: customerId,
    })
    .select()
    .single();
  if (addressError) {
    console.log(addressError);
    throw new Error(addressError.message);
  }

  //CREAR ORDER
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_id: customerId,
      address_id: addressData.id,
      total_amount: order.totalAmount,
      status: "Pending",
    })
    .select()
    .single();

  if (orderError) {
    console.log(orderError);
    throw new Error(orderError.message);
  }

  //GUARDAR DETALLES DE ORDEN
  const orderItems = order.cartItems.map((item) => ({
    order_id: orderData.id,
    variant_id: item.variantId,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: orderItemsError } = await supabase
    .from("order_items")
    .insert(orderItems);
  if (orderItemsError) {
    console.log(orderItemsError);
    throw new Error(orderItemsError.message);
  }

  //ACTUALIZAR EL STOCK DE LAS VARIANTES
  for (const item of order.cartItems) {
    const { data: variantData } = await supabase
      .from("variants")
      .select("stock")
      .eq("id", item.variantId)
      .single();
    if (!variantData) {
      throw new Error("No se encontró el producto");
    }

    const newStock = variantData.stock - item.quantity;

    const { error: updatedStockError } = await supabase
      .from("variants")
      .update({
        stock: newStock,
      })
      .eq("id", item.variantId);

    if (updatedStockError) {
      console.log(updatedStockError);
      throw new Error("No se pudo actualizar el stock del producto");
    }
  }

  return orderData;
};

export const getOrderByCustomerId = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select("id")
    .eq("user_id", data.user.id)
    .single();
  if (customerError) {
    console.log(customerError);
    throw new Error(customerError.message);
  }

  const customerId = customer.id;

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("id, total_amout, status, created_at")
    .eq("customer_id", customerId)
    .order("created_at", {
      ascending: false,
    });
  if (ordersError) {
    console.log(ordersError);
    throw new Error(ordersError.message);
  }

  return orders;
};

export const getOrderById = async (orderdId: number) => {
  const { data, error: errorUser } = await supabase.auth.getUser();
  if (errorUser) {
    console.log(errorUser);
    throw new Error(errorUser.message);
  }

  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select("id")
    .eq("user_id", data.user.id)
    .single();
  if (customerError) {
    console.log(customerError);
    throw new Error(customerError.message);
  }

  const customerId = customer.id;
  const { data: order, error } = await supabase
    .from("orders")
    .select(
      "*, addresses(*), customers(full_name, email), order_items(quantity, price, variants(color_name, storage, products(name, images)))"
    )
    .eq("customer_id", customerId)
    .eq("id", orderdId)
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return {
    customer: {
      email: order?.customers?.email,
      full_name: order.customers?.full_name,
    },
    totalAmount: order.total_amount,
    status: order.status,
    addres: {
      addressLine1: order.addresses?.address_line1,
      addressLine2: order.addresses?.address_line2,
      city: order.addresses?.city,
      state: order.addresses?.state,
      postalCode: order.addresses?.postal_code,
      country: order.addresses?.country,
    },
    orderItems: order.order_items.map((item) => ({
      quantity: item.quantity,
      price: item.price,
      color_name: item.variants?.color_name,
      storage: item.variants?.storage,
      productName: item.variants?.products?.name,
      productImage: item.variants?.products?.images[0],
    })),
  };
};
