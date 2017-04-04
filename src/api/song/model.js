import mongoose, { Schema } from 'mongoose'

const typeEnum = ["S", "D", "SP", "DP", "TP"]

const songSchema = new Schema({
  name: {
    type: String
  },
  optionalName: {
    type: String
  },
  level: {
    type: [{
      level: Number,
      stepType: {
        type: String,
        enum: typeEnum
      }
    }]
  },
  releaseVersion: {
    type: Schema.Types.ObjectId,
    ref: 'Version'
  },
  disc: {
    type: String
  },
  stepCount: {
    type: String
  },
  patterns: {
    type: String
  },
  Id: {
    type: String
  }
}, {
    timestamps: true
  })

songSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      optionalName: this.optionalName,
      level: this.level,
      releaseVersion: this.releaseVersion,
      disc: this.disc,
      stepCount: this.stepCount,
      patterns: this.patterns,
      Id: this.Id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Song', songSchema)

export const schema = model.schema
export default model
