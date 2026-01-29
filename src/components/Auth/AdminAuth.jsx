import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft, Shield } from 'lucide-react';

const AdminAuth = ({ onLogin, onBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Domain Lock: Only allow kalvium.community emails
        if (!email.endsWith('@kalvium.community')) {
            setError('Access Restricted: Only @kalvium.community domains allowed.');
            return;
        }

        // Generic Password for Demo (In real app, this would be DB validated)
        if (password !== 'admin123') {
            setError('Invalid Password.');
            return;
        }

        // Success - Pass basic profile info
        // We can extract a name from the email for the dashboard greetings
        const adminName = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

        console.log('Admin Login Success:', email);
        onLogin({ name: adminName, email: email, role: 'admin' });
    };

    return (
        <div className="split-layout animate-fade-in">
            {/* Left Panel */}
            <div className="left-panel">
                <div className="left-panel-content animate-slide-up">
                    <h1>Admin Control<br />Center</h1>
                    <p>Secure oversight of campus operations. Manage lost items, resolve tickets, and maintain university standards.</p>
                </div>
            </div>

            {/* Right Panel */}
            <div className="right-panel">
                <button onClick={onBack} className="back-btn-floating">
                    <ArrowLeft size={20} /> Back
                </button>

                <div className="auth-form-container animate-scale-in" style={{ width: '100%', maxWidth: '420px' }}>
                    <div className="auth-header" style={{ marginBottom: '2rem', textAlign: 'left' }}>
                        <div className="admin-badge-pulse" style={{ margin: '0 0 1.5rem 0' }}>
                            <Shield size={28} />
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                            Admin Portal
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: '#666' }}>
                            Please authenticate to access the dashboard.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {error && <div className="error-message shake">{error}</div>}

                        <div className="floating-input-group">
                            <input
                                type="email"
                                placeholder=" "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label>Admin Email</label>
                            <Mail size={18} className="floating-icon" />
                        </div>

                        <div className="floating-input-group">
                            <input
                                type="password"
                                placeholder=" "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label>Password</label>
                            <Lock size={18} className="floating-icon" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: '1rem' }}>
                            Login to Dashboard
                        </button>
                    </form>
                </div>
            </div>

            <style>{`
        .back-btn-floating {
          position: absolute;
          top: 2rem;
          left: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text-light);
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          transition: all 0.2s;
          background: rgba(0,0,0,0.03);
          z-index: 10;
        }
        
        .back-btn-floating:hover {
          background: rgba(0,0,0,0.08);
          color: var(--color-primary);
          transform: translateX(-3px);
        }

        .admin-badge-pulse {
          background-color: var(--color-primary);
          color: white;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 0 0 rgba(0, 32, 91, 0.7);
          animation: pulse-blue 2s infinite;
        }
        
        @keyframes pulse-blue {
            0% {
                transform: scale(0.95);
                box-shadow: 0 0 0 0 rgba(0, 32, 91, 0.7);
            }
            70% {
                transform: scale(1);
                box-shadow: 0 0 0 10px rgba(0, 32, 91, 0);
            }
            100% {
                transform: scale(0.95);
                box-shadow: 0 0 0 0 rgba(0, 32, 91, 0);
            }
        }
        
        .shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
        </div>
    );
};

export default AdminAuth;
