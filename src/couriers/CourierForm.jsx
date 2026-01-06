import React, { useState, useEffect } from "react";

export default function CourierForm({ courier, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        email: "",
        cities: 0,
        status: "Active"
    });

    useEffect(() => {
        if (courier) setFormData(courier);
    }, [courier]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-grid">
                <div className="form-group">
                    <label>Courier Name</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Contact</label>
                    <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={e => setFormData({ ...formData, contact: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Cities Covered</label>
                    <input
                        type="number"
                        required
                        value={formData.cities}
                        onChange={e => setFormData({ ...formData, cities: parseInt(e.target.value) })}
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
                <button type="submit" className="primary-btn">Save Courier</button>
            </div>
        </form>
    );
}
