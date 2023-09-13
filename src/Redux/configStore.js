import { configureStore } from "@reduxjs/toolkit";
import { baiTapFormReducer } from "./reducer/formStore";

export const store = configureStore({
  reducer: {
    baiTapFormReducer: baiTapFormReducer,
  },
});
