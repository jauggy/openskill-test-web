import { configureStore } from '@reduxjs/toolkit'
import { sharedReducer } from 'src/reducers/shared'
import { bottomMessageReducer } from './bottomMessage'


export const store = configureStore({
    reducer: {
        shared: sharedReducer,
        bottomMessage: bottomMessageReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
