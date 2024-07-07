import jwt from "jsonwebtoken";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const ENCRYPTION_KEY =
  "c40bbf329bc885129ce50f0751afe284952fd2dd44266534a0e8110cf36490e3";

export function encrypt(text: string) {
  return jwt.sign(text, ENCRYPTION_KEY);
}

export function decrypt(text: string) {
  const decoded = jwt.verify(text, ENCRYPTION_KEY);
  return decoded;
}
