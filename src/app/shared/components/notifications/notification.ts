export interface Notification {
  success(message: string): void;
  error(message: string): void;
}
