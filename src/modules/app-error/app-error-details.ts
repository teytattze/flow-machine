export type AppErrorDetail = {
  message: string;
  status: number;
};

export const appErrorDetails = {
  badRequest: {
    message: "bad request",
    status: 400,
  },
  unauthorized: {
    message: "unauthorized",
    status: 401,
  },
  forbidden: {
    message: "forbidden",
    status: 403,
  },
  notFound: {
    message: "notFound",
    status: 404,
  },
  unknown: {
    message: "unknown error",
    status: 500,
  },
} as const satisfies Record<string, AppErrorDetail>;

export type AppErrorDetails = typeof appErrorDetails;
export type AppErrorCode = keyof AppErrorDetails;
