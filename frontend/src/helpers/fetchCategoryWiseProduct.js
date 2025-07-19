import apiSummary from "../common";

const fetchCategoryWiseProduct = async (category) => {
  const response = await fetch(apiSummary.categoryWiseProduct.url, {
    method: apiSummary.categoryWiseProduct.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category: category,
    }),
  });

  const dataResponse = await response.json();

  return dataResponse;
};

export default fetchCategoryWiseProduct;
