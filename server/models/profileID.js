const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
      index: true,
    },
    // Basic Information
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "Prefer not to say", ""],
      default: "",
    },
    type: {
      type: String,
      enum: [
        "Senior",
        "Child",
        "Special Needs",
        "Pet",
        "Self",
        "Family Member",
        "Friend",
        "Colleague",
        "Caregiver",
        "Guardian",
        "Parent",
        "Other",
        "",
      ],
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },

    // Contact Information
    address: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    pincode: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },

    // Medical Information
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", ""],
      default: "",
    },
    condition: {
      type: String,
      default: "",
    },
    medications: {
      type: String,
      default: "",
    },
    allergies: {
      type: String,
      default: "",
    },
    disabilities: {
      type: String,
      default: "",
    },
    specialNeeds: {
      type: String,
      default: "",
    },
    medical: {
      type: String,
      default: "",
    },

    // Emergency Contact
    emergencyName: {
      type: String,
      default: "",
    },
    emergencyRelation: {
      type: String,
      default: "",
    },
    emergencyPhone: {
      type: String,
      required: true,
    },
    emergencyPhone2: {
      type: String,
      default: "",
    },

    // Additional Information
    language: {
      type: String,
      default: "",
    },
    communicationNeeds: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },

    // Pet-specific fields
    species: {
      type: String,
      default: "",
    },
    breed: {
      type: String,
      default: "",
    },
    chipId: {
      type: String,
      default: "",
    },
    vetName: {
      type: String,
      default: "",
    },
    vetPhone: {
      type: String,
      default: "",
    },

    // Custom fields
    customFields: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Indexes for faster queries
profileSchema.index({ userId: 1, createdAt: -1 });
profileSchema.index({ type: 1 });

module.exports = mongoose.model("Profile", profileSchema);
