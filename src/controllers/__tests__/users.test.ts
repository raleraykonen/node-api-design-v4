import * as users from "../users.js";

describe('users controller', () => {
  it('should create a new user', async () => {
    const req = {
      body: {
        username: 'john',
        password: 'password123'
      },
      get: jest.fn(),
      header: jest.fn(),
      accepts: jest.fn(),
      acceptsCharsets: jest.fn(),
      acceptsEncodings: jest.fn(),
      acceptsLanguages: jest.fn(),
    } as any;
    const res = {
      json({token}) {
        expect(token).toBeDefined();
      }
    } as any;

    await users.createNewUser(req, res, () => {});
  });
});