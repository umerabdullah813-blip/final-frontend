import React, { useState } from "react";
import "./Couriers.css";

export default function Couriers({ couriers, setCouriers, onAdd, onEdit }) {
  const [searchTerm, setSearchTerm] = useState("");

  const toggleStatus = (id) => {
    setCouriers(prev => prev.map(c => c.id === id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c));
  };

  const deleteCourier = (id) => {
    if (window.confirm("Are you sure you want to delete this courier?")) {
      setCouriers(prev => prev.filter(c => c.id !== id));
    }
  };

  const filtered = couriers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-card">
      <div className="page-header">
        <h2 className="page-title">
          Couriers
          <span className="count-badge">{filtered.length}</span>
        </h2>

        <button className="primary-btn" onClick={onAdd}>+ Add Courier</button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        Search: <input
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
              <th>Courier Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Cities Covered</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((courier, index) => (
              <tr key={courier.id}>
                <td>{index + 1}</td>
                <td>{courier.name}</td>
                <td>{courier.contact}</td>
                <td>{courier.email}</td>
                <td>{courier.cities}</td>
                <td>
                  <span
                    onClick={() => toggleStatus(courier.id)}
                    style={{ cursor: "pointer" }}
                    className={`status-badge ${courier.status === "Active" ? "active" : "inactive"
                      }`}
                  >
                    {courier.status}
                  </span>
                </td>
                <td className="action-cell">
                  <button className="action-btn edit" onClick={() => onEdit(courier)}>Edit</button>
                  <button className="action-btn delete" onClick={() => deleteCourier(courier.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
