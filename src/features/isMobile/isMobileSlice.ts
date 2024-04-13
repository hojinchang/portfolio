import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface isMobileState {
    isMobile: boolean;
}

const initialState: isMobileState = {
    isMobile: true
}

const isMobileSlice = createSlice({
    name: "isMobile",
    initialState,
    reducers: {
        setIsMobile: (state, action: PayloadAction<boolean>) => {
            state.isMobile = action.payload;
        }
    },
});

export const { setIsMobile } = isMobileSlice.actions;
export default isMobileSlice.reducer;