import { NextResponse } from 'next/server';
import connectToDatabase from '../../../utils/mongodb';
import mongoose from 'mongoose';

// Add export config to specify Node.js runtime
export const runtime = 'nodejs';

export async function GET() {
  try {
    // Try to connect to the database
    await connectToDatabase();
    
    // Get connection status
    const status = mongoose.connection.readyState;
    
    // Map readyState to human-readable status
    const statusMap = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };
    
    // Get database stats
    const dbStats = await mongoose.connection.db.stats();
    
    return NextResponse.json({
      success: true,
      status: statusMap[status] || 'unknown',
      connected: status === 1,
      database: mongoose.connection.db.databaseName,
      collections: dbStats.collections,
      documents: dbStats.objects,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Database status check failed:', error);
    
    return NextResponse.json({
      success: false,
      status: 'error',
      connected: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
} 