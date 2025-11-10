import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "../features/contacts/contactsSlice.js";

export const store = configureStore({
    reducer: {
        contacts: contactsReducer
    }
});
