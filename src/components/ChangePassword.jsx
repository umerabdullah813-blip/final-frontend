import React, { useState } from "react";
import { Lock } from "lucide-react";
import "./Profile.css";

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="edit-profile-center">
      <form className="profile-form modern" onSubmit={handleSubmit}>
        <h3 className="form-title">Change Password</h3>

        <div className="form-group">
          <label>Current Password</label>
          <div className="input-box">
            <Lock size={18} />
            <input
              type="password"
              required
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label>New Password</label>
          <div className="input-box">
            <Lock size={18} />
            <input
              type="password"
              required
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <div className="input-box">
            <Lock size={18} />
            <input
              type="password"
              required
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
            />
          </div>
        </div>

        <button type="submit" className="primary-btn glow">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
