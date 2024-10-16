import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../types/User/user.types';

interface UserState {
    user: IUser | null;
    loading: boolean;
    errorUser: string[] | null;
    isAuthenticated: boolean;
    recaptchaVerified: boolean;
    recaptchaError: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    errorUser: null,
    isAuthenticated: false,
    recaptchaVerified: false,
    recaptchaError: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userData: (state, action: PayloadAction<IUser | null>) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        userErrors: (state, action: PayloadAction<string[]>) => {
            state.loading = true;
            state.errorUser = action.payload;
        },
        registerUserStart: (state, action: PayloadAction<IUser>) => {
            state.loading = true;
            state.user = action.payload;
            state.errorUser = null;
        },
        isAuthenticatedStatus: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        loginStart: (state, action: PayloadAction<IUser>) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        sendEmailByResetPasswordStart: (state) => {
            state.loading = false;
            state.errorUser = null;
        },
        putResetPasswordStart: (state) => {
            state.loading = false;
            state.errorUser = null;
        },
        profileStart: (state, action: PayloadAction<IUser>) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        putProfileUserStart: (state) => {
            state.loading = true;
            state.errorUser = null;
        },
        accountUnlocking: (state) => {
            state.loading = false;
            state.errorUser = null;
        },
        logoChange: (state, action: PayloadAction<Partial<IUser>>) => {
            state.loading = false;
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            } else {
                state.user = { ...action.payload } as IUser;
            }
        },
        deleteLogo: (state) => {
            state.loading = false;
        },
        patchUpdateApplicationPasswordStart: (state) => {
            state.loading = true;
            state.errorUser = null;
        },
        clearUserErrors: (state) => {
            state.loading = false;
            state.errorUser = null;
        },
        // SETEA LA CORRECTA VALIDACION DEL reCAPTCHA
        setRecaptchaVerifiedSuccess: (state) => {
            state.recaptchaVerified = true;
            state.recaptchaError = null;
        },
        // SETEA EL ERROR EN LA VALIDACION DEL reCAPTCHA
        setRecaptchaError: (state, action: PayloadAction<string>) => {
            state.recaptchaVerified = false;
            state.recaptchaError = action.payload;
        },
    },
});

export const { userData, userErrors, registerUserStart, isAuthenticatedStatus, loginStart, sendEmailByResetPasswordStart, putResetPasswordStart, profileStart, putProfileUserStart, accountUnlocking, logoChange, deleteLogo, patchUpdateApplicationPasswordStart, clearUserErrors, setRecaptchaVerifiedSuccess, setRecaptchaError } = userSlice.actions;
export default userSlice.reducer;