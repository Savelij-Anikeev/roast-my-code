import config from "@/core/config";
import {ENVIRONMENT} from "@/types/shared";

export const getErrorMsg = (err: unknown) => {
	if (config.nodeEnv === ENVIRONMENT.PRODUCTION) {
		return 'NO_REASON_IN_PRODUCTION';
	}

	return (err as any)?.message || 'Unknown error';
}