import {configureStore} from "@reduxjs/toolkit";
import categoryReducer from "./../../slice/categorySlice";

import subcategoryRender from './../../slice/subcategorySlice';
export const store=configureStore({
    reducer:{
        categories:categoryReducer,
        subcategories:subcategoryRender,
    },
});