import React from "react";

export default function Delivered({ orders }) {
  return (
    <div className="page-card">
      <h2 className="page-title">
        Delivered Orders <span className="count-badge">{orders.length}</span>
      </h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Order No</th>
            <th>Customer</th>
            <th>City</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.orderNo}</td>
              <td>{item.customer}</td>
              <td>{item.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
