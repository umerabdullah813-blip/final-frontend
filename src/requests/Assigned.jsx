import React from "react";

export default function Assigned({ orders, updateOrderStatus }) {
  return (
    <div className="page-card">
      <h2 className="page-title">
        Assigned Orders <span className="count-badge">{orders.length}</span>
      </h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Order No</th>
            <th>Customer</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.orderNo}</td>
              <td>{item.customer}</td>
              <td>{item.city}</td>
              <td>
                <div style={{ display: "flex", gap: "5px" }}>
                  <button
                    onClick={() => updateOrderStatus(item.id, "delivered")}
                    className="btn-status receive-lhr"
                  >
                    Delivered
                  </button>
                  <button
                    onClick={() => updateOrderStatus(item.id, "returned")}
                    className="btn-status receive-out"
                  >
                    Returned
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

