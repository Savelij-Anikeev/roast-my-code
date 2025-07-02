import {configureStore} from '@reduxjs/toolkit';
import config from '@/core/config';

import {usersSlice} from './slices/users';

const rootStore = configureStore({
	devTools: config.nodeEnv === 'development',
	reducer: {
		users: usersSlice.reducer
	}
});

export default rootStore;