import {createAsyncThunk} from "@reduxjs/toolkit";
import {getErrorMsg} from '@/utils';
import {type User} from "./types";

export const fetchUsers = createAsyncThunk(
	'users/fetchUsers',
	(_, opts) => {
		try {
			return [] as User[];
		} catch (err) {
			opts.rejectWithValue(getErrorMsg(err));
		}
	});