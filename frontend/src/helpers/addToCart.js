import { toast } from "react-toastify";
import apiSummary from "../common";

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  const response = await fetch(apiSummary.addToCartProduct.url, {
    method: apiSummary.addToCartProduct.method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });

  const responseData = await response.json();

  if (responseData.success) {
    toast.success(responseData.message);
  }

  if (responseData.error) {
    toast.error(responseData.message);
  }

  return responseData;
};

export default addToCart;
