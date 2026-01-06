import React from "react";
import "./BookOrders.css";

const BookOrders = ({ orders, updateOrderStatus, onAdd }) => {
  return (
    <div className="table-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 className="table-title" style={{ margin: 0 }}>
          📦 Booked Orders (Recent {orders.length})
        </h2>
        <button className="primary-btn" onClick={onAdd}>+ Book New Order</button>
      </div>

      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Order Date</th>
              <th>Order Time</th>
              <th>Sender Details</th>
              <th>Receiver Details</th>
              <th>Shipment Details</th>
              <th>Payments</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNo}</td>
                <td>{order.date}</td>
                <td>{order.time}</td>

                <td>
                  <b>Name:</b> {order.sender.name} <br />
                  <b>Company:</b> {order.sender.company} <br />
                  <b>Phone:</b> {order.sender.phone} <br />
                  <b>Email:</b> {order.sender.email} <br />
                  <b>Address:</b> {order.sender.address}
                </td>

                <td>
                  <b>Name:</b> {order.receiver.name} <br />
                  <b>Phone:</b> {order.receiver.phone} <br />
                  <b>Address:</b> {order.receiver.address}
                </td>

                <td>
                  <b>Tracking:</b> {order.shipment.tracking} <br />
                  <b>Product Code:</b> {order.shipment.productCode} <br />
                  <b>Parcel Weight:</b> {order.shipment.weight} <br />
                  <b>Description:</b> {order.shipment.description}
                </td>

                <td>
                  <b>Delivery Fees:</b> Rs {order.payment.deliveryFee} <br />
                  <b>COD Amount:</b> Rs {order.payment.cod}
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookOrders;
