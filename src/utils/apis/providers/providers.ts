import { headers } from "../../../config/config";
import { MESSAGE } from "../../../constants/api/message";
import { Payload } from "../../../@types/api/api.types";
import { request } from "../../api";

const { get,del , patch, post } = request;

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

export const deleteProvider = async (phone: any,id:any) => {
  try {
    const endpoint = `${initialRoute}/deleteProvider?phone=${phone}&id=${id}`;
    const response = await del(endpoint, {
      ...headers,
      
    });
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.delete.succ) {
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

export const createProvider = async (payload: Payload) => {
  try {
    const endpoint = `auth/provider-signup`;
    const response = await post(endpoint, payload, {
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
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};
export const editProvider = async (payload: Payload,phone:any,id:any) => {
  try {
    const endpoint = `${initialRoute}/editProvider?phone=${phone}&id=${id}`;
    const response = await patch(endpoint, payload, {
      ...headers,
    });
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.patch.succ) {
        const {
          data: { result },
        } = response;
        return result;
      }
    }
    throw new Error();
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};
