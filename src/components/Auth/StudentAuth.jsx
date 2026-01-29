import React, { useState } from 'react';
import { Mail, Lock, User, ArrowLeft, Hash, BookOpen, GraduationCap } from 'lucide-react';

const StudentAuth = ({ onLogin, onBack }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [year, setYear] = useState('1st Year');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Common Validation
    if (!email.endsWith('srmap.edu.in')) {
      setError('Please use a valid university email (ends with srmap.edu.in).');
      return;
    }

    // Helper to extract name from email
    const getNameFromEmail = (email) => {
      if (!email) return 'Student';
      const localPart = email.split('@')[0];
      return localPart
        .split(/[._]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
    };

    // Get existing students from local storage
    const storedUsers = JSON.parse(localStorage.getItem('registeredStudents') || '[]');
    const existingUser = storedUsers.find(u => u.email === email);

    if (isSignup) {
      // REGISTRATION FLOW
      if (existingUser) {
        setError('Account already exists. Please Sign In.');
        return;
      }

      // Allow setting a custom password for registration or enforce a policy. 
      // For now, let's keep it simple or allow the user key in 'srmap123' if we want to enforce that mock password, 
      // but typically registration allows setting a password. 
      // User request only mentioned "if a student is registered then only able to login".
      // Let's perform basic password validation.
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }

      const newUser = {
        name: name,
        email: email,
        password: password, // Storing plain text for this mock demo
        admissionNumber: admissionNumber,
        department: department,
        year: year
      };

      localStorage.setItem('registeredStudents', JSON.stringify([...storedUsers, newUser]));

      console.log('Student Registered', newUser);
      // Auto-login after signup
      onLogin(newUser);
    } else {
      // LOGIN FLOW
      if (!existingUser) {
        setError('No account found with this email. Please Sign Up first.');
        return;
      }

      if (existingUser.password !== password) {
        setError('Invalid password.');
        return;
      }

      // User found and password matches
      // If the user didn't have a name saved (old mock users), generate it
      const userProfile = {
        ...existingUser,
        name: existingUser.name || getNameFromEmail(existingUser.email)
      };

      console.log('Student Login', userProfile);
      onLogin(userProfile);
    }
  };

  return (
    <div className="split-layout animate-fade-in">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="left-panel-content animate-slide-up">
          <h1>Student<br />Success Portal</h1>
          <p>Access your academic profile, raise campus tickets, and manage your student life from one central hub.</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <button onClick={onBack} className="back-btn-floating">
          <ArrowLeft size={20} /> Back
        </button>

        <div className="auth-form-container animate-scale-in" style={{ width: '100%', maxWidth: '420px' }}>
          <div className="auth-header" style={{ marginBottom: '2rem', textAlign: 'left' }}>
            <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(0,32,91,0.1)', borderRadius: '12px', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
              <GraduationCap size={32} />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
              Student {isSignup ? 'Registration' : 'Login'}
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>
              {isSignup ? 'Enter your details to create an account.' : 'Please enter your credentials to access your account.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}

            {isSignup && (
              <>
                <div className="floating-input-group">
                  <input
                    type="text"
                    placeholder=" "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label>Full Name</label>
                  <User size={18} className="floating-icon" />
                </div>

                <div className="floating-input-group">
                  <input
                    type="text"
                    placeholder=" "
                    value={admissionNumber}
                    onChange={(e) => setAdmissionNumber(e.target.value)}
                    required
                  />
                  <label>Admission Number</label>
                  <Hash size={18} className="floating-icon" />
                </div>

                <div className="form-row">
                  <div className="floating-input-group half">
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Civil">Civil</option>
                      <option value="Business">Business</option>
                    </select>
                    <label>Department</label>
                    <BookOpen size={18} className="floating-icon" />
                  </div>

                  <div className="floating-input-group half">
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                    <label>Year</label>
                    <div className="floating-icon" style={{ width: 18 }}></div>
                  </div>
                </div>
              </>
            )}

            <div className="floating-input-group">
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>University Email</label>
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
              {isSignup ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer" style={{ marginTop: '2rem', textAlign: 'center', color: '#666' }}>
            <p>
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="link-btn"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit' }}
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAuth;
