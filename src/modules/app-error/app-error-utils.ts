import {
  AppErrorCode,
  AppErrorDetail,
  appErrorDetails,
} from "@/modules/app-error/app-error-details";

export const FALLBACK_APP_ERROR_CODE =
  "unknown" as const satisfies AppErrorCode;

export const isAppErrorCode = (input: string): input is AppErrorCode =>
  Object.hasOwn(appErrorDetails, input);

export const getAppErrorDetail = (input: string): AppErrorDetail =>
  isAppErrorCode(input)
    ? appErrorDetails[input]
    : appErrorDetails[FALLBACK_APP_ERROR_CODE];
