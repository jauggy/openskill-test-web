import { createSlice } from '@reduxjs/toolkit';


export interface SharedState {
    isBusy: boolean
}

const initialState: SharedState = {
    isBusy: false
}

export const sharedSlice = createSlice({
    name: 'shared',
    initialState,
    reducers: {
        setIsBusy: (state, action) => {
            state.isBusy = action.payload

        },

    }
})

export const { setIsBusy } = sharedSlice.actions;
export const sharedReducer = sharedSlice.reducer
