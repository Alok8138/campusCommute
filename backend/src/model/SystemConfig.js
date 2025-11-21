const mongoose = require("mongoose");

const SystemConfigSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed, // Can store any type of value
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Create a method to get config value by key
SystemConfigSchema.statics.getConfig = async function (key, defaultValue = null) {
  try {
    const config = await this.findOne({ key });
    return config ? config.value : defaultValue;
  } catch (error) {
    console.error(`Error getting config for key ${key}:`, error);
    return defaultValue;
  }
};

// Create a method to set config value by key
SystemConfigSchema.statics.setConfig = async function (key, value, description = null) {
  try {
    const config = await this.findOneAndUpdate(
      { key },
      { value, description: description || `Configuration for ${key}` },
      { upsert: true, new: true }
    );
    return config;
  } catch (error) {
    console.error(`Error setting config for key ${key}:`, error);
    throw error;
  }
};

const SystemConfig = mongoose.model("SystemConfig", SystemConfigSchema);

module.exports = SystemConfig;

