import React, { useState, useEffect } from "react";
import { User, Mail, Phone } from "lucide-react";
import "./Profile.css";

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@gmail.com",
    phone: "0300-1234567"
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_profile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("admin_profile", JSON.stringify(profile));
    alert("Profile updated successfully!");
  };

  return (
    <div className="edit-profile-center">
      <form className="profile-form modern" onSubmit={handleSubmit}>
        <h3 className="form-title">Edit Profile</h3>

        <div className="form-group">
          <label>Name</label>
          <div className="input-box">
            <User size={18} />
            <input
              type="text"
              placeholder="Your Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <div className="input-box">
            <Mail size={18} />
            <input
              type="email"
              placeholder="Email Address"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Phone</label>
          <div className="input-box">
            <Phone size={18} />
            <input
              type="text"
              placeholder="Phone Number"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>
        </div>

        <button type="submit" className="primary-btn glow">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
