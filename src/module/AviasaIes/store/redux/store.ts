import { configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "./slices/filterSlice";
import { ticketsReducer } from "./slices/ticketsSlice";
// ...

export const storeAviasales = configureStore({
  reducer: {
    filterReducer,
    ticketsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof storeAviasales.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof storeAviasales.dispatch;
