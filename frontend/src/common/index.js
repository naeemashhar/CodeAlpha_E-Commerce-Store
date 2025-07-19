
const backendDomain = import.meta.env.VITE_BACKEND_URL


const apiSummary = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/login`,
    method: "post",
  },
  userDetails: {
    url: `${backendDomain}/api/userDetails`,
    method: "get",
  },
  Logout: {
    url: `${backendDomain}/api/logout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomain}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomain}/api/get-product`,
    method: "get",
  },
  updateProduct : {
    url: `${backendDomain}/api/update-product`,
    method: "post",
  },
   categoryProduct : {
    url: `${backendDomain}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct : {
    url: `${backendDomain}/api/categoryProduct`,
    method: "post",
  },
  productDetails : {
    url: `${backendDomain}/api/product-details`,
    method: "post",
  },
  addToCartProduct : {
    url: `${backendDomain}/api/addtocart`,
    method: "post",
  },
  addToCartProductCount : {
    url: `${backendDomain}/api/countAddToCartProduct`,
    method: "get",
  },
  addToCartProductView : {
    url: `${backendDomain}/api/view-cart-product`,
    method: "get",
  },
  updateCartProduct : {
    url: `${backendDomain}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct : {
    url: `${backendDomain}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct : {
    url: `${backendDomain}/api/search`,
    method: "get",
  },
  filterProduct : {
    url: `${backendDomain}/api/filter-product`,
    method: "post",
  },
};

export default apiSummary;





 