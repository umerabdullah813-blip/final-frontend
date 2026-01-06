import React, { useState, useEffect } from "react";

export default function OrderForm({ order, cities, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        orderNo: "ORD-" + Math.floor(1000 + Math.random() * 9000),
        customer: "",
        city: "",
        status: "booked",
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: { name: "", company: "", phone: "", email: "", address: "" },
        receiver: { name: "", phone: "", address: "" },
        shipment: { tracking: "-", productCode: "", weight: "1 KG", description: "" },
        payment: { deliveryFee: "200", cod: "0" }
    });

    useEffect(() => {
        if (order) setFormData(order);
        else if (cities.length > 0) setFormData(prev => ({ ...prev, city: cities[0].name }));
    }, [order, cities]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-grid">
                <h4 className="full-width" style={{ marginTop: '10px', color: '#1a73e8' }}>Basic Information</h4>
                <div className="form-group">
                    <label>Order Number</label>
                    <input type="text" readOnly value={formData.orderNo} />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <select value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}>
                        {cities.map((c, i) => {
                            const id = c.id || i;
                            const name = typeof c === 'string' ? c : c.name;
                            return <option key={id} value={name}>{name}</option>;
                        })}
                    </select>
                </div>

                <h4 className="full-width" style={{ marginTop: '10px', color: '#1a73e8' }}>Sender Details</h4>
                <div className="form-group">
                    <label>Sender Name</label>
                    <input required type="text" value={formData.sender.name} onChange={e => setFormData({ ...formData, sender: { ...formData.sender, name: e.target.value } })} />
                </div>
                <div className="form-group">
                    <label>Sender Company</label>
                    <input type="text" value={formData.sender.company} onChange={e => setFormData({ ...formData, sender: { ...formData.sender, company: e.target.value } })} />
                </div>
                <div className="form-group">
                    <label>Sender Phone</label>
                    <input required type="text" value={formData.sender.phone} onChange={e => setFormData({ ...formData, sender: { ...formData.sender, phone: e.target.value } })} />
                </div>
                <div className="form-group">
                    <label>Sender Address</label>
                    <input required type="text" value={formData.sender.address} onChange={e => setFormData({ ...formData, sender: { ...formData.sender, address: e.target.value } })} />
                </div>

                <h4 className="full-width" style={{ marginTop: '10px', color: '#1a73e8' }}>Receiver Details</h4>
                <div className="form-group">
                    <label>Receiver Name</label>
                    <input required type="text" value={formData.receiver.name} onChange={e => setFormData({ ...formData, receiver: { ...formData.receiver, name: e.target.value } })} />
                </div>
                <div className="form-group">
                    <label>Receiver Phone</label>
                    <input required type="text" value={formData.receiver.phone} onChange={e => setFormData({ ...formData, receiver: { ...formData.receiver, phone: e.target.value } })} />
                </div>
                <div className="form-group full-width">
                    <label>Receiver Address</label>
                    <textarea required value={formData.receiver.address} onChange={e => setFormData({ ...formData, receiver: { ...formData.receiver, address: e.target.value } })} />
                </div>

                <h4 className="full-width" style={{ marginTop: '10px', color: '#1a73e8' }}>Shipment & Payment</h4>
                <div className="form-group">
                    <label>Product Code</label>
                    <input type="text" value={formData.shipment.productCode} onChange={e => setFormData({ ...formData, shipment: { ...formData.shipment, productCode: e.target.value } })} />
                </div>
                <div className="form-group">
                    <label>Weight</label>
                    <input type="text" value={formData.shipment.weight} onChange={e => setFormData({ ...formData, shipment: { ...formData.shipment, weight: e.target.value } })} />
                </div>
                <div className="form-group">
                    <label>COD Amount (Rs)</label>
                    <input required type="text" value={formData.payment.cod} onChange={e => setFormData({ ...formData, payment: { ...formData.payment, cod: e.target.value } })} />
                </div>
                <div className="form-group">
                    <label>Delivery Fee (Rs)</label>
                    <input required type="text" value={formData.payment.deliveryFee} onChange={e => setFormData({ ...formData, payment: { ...formData.payment, deliveryFee: e.target.value } })} />
                </div>
            </div>
            <div className="form-actions">
                <button type="button" className="action-btn" onClick={onCancel}>Cancel</button>
                <button type="submit" className="primary-btn">Book Order</button>
            </div>
        </form>
    );
}
