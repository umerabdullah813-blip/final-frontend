import React, { useState } from "react";
import PendingCustomers from "./PendingCustomers";
import ActiveCustomers from "./ActiveCustomers";

export default function Customers({ customers, setCustomers }) {
  const [tab, setTab] = useState("pending");

  return (
    <div className="page-card">
      <h2 className="page-title">Customer Management</h2>

      {/* 🔹 Tabs */}
      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tabBtn,
            ...(tab === "pending" ? styles.active : {}),
          }}
          onClick={() => setTab("pending")}
        >
          Pending ({customers.filter(c => c.status === "Pending").length})
        </button>

        <button
          style={{
            ...styles.tabBtn,
            ...(tab === "active" ? styles.active : {}),
          }}
          onClick={() => setTab("active")}
        >
          Active ({customers.filter(c => c.status === "Active").length})
        </button>
      </div>

      {/* 🔹 Content */}
      <div style={{ marginTop: 20 }}>
        {tab === "pending" && (
          <PendingCustomers
            customers={customers.filter(c => c.status === "Pending")}
            setCustomers={setCustomers}
          />
        )}
        {tab === "active" && (
          <ActiveCustomers
            customers={customers.filter(c => c.status === "Active")}
            setCustomers={setCustomers}
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  tabs: {
    display: "flex",
    gap: 10,
    marginTop: 15,
  },
  tabBtn: {
    padding: "8px 18px",
    border: "1px solid #ddd",
    background: "#f5f6fa",
    cursor: "pointer",
    borderRadius: 6,
    fontWeight: 500,
  },
  active: {
    background: "#1e90ff",
    color: "#fff",
    border: "1px solid #1e90ff",
  },
};
