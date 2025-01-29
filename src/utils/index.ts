import { AdminLogin } from "./apis/auth/login";
import { deleteProvider, editProvider, getAllProviders } from "./apis/providers/providers";
import { createService, deleteService, editService, getAllServices } from "./apis/services/service";


export const api = {
  auth: {
    AdminLogin
  },
  providers:{
    getAllProviders,
    deleteProvider,
    editProvider
  },
  services:{
    getAllServices,
    createService,
    editService,
    deleteService
  }
  
};
