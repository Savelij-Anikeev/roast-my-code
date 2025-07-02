import {LoadingState} from "@/types/shared";

export type User = {
	id: number;
}

export type State = {
	users: User[];
	loadingState: LoadingState;
}