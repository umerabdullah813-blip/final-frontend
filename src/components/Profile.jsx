import React, { useState } from "react";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import "./Profile.css";

const Profile = () => {
  const [tab, setTab] = useState("edit");

  return (
    <div className="profile-wrapper center">
      <div className="profile-glass">
        <div className="profile-header">
          <div className="avatar">👤</div>
          <div>
            <h2>My Profile</h2>
            <p>Manage your account information</p>
          </div>
        </div>

        <div className="profile-tabs">
          <button
            className={`tab-btn ${tab === 'edit' ? 'active' : ''}`}
            onClick={() => setTab('edit')}
          >
            ✏️ Profile Info
          </button>
          <button
            className={`tab-btn ${tab === 'security' ? 'active' : ''}`}
            onClick={() => setTab('security')}
          >
            🔒 Security
          </button>
        </div>

        <div className="profile-body">
          {tab === 'edit' ? <EditProfile /> : <ChangePassword />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
