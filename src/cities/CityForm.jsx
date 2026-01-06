import React, { useState, useEffect } from "react";

export default function CityForm({ city, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        name: "",
        province: "",
        zones: 0,
        status: "Active"
    });

    useEffect(() => {
        if (city) setFormData(city);
    }, [city]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-grid">
                <div className="form-group">
                    <label>City Name</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Province</label>
                    <input
                        type="text"
                        required
                        value={formData.province}
                        onChange={e => setFormData({ ...formData, province: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Zones</label>
                    <input
                        type="number"
                        required
                        value={formData.zones}
                        onChange={e => setFormData({ ...formData, zones: parseInt(e.target.value) })}
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
                <button type="submit" className="primary-btn">Save City</button>
            </div>
        </form>
    );
}
