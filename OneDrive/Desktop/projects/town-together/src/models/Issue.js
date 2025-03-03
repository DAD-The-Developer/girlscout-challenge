import mongoose from 'mongoose';

const IssueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: ['infrastructure', 'safety', 'environment', 'community', 'other'],
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'resolved', 'closed'],
      default: 'open',
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
    },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },
    image: {
      type: String,
      default: '',
    },
    votes: {
      count: {
        type: Number,
        default: 0,
      },
      users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
    },
    comments: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      text: {
        type: String,
        required: true,
        maxlength: [500, 'Comment cannot be more than 500 characters'],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a geospatial index for location-based queries
IssueSchema.index({ coordinates: '2dsphere' });

export default mongoose.models.Issue || mongoose.model('Issue', IssueSchema); 