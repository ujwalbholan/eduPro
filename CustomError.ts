export type Feature = "auth" | "payment" | "notification";

export type ErrorType =
  | "too-many-request"
  | "invalid-credential"
  | "user-not-found"
  | "nofication-failur"
  | "unknown";

export type Code = "400" | "404" | "500";

export type ErrorCode = `${Feature} : ${ErrorType} : ${Code}`;




const reportError = (e: ErrorCode) => {};
