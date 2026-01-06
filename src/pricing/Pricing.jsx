import React, { useState } from "react";
import "./Pricing.css";

export default function Pricing({ pricing, setPricing, onAdd, onEdit }) {
  const [searchTerm, setSearchTerm] = useState("");

  const toggleStatus = (id) => {
    setPricing(prev => prev.map(p => p.id === id ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" } : p));
  };

  const deletePricing = (id) => {
    if (window.confirm("Are you sure you want to delete this pricing?")) {
      setPricing(prev => prev.filter(p => p.id !== id));
    }
  };

  const filtered = pricing.filter(p =>
    p.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-card">

      <div className="page-header">
        <h2 className="page-title">
          Pricing
          <span className="count-badge">{filtered.length}</span>
        </h2>

        <button className="primary-btn" onClick={onAdd}>+ Add Pricing</button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        Search by City: <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>City</th>
              <th>Weight Slab</th>
              <th>Delivery Fee (Rs)</th>
              <th>COD Charges (Rs)</th>
              <th>Return Charges (Rs)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.city}</td>
                <td>{item.weightFrom}</td>
                <td>{item.deliveryFee}</td>
                <td>{item.codCharges}</td>
                <td>{item.returnCharges}</td>
                <td>
                  <span
                    onClick={() => toggleStatus(item.id)}
                    style={{ cursor: "pointer" }}
                    className={`status-badge ${item.status === "Active" ? "active" : "inactive"
                      }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="action-cell">
                  <button className="action-btn edit" onClick={() => onEdit(item)}>Edit</button>
                  <button className="action-btn delete" onClick={() => deletePricing(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>No pricing records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
