// backend/tests/clubs.test.js
import request from 'supertest';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load mock data
const mockClubs = JSON.parse(fs.readFileSync(path.join(__dirname, 'clubs.mock.json'), 'utf-8'));

const app = express();
app.use(express.json());

// Mocked endpoints
app.get('/api/clubs', (req, res) => {
  res.status(200).json(mockClubs);
});

describe('Mocked Clubs API', () => {
  it('GET /api/clubs should return all clubs', async () => {
    const res = await request(app).get('/api/clubs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
