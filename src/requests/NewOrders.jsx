import React from "react";
import "./BookOrders.css";

export default function NewOrders({ orders, updateOrderStatus }) {
  return (
    <div className="table-section page-card">
      <h2 className="table-title">
        📦 Booked Orders ({orders.length})
      </h2>

      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Details</th>
              <th>Customer</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNo}</td>
                <td>
                  <b>Date:</b> {order.date} <br />
                  <b>City:</b> {order.city}
                </td>
                <td>{order.customer}</td>
                <td>
                  {order.sender?.name} <br />
                  <span style={{ fontSize: '12px', color: '#666' }}>{order.sender?.phone}</span>
                </td>
                <td>
                  {order.receiver?.name} <br />
                  <span style={{ fontSize: '12px', color: '#666' }}>{order.receiver?.address}</span>
                </td>
                <td>
                  <b>FEE:</b> {order.payment?.deliveryFee} <br />
                  <b>COD:</b> {order.payment?.cod}
                </td>
                <td>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <button
                      onClick={() => updateOrderStatus(order.id, "karachi")}
                      className="btn-status receive-lhr"
                    >
                      Receive (LHR)
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, "outstation")}
                      className="btn-status receive-out"
                    >
                      Receive (OUT)
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, "cancelled")}
                      className="btn-status-cancel"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No booked orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
