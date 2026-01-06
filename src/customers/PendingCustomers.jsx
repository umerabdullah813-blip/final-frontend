import React, { useState } from "react";
import "./PendingCustomers.css";

export default function PendingCustomers({ customers, setCustomers }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleApprove = (id) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: "Active" } : c));
  };

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pending-wrapper">

      <div className="pending-header">
        <h3>Pending Customers</h3>
      </div>

      <div className="table-controls">
        <div>
          Search: <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="table-responsive">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Details</th>
              <th>Contact</th>
              <th>City</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((cust) => (
              <tr key={cust.id}>
                <td>{cust.id}</td>
                <td>
                  <b>Name:</b> {cust.name}<br />
                  <b>Company:</b> {cust.company}
                </td>
                <td>
                  <b>Phone:</b> {cust.phone}<br />
                  <b>Email:</b> {cust.email}
                </td>
                <td>{cust.city}</td>
                <td><span className="status pending">{cust.status}</span></td>
                <td>
                  <button
                    onClick={() => handleApprove(cust.id)}
                    className="btn submit"
                    style={{ padding: "5px 10px", fontSize: "12px" }}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>No pending customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
