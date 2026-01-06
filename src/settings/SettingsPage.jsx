import React, { useState, useEffect } from "react";
import "./SettingsPage.css";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: "Courier Admin",
    email: "admin@courier.com",
    phone: "0300-1234567",
    address: "Karachi, Pakistan",
    currency: "PKR",
    codCharges: 50,
    fuelSurcharge: 5,
    allowCOD: true,
    maintenanceMode: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("system_settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("system_settings", JSON.stringify(settings));
    alert("Settings saved successfully!");
  };

  return (
    <div className="page-card">
      <h2 className="page-title">System Settings</h2>

      <div className="settings-section">
        <h3 className="section-title">Company Information</h3>

        <div className="form-grid">
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={settings.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Office Address</label>
            <input
              type="text"
              name="address"
              value={settings.address}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">Billing & Charges</h3>

        <div className="form-grid">
          <div className="form-group">
            <label>Currency</label>
            <select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
            >
              <option value="PKR">PKR</option>
              <option value="USD">USD</option>
            </select>
          </div>

          <div className="form-group">
            <label>COD Charges (Rs)</label>
            <input
              type="number"
              name="codCharges"
              value={settings.codCharges}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Fuel Surcharge (%)</label>
            <input
              type="number"
              name="fuelSurcharge"
              value={settings.fuelSurcharge}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">System Preferences</h3>

        <div className="toggle-group">
          <label className="toggle-item">
            <input
              type="checkbox"
              name="allowCOD"
              checked={settings.allowCOD}
              onChange={handleChange}
            />
            <span className="toggle-slider"></span>
            Enable Cash on Delivery
          </label>

          <label className="toggle-item">
            <input
              type="checkbox"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
            />
            <span className="toggle-slider"></span>
            Maintenance Mode
          </label>
        </div>
      </div>

      <div className="settings-actions">
        <button className="primary-btn" onClick={handleSave}>
          Save Settings
        </button>
      </div>
    </div>
  );
}
