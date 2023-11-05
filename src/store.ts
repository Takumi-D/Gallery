import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/services";

import reducer from "./slice/filters";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    filter: reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
