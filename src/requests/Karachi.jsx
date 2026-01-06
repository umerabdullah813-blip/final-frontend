import React from "react";

export default function Karachi({ orders, updateOrderStatus }) {
  return (
    <div className="page-card">
      <h2 className="page-title">
        Item Received for Lahore{" "}
        <span className="count-badge">{orders.length}</span>
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
                <button
                  onClick={() => updateOrderStatus(item.id, "dispatch")}
                  className="btn-status receive-lhr"
                >
                  Dispatch
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
