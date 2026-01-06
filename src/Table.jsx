import React from "react";
import "./Table.css";

const Table = () => {

  const orders = [
    {
      orderNo: "20000022",
      date: "12 Mar 2020",
      time: "03:30 PM",
      sender: {
        name: "Muhammad Idrees",
        company: "IT Vision Pvt Ltd",
        phone: "03324510131",
        email: "info@itvision.com.pk",
        address: "Al Hafeez Shopping Mall, Gulberg III, LHR",
      },
      receiver: {
        name: "zz",
        phone: "123",
        address: "zaxs",
      },
      shipment: {
        tracking: "-",
        productCode: "-",
        weight: "0.5",
        description: "232",
      },
      payment: {
        deliveryFee: "180",
        cod: "8,799",
      },
    },
    {
      orderNo: "20000003",
      date: "10 Nov 2019",
      time: "12:16 PM",
      sender: {
        name: "Muhammad Idrees",
        company: "IT Vision Pvt Ltd",
        phone: "03324510131",
        email: "info@itvision.com.pk",
        address: "—",
      },
      receiver: {
        name: "we",
        phone: "9999999999",
        address: "asa",
      },
      shipment: {
        tracking: "-",
        productCode: "-",
        weight: "0.5",
        description: "qwe",
      },
      payment: {
        deliveryFee: "180",
        cod: "500",
      },
    },
  ];

  return (
    <div className="table-section">
      <h2 className="table-title">Booked Orders (Recent 100 Orders)</h2>

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
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
