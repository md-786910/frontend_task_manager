import toast from "react-hot-toast";

export const apiSuccess = (message) => {
  return toast.success(message, {
    duration: 5000,
  });
};

export const customError = (msg) => {
  return toast.error(msg, {
    duration: 5000,
  });
};
export const apiError = (error) => {
  return toast.error(error?.response?.data?.message || error?.message, {
    duration: 5000,
  });
};
