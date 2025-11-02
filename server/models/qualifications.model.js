import mongoose from 'mongoose'
const QualificationSchema = new mongoose.Schema({
  title: { type: String, required: 'Title is required' },
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String, trim: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'] },
  completion: { type: Date },
  description: { type: String }
})
export default mongoose.model('Qualification', QualificationSchema)