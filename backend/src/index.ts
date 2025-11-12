import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from '../db';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// GET all users
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT id, email, password, created_at FROM users');
    res.json({ success: true, users: rows });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

app.post('/api/signup', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    // @ts-ignore
    if (existingUsers.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Insert new user
    await db.query('INSERT INTO users (email, password, created_at) VALUES (?, ?, NOW())', [email, password]);

    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Failed to register user:', error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
