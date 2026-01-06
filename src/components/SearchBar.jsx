import React from "react";
import "./SearchBar.css";

export default function SearchBar({
  searchValue,
  onSearchChange,
  customer,
  onCustomerChange,
  onSearchSubmit,
  customers,
}) {
  return (
    <div className="header">
      <input
        type="text"
        className="search-input"
        placeholder="Search Order"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        className="customer-select"
        value={customer}
        onChange={(e) => onCustomerChange(e.target.value)}
      >
        <option value="">All Customers</option>
        {customers && customers.map((c) => (
          <option key={c.id} value={c.name}>{c.name}</option>
        ))}
      </select>
    </div>
  );
}
