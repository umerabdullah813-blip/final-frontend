import React, { useState } from "react";
import "./ShipmentReport.css";

export default function ShipmentReport({ orders, cities, couriers }) {
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [courierFilter, setCourierFilter] = useState("All Couriers");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filtered = orders.filter(order => {
    const statusMatch = statusFilter === "All Status" || order.status.toLowerCase() === statusFilter.toLowerCase();
    // In a real app, orders would have a courierId. Using a placeholder match here.
    const courierMatch = courierFilter === "All Couriers" || order.courier === courierFilter;
    const dateMatch = (!startDate || new Date(order.date) >= new Date(startDate)) &&
      (!endDate || new Date(order.date) <= new Date(endDate));
    return statusMatch && courierMatch && dateMatch;
  });

  return (
    <div className="page-card">
      <h2 className="page-title">
        Shipment Report
        <span className="count-badge">{filtered.length}</span>
      </h2>

      <div className="filter-bar">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All Status</option>
          <option value="pending">Pending</option>
          <option value="dispatch">Dispatch</option>
          <option value="delivered">Delivered</option>
          <option value="returned">Returned</option>
        </select>

        <select value={courierFilter} onChange={(e) => setCourierFilter(e.target.value)}>
          <option>All Couriers</option>
          {couriers.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>

        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

        <button className="filter-btn">Apply</button>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking No</th>
              <th>Order No</th>
              <th>Customer</th>
              <th>Courier</th>
              <th>City</th>
              <th>Status</th>
              <th>Weight</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.shipment?.tracking || "TRK-" + row.orderNo}</td>
                <td>{row.orderNo}</td>
                <td>{row.customer}</td>
                <td>{row.courier || "Leopards"}</td>
                <td>{row.city}</td>
                <td>
                  <span className={`status-badge ${row.status.toLowerCase().replace(" ", "-")}`}>
                    {row.status}
                  </span>
                </td>
                <td>{row.shipment?.weight || "0 KG"}</td>
                <td>{row.date}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>No shipments match the filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
