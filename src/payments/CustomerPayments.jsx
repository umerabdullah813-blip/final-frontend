import React from "react";
import "./Payments.css";

export default function CustomerPayments({ orders }) {
  // In a real app, payments might be a separate entity, but here we derive from orders
  const payments = orders.map(order => ({
    id: order.id,
    customer: order.customer,
    company: order.sender?.company || "N/A",
    orderNo: order.orderNo,
    amount: order.payment?.cod || "0",
    paymentType: "COD",
    status: order.status === "delivered" ? "Paid" : "Pending",
    date: order.date,
  }));

  return (
    <div className="page-card">
      <h2 className="page-title">
        Customer Payments
        <span className="count-badge">{payments.length}</span>
      </h2>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Company</th>
              <th>Order No</th>
              <th>Amount (Rs)</th>
              <th>Payment Type</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((pay, index) => (
              <tr key={pay.id}>
                <td>{index + 1}</td>
                <td>{pay.customer}</td>
                <td>{pay.company}</td>
                <td>{pay.orderNo}</td>
                <td>{pay.amount}</td>
                <td>{pay.paymentType}</td>
                <td>
                  <span
                    className={`status-badge ${pay.status === "Paid" ? "paid" : "pending"
                      }`}
                  >
                    {pay.status}
                  </span>
                </td>
                <td>{pay.date}</td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>No payment records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
