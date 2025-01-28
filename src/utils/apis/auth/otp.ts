import { request } from "../api";
import { headers } from "../../../config/config";
import { MESSAGE } from "../../../constants/api/message";

const { post } = request;

const initialRoute = "/auth";

export const getOtp = async (phone_no: any) => {
  try {
    const endpoint = `${initialRoute}/getOtp`;
    const response = await post(endpoint, phone_no, {
      ...headers,
    });
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.post.succ) {
        const {
          data: { result },
        } = response;
        return result;
      }
    }
    throw new Error();
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
