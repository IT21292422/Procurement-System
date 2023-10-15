// Import your login function
import login from './login';
import { UserCredential } from 'firebase/auth';

// Mock Firebase authentication and Firestore
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
}));

describe('login function', () => {
  it('should successfully log in and set user type', async () => {
    const mockUserCredential = {
      user: {
        email: 'user@example.com',
      },
    } as UserCredential;

    const mockQuerySnapshot = {
      empty: false,
      docs: [
        {
          data: () => ({
            userType: 'student',
          }),
        },
      ],
    };

    // Mock Firebase functions to return expected values
    signInWithEmailAndPassword.mockResolvedValue(mockUserCredential);
    collection.mockReturnValue({ query });
    query.mockReturnValue({ where, getDocs });
    getDocs.mockResolvedValue(mockQuerySnapshot);

    const { userType, error } = await login('user@example.com', 'password');

    // Assertions
    expect(userType).toBe('student');
    expect(error).toBeNull();
  });

  it('should handle a user not found error', async () => {
    const mockUserCredential = {
      user: {
        email: 'user@example.com',
      },
    } as UserCredential;

    const mockQuerySnapshot = {
      empty: true,
    };

    // Mock Firebase functions to return expected values
    signInWithEmailAndPassword.mockResolvedValue(mockUserCredential);
    collection.mockReturnValue({ query });
    query.mockReturnValue({ where, getDocs });
    getDocs.mockResolvedValue(mockQuerySnapshot);

    const { userType, error } = await login('user@example.com', 'password');

    // Assertions
    expect(userType).toBeNull();
    expect(error).toBe('User not found in FireStore.');
  });

  it('should handle a sign-in error', async () => {
    const signInError = new Error('Sign-in error');

    // Mock Firebase functions to simulate a sign-in error
    signInWithEmailAndPassword.mockRejectedValue(signInError);

    const { userType, error } = await login('user@example.com', 'password');

    // Assertions
    expect(userType).toBeNull();
    expect(error).toBe('Sign-in error');
  });
});
