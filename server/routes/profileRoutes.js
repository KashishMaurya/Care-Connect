const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");
const Profile = require("../models/profileID");

const {
  verifySession,
} = require("supertokens-node/recipe/session/framework/express");

// Create Profile
router.post("/", verifySession(), upload.single("photo"), async (req, res) => {
  try {
    console.log("Profile creation request received");
    console.log("Body:", JSON.stringify(req.body, null, 2));
    console.log(
      "File:",
      req.file
        ? {
            path: req.file.path,
            filename: req.file.filename,
            size: req.file.size,
          }
        : "No file",
    );

    const {
      name,
      age,
      gender,
      type,
      condition,
      medications,
      address,
      phone,
      message,
      bloodGroup,
      medical,
      allergies,
      emergencyName,
      emergencyPhone,
      breed,
      chipId,
    } = req.body;

    // Validate required fields
    if (!name || !age || !phone || !address || !emergencyPhone) {
      console.error("Missing required fields");
      return res.status(400).json({
        msg: "Missing required fields",
        missing: {
          name: !name,
          age: !age,
          phone: !phone,
          address: !address,
          emergencyPhone: !emergencyPhone,
        },
      });
    }

    console.log("All required fields present");

    // Parse custom fields
    let customFields = [];
    try {
      customFields = JSON.parse(req.body.customFields || "[]");
      console.log("Custom fields parsed:", customFields);
    } catch (err) {
      console.error("Invalid customFields format:", err.message);
      return res.status(400).json({ msg: "Invalid customFields format" });
    }

    // Validate file upload
    if (!req.file) {
      console.error("Photo upload failed - no file received");
      return res.status(400).json({ msg: "Photo is required" });
    }

    console.log("File uploaded successfully");

    // Get photo URL
    const photoUrl = req.file.path || req.file.secure_url;

    if (!photoUrl) {
      console.error("Cloudinary upload failed - no URL returned");
      return res.status(500).json({ msg: "Image upload failed" });
    }

    console.log("Photo URL:", photoUrl);

    // Get user ID
    const userId = req.session.getUserId();
    console.log("User ID obtained:", userId);

    // Create profile object
    const profileData = {
      userId,
      name,
      age,
      gender: gender || "",
      type: type || "",
      condition: condition || "",
      medications: medications || "",
      address,
      phone,
      message: message || "",
      photoUrl,
      bloodGroup: bloodGroup || "",
      medical: medical || "",
      allergies: allergies || "",
      emergencyName: emergencyName || "",
      emergencyPhone,
      breed: breed || "",
      chipId: chipId || "",
      customFields,
    };

    console.log(
      "Profile data prepared:",
      JSON.stringify(profileData, null, 2),
    );

    // Create profile
    const profile = new Profile(profileData);

    console.log("Attempting to save profile to database...");
    await profile.save();

    console.log("Profile created successfully!");
    console.log("Profile ID:", profile._id);

    res.status(201).json({
      msg: "Profile created successfully",
      profile,
    });
  } catch (err) {
    console.error("Profile creation error:");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Error stack:", err.stack);

    res.status(500).json({
      msg: "Server error",
      error: err.message,
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
});

// Get all profiles for logged-in user
router.get("/user", verifySession(), async (req, res) => {
  try {
    const userId = req.session.getUserId();
    console.log("Fetching profiles for user:", userId);

    const profiles = await Profile.find({ userId });
    console.log("Found", profiles.length, "profiles");

    res.json(profiles);
  } catch (err) {
    console.error("Get profiles error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Delete all profiles for user
router.delete("/user/all", verifySession(), async (req, res) => {
  try {
    const userId = req.session.getUserId();
    const result = await Profile.deleteMany({ userId });
    console.log("Deleted", result.deletedCount, "profiles");

    res.json({ msg: "All profiles deleted" });
  } catch (err) {
    console.error("Delete all profiles error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Get one profile (public)
router.get("/:id", async (req, res) => {
  try {
    console.log("Fetching public profile:", req.params.id);

    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      console.log("Profile not found:", req.params.id);
      return res.status(404).json({ msg: "Profile not found" });
    }

    console.log("Profile found:", profile.name);
    res.json(profile);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Update profile
router.put(
  "/:id",
  verifySession(),
  upload.single("photo"),
  async (req, res) => {
    try {
      const profileId = req.params.id;
      const userId = req.session.getUserId();

      console.log("Updating profile:", profileId);

      const existing = await Profile.findOne({ _id: profileId, userId });
      if (!existing) {
        console.log("Profile not found or unauthorized");
        return res.status(404).json({ msg: "Profile not found" });
      }

      let updates = { ...req.body };

      // Parse custom fields
      try {
        updates.customFields = req.body.customFields
          ? JSON.parse(req.body.customFields)
          : existing.customFields || [];
      } catch (err) {
        console.error("Invalid customFields:", err.message);
        return res.status(400).json({ msg: "Invalid customFields format" });
      }

      // Update photo if new one uploaded
      if (req.file?.path) {
        console.log("Updating photo:", req.file.path);
        updates.photoUrl = req.file.path;
      }

      const updatedProfile = await Profile.findByIdAndUpdate(
        profileId,
        updates,
        { new: true },
      );

      console.log("Profile updated successfully");

      res.json({
        msg: "Profile updated successfully",
        profile: updatedProfile,
      });
    } catch (err) {
      console.error("Update profile error:", err);
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  },
);

// Delete one profile
router.delete("/:id", verifySession(), async (req, res) => {
  try {
    const userId = req.session.getUserId();
    console.log("Deleting profile:", req.params.id);

    const profile = await Profile.findOneAndDelete({
      _id: req.params.id,
      userId,
    });

    if (!profile) {
      console.log("Profile not found or unauthorized");
      return res.status(404).json({ msg: "Profile not found" });
    }

    console.log("Profile deleted successfully");
    res.json({ msg: "Profile deleted successfully" });
  } catch (err) {
    console.error("Delete profile error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
