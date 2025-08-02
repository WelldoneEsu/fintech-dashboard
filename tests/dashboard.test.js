const request = require('supertest');
const app  = require('../app');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

jest.mock('../config/db'); // Adjust the path based on your project structure

describe('Dashboard Routes', () => {
  let token;
  
  beforeEach(async () => {
    const user = await User.create({ username: 'dashuser', password: '123456'   
    });
         token = jwt.sign({ id: user._id, role: user.role },
            process.env.JWT_SECRET);
    });
    it('should return dashboard summary', async () => {
        const res = await request(app)
        .get('/api/dashboard')
        .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('username', 'dashuser');
        expect(res.body).tohaveProperty('balance');
    });
});