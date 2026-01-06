import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Gauge,
  User,
  FileText,
  Users,
  Wallet,
  ClipboardList,
  Truck,
  MapPin,
  DollarSign,
  Settings,
  ChevronDown,
  Menu,
  X
} from "lucide-react";

import PendingCustomers from "./customers/PendingCustomers";
import ActiveCustomers from "./customers/ActiveCustomers";
import Customers from "./customers/Customers";
import CustomerPayments from "./payments/CustomerPayments";
import OrderReport from "./reports/OrderReport";
import ShipmentReport from "./reports/ShipmentReport";
import Couriers from "./couriers/Couriers";
import Cities from "./cities/Cities";
import Pricing from "./pricing/Pricing";
import SettingsPage from "./settings/SettingsPage";

import NewOrders from "./requests/NewOrders";
import Karachi from "./requests/Karachi";
import Outstation from "./requests/Outstation";
import Dispatch from "./requests/Dispatch";
import Assigned from "./requests/Assigned";
import Delivered from "./requests/Delivered";
import Returned from "./requests/Returned";
import Cancelled from "./requests/Cancelled";
import PendingOrders from "./requests/PendingOrders";

import Profile from "./components/Profile";
import SearchBar from "./components/SearchBar";

import "./Dashboard.css";
import BookOrders from "./requests/BookedOders";
import Modal from "./components/Modal";
import OrderForm from "./requests/OrderForm";
import CityForm from "./cities/CityForm";
import CourierForm from "./couriers/CourierForm";
import PricingForm from "./pricing/PricingForm";
import EditProfile from "./components/EditProfile";

ChartJS.register(ArcElement, Tooltip, Legend);

// Initial Data
const initialOrders = [
  { id: 1001, orderNo: "ORD-1001", customer: "Ali Traders", city: "Lahore", status: "booked", date: "2024-08-20", time: "02:45 PM", sender: { name: "Ali Khan", company: "Tech Solutions", phone: "03001234567", email: "ali@tech.com", address: "Gulshan-e-Iqbal, Karachi" }, receiver: { name: "Ahmed Raza", phone: "03112223333", address: "Model Town, Lahore" }, shipment: { tracking: "-", productCode: "PK-001", weight: "1 KG", description: "Electronics" }, payment: { deliveryFee: "250", cod: "12,500" } },
  { id: 1002, orderNo: "ORD-1002", customer: "Khan Store", city: "Karachi", status: "booked", date: "2024-08-21", time: "11:20 AM", sender: { name: "Sara Ahmed", company: "Online Store", phone: "03221112222", email: "sara@store.com", address: "Johar Town, Lahore" }, receiver: { name: "Usman Ali", phone: "03009998888", address: "Saddar, Rawalpindi" }, shipment: { tracking: "-", productCode: "PK-002", weight: "0.7 KG", description: "Clothes" }, payment: { deliveryFee: "200", cod: "4,800" } },
  { id: 401, orderNo: "ORD-401", customer: "Imran Khan", city: "Karachi", status: "karachi", date: "2024-08-19", sender: { company: "N/A" }, shipment: { tracking: "-", weight: "0 KG" }, payment: { cod: "0" } },
  { id: 501, orderNo: "ORD-501", customer: "Usman Ali", city: "Multan", status: "outstation", date: "2024-08-18", sender: { company: "N/A" }, shipment: { tracking: "-", weight: "0 KG" }, payment: { cod: "0" } },
];

const initialCustomers = [
  { id: 1, name: "Muhammad Idrees", company: "IT Vision Pvt Ltd", phone: "0332-4510131", email: "info@itvision.com.pk", city: "Lahore", status: "Active", totalOrders: 128 },
  { id: 2, name: "Ali Khan", company: "Tech Solutions", phone: "0301-9876543", email: "ali@tech.com", city: "Karachi", status: "Active", totalOrders: 76 },
];

const initialCities = [
  { id: 1, name: "Karachi", province: "Sindh", zones: 18, status: "Active" },
  { id: 2, name: "Lahore", province: "Punjab", zones: 12, status: "Active" },
  { id: 3, name: "Islamabad", province: "ICT", zones: 6, status: "Active" },
  { id: 4, name: "Quetta", province: "Balochistan", zones: 4, status: "Inactive" },
  { id: 5, name: "Peshawar", province: "KPK", zones: 7, status: "Active" },
];

const initialCouriers = [
  { id: 1, name: "Leopards Courier", contact: "042-111-300-786", email: "support@leopards.com.pk", cities: 120, status: "Active" },
  { id: 2, name: "TCS Express", contact: "021-111-123-456", email: "info@tcs.com.pk", cities: 150, status: "Active" },
  { id: 3, name: "Call Courier", contact: "042-35761999", email: "support@callcourier.com.pk", cities: 90, status: "Inactive" },
  { id: 4, name: "BlueEx", contact: "021-111-258-339", email: "help@blue-ex.com", cities: 110, status: "Active" },
];

const initialPricing = [
  { id: 1, city: "Karachi", weightFrom: "0 - 0.5 KG", deliveryFee: 180, codCharges: 50, returnCharges: 120, status: "Active" },
  { id: 2, city: "Lahore", weightFrom: "0 - 0.5 KG", deliveryFee: 200, codCharges: 60, returnCharges: 140, status: "Active" },
  { id: 3, city: "Islamabad", weightFrom: "0 - 0.5 KG", deliveryFee: 220, codCharges: 70, returnCharges: 160, status: "Active" },
];

export default function Dashboard({ onLogout }) {
  const [activePage, setActivePage] = useState("dashboard");
  const [openRequests, setOpenRequests] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Centralized State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("courier_orders");
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem("courier_customers");
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  const [cities, setCities] = useState(() => {
    const saved = localStorage.getItem("courier_cities");
    if (!saved) return initialCities;
    const parsed = JSON.parse(saved);
    // Normalize: Ensure cities are objects with id and name
    return parsed.map((c, i) => typeof c === 'string' ? { id: i + 1, name: c, status: 'Active' } : c);
  });

  const [couriers, setCouriers] = useState(() => {
    const saved = localStorage.getItem("courier_couriers");
    return saved ? JSON.parse(saved) : initialCouriers;
  });

  const [pricing, setPricing] = useState(() => {
    const saved = localStorage.getItem("courier_pricing");
    return saved ? JSON.parse(saved) : initialPricing;
  });

  // Modal State
  const [modalType, setModalType] = useState(null); // 'order', 'city', 'courier', 'pricing', 'profile'
  const [editingItem, setEditingItem] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");

  // Persistence
  useEffect(() => {
    localStorage.setItem("courier_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("courier_customers", JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem("courier_cities", JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    localStorage.setItem("courier_couriers", JSON.stringify(couriers));
  }, [couriers]);

  useEffect(() => {
    localStorage.setItem("courier_pricing", JSON.stringify(pricing));
  }, [pricing]);

  // Derived Counts
  const counts = {
    booked: orders.filter(o => o.status === "booked").length,
    karachi: orders.filter(o => o.status === "karachi").length,
    outstation: orders.filter(o => o.status === "outstation").length,
    dispatch: orders.filter(o => o.status === "dispatch").length,
    assigned: orders.filter(o => o.status === "assigned").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    returned: orders.filter(o => o.status === "returned").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
    pending: orders.filter(o => o.status === "pending").length,
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleSaveOrder = (orderData) => {
    if (editingItem) {
      setOrders(prev => prev.map(o => o.id === editingItem.id ? orderData : o));
    } else {
      setOrders(prev => [{ ...orderData, id: Date.now() }, ...prev]);
    }
    setModalType(null);
    setEditingItem(null);
  };

  const handleSaveCity = (cityData) => {
    if (editingItem) {
      setCities(prev => prev.map(c => c.id === editingItem.id ? cityData : c));
    } else {
      setCities(prev => [...prev, { ...cityData, id: Date.now() }]);
    }
    setModalType(null);
    setEditingItem(null);
  };

  const handleSaveCourier = (courierData) => {
    if (editingItem) {
      setCouriers(prev => prev.map(c => c.id === editingItem.id ? courierData : c));
    } else {
      setCouriers(prev => [...prev, { ...courierData, id: Date.now() }]);
    }
    setModalType(null);
    setEditingItem(null);
  };

  const handleSavePricing = (pricingData) => {
    if (editingItem) {
      setPricing(prev => prev.map(p => p.id === editingItem.id ? pricingData : p));
    } else {
      setPricing(prev => [...prev, { ...pricingData, id: Date.now() }]);
    }
    setModalType(null);
    setEditingItem(null);
  };

  const data = {
    labels: [
      "Booked",
      "Lahore Received",
      "Outstation Received",
      "Dispatch",
      "Assigned",
      "Returned",
      "Delivered",
    ],
    datasets: [
      {
        data: [
          counts.booked,
          counts.karachi,
          counts.outstation,
          counts.dispatch,
          counts.assigned,
          counts.returned,
          counts.delivered,
        ],
        backgroundColor: [
          "#1e90ff",
          "#9acd32",
          "#da70d6",
          "#20b2aa",
          "#ff8c00",
          "#ff0000",
          "#32cd32",
        ],
      },
    ],
  };

  return (
    <div className="erp-container">

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-close" onClick={() => setSidebarOpen(false)}>
          <X size={20} />
        </div>

        <h2 className="logo">Courier Admin</h2>

        <ul>
          <li
            className={activePage === "dashboard" ? "active" : ""}
            onClick={() => {
              setActivePage("dashboard");
              setOpenRequests(false);
              setSidebarOpen(false);
            }}
          >
            <Gauge size={18} />
            <span>Dashboard</span>
          </li>

          <li className="has-submenu" onClick={() => setOpenRequests(!openRequests)}>
            <div className="menu-title">
              <FileText size={18} />
              <span>Requests</span>
              <ChevronDown size={16} className={openRequests ? "rotate" : ""} />
            </div>
          </li>

          {openRequests && (
            <ul className="submenu">
              <li onClick={() => { setActivePage("newOrders"); setSidebarOpen(false); }}>Booked Orders</li>
              <li onClick={() => { setActivePage("karachi"); setSidebarOpen(false); }}>Item Received for Lahore</li>
              <li onClick={() => { setActivePage("outstation"); setSidebarOpen(false); }}>Item Received for Outstation</li>
              <li onClick={() => { setActivePage("dispatch"); setSidebarOpen(false); }}>Dispatch Orders</li>
              <li onClick={() => { setActivePage("assigned"); setSidebarOpen(false); }}>Assigned</li>
              <li onClick={() => { setActivePage("delivered"); setSidebarOpen(false); }}>Delivered</li>
              <li onClick={() => { setActivePage("returned"); setSidebarOpen(false); }}>Returned</li>
              <li onClick={() => { setActivePage("cancelled"); setSidebarOpen(false); }}>Cancelled</li>
              <li onClick={() => { setActivePage("pendingOrders"); setSidebarOpen(false); }}>Pending Orders</li>
            </ul>
          )}

          <li onClick={() => { setActivePage("customers"); setSidebarOpen(false); }}><Users size={18} /> Customers</li>
          <li onClick={() => { setActivePage("customerPayments"); setSidebarOpen(false); }}><Wallet size={18} /> Customer Payments</li>
          <li onClick={() => { setActivePage("orderReport"); setSidebarOpen(false); }}><ClipboardList size={18} /> Order Report</li>
          <li onClick={() => { setActivePage("shipmentReport"); setSidebarOpen(false); }}><Truck size={18} /> Shipment Report</li>
          <li onClick={() => { setActivePage("couriers"); setSidebarOpen(false); }}><Truck size={18} /> Couriers</li>
          <li onClick={() => { setActivePage("cities"); setSidebarOpen(false); }}><MapPin size={18} /> Cities</li>
          <li onClick={() => { setActivePage("pricing"); setSidebarOpen(false); }}><DollarSign size={18} /> Pricing</li>
          <li onClick={() => { setActivePage("settings"); setSidebarOpen(false); }}><Settings size={18} /> Setting</li>

          <li
            onClick={onLogout}
            style={{ marginTop: "20px", color: "#ff4d4f", fontWeight: "600" }}
          >
            🚪 Logout
          </li>
        </ul>
      </aside>

      {/* MAIN */}
      <main className="main">

        {/* MOBILE HEADER */}
        <div className="mobile-header">
          <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <strong>Courier Admin</strong>
        </div>

        <SearchBar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          customer={selectedCustomer}
          onCustomerChange={setSelectedCustomer}
          onSearchSubmit={() => console.log("Searching for:", searchValue, selectedCustomer)}
          customers={customers.filter(c => c.status === "Active")}
        />

        <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px 20px" }}>
          <div
            onClick={() => setActivePage("profile")}
            style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: "600" }}
          >
            <User size={18} /> My Profile
          </div>
        </div>

        {activePage === "dashboard" && (
          <>
            <div className="content-area">
              <div className="left-box-column">
                <div className="info-box brown" onClick={() => setActivePage("newOrders")} style={{ cursor: "pointer" }}><h3>{counts.booked}</h3><p>Booked Orders</p></div>
                <div className="info-box orange" onClick={() => setActivePage("karachi")} style={{ cursor: "pointer" }}><h3>{counts.karachi}</h3><p>Received for Lahore</p></div>
                <div className="info-box green" onClick={() => setActivePage("cancelled")} style={{ cursor: "pointer" }}><h3>{counts.cancelled}</h3><p>Cancelled Orders</p></div>
                <div className="info-box blue" onClick={() => setActivePage("assigned")} style={{ cursor: "pointer" }}><h3>{counts.assigned}</h3><p>Assigned Orders</p></div>
                <div className="info-box red" onClick={() => setActivePage("returned")} style={{ cursor: "pointer" }}><h3>{counts.returned}</h3><p>Returned</p></div>
              </div>

              <div className="chart-section">
                <h2>Orders</h2>
                <Pie
                  data={data}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: "bottom" },
                    },
                  }}
                />

              </div>
            </div>

            <BookOrders
              orders={orders.filter(o => o.status === "booked")}
              updateOrderStatus={updateOrderStatus}
              onAdd={() => setModalType('order')}
            />
          </>
        )}

        {activePage === "profile" && <Profile />}
        {activePage === "newOrders" && <NewOrders orders={orders.filter(o => o.status === "booked")} updateOrderStatus={updateOrderStatus} />}
        {activePage === "karachi" && <Karachi orders={orders.filter(o => o.status === "karachi")} updateOrderStatus={updateOrderStatus} />}
        {activePage === "outstation" && <Outstation orders={orders.filter(o => o.status === "outstation")} updateOrderStatus={updateOrderStatus} />}
        {activePage === "dispatch" && <Dispatch orders={orders.filter(o => o.status === "dispatch")} updateOrderStatus={updateOrderStatus} />}
        {activePage === "assigned" && <Assigned orders={orders.filter(o => o.status === "assigned")} updateOrderStatus={updateOrderStatus} />}
        {activePage === "delivered" && <Delivered orders={orders.filter(o => o.status === "delivered")} updateOrderStatus={updateOrderStatus} />}
        {activePage === "returned" && <Returned orders={orders.filter(o => o.status === "returned")} updateOrderStatus={updateOrderStatus} />}
        {activePage === "cancelled" && <Cancelled orders={orders.filter(o => o.status === "cancelled")} updateOrderStatus={updateOrderStatus} />}
        {activePage === "pendingOrders" && <PendingOrders orders={orders.filter(o => o.status === "pending")} updateOrderStatus={updateOrderStatus} />}
        {activePage === "customers" && <Customers customers={customers} setCustomers={setCustomers} />}
        {activePage === "customerPayments" && <CustomerPayments orders={orders} />}
        {activePage === "orderReport" && <OrderReport orders={orders} cities={cities} />}
        {activePage === "shipmentReport" && <ShipmentReport orders={orders} cities={cities} couriers={couriers} />}
        {activePage === "couriers" && (
          <Couriers
            couriers={couriers}
            setCouriers={setCouriers}
            onAdd={() => setModalType('courier')}
            onEdit={(item) => { setEditingItem(item); setModalType('courier'); }}
          />
        )}
        {activePage === "cities" && (
          <Cities
            cities={cities}
            setCities={setCities}
            onAdd={() => setModalType('city')}
            onEdit={(item) => { setEditingItem(item); setModalType('city'); }}
          />
        )}
        {activePage === "pricing" && (
          <Pricing
            pricing={pricing}
            setPricing={setPricing}
            onAdd={() => setModalType('pricing')}
            onEdit={(item) => { setEditingItem(item); setModalType('pricing'); }}
          />
        )}
        {activePage === "settings" && <SettingsPage />}

        {/* MODALS */}
        <Modal
          isOpen={modalType === 'order'}
          onClose={() => { setModalType(null); setEditingItem(null); }}
          title={editingItem ? "Edit Order" : "Book New Order"}
        >
          <OrderForm
            cities={cities}
            order={editingItem}
            onSave={handleSaveOrder}
            onCancel={() => { setModalType(null); setEditingItem(null); }}
          />
        </Modal>

        <Modal
          isOpen={modalType === 'city'}
          onClose={() => { setModalType(null); setEditingItem(null); }}
          title={editingItem ? "Edit City" : "Add New City"}
        >
          <CityForm
            city={editingItem}
            onSave={handleSaveCity}
            onCancel={() => { setModalType(null); setEditingItem(null); }}
          />
        </Modal>

        <Modal
          isOpen={modalType === 'courier'}
          onClose={() => { setModalType(null); setEditingItem(null); }}
          title={editingItem ? "Edit Courier" : "Add New Courier"}
        >
          <CourierForm
            courier={editingItem}
            onSave={handleSaveCourier}
            onCancel={() => { setModalType(null); setEditingItem(null); }}
          />
        </Modal>

        <Modal
          isOpen={modalType === 'pricing'}
          onClose={() => { setModalType(null); setEditingItem(null); }}
          title={editingItem ? "Edit Pricing" : "Add New Pricing"}
        >
          <PricingForm
            pricing={editingItem}
            cities={cities}
            onSave={handleSavePricing}
            onCancel={() => { setModalType(null); setEditingItem(null); }}
          />
        </Modal>
      </main>
    </div>
  );
}
