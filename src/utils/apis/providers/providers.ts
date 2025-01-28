import { headers } from "../../../config/config";
import { MESSAGE } from "../../../constants/api/message";
import { Payload } from "../../../@types/api/api.types";
import { request } from "../../api";

const { get } = request;

const initialRoute = "admin";

export const getAllProviders = async (filter: any) => {
  try {
    const endpoint = `${initialRoute}/getAllProviders`;
    const response = await get(endpoint, {
      ...headers,
      
    },
    filter);
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.get.succ) {
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