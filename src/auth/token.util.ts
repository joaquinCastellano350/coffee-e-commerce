import jwt from "jsonwebtoken";

export type JwtPayload = {
  id: string;
  email: string;
  role: "admin" | "user";
};

export function signAccess(payload: JwtPayload) {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "15m",
  });
}

export function signRefresh(payload: JwtPayload & { jti: string }) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
}

export function verifyAccess(token: string): JwtPayload {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as JwtPayload;
}

export function verifyRefresh(token: string): JwtPayload & { jti: string } {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as JwtPayload & {
    jti: string;
  };
}
