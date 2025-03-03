import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Connection status logging
const logConnectionStatus = (status, details = '') => {
  const timestamp = new Date().toISOString();
  const message = `[${timestamp}] MongoDB connection ${status}${details ? ': ' + details : ''}`;
  
  if (status === 'error') {
    console.error(message);
  } else {
    console.log(message);
  }
};

async function connectToDatabase() {
  if (cached.conn) {
    logConnectionStatus('reused', 'Using existing connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    logConnectionStatus('initializing', 'Connecting to MongoDB Atlas');
    
    // Note: We're not using event listeners as they're not fully supported in Edge Runtime
    // Instead, we'll log connection status after the connection attempt

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      logConnectionStatus('success', 'Connected to MongoDB Atlas');
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
    logConnectionStatus('established', `Connected to database: ${mongoose.connection.db.databaseName}`);
  } catch (e) {
    cached.promise = null;
    logConnectionStatus('error', e.message);
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase; 