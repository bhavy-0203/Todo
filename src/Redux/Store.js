import { legacy_createStore } from "redux";
import { Reducers } from "./Reducers";

export const Store = legacy_createStore(Reducers);
