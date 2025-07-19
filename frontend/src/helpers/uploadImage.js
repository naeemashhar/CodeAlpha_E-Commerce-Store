const cloudName = import.meta.env.VITE_CLOUD_NAME_CLOUDINARY; 
const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;


const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "e-commerce_product");

  const dataResponse = await fetch(url, {
    method: "post",
    body: formData,
  });
  

  return dataResponse.json();
};

export default uploadImage;
