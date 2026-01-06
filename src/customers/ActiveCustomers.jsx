import React, { useState } from "react";
import "./Customers.css";

export default function ActiveCustomers({ customers, setCustomers }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeactivate = (id) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: "Pending" } : c));
  };

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-card">
      <h2 className="page-title">
        Active Customers
        <span className="count-badge">{filtered.length}</span>
      </h2>

      <div style={{ marginBottom: "20px" }}>
        Search: <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </div>

      <div className="customer-grid">
        {filtered.map((cust) => (
          <div key={cust.id} className="customer-card">
            <div className="customer-header">
              <h3>{cust.name}</h3>
              <span className="status active">{cust.status}</span>
            </div>

            <p className="company">{cust.company}</p>

            <div className="customer-info">
              <p><b>Phone:</b> {cust.phone}</p>
              <p><b>Email:</b> {cust.email}</p>
              <p><b>City:</b> {cust.city}</p>
            </div>

            <div className="customer-footer">
              <span className="orders">
                📦 Orders: <b>{cust.totalOrders}</b>
              </span>
              <button
                onClick={() => handleDeactivate(cust.id)}
                className="action-btn delete"
                style={{ marginLeft: "auto", padding: "5px 10px", fontSize: "12px" }}
              >
                Deactivate
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p>No active customers found.</p>}
      </div>
    </div>
  );
}
