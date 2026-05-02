export interface ApiErrorDetail {
  field: string;
  message: string;
}

export interface ApiErrorBody {
  code: string;
  details?: ApiErrorDetail[];
}

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T | null;
  timestamp: string;
  error?: ApiErrorBody;
}
