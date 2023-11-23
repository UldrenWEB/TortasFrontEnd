import fetcho from "./fetcho";

const fetchDataPost = async ({ area, object, method, params }) => {
  try {
    const body = {
      area,
      object,
      method,
      params,
    };

    // console.log(body)
    const fetchoResponse = await fetcho({
      url: "/toProcess",
      body,
      method: "POST",
    });

    return fetchoResponse;
  } catch (error) {
    console.log(
      `Hubo un error en el handleFetcho del useLoadData, error: ${error.message}`
    );

    return { error: error.message };
  }
};

export default fetchDataPost;
