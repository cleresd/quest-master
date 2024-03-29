import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: String,

  oldText: String,
  disabled: Boolean,

  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    username: String,
  },

  timeCreated: Date,
  timeLastEdit: Date,
  likes: Number,
  whoLikedId: [],
  edited: Boolean,

  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ForumThreadCommentReply',
    },
  ],

  seenUsers: [String],
});

export default mongoose.model('ForumThreadComment', commentSchema);
