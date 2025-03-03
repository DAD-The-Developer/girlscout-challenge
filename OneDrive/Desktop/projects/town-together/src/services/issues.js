import Issue from '../models/Issue';
import User from '../models/User';
import connectToDatabase from '../utils/mongodb';

/**
 * Create a new issue
 * @param {Object} issueData - Issue data
 * @param {string} userId - User ID of the creator
 * @returns {Object} Created issue
 */
export async function createIssue(issueData, userId) {
  await connectToDatabase();
  
  // Create issue with user as creator
  const issue = new Issue({
    ...issueData,
    createdBy: userId,
  });
  
  await issue.save();
  
  // Add issue to user's reportedIssues
  await User.findByIdAndUpdate(userId, {
    $push: { reportedIssues: issue._id },
  });
  
  return issue;
}

/**
 * Get all issues with pagination and filters
 * @param {Object} options - Query options including page, limit, category, status, search
 * @returns {Object} Issues and pagination info
 */
export async function getIssues(options = {}) {
  await connectToDatabase();
  
  const {
    page = 1,
    limit = 10,
    category,
    status,
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = options;
  
  const skip = (page - 1) * limit;
  
  // Build query
  const query = {};
  
  if (category) {
    query.category = category;
  }
  
  if (status) {
    query.status = status;
  }
  
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
    ];
  }
  
  // Sort options
  const sort = {};
  sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
  
  // Execute query with pagination
  const issues = await Issue.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('createdBy', 'name avatar')
    .exec();
  
  // Get total count for pagination
  const total = await Issue.countDocuments(query);
  
  return {
    issues,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

/**
 * Get issue by ID
 * @param {string} issueId - Issue ID
 * @returns {Object} Issue
 */
export async function getIssueById(issueId) {
  await connectToDatabase();
  
  const issue = await Issue.findById(issueId)
    .populate('createdBy', 'name avatar')
    .populate('comments.user', 'name avatar')
    .exec();
  
  if (!issue) {
    throw new Error('Issue not found');
  }
  
  return issue;
}

/**
 * Update issue
 * @param {string} issueId - Issue ID
 * @param {Object} updateData - Data to update
 * @param {string} userId - User ID making the update
 * @returns {Object} Updated issue
 */
export async function updateIssue(issueId, updateData, userId) {
  await connectToDatabase();
  
  // Find issue
  const issue = await Issue.findById(issueId);
  
  if (!issue) {
    throw new Error('Issue not found');
  }
  
  // Check if user is the creator or an admin
  const user = await User.findById(userId);
  if (issue.createdBy.toString() !== userId && user.role !== 'admin') {
    throw new Error('Not authorized to update this issue');
  }
  
  // Update issue
  Object.assign(issue, updateData);
  await issue.save();
  
  return issue;
}

/**
 * Vote on an issue
 * @param {string} issueId - Issue ID
 * @param {string} userId - User ID
 * @returns {Object} Updated issue
 */
export async function voteIssue(issueId, userId) {
  await connectToDatabase();
  
  // Find issue
  const issue = await Issue.findById(issueId);
  
  if (!issue) {
    throw new Error('Issue not found');
  }
  
  // Check if user already voted
  const alreadyVoted = issue.votes.users.includes(userId);
  
  let update;
  if (alreadyVoted) {
    // Remove vote
    update = {
      $pull: { 'votes.users': userId },
      $inc: { 'votes.count': -1 },
    };
    
    // Remove from user's votedIssues
    await User.findByIdAndUpdate(userId, {
      $pull: { votedIssues: issueId },
    });
  } else {
    // Add vote
    update = {
      $addToSet: { 'votes.users': userId },
      $inc: { 'votes.count': 1 },
    };
    
    // Add to user's votedIssues
    await User.findByIdAndUpdate(userId, {
      $addToSet: { votedIssues: issueId },
    });
  }
  
  // Update issue
  const updatedIssue = await Issue.findByIdAndUpdate(issueId, update, {
    new: true,
  }).populate('createdBy', 'name avatar');
  
  return updatedIssue;
}

/**
 * Add comment to an issue
 * @param {string} issueId - Issue ID
 * @param {string} userId - User ID
 * @param {string} text - Comment text
 * @returns {Object} Updated issue
 */
export async function addComment(issueId, userId, text) {
  await connectToDatabase();
  
  // Find issue
  const issue = await Issue.findById(issueId);
  
  if (!issue) {
    throw new Error('Issue not found');
  }
  
  // Add comment
  const comment = {
    user: userId,
    text,
  };
  
  issue.comments.push(comment);
  await issue.save();
  
  // Add to user's commentedIssues
  await User.findByIdAndUpdate(userId, {
    $addToSet: { commentedIssues: issueId },
  });
  
  // Return updated issue with populated fields
  const updatedIssue = await Issue.findById(issueId)
    .populate('createdBy', 'name avatar')
    .populate('comments.user', 'name avatar')
    .exec();
  
  return updatedIssue;
} 