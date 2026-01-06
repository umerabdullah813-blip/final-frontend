import React from "react";
import "./Cities.css";

export default function Cities({ cities, setCities, onAdd, onEdit }) {

  const toggleStatus = (id) => {
    setCities(prev => prev.map(c => c.id === id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c));
  };

  const deleteCity = (id) => {
    if (window.confirm("Are you sure you want to delete this city?")) {
      setCities(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="page-card">
      <div className="page-header">
        <h2 className="page-title">
          Cities
          <span className="count-badge">{cities.length}</span>
        </h2>

        <button className="primary-btn" onClick={onAdd}>+ Add City</button>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>City Name</th>
              <th>Province</th>
              <th>Total Zones</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {cities.map((city, index) => (
              <tr key={city.id}>
                <td>{index + 1}</td>
                <td>{city.name}</td>
                <td>{city.province}</td>
                <td>{city.zones}</td>
                <td>
                  <span
                    onClick={() => toggleStatus(city.id)}
                    style={{ cursor: "pointer" }}
                    className={`status-badge ${city.status === "Active" ? "active" : "inactive"
                      }`}
                  >
                    {city.status}
                  </span>
                </td>
                <td className="action-cell">
                  <button className="action-btn edit" onClick={() => onEdit(city)}>Edit</button>
                  <button className="action-btn delete" onClick={() => deleteCity(city.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
