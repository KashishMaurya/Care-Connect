import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../components/css/CreateProfile.css";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

export default function CreateProfile() {
  const navigate = useNavigate();
  const { doesSessionExist, loading } = useSessionContext();

  // Basic Information
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [photo, setPhoto] = useState(null);

  // Contact Information
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Medical Information
  const [bloodGroup, setBloodGroup] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [medications, setMedications] = useState("");
  const [allergies, setAllergies] = useState("");
  const [disabilities, setDisabilities] = useState("");
  const [specialNeeds, setSpecialNeeds] = useState("");

  // Emergency Contact
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyRelation, setEmergencyRelation] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyPhone2, setEmergencyPhone2] = useState("");

  // Additional Information
  const [language, setLanguage] = useState("");
  const [communicationNeeds, setCommunicationNeeds] = useState("");
  const [notes, setNotes] = useState("");

  // Pet-specific fields
  const [breed, setBreed] = useState("");
  const [species, setSpecies] = useState("");
  const [chipId, setChipId] = useState("");
  const [vetName, setVetName] = useState("");
  const [vetPhone, setVetPhone] = useState("");

  const [customFields, setCustomFields] = useState([]);

  const handleAddField = () => {
    setCustomFields([...customFields, { label: "", value: "" }]);
  };

  const handleRemoveField = (index) => {
    const updated = customFields.filter((_, i) => i !== index);
    setCustomFields(updated);
  };

  const handleChangeField = (index, key, val) => {
    const updated = [...customFields];
    updated[index][key] = val;
    setCustomFields(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!photo) {
      alert("Photo is required");
      return;
    }

    if (!name || !age || !type) {
      alert("Please fill all required fields marked with *");
      return;
    }

    if (!emergencyPhone) {
      alert("Emergency contact phone is required");
      return;
    }

    // Construct full address
    const fullAddress = `${address}${city ? ", " + city : ""}${state ? ", " + state : ""}${pincode ? " - " + pincode : ""}`;

    const formData = new FormData();

    // Basic info
    formData.append("name", name);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("type", type);
    formData.append("photo", photo);

    // Contact
    formData.append("address", fullAddress);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("pincode", pincode);
    formData.append("phone", phone);
    formData.append("email", email);

    // Medical
    formData.append("bloodGroup", bloodGroup);
    formData.append("condition", medicalConditions);
    formData.append("medications", medications);
    formData.append("allergies", allergies);
    formData.append("disabilities", disabilities);
    formData.append("specialNeeds", specialNeeds);

    // Emergency
    formData.append("emergencyName", emergencyName);
    formData.append("emergencyRelation", emergencyRelation);
    formData.append("emergencyPhone", emergencyPhone);
    formData.append("emergencyPhone2", emergencyPhone2);

    // Additional
    formData.append("language", language);
    formData.append("communicationNeeds", communicationNeeds);
    formData.append("message", notes);

    // Pet-specific
    formData.append("breed", breed);
    formData.append("species", species);
    formData.append("chipId", chipId);
    formData.append("vetName", vetName);
    formData.append("vetPhone", vetPhone);

    formData.append("customFields", JSON.stringify(customFields));

    try {
      await axiosInstance.post("/api/profiles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile created successfully!");
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.msg) {
        alert("Error: " + err.response.data.msg);
      } else {
        alert("Failed to create profile");
      }
      console.error("Submit error:", err);
    }
  };

  if (loading) return <p>Loading session...</p>;
  if (!doesSessionExist) {
    navigate("/auth");
    return null;
  }

  const isPet = type === "Pet";

  return (
    <div className="create-profile-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>Create Digital ID Profile</h2>
      <p className="form-subtitle">Fields marked with * are required</p>

      <form onSubmit={handleSubmit}>
        {/* BASIC INFORMATION */}
        <div className="form-section">
          <h3 className="section-title">Basic Information</h3>

          <label htmlFor="type">Profile Type </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">-- Select Type --</option>
            <option value="Senior">Senior / Elderly</option>
            <option value="Child">Child</option>
            <option value="Special Needs">Special Needs Individual</option>
            <option value="Pet">Pet</option>
            <option value="Self">Self</option>
            <option value="Family Member">Family Member</option>
            <option value="Friend">Friend</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="name">{isPet ? "Pet Name" : "Full Name"} </label>
          <input
            id="name"
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="age">Age </label>
          <input
            id="age"
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="0"
            max="120"
            required
          />

          {!isPet && (
            <>
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </>
          )}

          <label htmlFor="photo">Photo (Clear recent photo)</label>
          <input
            id="photo"
            type="file"
            accept="image/"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
          />
          <small className="help-text">
            Max size: 5MB. Formats: JPG, PNG, WEBP
          </small>
        </div>

        {/* PET-SPECIFIC FIELDS */}
        {isPet && (
          <div className="form-section">
            <h3 className="section-title">Pet Information</h3>

            <label htmlFor="species">Species</label>
            <select
              id="species"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
            >
              <option value="">-- Select Species --</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Horse">Horse</option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="breed">Breed</label>
            <input
              id="breed"
              type="text"
              placeholder="e.g., Golden Retriever, Persian Cat"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />

            <label htmlFor="chipId">Microchip / Tag ID</label>
            <input
              id="chipId"
              type="text"
              placeholder="Enter chip or tag number"
              value={chipId}
              onChange={(e) => setChipId(e.target.value)}
            />

            <label htmlFor="vetName">Veterinarian Name</label>
            <input
              id="vetName"
              type="text"
              placeholder="Vet's name"
              value={vetName}
              onChange={(e) => setVetName(e.target.value)}
            />

            <label htmlFor="vetPhone">Veterinarian Phone</label>
            <input
              id="vetPhone"
              type="tel"
              placeholder="Vet contact number"
              value={vetPhone}
              onChange={(e) => setVetPhone(e.target.value)}
            />
          </div>
        )}

        {/* CONTACT INFORMATION */}
        <div className="form-section">
          <h3 className="section-title">Contact Information</h3>

          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="+91 1234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {!isPet && (
            <>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}

          <label htmlFor="address">Street Address</label>
          <input
            id="address"
            type="text"
            placeholder="House no., Street name"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            placeholder="City name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <div className="form-row">
            <div className="form-col">
              <label htmlFor="state">State</label>
              <input
                id="state"
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="form-col">
              <label htmlFor="pincode">Pincode</label>
              <input
                id="pincode"
                type="text"
                placeholder="400001"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength="6"
              />
            </div>
          </div>
        </div>

        {/* MEDICAL INFORMATION */}
        {!isPet && (
          <div className="form-section">
            <h3 className="section-title">Medical Information</h3>

            <label htmlFor="bloodGroup">Blood Group</label>
            <select
              id="bloodGroup"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option value="">-- Select Blood Group --</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            <label htmlFor="medicalConditions">Medical Conditions</label>
            <textarea
              id="medicalConditions"
              placeholder="e.g., Diabetes, Hypertension, Alzheimer's, Autism, etc."
              value={medicalConditions}
              onChange={(e) => setMedicalConditions(e.target.value)}
              rows="3"
            />

            <label htmlFor="medications">Current Medications</label>
            <textarea
              id="medications"
              placeholder="List all medications with dosage if needed"
              value={medications}
              onChange={(e) => setMedications(e.target.value)}
              rows="3"
            />

            <label htmlFor="allergies">Allergies</label>
            <textarea
              id="allergies"
              placeholder="Food allergies, drug allergies, environmental allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              rows="2"
            />

            <label htmlFor="disabilities">Disabilities / Mobility Issues</label>
            <textarea
              id="disabilities"
              placeholder="Wheelchair user, hearing impaired, vision impaired, etc."
              value={disabilities}
              onChange={(e) => setDisabilities(e.target.value)}
              rows="2"
            />

            <label htmlFor="specialNeeds">Special Care Needs</label>
            <textarea
              id="specialNeeds"
              placeholder="Any special instructions for caregivers"
              value={specialNeeds}
              onChange={(e) => setSpecialNeeds(e.target.value)}
              rows="3"
            />
          </div>
        )}

        {/* EMERGENCY CONTACT */}
        <div className="form-section">
          <h3 className="section-title">Emergency Contact</h3>

          <label htmlFor="emergencyName">Contact Name</label>
          <input
            id="emergencyName"
            type="text"
            placeholder="Full name of emergency contact"
            value={emergencyName}
            onChange={(e) => setEmergencyName(e.target.value)}
            required
          />

          <label htmlFor="emergencyRelation">Relationship</label>
          <select
            id="emergencyRelation"
            value={emergencyRelation}
            onChange={(e) => setEmergencyRelation(e.target.value)}
          >
            <option value="">-- Select Relationship --</option>
            <option value="Parent">Parent</option>
            <option value="Spouse">Spouse</option>
            <option value="Sibling">Sibling</option>
            <option value="Child">Child</option>
            <option value="Friend">Friend</option>
            <option value="Caregiver">Caregiver</option>
            <option value="Guardian">Guardian</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="emergencyPhone">Emergency Phone</label>
          <input
            id="emergencyPhone"
            type="tel"
            placeholder="+91 1234567890"
            value={emergencyPhone}
            onChange={(e) => setEmergencyPhone(e.target.value)}
            required
          />

          <label htmlFor="emergencyPhone2">Alternate Emergency Phone</label>
          <input
            id="emergencyPhone2"
            type="tel"
            placeholder="+91 0987654321"
            value={emergencyPhone2}
            onChange={(e) => setEmergencyPhone2(e.target.value)}
          />
        </div>

        {/* ADDITIONAL INFORMATION */}
        {!isPet && (
          <div className="form-section">
            <h3 className="section-title">Additional Information</h3>

            <label htmlFor="language">Primary Language</label>
            <input
              id="language"
              type="text"
              placeholder="e.g., English, Hindi, Marathi"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />

            <label htmlFor="communicationNeeds">Communication Needs</label>
            <textarea
              id="communicationNeeds"
              placeholder="e.g., Non-verbal, uses sign language, needs written communication"
              value={communicationNeeds}
              onChange={(e) => setCommunicationNeeds(e.target.value)}
              rows="2"
            />

            <label htmlFor="notes">Additional Notes / Instructions</label>
            <textarea
              id="notes"
              placeholder="Any other important information for emergency responders"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="4"
            />
          </div>
        )}

        {/* CUSTOM FIELDS */}
        <div className="form-section">
          <h3 className="section-title">Custom Fields (Optional)</h3>
          <p className="help-text">
            Add any additional information not covered above
          </p>

          {customFields.map((field, idx) => (
            <div key={idx} className="custom-field-row">
              <input
                placeholder="Label (e.g., Insurance ID)"
                value={field.label}
                onChange={(e) =>
                  handleChangeField(idx, "label", e.target.value)
                }
              />
              <input
                placeholder="Value"
                value={field.value}
                onChange={(e) =>
                  handleChangeField(idx, "value", e.target.value)
                }
              />
              <button
                type="button"
                className="btn-remove"
                onClick={() => handleRemoveField(idx)}
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn-add-field"
            onClick={handleAddField}
          >
            + Add Custom Field
          </button>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Create Profile
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
