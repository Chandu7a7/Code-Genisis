import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../Style/LoginSignup.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  // Change handler
  const ChangeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  // Submit handler
  const SubmitHandler = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      // Signup request
      const res = await axios.post(
        'https://code-genisis-backend-qtxpwmosv-chandus-projects-d19e03f3.vercel.app/auth/signup',
        formData,
        { withCredentials: true }
      );

      toast.success(String(res.data.message || 'Signup successful'));

      // Auto login after signup
      const lgres = await axios.post(
        'https://code-genisis-backend-qtxpwmosv-chandus-projects-d19e03f3.vercel.app/auth/login',
        formData,
        { withCredentials: true }
      );

      localStorage.setItem('#K&v@M!d$Q*L', 'true');
      toast.success(String(lgres.data.message || 'Login successful'));

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      const errorMsg = String(error.response?.data?.message || 'Signup failed');
      toast.error(errorMsg);
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-outer">
      <div className="auth-img">
        <img
          src="https://images.unsplash.com/photo-1607743386830-f198fbd7f9c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
          alt="signup"
        />
      </div>

      <div className="auth">
        <div className="auth-title">SignUp</div>
        <form onSubmit={SubmitHandler}>
          <div className="inputs">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              onChange={ChangeHandler}
              value={formData.name}
              placeholder="Enter name"
              name="name"
              required
            />
          </div>
          <div className="inputs">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={ChangeHandler}
              value={formData.email}
              placeholder="Enter email"
              name="email"
              required
            />
          </div>
          <div className="inputs">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={ChangeHandler}
              value={formData.password}
              placeholder="Enter password"
              name="password"
              required
            />
          </div>
          <div className="input-btn">
            <button type="submit">{loading ? 'Loading...' : 'SignUp'}</button>
          </div>
          <div className="redirect">
            Already have an account?{' '}
            <span onClick={() => navigate('/login')}>Login</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
