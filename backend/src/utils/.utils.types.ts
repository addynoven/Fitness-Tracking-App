import { JWTPayload } from "jose";

interface RefreshAccessTokenResult {
  accessToken?: string;
  error?: string;
}

interface Payload {
  id: string;
  iat: number;
  exp: number;
}

interface verifyTokenResult {
  isValid: boolean;
  payload: JWTPayload;
}

export { RefreshAccessTokenResult, verifyTokenResult, Payload };
