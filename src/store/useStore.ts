import create, { GetState, SetState, StoreApi } from "zustand";
import { movementSlice } from "./playerSlice";

const createRootSlice = (
  set: SetState<any>,
  get: GetState<any>,
  api: StoreApi<any>
) => {
  return {
    ...movementSlice(set, get),
  };
};

export const useStore = create(createRootSlice);
