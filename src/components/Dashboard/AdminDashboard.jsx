import React, { useState, useEffect } from 'react';
import { User, LogOut, CheckCircle, Clock, AlertCircle, Filter, GraduationCap, Trash2, Save, MapPin, Plus, X } from 'lucide-react';

const AdminDashboard = ({ onLogout, lostItems, claimMessage, onUpdateClaimMessage, onRemoveItem, onAddItem, tickets, onResolveTicket }) => {
  // tickets state removed, now using prop

  const [activeCategory, setActiveCategory] = useState('All');
  const [localClaimMsg, setLocalClaimMsg] = useState(claimMessage || "");

  // Add Item State
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', location: '', date: 'Today', image: 'https://images.unsplash.com/photo-1517260739937-6d274092248e?auto=format&fit=crop&q=80&w=300&h=200' }); // Default placeholder image

  useEffect(() => {
    setLocalClaimMsg(claimMessage);
  }, [claimMessage]);

  const handleResolve = (id) => {
    onResolveTicket(id);
  };

  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    onAddItem(newItem);
    setNewItem({ title: '', location: '', date: 'Today', image: 'https://images.unsplash.com/photo-1517260739937-6d274092248e?auto=format&fit=crop&q=80&w=300&h=200' });
    setShowAddItem(false);
  };

  const handleSaveClaimMsg = () => {
    onUpdateClaimMessage(localClaimMsg);
    alert('Claim instructions updated successfully!');
  };

  const openCount = tickets.filter(t => t.status === 'Open').length;
  const resolvedCount = tickets.filter(t => t.status === 'Resolved').length;

  const filteredTickets = activeCategory === 'All'
    ? tickets
    : tickets.filter(t => t.category === activeCategory);

  return (
    <div className="dashboard-container animate-fade-in">
      {/* Navbar (similar to student but simpler) */}
      <nav className="navbar admin-navbar">
        <div className="nav-brand">
          <div className="brand-logo-admin">
            <GraduationCap size={24} />
          </div>
          <span>CAMPUS VOICE</span>
          <span className="admin-tag">Admin</span>
        </div>
        <div className="user-profile">
          <span className="username">Administrator</span>
          <button onClick={onLogout} className="logout-btn" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      <main className="main-content">
        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card card">
            <div className="summary-icon icon-open">
              <AlertCircle size={32} />
            </div>
            <div className="summary-info">
              <h3>Open Tickets</h3>
              <p className="summary-count">{openCount}</p>
            </div>
          </div>

          <div className="summary-card card">
            <div className="summary-icon icon-resolved">
              <CheckCircle size={32} />
            </div>
            <div className="summary-info">
              <h3>Resolved Tickets</h3>
              <p className="summary-count">{resolvedCount}</p>
            </div>
          </div>
        </div>

        {/* Lost & Found Management */}
        <div className="admin-section">
          <div className="section-header">
            <h2>Lost & Found Settings</h2>
          </div>

          <div className="lf-management-grid">
            {/* Claim Instructions Editor */}
            <div className="card lf-card">
              <h3>Edit Claim Instructions</h3>
              <p className="label-text">This message is shown to students when they claim an item.</p>
              <textarea
                className="claim-msg-input"
                rows="6"
                value={localClaimMsg}
                onChange={(e) => setLocalClaimMsg(e.target.value)}
              ></textarea>
              <button className="btn btn-primary" onClick={handleSaveClaimMsg} style={{ marginTop: '1rem' }}>
                <Save size={16} style={{ marginRight: '0.5rem' }} /> Save Instructions
              </button>
            </div>

            {/* Items List */}
            <div className="card lf-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3>Manage Found Items</h3>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => setShowAddItem(!showAddItem)}
                >
                  {showAddItem ? <X size={16} /> : <Plus size={16} />}
                  {showAddItem ? 'Cancel' : 'Add Item'}
                </button>
              </div>

              {showAddItem && (
                <form onSubmit={handleAddItemSubmit} className="add-item-form">
                  <input
                    type="text"
                    placeholder="Item Name (e.g., Red Umbrella)"
                    value={newItem.title}
                    onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                    required
                  />
                  <div className="form-row-compact">
                    <input
                      type="text"
                      placeholder="Location"
                      value={newItem.location}
                      onChange={e => setNewItem({ ...newItem, location: e.target.value })}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Date (e.g., Today)"
                      value={newItem.date}
                      onChange={e => setNewItem({ ...newItem, date: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-full">Post Item</button>
                </form>
              )}

              <div className="admin-items-list">
                {lostItems && lostItems.length > 0 ? (
                  lostItems.map(item => (
                    <div key={item.id} className="admin-item-row">
                      <img src={item.image} alt={item.title} className="admin-item-thumb" />
                      <div className="admin-item-info">
                        <h4>{item.title}</h4>
                        <span><MapPin size={12} /> {item.location}</span>
                      </div>
                      <button
                        className="btn-icon-danger"
                        onClick={() => onRemoveItem(item.id)}
                        title="Remove Item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="empty-text">No lost items reported.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Management */}
        <div className="tickets-section">
          <div className="section-header">
            <h2>Recent Tickets</h2>
            <div className="filter-group">
              <Filter size={16} />
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="category-filter"
              >
                <option value="All">All Categories</option>
                <option value="Technical">Technical</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Academic">Academic</option>
              </select>
            </div>
          </div>

          <div className="admin-ticket-list">
            {filteredTickets.map(ticket => (
              <div key={ticket.id} className="admin-ticket-card card">
                <div className={`status-indicator ${ticket.status === 'Open' ? 'indicator-open' : 'indicator-resolved'}`}></div>
                <div className="ticket-content">
                  <div className="ticket-header">
                    <span className="ticket-id">#{ticket.id}</span>
                    <span className="ticket-cat">{ticket.category}</span>
                    <span className="ticket-date">{ticket.date}</span>
                  </div>
                  <h3>{ticket.title}</h3>
                  <p className="ticket-student">Raised by: {ticket.student}</p>
                </div>

                <div className="ticket-actions">
                  {ticket.status === 'Open' ? (
                    <button
                      onClick={() => handleResolve(ticket.id)}
                      className="btn btn-sm btn-resolve"
                    >
                      Mark Resolved
                    </button>
                  ) : (
                    <span className="resolved-badge"><CheckCircle size={16} /> Resolved</span>
                  )}
                </div>
              </div>
            ))}

            {filteredTickets.length === 0 && (
              <div className="empty-state">
                <p>No tickets found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <style>{`
        .admin-navbar {
          background-color: var(--color-primary);
          color: white;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: var(--shadow);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .admin-navbar .nav-brand {
          color: white;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: 0.5px;
        }

        .brand-logo-admin {
          background: rgba(255,255,255,0.2);
          color: white;
          padding: 0.5rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .admin-tag {
          font-size: 0.8rem;
          background: rgba(255,255,255,0.2);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          margin-left: 0.5rem;
          vertical-align: middle;
        }
        
        .user-profile {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .admin-navbar .logout-btn {
          color: rgba(255,255,255,0.8);
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        
        .admin-navbar .logout-btn:hover {
          color: white;
        }

        .summary-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .summary-card {
          display: flex;
          align-items: center;
          padding: 2rem;
        }

        .summary-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1.5rem;
        }
        
        .icon-open { background: #fee2e2; color: #dc2626; }
        .icon-resolved { background: #dcfce7; color: #16a34a; }

        .summary-count {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          color: var(--color-primary);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        /* Lost & Found Admin Styles */
        .admin-section {
            margin-bottom: 3rem;
        }

        .lf-management-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }
        
        @media (max-width: 768px) {
            .lf-management-grid {
                grid-template-columns: 1fr;
            }
        }

        .lf-card {
            padding: 1.5rem;
        }
        
        .lf-card h3 {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
            color: var(--color-primary);
        }
        
        .label-text {
            font-size: 0.85rem;
            color: var(--color-text-light);
            margin-bottom: 1rem;
        }

        .claim-msg-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #E5E7EB;
            border-radius: var(--radius);
            font-family: inherit;
            resize: vertical;
        }
        
        .admin-items-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            max-height: 300px;
            overflow-y: auto;
        }
        
        .admin-item-row {
            display: flex;
            align-items: center;
            padding: 0.75rem;
            background: #F9FAFB;
            border-radius: var(--radius);
            gap: 1rem;
        }
        
        .admin-item-thumb {
            width: 48px;
            height: 48px;
            border-radius: 4px;
            object-fit: cover;
        }
        
        .admin-item-info {
            flex: 1;
        }
        
        .admin-item-info h4 {
            font-size: 0.95rem;
            margin-bottom: 0.2rem;
        }
        
        .admin-item-info span {
            font-size: 0.8rem;
            color: var(--color-text-light);
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        .btn-icon-danger {
            color: var(--color-text-light);
            padding: 0.5rem;
            border-radius: 50%;
            transition: all 0.2s;
        }
        
        .btn-icon-danger:hover {
            color: var(--color-danger);
            background: #FEF2F2;
        }
        
        .empty-text {
            font-style: italic;
            color: var(--color-text-light);
            text-align: center;
            padding: 2rem;
        }

        .add-item-form {
            background: #F9FAFB;
            padding: 1rem;
            border-radius: var(--radius);
            margin-bottom: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            animation: fadeIn 0.3s ease;
        }

        .add-item-form input {
            padding: 0.5rem;
            border: 1px solid #E5E7EB;
            border-radius: 4px;
            width: 100%;
        }

        .form-row-compact {
            display: flex;
            gap: 0.5rem;
        }
        
        .btn-full {
            width: 100%;
            justify-content: center;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: white;
          padding: 0.5rem 1rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
        }
        
        .category-filter {
          border: none;
          font-weight: 500;
          color: var(--color-text);
          cursor: pointer;
        }

        .admin-ticket-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .admin-ticket-card {
          display: flex;
          padding: 0; /* padding managed internally for layout */
          overflow: hidden;
        }

        .status-indicator {
          width: 6px;
        }
        
        .indicator-open { background-color: var(--color-danger); }
        .indicator-resolved { background-color: var(--color-success); }

        .ticket-content {
          flex: 1;
          padding: 1.5rem;
        }

        .ticket-header {
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
          color: var(--color-text-light);
          margin-bottom: 0.5rem;
        }
        
        .ticket-cat {
          background: #F3F4F6;
          padding: 0 0.5rem;
          border-radius: 4px;
        }

        .ticket-student {
          font-size: 0.9rem;
          color: var(--color-text-light);
          margin-top: 0.25rem;
        }

        .ticket-actions {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          border-left: 1px solid #F3F4F6;
        }
        
        .btn-resolve {
          background-color: var(--color-success);
          color: white;
        }
        
        .btn-resolve:hover {
          background-color: #218838;
        }
        
        .resolved-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-success);
          font-weight: 600;
        }
        
        .empty-state {
          text-align: center;
          padding: 3rem;
          color: var(--color-text-light);
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
