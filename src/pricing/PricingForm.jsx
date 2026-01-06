import React, { useState, useEffect } from "react";

export default function PricingForm({ pricing, cities, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        city: "",
        weightFrom: "",
        deliveryFee: 0,
        codCharges: 0,
        returnCharges: 0,
        status: "Active"
    });

    useEffect(() => {
        if (pricing) setFormData(pricing);
        else if (cities.length > 0) setFormData(prev => ({ ...prev, city: cities[0].name }));
    }, [pricing, cities]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-grid">
                <div className="form-group">
                    <label>City</label>
                    <select
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                    >
                        {cities.map((c, i) => {
                            const id = c.id || i;
                            const name = typeof c === 'string' ? c : c.name;
                            return <option key={id} value={name}>{name}</option>;
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label>Weight Slab (e.g. 0 - 0.5 KG)</label>
                    <input
                        type="text"
                        required
                        value={formData.weightFrom}
                        onChange={e => setFormData({ ...formData, weightFrom: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Delivery Fee (Rs)</label>
                    <input
                        type="number"
                        required
                        value={formData.deliveryFee}
                        onChange={e => setFormData({ ...formData, deliveryFee: parseInt(e.target.value) })}
                    />
                </div>
                <div className="form-group">
                    <label>COD Charges (Rs)</label>
                    <input
                        type="number"
                        required
                        value={formData.codCharges}
                        onChange={e => setFormData({ ...formData, codCharges: parseInt(e.target.value) })}
                    />
                </div>
                <div className="form-group">
                    <label>Return Charges (Rs)</label>
                    <input
                        type="number"
                        required
                        value={formData.returnCharges}
                        onChange={e => setFormData({ ...formData, returnCharges: parseInt(e.target.value) })}
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select
                        value={formData.status}
                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>
            <div className="form-actions">
                <button type="button" className="action-btn" onClick={onCancel}>Cancel</button>
                <button type="submit" className="primary-btn">Save Pricing</button>
            </div>
        </form>
    );
}
