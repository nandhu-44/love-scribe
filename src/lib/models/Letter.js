import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 13);

const LetterSchema = new mongoose.Schema({
  letterId: {
    type: String,
    default: () => nanoid(),
    required: true,
    unique: true,
    index: true
  },
  recipientName: {
    type: String,
    required: true
  },
  senderName: {
    type: String,
    required: true
  },
  occasion: {
    type: String,
    required: true
  },
  tone: {
    type: String,
    required: true
  },
  additionalDetails: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Letter || mongoose.model('Letter', LetterSchema);