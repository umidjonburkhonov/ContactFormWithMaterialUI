import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contactsService } from "../../services/contactsService.js";

// Thunks
export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async (_, thunkAPI) => {
        try {
            return await contactsService.getAllContacts();
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || "Error");
        }
    }
);

export const fetchContactById = createAsyncThunk(
    "contacts/fetchById",
    async (id, thunkAPI) => {
        try {
            return await contactsService.getContactById(id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || "Error");
        }
    }
);

export const addContact = createAsyncThunk(
    "contacts/add",
    async (contact, thunkAPI) => {
        try {
            return await contactsService.createContact(contact);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || "Error");
        }
    }
);

export const editContact = createAsyncThunk(
    "contacts/edit",
    async (contact, thunkAPI) => {
        try {
            return await contactsService.updateContact(contact.id, contact);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || "Error");
        }
    }
);

export const deleteContact = createAsyncThunk(
    "contacts/delete",
    async (id, thunkAPI) => {
        try {
            await contactsService.removeContact(id);
            return id;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || "Error");
        }
    }
);

const initialState = {
    list: [],
    loading: false,
    error: null,
    search: "",
    current: null,
    currentLoading: false,
    currentError: null
};

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        setSearch(state, action) {
            state.search = action.payload;
        },
        clearCurrent(state) {
            state.current = null;
            state.currentError = null;
            state.currentLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch all
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error loading contacts";
            })

            // Fetch by id
            .addCase(fetchContactById.pending, (state) => {
                state.currentLoading = true;
                state.currentError = null;
                state.current = null;
            })
            .addCase(fetchContactById.fulfilled, (state, action) => {
                state.currentLoading = false;
                state.current = action.payload;
            })
            .addCase(fetchContactById.rejected, (state, action) => {
                state.currentLoading = false;
                state.currentError = action.payload || "Error loading contact";
            })

            // Add
            .addCase(addContact.pending, (state) => {
                state.error = null;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(addContact.rejected, (state, action) => {
                state.error = action.payload || "Error adding contact";
            })

            // Edit
            .addCase(editContact.fulfilled, (state, action) => {
                const idx = state.list.findIndex((c) => c.id === action.payload.id);
                if (idx !== -1) state.list[idx] = action.payload;
                if (state.current && state.current.id === action.payload.id) {
                    state.current = action.payload;
                }
            })
            .addCase(editContact.rejected, (state, action) => {
                state.error = action.payload || "Error updating contact";
            })

            // Delete
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.list = state.list.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.error = action.payload || "Error deleting contact";
            });
    }
});

export const { setSearch, clearCurrent } = contactsSlice.actions;
export default contactsSlice.reducer;
