import axios from "axios";

const useImgbb = () => {
  const imgbbUpload = async (photo) => {
    const formData = new FormData();
    formData.append("image", photo);

    const res = await axios.post(
      "https://api.imgbb.com/1/upload?key=2eeacd821823a9da5e1e0aaef34f237d",
      formData
    );

    return res.data.data.url;
  };

  return imgbbUpload;
};

export default useImgbb;
