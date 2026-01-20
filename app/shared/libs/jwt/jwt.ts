import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import 'server-only';

const JWT_SECRET = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(JWT_SECRET);

interface TokenPayload extends JWTPayload {
  userId: string;
  username: string;
  roles: string[];
}

export async function signToken(payload: TokenPayload, expiresIn: string = '7d'): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(encodedKey);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey);
    return payload as TokenPayload;
  } catch (error) {
    console.error('JWT Verification failed:', error);
    return null;
  }
}