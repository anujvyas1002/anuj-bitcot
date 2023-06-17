import axios from "axios";

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        contacts: [],
        status: STATUSES.IDLE
    },
    reducers: {
        // setProducts(state, action) {
        //     state.data = action.payload;
        // },
        // setStatus(state, action) {
        //     state.status = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.contacts = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
            
            .addCase(addContact.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(addContact.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
            .addCase(updateContact.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
            })
            .addCase(updateContact.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
            .addCase(removeContact.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(removeContact.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
            })
            .addCase(removeContact.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
            
    },
    
});


export const {setContacts, setStatus } = contactSlice.actions;

export default contactSlice.reducer;




// Thunks
export const fetchContacts = createAsyncThunk('contacts/fetch', async () => {
    const res = await axios.get(`http://localhost:3000/contacts`)
        const data = res.data
        return data;
});

export const addContact = createAsyncThunk('contacts/add', async (req) => {
    const res = await axios.post(`http://localhost:3000/contacts`,req)
    const data = res.data
    return data;
});
export const updateContact = createAsyncThunk('contacts/update', async (req) => {
    const res = await axios.put(`http://localhost:3000/contacts/${req.id}`, req)
    const data = res.data
    return data;
});
export const removeContact = createAsyncThunk('contacts/remove', async (id) => {
    const res = await axios.delete(`http://localhost:3000/contacts/${id}`)
    const data = res.data
    return data;
});




