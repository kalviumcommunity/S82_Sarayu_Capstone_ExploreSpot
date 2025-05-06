import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignupPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/signup', form, {
        withCredentials: true,
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}>
      <div style={{
        display: 'flex',
        width: '800px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0px 4px 20px rgba(0,0,0,0.3)',
        overflow: 'hidden',
      }}>
        {/* Left Panel */}
        <div style={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '30px',
          backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #e0c3fc 100%)',
        }}>
          <h2 style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Join Us Today!</h2>
        </div>

        {/* Right Panel */}
        <div style={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '30px',
          textAlign: 'center',
          backgroundColor: '#f4f4f4',
        }}>
          <h3 style={{
            fontFamily: 'Nunito',
            fontWeight: 'bold',
            fontSize: '1.8rem',
            backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #e0c3fc 100%)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            marginBottom: '15px'
          }}>
            Sign up
          </h3>
          {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem' }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem' }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem' }}
            />
            <button type="submit" style={{
              padding: '12px',
              borderRadius: '5px',
              backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #e0c3fc 100%)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: '0.3s'
            }}
              onMouseOver={(e) => e.target.style.opacity = '0.8'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              Sign up
            </button>
          </form>
          <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
            Already have an account?{' '}
            <span
              style={{ color: '#007BFF', cursor: 'pointer', fontWeight: 'bold' }}
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;