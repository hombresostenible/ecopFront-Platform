import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserPlatform } from '../../../types/User/userPlatform.types';

interface UsersPlatformState {
    usersPlatform: IUserPlatform | IUserPlatform[] | null;
    loading: boolean;
    errorUserPlatform: string[] | null;
}

const initialState: UsersPlatformState = {
    usersPlatform: null,
    loading: false,
    errorUserPlatform: null,
};

const usersPlatformSlice = createSlice({
    name: 'usersPlatform',
    initialState,
    reducers: {
        userPlatformData: (state, action: PayloadAction<IUserPlatform | null>) => {
            state.loading = false;
            state.usersPlatform = action.payload;
        },
        errorUserPlatform: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorUserPlatform = action.payload;
        },
        postUserPlatformStart: (state, action: PayloadAction<IUserPlatform  | null>) => {
            state.loading = true;
            state.usersPlatform = action.payload;
            state.errorUserPlatform = null;
        },
        postManyUsersPlatformStart: (state, action: PayloadAction<IUserPlatform[]>) => {
            state.loading = true;
            state.usersPlatform = action.payload;
            state.errorUserPlatform = null;
        },
        getUsersPlatformStart: (state, action: PayloadAction<IUserPlatform>) => {
            state.loading = true;
            state.usersPlatform = action.payload;
            state.errorUserPlatform = null;
        },
        getUserPlatformByIdStart: (state, action: PayloadAction<IUserPlatform>) => {
            state.loading = false;
            state.usersPlatform = action.payload;
            state.errorUserPlatform = null;
        },
        getUserPlatformsByBranchStart: (state, action: PayloadAction<IUserPlatform[]>) => {
            state.loading = true;
            state.usersPlatform = action.payload;
            state.errorUserPlatform = null;
        },
        putUserPlatformStart: (state) => {
            state.loading = true;
            state.errorUserPlatform = null;
        },
        putManyUsersPlatformStart: (state, action: PayloadAction<IUserPlatform[]>) => {
            state.loading = true;
            state.usersPlatform = action.payload;
            state.errorUserPlatform = null;
        },
        deleteUserPlatformStart: (state) => {
            state.loading = true;
            state.errorUserPlatform = null;
        },
    },
});

export const { userPlatformData, errorUserPlatform, postUserPlatformStart, postManyUsersPlatformStart, getUsersPlatformStart, getUserPlatformByIdStart, getUserPlatformsByBranchStart, putUserPlatformStart, putManyUsersPlatformStart, deleteUserPlatformStart } = usersPlatformSlice.actions;
export default usersPlatformSlice.reducer;