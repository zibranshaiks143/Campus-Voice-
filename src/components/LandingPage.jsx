import React from 'react';
import { GraduationCap, ShieldCheck } from 'lucide-react';

const LandingPage = ({ onSelectRole }) => {
  return (
    <div className="split-layout animate-fade-in">
      {/* Left Panel - Image & Branding */}
      <div className="left-panel">
        <div className="left-panel-content animate-slide-up">
          <h1>Welcome to<br />SRM University AP</h1>
          <p>Your digital campus companion. Raise tickets, track lost items, and stay connected with the university administration.</p>
        </div>
      </div>

      {/* Right Panel - Role Selection */}
      <div className="right-panel">
        <div className="top-right-brand">
          <div className="brand-icon-small">
            <GraduationCap size={32} />
          </div>
          <span>CAMPUS VOICE</span>
        </div>
        <div className="landing-content" style={{ width: '100%', maxWidth: '450px' }}>
          <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Get Started</h2>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>Select your role to access the portal.</p>
          </div>

          <div className="role-cards-vertical">
            <div
              className="role-card-row"
              onClick={() => onSelectRole('student')}
              role="button"
              tabIndex={0}
            >
              <div className="icon-box student-icon">
                <GraduationCap size={32} />
              </div>
              <div className="role-info">
                <h3>Student Portal</h3>
                <p>Raise tickets & check Lost & Found</p>
              </div>
            </div>

            <div
              className="role-card-row"
              onClick={() => onSelectRole('admin')}
              role="button"
              tabIndex={0}
            >
              <div className="icon-box admin-icon">
                <ShieldCheck size={32} />
              </div>
              <div className="role-info">
                <h3>Admin Portal</h3>
                <p>Manage tickets & campus issues</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .role-cards-vertical {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .role-card-row {
          display: flex;
          align-items: center;
          background: white;
          border: 1px solid #E5E7EB;
          padding: 1.5rem;
          border-radius: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .role-card-row:hover {
          border-color: var(--color-primary);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .icon-box {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1.5rem;
          flex-shrink: 0;
        }

        .student-icon {
          background-color: rgba(0, 32, 91, 0.1);
          color: var(--color-primary);
        }

        .admin-icon {
          background-color: rgba(235, 170, 0, 0.1);
          color: var(--color-secondary);
        }

        .role-info h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 0.25rem;
        }

        .role-info p {
          color: var(--color-text-light);
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
