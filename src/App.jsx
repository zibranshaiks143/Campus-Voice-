import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import StudentAuth from './components/Auth/StudentAuth';
import AdminAuth from './components/Auth/AdminAuth';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [userProfile, setUserProfile] = useState(null);

  // Shared Lost & Found State with Persistence
  const [lostItems, setLostItems] = useState(() => {
    const saved = localStorage.getItem('lostItems');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Blue Water Bottle', location: 'Science Block', image: 'https://images.unsplash.com/photo-1602143407151-011141950038?auto=format&fit=crop&q=80&w=300&h=200', date: 'Today' },
      { id: 2, title: 'Calculus Textbook', location: 'Cafeteria', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300&h=200', date: 'Yesterday' },
    ];
  });

  // Shared Ticket State with Persistence
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('tickets');
    return saved ? JSON.parse(saved) : [
      { id: 101, category: 'Technical', title: 'Lab 3 Projector Malfunction', student: 'Alex Johnson', status: 'Open', date: '2023-10-26' },
      { id: 102, category: 'Maintenance', title: 'Leaking Faucet in Restroom', student: 'Sarah Smith', status: 'Open', date: '2023-10-25' },
    ];
  });

  const [claimMessage, setClaimMessage] = useState(
    'To claim this item, please visit the Student Affairs Office (Room 101) between 9 AM - 5 PM. \n\nNote: You must bring your University ID card for verification.'
  );

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('lostItems', JSON.stringify(lostItems));
  }, [lostItems]);

  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const handleClaimItem = (itemId, itemTitle) => {
    alert(`CLAIM INSTRUCTIONS:\n\n${claimMessage}`);
    // Remove the item from the list after claim instructions are acknowledged
    setLostItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleAdminRemoveItem = (id) => {
    setLostItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddLostItem = (newItem) => {
    setLostItems(prev => [{ ...newItem, id: Date.now() }, ...prev]);
  };

  // Ticket Handlers
  const handleAddTicket = (newTicket) => {
    setTickets(prev => [{ ...newTicket, id: Date.now(), status: 'Open', date: new Date().toISOString().split('T')[0] }, ...prev]);
  };

  const handleResolveTicket = (ticketId) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'Resolved' } : t));
  };

  const handleRoleSelect = (role) => {
    if (role === 'student') setCurrentView('student-auth');
    if (role === 'admin') setCurrentView('admin-auth');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const handleStudentLogin = (profile) => {
    setUserProfile(profile);
    setCurrentView('student-dashboard');
  };

  const handleUpdateProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
  };

  const handleAdminLogin = () => {
    setCurrentView('admin-dashboard');
  };

  const handleLogout = () => {
    setCurrentView('landing');
    setUserProfile(null);
  };

  return (
    <div className="app">
      {currentView === 'landing' && (
        <LandingPage onSelectRole={handleRoleSelect} />
      )}

      {currentView === 'student-auth' && (
        <StudentAuth
          onLogin={handleStudentLogin}
          onBack={handleBackToLanding}
        />
      )}

      {currentView === 'admin-auth' && (
        <AdminAuth
          onLogin={handleAdminLogin}
          onBack={handleBackToLanding}
        />
      )}

      {currentView === 'student-dashboard' && (
        <StudentDashboard
          onLogout={handleLogout}
          user={userProfile}
          onUpdateProfile={handleUpdateProfile}
          lostItems={lostItems}
          onClaimItem={handleClaimItem}
          tickets={tickets}
          onAddTicket={handleAddTicket}
          onAddItem={handleAddLostItem}
        />
      )}

      {currentView === 'admin-dashboard' && (
        <AdminDashboard
          onLogout={handleLogout}
          lostItems={lostItems}
          claimMessage={claimMessage}
          onUpdateClaimMessage={setClaimMessage}
          onRemoveItem={handleAdminRemoveItem}
          onAddItem={handleAddLostItem}
          tickets={tickets}
          onResolveTicket={handleResolveTicket}
        />
      )}
    </div>
  );
}

export default App;
