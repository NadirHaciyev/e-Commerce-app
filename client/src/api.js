import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url);

    const allowedOrigins = [process.env.REACT_APP_BASE_ANDPOINT];
    const token = localStorage.getItem("access-token");

    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const fetchLogin = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ANDPOINT}/auth/login`,
    input
  );

  return data;
};

const fetchRegister = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ANDPOINT}/auth/register`,
    input
  );

  return data;
};

const fetchMe = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ANDPOINT}/auth/me`
  );

  return data;
};

const fetchLogout = async () => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ANDPOINT}/auth/logout`,
    {
      refresh_token: localStorage.getItem("refresh-token")
    }
  );

  return data;
};

const fetchProduct = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ANDPOINT}/product?page=${pageParam}`
  );

  return data;
};

const fetchProductDetail = async (productId) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ANDPOINT}/product/${productId}`
  );
  return data;
};

const deleteProduct = async (productId) => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_BASE_ANDPOINT}/product/${productId}`
  );
  return data;
};

const createProduct = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ANDPOINT}/product`,
    input
  );
  return data;
};

const updateProduct = async (productId, input) => {
  const { data } = await axios.put(
    `${process.env.REACT_APP_BASE_ANDPOINT}/product/${productId}`,
    input
  );
  return data;
};

const postOrder = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ANDPOINT}/order`,
    input
  );

  return data;
};

const fetchOrder = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ANDPOINT}/order`
  );

  return data.map((item) => ({
    user: item.user.email,
    items: item.items.length,
    address: item.adress
  }));
};

export {
  fetchLogin,
  fetchMe,
  fetchProduct,
  fetchProductDetail,
  fetchRegister,
  fetchLogout,
  postOrder,
  fetchOrder,
  deleteProduct,
  createProduct,
  updateProduct
};
