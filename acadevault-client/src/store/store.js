import authReducer from "@/features/auth/authSlice";
import categoryReducer from "@/features/category/categorySlice";
import materialUiReducer from "@/features/materials/materialsUiSlice";

import { authApi } from "@/features/auth/authApi";
import { academicLevelApi } from "@/features/category/academicLevelApi";
import { categoryApi } from "@/features/category/categoryApi";
import { materialApi } from "@/features/materials/academicMaterialsApi";
import { featuredMaterialsApi } from "@/features/materials/featuredMaterialsApi";

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { shopApi } from "@/features/shop/shopApi";
import { reviewsApi } from "@/features/reviews/reviewsApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // persist only auth slice
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [academicLevelApi.reducerPath]: academicLevelApi.reducer,
  [materialApi.reducerPath]: materialApi.reducer,
  [shopApi.reducerPath]: shopApi.reducer,
  [reviewsApi.reducerPath]: reviewsApi.reducer,
  [featuredMaterialsApi.reducerPath]: featuredMaterialsApi.reducer,
  auth: authReducer,
  category: categoryReducer,
  materialsUi: materialUiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      categoryApi.middleware,
      academicLevelApi.middleware,
      materialApi.middleware,
      shopApi.middleware,
      reviewsApi.middleware,
      featuredMaterialsApi.middleware
    ),
});

export const persistor = persistStore(store);
