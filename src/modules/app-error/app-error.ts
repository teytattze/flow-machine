import {
  AppErrorCode,
  AppErrorDetail,
} from "@/modules/app-error/app-error-details";
import {
  FALLBACK_APP_ERROR_CODE,
  getAppErrorDetail,
} from "@/modules/app-error/app-error-utils";

type AppErrorProps<T = unknown> = {
  code: AppErrorCode;
  data?: T;
};

type NewAppErrorInput = AppErrorProps & {
  cause?: unknown;
  message?: string;
};

export class AppError extends Error {
  private readonly props: AppErrorProps;

  constructor(props: NewAppErrorInput) {
    const { code, cause, data, message: customMessage } = props;
    const { message: defaultMessage } = getAppErrorDetail(code);

    super(customMessage ?? defaultMessage, { cause });

    this.props = { code, data };
  }

  static from(input: unknown): AppError {
    if (input instanceof AppError) {
      return input;
    }

    return new AppError({
      code: FALLBACK_APP_ERROR_CODE,
      cause: input,
    });
  }

  static ofCode(
    input: AppErrorCode,
    options?: { cause?: unknown; message?: string },
  ): AppError {
    const { cause, message } = options ?? {};
    return new AppError({
      code: input,
      cause,
      message,
    });
  }

  static is(input: unknown): input is AppError {
    return input instanceof AppError;
  }

  toDto() {
    return {
      code: this.code,
      message: this.message,
      status: this.status,
    } as const satisfies AppErrorDetail & { code: AppErrorCode };
  }

  isCode(input: AppErrorCode): boolean {
    return this.props.code === input;
  }

  get code(): AppErrorCode {
    return this.props.code;
  }
  get data(): unknown {
    return this.props.data;
  }
  get detail(): AppErrorDetail {
    return getAppErrorDetail(this.props.code);
  }
  get status(): number {
    return getAppErrorDetail(this.props.code).status;
  }
}
