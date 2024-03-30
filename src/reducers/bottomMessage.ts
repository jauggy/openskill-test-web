import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: BottomMessageState = {
    animationState: 'default'
}

export interface BottomMessageState {
    message?: string,
    level?: MessageLevel,
    date?: number //Cannot put Date into store,
    animationState: 'default' | 'forward' | 'reverse'
}

export type MessageLevel = 'error' | 'info'

export const bottomMessageSlice = createSlice({
    name: 'bottomMessage',
    initialState,
    reducers: {
        showInfo: (state, action) => {
            state.message = action.payload
            state.date = (new Date()).valueOf()
            state.level = 'info'
            state.animationState = 'forward'
        },
        showError: (state, action) => {
            state.message = action.payload;
            state.date = (new Date()).valueOf();
            state.level = 'error'
            state.animationState = 'forward'

        },
        hideMessage: (state) => {
            state.animationState = 'reverse'
        },
        hideSpecificMessage: (state, action: PayloadAction<string>) => {
            if (state.message === action.payload) {
                state.animationState = 'reverse'
            }
        },
        resetMessageState: (state) => {
            state.message = undefined;
            state.date = undefined
            state.animationState = 'default'
        }
    }
})

export const { showInfo, showError, resetMessageState, hideMessage, hideSpecificMessage } = bottomMessageSlice.actions;
export const bottomMessageReducer = bottomMessageSlice.reducer
