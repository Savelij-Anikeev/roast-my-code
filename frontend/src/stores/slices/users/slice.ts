import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {LoadingState} from "@/types/shared";
import {
	type State,
	type User
} from './types';
import * as actions from './actions';

const initialState: State = {
	users: [],
	loadingState: LoadingState.IDLE,
}

const slice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addUsers: (state, action: PayloadAction<User[]>) => {
			state.users.push(...action.payload);
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(actions.fetchUsers.fulfilled, (state, action) => {
				state.users = action.payload!;
				state.loadingState = LoadingState.SUCCESS;
			})
			.addCase(actions.fetchUsers.rejected, (state) => {
				state.loadingState = LoadingState.ERROR;
			})
			.addCase(actions.fetchUsers.pending, (state) => {
				state.loadingState = LoadingState.LOADING;
			})
	}
});

export default slice;