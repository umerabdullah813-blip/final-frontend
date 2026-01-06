import React, { useState } from "react";
import "./OrderReport.css";

export default function OrderReport({ orders, cities }) {
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filtered = orders.filter(order => {
    const statusMatch = statusFilter === "All Status" || order.status.toLowerCase() === statusFilter.toLowerCase();
    const cityMatch = cityFilter === "All Cities" || order.city.toLowerCase() === cityFilter.toLowerCase();
    const dateMatch = (!startDate || new Date(order.date) >= new Date(startDate)) &&
      (!endDate || new Date(order.date) <= new Date(endDate));
    return statusMatch && cityMatch && dateMatch;
  });

  return (
    <div className="page-card">
      <h2 className="page-title">
        Order Report
        <span className="count-badge">{filtered.length}</span>
      </h2>

      <div className="filter-bar">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All Status</option>
          <option value="booked">Booked</option>
          <option value="karachi">Received for Lahore</option>
          <option value="outstation">Received for Outstation</option>
          <option value="dispatch">Dispatch</option>
          <option value="delivered">Delivered</option>
          <option value="returned">Returned</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
          <option>All Cities</option>
          {cities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>

        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

        <button className="filter-btn" onClick={() => { }}>Apply</button>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Order No</th>
              <th>Customer</th>
              <th>City</th>
              <th>Status</th>
              <th>Amount (Rs)</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.orderNo}</td>
                <td>{row.customer}</td>
                <td>{row.city}</td>
                <td>{row.status && (
                  <span className={`status-badge ${row.status.toLowerCase()}`}>
                    {row.status}
                  </span>
                )}</td>
                <td>{row.payment?.cod || "0"}</td>
                <td>{row.date}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>No orders match the filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
