import mongoose, { Schema } from 'mongoose'


const versionSchema = new Schema({
  name: {
    type: String
  },
  releaseDate: {
    type: String
  }
}, {
  timestamps: true
})

versionSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      releaseDate: this.releaseDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Version', versionSchema)

export const schema = model.schema
export default model
