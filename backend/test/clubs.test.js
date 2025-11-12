const request = require('supertest');
const express = require('express');
const app = express();

module.exports = app;

describe('Clubs API', () => {
  describe('GET /clubs', () => {
    it('should return all clubs', async () => {
      const res = await request(app).get('/clubs');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /clubs', () => {
    it('should create a new club', async () => {
      const res = await request(app)
        .post('/clubs')
        .send({
          name: 'Chess Club',
          description: 'For chess enthusiasts'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('Chess Club');
    });
  });
});
