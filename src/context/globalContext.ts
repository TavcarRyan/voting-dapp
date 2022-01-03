import { createContext } from "react";

export interface IGlobalContext {
  toggleCreatePollModal: boolean;
  dispatch: (type: any) => void;
}

export const initialGlobalState = {
  toggleCreatePollModal: false,
  dispatch: () => {},
};

export const globalContext = createContext<IGlobalContext>(initialGlobalState);
