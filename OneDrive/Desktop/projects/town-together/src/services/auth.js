import jwt from 'jsonwebtoken';
import User from '../models/User';
import connectToDatabase from '../utils/mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '7d';

/**
 * Register a new user
 * @param {Object} userData - User data including name, email, password
 * @returns {Object} User object and token
 */
export async function registerUser(userData) {
  await connectToDatabase();
  
  // Check if user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }
  
  // Create new user
  const user = new User(userData);
  await user.save();
  
  // Generate token
  const token = generateToken(user._id);
  
  // Return user without password and token
  const userObj = user.toObject();
  delete userObj.password;
  
  return { user: userObj, token };
}

/**
 * Login a user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} User object and token
 */
export async function loginUser(email, password) {
  await connectToDatabase();
  
  // Find user by email and include password for comparison
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Check password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }
  
  // Generate token
  const token = generateToken(user._id);
  
  // Return user without password and token
  const userObj = user.toObject();
  delete userObj.password;
  
  return { user: userObj, token };
}

/**
 * Get user by ID
 * @param {string} userId - User ID
 * @returns {Object} User object
 */
export async function getUserById(userId) {
  await connectToDatabase();
  
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
}

/**
 * Generate JWT token
 * @param {string} userId - User ID
 * @returns {string} JWT token
 */
export function generateToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @returns {Object} Decoded token
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
} 