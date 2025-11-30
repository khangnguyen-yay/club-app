// backend/tests/clubs.test.js
import request from 'supertest';
import { jest } from '@jest/globals';

// In ESM, mock modules BEFORE importing the app to avoid real side-effects.
await jest.unstable_mockModule('../middlewares/authMiddleware.js', () => ({
  __esModule: true,
  default: (req, res, next) => {
    if (global.__TEST_USER) {
      req.user = global.__TEST_USER;
      return next();
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }
}));

// Mock statusService for predictable results without touching the DB
await jest.unstable_mockModule('../services/statusService.js', () => ({
  __esModule: true,
  getUserClubsByStatus: jest.fn(),
  getAllUserClubsWithStatus: jest.fn(),
  getUserClubPreference: jest.fn(),
  insertUserStatus: jest.fn(),
  updateUserStatus: jest.fn()
}));

// Prevent real DB pool from connecting during tests
await jest.unstable_mockModule('../config/db.js', () => ({
  __esModule: true,
  default: { query: async () => [[], []] }
}));

// Avoid initializing real Google OAuth strategy during tests
await jest.unstable_mockModule('../config/passport.js', () => ({
  __esModule: true,
  default: () => {}
}));

const { default: app } = await import('../app.js');
const { getUserClubsByStatus, getAllUserClubsWithStatus, getUserClubPreference, updateUserStatus } = await import('../services/statusService.js');

describe('Clubs and Auth Routes', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      delete global.__TEST_USER;
    });

    it('GET /api/clubs should return all clubs', async () => {
      const res = await request(app)
        .get('/api/clubs')
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /auth/logout returns JSON and clears session cookie', async () => {
      const res = await request(app)
        .post('/auth/logout')
        .set('Accept', 'application/json')
        .expect(200);

      expect(res.body).toEqual({ message: 'Logged out' });
      const setCookie = res.headers['set-cookie'];
      expect(Array.isArray(setCookie)).toBe(true);
      // Should include a cookie clearing header for connect.sid
      const cleared = (setCookie || []).some(h => /connect\.sid=/i.test(h));
      expect(cleared).toBe(true);
    });

    it('GET /auth/status reflects authentication state', async () => {
      // Unauthenticated should be 401
      const resUnauthed = await request(app)
        .get('/auth/status')
        .set('Accept', 'application/json')
        .expect(401);

      // Authenticated should be 200
      global.__TEST_USER = { id: 5, email: 'tester@example.com' };
      const resAuthed = await request(app)
        .get('/auth/status')
        .set('Accept', 'application/json')
        .expect(200);

      expect(resAuthed.body).toEqual({ authenticated: true, user: { id: 5, email: 'tester@example.com' } });
    });

    it('POST /api/user/statuses updates a club with a new status', async () => {
      global.__TEST_USER = { id: 11, email: 'tester@example.com' };
      // Mock service to confirm correct parameters
      const mockResult = { userId: 11, clubId: 77, preference: 'applied' };
      getUserClubPreference.mockResolvedValue({ user_id: 11, club_id: 77, preference: 'considering' });
      updateUserStatus.mockResolvedValue(mockResult);

      const res = await request(app)
        .post('/api/user/statuses')
        .send({ clubId: 77, preference: 'applied' })
        .expect(200);

      expect(getUserClubPreference).toHaveBeenCalledWith(11, 77);
      expect(updateUserStatus).toHaveBeenCalledWith(11, 77, 'applied');
      expect(res.body).toMatchObject({ message: 'Status updated', userId: 11, clubId: 77, preference: 'applied' });
    });

    it('GET /api/user/clubs?status=considering returns filtered clubs', async () => {
      global.__TEST_USER = { id: 42, email: 'tester@example.com' };
      const mockClubs = [
        { clubID: 1, club_name: 'ACM', type: 'CS', preference: 'considering' },
        { clubID: 2, club_name: 'IEEE', type: 'EE', preference: 'considering' }
      ];
      getUserClubsByStatus.mockResolvedValue(mockClubs);

      const res = await request(app)
        .get('/api/user/clubs?status=considering')
        .expect(200);

      expect(getUserClubsByStatus).toHaveBeenCalledWith(42, 'considering');
      expect(res.body).toEqual(mockClubs);
    });
});
