import React, { useState, useEffect } from 'react';
import { Search, Plus, Tag, Clock, CheckCircle, User, LogOut, MapPin, X, Edit2, Save, GraduationCap, Camera } from 'lucide-react';

const StudentDashboard = ({ onLogout, user, onUpdateProfile, lostItems, onClaimItem, tickets, onAddTicket, onAddItem }) => {
  const [activeTab, setActiveTab] = useState('lost-found');
  const [showProfile, setShowProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Add Item Modal State
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItemData, setNewItemData] = useState({ title: '', location: '', date: '', image: null, imageFile: null });
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    // Use default image if none uploaded
    const itemToSubmit = {
      ...newItemData,
      image: newItemData.image || 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=300&h=200'
    };
    onAddItem(itemToSubmit);
    setNewItemData({ title: '', location: '', date: '', image: null, imageFile: null });
    setShowAddItemModal(false);
    alert('Item Posted Successfully!');
  };

  // Local state for editing
  const [editForm, setEditForm] = useState(user || {});

  // Sync editForm when user prop changes or modal opens
  useEffect(() => {
    if (user) {
      setEditForm(user);
    }
  }, [user, showProfile]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onUpdateProfile(editForm);
    setIsEditing(false);
  };

  const activeUser = user || { name: 'Student', email: 'N/A' }; // Fallback

  // tickets state removed, now using prop

  // lostItems state removed, now using prop

  const [newTicket, setNewTicket] = useState({ category: 'Technical', title: '', description: '', attachment: null });

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    const ticketPayload = {
      ...newTicket,
      student: activeUser.name // Attach student name
    };
    onAddTicket(ticketPayload);
    setNewTicket({ category: 'Technical', title: '', description: '', attachment: null });
    setActiveTab('track-tickets');
    alert('Ticket Raised Successfully!');
  };

  // handleClaimItem removed, using prop

  return (
    <div className="dashboard-container animate-fade-in">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">
          <div className="brand-logo">
            <GraduationCap size={24} />
          </div>
          <span>CAMPUS VOICE</span>
        </div>
        <div className="nav-links">
          <button
            className={`nav-item ${activeTab === 'lost-found' ? 'active' : ''}`}
            onClick={() => setActiveTab('lost-found')}
          >
            Lost & Found
          </button>
          <button
            className={`nav-item ${activeTab === 'raise-ticket' ? 'active' : ''}`}
            onClick={() => setActiveTab('raise-ticket')}
          >
            Raise Ticket
          </button>
          <button
            className={`nav-item ${activeTab === 'track-tickets' ? 'active' : ''}`}
            onClick={() => setActiveTab('track-tickets')}
          >
            Track My Tickets
          </button>
        </div>
        <div className="user-profile">
          <div className="profile-clickable" onClick={() => setShowProfile(true)}>
            <div className="avatar">
              <User size={20} />
            </div>
            <span className="username">{activeUser.name}</span>
          </div>
          <button onClick={onLogout} className="logout-btn" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      <main className="main-content">
        {/* Profile Modal */}
        {showProfile && (
          <div className="modal-overlay" onClick={() => setShowProfile(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{isEditing ? 'Edit Profile' : 'Student Profile'}</h2>
                <div className="header-actions">
                  {!isEditing && (
                    <button className="icon-btn" onClick={() => setIsEditing(true)} title="Edit Profile">
                      <Edit2 size={18} />
                    </button>
                  )}
                  <button className="close-btn" onClick={() => { setShowProfile(false); setIsEditing(false); }}>
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="profile-body">
                {!isEditing ? (
                  <div className="profile-view">
                    <div className="profile-avatar-large">
                      <User size={64} />
                    </div>
                    <h3 className="profile-name">{activeUser.name}</h3>
                    <p className="profile-role">Student</p>
                    <div className="profile-info-grid">
                      <div className="info-item">
                        <label>University ID</label>
                        <p>{activeUser.admissionNumber || 'N/A'}</p>
                      </div>
                      <div className="info-item">
                        <label>Department</label>
                        <p>{activeUser.department || 'N/A'}</p>
                      </div>
                      <div className="info-item">
                        <label>Email</label>
                        <p>{activeUser.email || 'N/A'}</p>
                      </div>
                      <div className="info-item">
                        <label>Year</label>
                        <p>{activeUser.year || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSaveProfile} className="profile-edit-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Admission Number</label>
                      <input
                        type="text"
                        value={editForm.admissionNumber || ''}
                        onChange={e => setEditForm({ ...editForm, admissionNumber: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Department</label>
                      <select
                        value={editForm.department || ''}
                        onChange={e => setEditForm({ ...editForm, department: e.target.value })}
                      >
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Civil">Civil</option>
                        <option value="Business">Business</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Year</label>
                      <select
                        value={editForm.year || ''}
                        onChange={e => setEditForm({ ...editForm, year: e.target.value })}
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                      </select>
                    </div>
                    {/* Email usually shouldn't be edited easily in auth systems, keeping it read-only or editable? User asked to edit profile, usually includes basic details. I'll make it editable for now or read-only if ID style. Let's make it editable for flexibility as per request 'edit profile' implies all. */}
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={editForm.email || ''}
                        onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                      />
                    </div>

                    <div className="form-actions">
                      <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
                      <button type="submit" className="btn btn-primary"><Save size={16} style={{ marginRight: '6px' }} /> Save Changes</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Add Item Modal */}
        {showAddItemModal && (
          <div className="modal-overlay" onClick={() => setShowAddItemModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Post Found Item</h2>
                <button className="close-btn" onClick={() => setShowAddItemModal(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="profile-body">
                <form onSubmit={handleAddItemSubmit} className="profile-edit-form">
                  <div className="form-group">
                    <label>Item Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Blue Water Bottle"
                      value={newItemData.title}
                      onChange={e => setNewItemData({ ...newItemData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Location Found</label>
                    <input
                      type="text"
                      placeholder="e.g., Library 2nd Floor"
                      value={newItemData.location}
                      onChange={e => setNewItemData({ ...newItemData, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date Found</label>
                    <input
                      type="text"
                      placeholder="e.g., Today, 10:00 AM"
                      value={newItemData.date}
                      onChange={e => setNewItemData({ ...newItemData, date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Item Image</label>
                    <div className="file-input-wrapper">
                      <label htmlFor="found-item-image" className="file-label">
                        <Camera size={18} />
                        <span>{newItemData.imageFile ? newItemData.imageFile.name : 'Upload Photo'}</span>
                      </label>
                      <input
                        type="file"
                        id="found-item-image"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            // Convert to Base64 for specific local storage persistence (demo only)
                            // In real prod, this goes to an AWS S3 bucket / Cloudinary
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewItemData({ ...newItemData, image: reader.result, imageFile: file });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden-file-input"
                        required
                      />
                    </div>
                    {newItemData.image && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <img src={newItemData.image} alt="Preview" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                      </div>
                    )}
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn btn-outline" onClick={() => setShowAddItemModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Post Item</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Lost & Found Section */}
        {activeTab === 'lost-found' && (
          <div className="section-content fade-in">
            <div className="section-header">
              <h2>Lost & Found</h2>
              <button className="btn btn-primary" onClick={() => setShowAddItemModal(true)}>
                <Plus size={18} style={{ marginRight: '8px' }} /> Post Item
              </button>
            </div>

            <div className="lost-found-grid">
              {lostItems.map(item => (
                <div key={item.id} className="item-card">
                  <img src={item.image} alt={item.title} className="item-image" />
                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <div className="item-meta">
                      <span><MapPin size={14} /> {item.location}</span>
                      <span>{item.date}</span>
                    </div>
                    <button
                      className="btn btn-outline btn-sm"
                      style={{ width: '100%', marginTop: '1rem' }}
                      onClick={() => onClaimItem(item.id, item.title)}
                    >
                      Claim Item
                    </button>
                  </div>
                </div>
              ))}

              {/* Upload Card */}
              <div className="item-card upload-card" onClick={() => setShowAddItemModal(true)}>
                <div className="upload-content">
                  <Plus size={40} className="upload-icon" />
                  <p>Found something?</p>
                  <span>Upload detailed info</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Raise Ticket Section */}
        {activeTab === 'raise-ticket' && (
          <div className="section-content fade-in">
            <h2>Raise a New Ticket</h2>
            <div className="card ticket-form-card">
              <form onSubmit={handleTicketSubmit}>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                  >
                    <option value="Technical">Technical Issue</option>
                    <option value="Maintenance">Maintenance & Repair</option>
                    <option value="Academic">Academic Query</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    placeholder="Brief description of the issue"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    rows="5"
                    placeholder="Provide full details..."
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Attachment (Optional)</label>
                  <div className="file-input-wrapper">
                    <label htmlFor="ticket-file" className="file-label">
                      <Camera size={18} />
                      <span>{newTicket.attachment ? newTicket.attachment.name : 'Upload Screenshot / Photo'}</span>
                    </label>
                    <input
                      type="file"
                      id="ticket-file"
                      accept="image/*"
                      onChange={(e) => setNewTicket({ ...newTicket, attachment: e.target.files[0] })}
                      className="hidden-file-input"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit Ticket</button>
              </form>
            </div>
          </div>
        )}

        {/* Ticket Details Modal */}
        {selectedTicket && (
          <div className="modal-overlay" onClick={() => setSelectedTicket(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Ticket Details</h2>
                <button className="close-btn" onClick={() => setSelectedTicket(null)}>
                  <X size={24} />
                </button>
              </div>
              <div className="profile-body">
                <div className="ticket-detail-view">
                  <div className="ticket-header-large">
                    <span className={`ticket-type-badge type-${selectedTicket.category.toLowerCase()}`}>{selectedTicket.category}</span>
                    <span className="ticket-date-large">{selectedTicket.date}</span>
                  </div>
                  <h3>{selectedTicket.title}</h3>
                  <p className="ticket-desc">{selectedTicket.description || 'No description provided.'}</p>

                  <div className="tracking-timeline">
                    <h4>Tracking Status</h4>
                    <div className="timeline-steps">
                      <div className={`step completed`}>
                        <div className="step-icon"><CheckCircle size={16} /></div>
                        <div className="step-info">
                          <strong>Ticket Raised</strong>
                          <span>{selectedTicket.date}</span>
                        </div>
                      </div>

                      <div className={`step ${selectedTicket.status === 'Resolved' || selectedTicket.status === 'In Progress' ? 'completed' : 'active'}`}>
                        <div className="step-icon"><Clock size={16} /></div>
                        <div className="step-info">
                          <strong>In Review</strong>
                          <span>{selectedTicket.status === 'Resolved' || selectedTicket.status === 'In Progress' ? 'Reviewed ny Admin' : 'Waiting for review'}</span>
                        </div>
                      </div>

                      <div className={`step ${selectedTicket.status === 'Resolved' ? 'completed' : ''}`}>
                        <div className="step-icon"><CheckCircle size={16} /></div>
                        <div className="step-info">
                          <strong>Resolved</strong>
                          <span>{selectedTicket.status === 'Resolved' ? 'Issue Fixed' : 'Pending Resolution'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Track Tickets Section */}
        {activeTab === 'track-tickets' && (
          <div className="section-content fade-in">
            <h2>My Tickets</h2>
            <div className="tickets-list">
              {tickets.map(ticket => (
                <div key={ticket.id} className="ticket-card card">
                  <div className="ticket-icon">
                    {ticket.category === 'Technical' ? <Clock color="var(--color-secondary)" /> : <Tag color="var(--color-primary)" />}
                  </div>
                  <div className="ticket-info">
                    <h3>{ticket.title}</h3>
                    <span className="ticket-category">{ticket.category}</span>
                    <span className="ticket-date">Raised on {ticket.date}</span>
                  </div>
                  <button
                    className={`ticket-status-btn status-${ticket.status.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    {ticket.status}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <style>{`
        .navbar {
          background: var(--color-white);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: var(--shadow);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--color-primary);
          letter-spacing: 0.5px;
        }

        .brand-logo {
          background: var(--color-primary);
          color: white;
          padding: 0.5rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-links {
          display: flex;
          gap: 1rem;
        }

        .nav-item {
          padding: 0.5rem 1rem;
          border-radius: var(--radius);
          font-weight: 500;
          color: var(--color-text-light);
          transition: all 0.2s;
        }

        .nav-item:hover, .nav-item.active {
          background-color: rgba(0, 32, 91, 0.05);
          color: var(--color-primary);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .profile-clickable {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            cursor: pointer;
            padding: 0.25rem 0.5rem;
            border-radius: var(--radius);
            transition: background-color 0.2s;
        }

        .profile-clickable:hover {
            background-color: #f3f4f6;
        }

        .avatar {
          width: 32px;
          height: 32px;
          background-color: var(--color-primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logout-btn {
          color: var(--color-text-light);
          margin-left: 0.5rem;
        }
        
        .logout-btn:hover {
          color: var(--color-danger);
        }

        .main-content {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
        }

        /* Modal Styles */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.2s ease-out;
        }

        .modal-content {
            background: white;
            border-radius: 1rem;
            width: 100%;
            max-width: 500px;
            box-shadow: var(--shadow-lg);
            overflow: hidden;
            animation: slideUp 0.3s ease-out;
        }

        .modal-header {
            padding: 1.5rem;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .header-actions {
            display: flex;
            gap: 0.5rem;
        }

        .modal-header h2 {
            font-size: 1.25rem;
            font-weight: 600;
        }
        
        .icon-btn, .close-btn {
            color: var(--color-text-light);
            padding: 0.5rem;
            border-radius: 50%;
            transition: all 0.2s;
        }
        
        .icon-btn:hover, .close-btn:hover {
            background-color: #f3f4f6;
            color: var(--color-primary);
        }

        .profile-body {
            padding: 2rem;
            max-height: 80vh;
            overflow-y: auto;
        }

        .profile-view {
            text-align: center;
        }

        .profile-avatar-large {
            width: 96px;
            height: 96px;
            background-color: var(--color-primary);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
        }

        .profile-name {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--color-text);
        }

        .profile-role {
            color: var(--color-text-light);
            margin-bottom: 2rem;
        }

        .profile-info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            text-align: left;
            background-color: #f9fafb;
            padding: 1.5rem;
            border-radius: 0.75rem;
        }

        .info-item label {
            display: block;
            text-transform: uppercase;
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--color-text-light);
            margin-bottom: 0.25rem;
        }

        .info-item p {
            font-weight: 500;
            color: var(--color-text);
        }
        
        /* Edit Form Styles */
        .profile-edit-form {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
        }
        
        .profile-edit-form .form-group label {
             display: block;
             margin-bottom: 0.35rem;
             font-weight: 500;
             font-size: 0.9rem;
        }
        
        .profile-edit-form input, .profile-edit-form select {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #e5e7eb;
            border-radius: var(--radius);
        }
        
        .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            margin-top: 1rem;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        /* Lost & Found Grid */
        .lost-found-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .item-card {
          background: white;
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: transform 0.2s;
        }
        
        .item-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        .item-image {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }

        .item-details {
          padding: 1rem;
        }
        
        .item-details h3 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
        
        .item-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--color-text-light);
        }
        
        .item-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .upload-card {
          border: 2px dashed #CBD5E1;
          background: transparent;
          box-shadow: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          min-height: 300px;
        }
        
        .upload-content {
          text-align: center;
          color: var(--color-text-light);
        }
        
        .upload-icon {
          color: var(--color-primary);
          margin-bottom: 1rem;
        }

        /* Ticket Form */
        .ticket-form-card {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .ticket-form-card input,
        .ticket-form-card select,
        .ticket-form-card textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #E5E7EB;
          border-radius: var(--radius);
          margin-top: 0.25rem;
        }
        
        .ticket-form-card .form-group {
          margin-bottom: 1.5rem;
        }

        .file-input-wrapper {
            position: relative;
        }

        .file-label {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem;
            border: 1px dashed #CBD5E1;
            border-radius: var(--radius);
            cursor: pointer;
            color: var(--color-text-light);
            background: #F8FAFC;
            transition: all 0.2s;
        }

        .file-label:hover {
            border-color: var(--color-primary);
            background: #F1F5F9;
            color: var(--color-primary);
        }

        .hidden-file-input {
            display: none;
        }

        .ticket-status-btn {
            border: none;
            cursor: pointer;
            font-weight: 600;
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            font-size: 0.9rem;
            transition: transform 0.2s;
        }
        
        .ticket-status-btn:hover {
            transform: scale(1.05);
            filter: brightness(0.95);
        }

        /* Ticket Detail View */
        .ticket-detail-view {
            text-align: left;
        }
        
        .ticket-header-large {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }
        
        .ticket-type-badge {
            background: #F3F4F6;
            color: #4B5563;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .ticket-date-large {
            color: #9CA3AF;
            font-size: 0.85rem;
        }
        
        .ticket-desc {
            color: #4B5563;
            margin: 1rem 0 2rem;
            line-height: 1.5;
            background: #F9FAFB;
            padding: 1rem;
            border-radius: 8px;
        }

        .tracking-timeline h4 {
            margin-bottom: 1rem;
            font-size: 1rem;
            color: var(--color-primary);
        }
        
        .timeline-steps {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            padding-left: 0.5rem;
            border-left: 2px solid #E5E7EB;
            margin-left: 0.5rem;
        }
        
        .step {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            position: relative;
            opacity: 0.5;
        }
        
        .step.active, .step.completed {
            opacity: 1;
        }
        
        .step-icon {
            background: white;
            color: #9CA3AF;
            margin-left: -13px; /* Center on border line */
            padding: 2px;
        }
        
        .completed .step-icon {
            color: var(--color-success);
        }
        
        .active .step-icon {
            color: var(--color-primary);
        }
        
        .step-info {
            display: flex;
            flex-direction: column;
        }
        
        .step-info strong {
            font-size: 0.95rem;
        }
        
        .step-info span {
            font-size: 0.8rem;
            color: #6B7280;
        }

        /* Ticket List */
        .tickets-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .ticket-card {
           display: flex;
           align-items: center;
           padding: 1.5rem;
        }
        
        .ticket-icon {
          width: 48px;
          height: 48px;
          background-color: #F3F4F6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1.5rem;
        }
        
        .ticket-info {
          flex: 1;
        }
        
        .ticket-info h3 {
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
        }
        
        .ticket-category {
          font-size: 0.85rem;
          background: #F3F4F6;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          margin-right: 0.75rem;
          color: #4B5563;
        }
        
        .ticket-date {
          font-size: 0.85rem;
          color: #9CA3AF;
        }
        
        .ticket-status {
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.9rem;
        }
        
        .status-open { background: #E0F2FE; color: #0369A1; }
        .status-in-progress { background: #FEF3C7; color: #D97706; }
        .status-resolved { background: #DCFCE7; color: #15803D; }
        
        .fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default StudentDashboard;
