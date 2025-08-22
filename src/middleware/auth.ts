import { Request, Response, NextFunction } from 'express';
import sessionMap from './sessionStore';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  
  // SESSION AUTH START
  // if (req.session && req.session.uuid && sessionMap.has(req.session.uuid)) {
  //   next();
  // } else {
  //   res.status(401).json({ error: 'Unauthorized: No valid session' });
  // }
  // SESSION AUTH END
  
  // JWT AUTH START
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expect Bearer <token>
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET || 'default_jwt_secret', (err, decoded: any) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
    (req as any).user = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  });
  // JWT AUTH END
} 