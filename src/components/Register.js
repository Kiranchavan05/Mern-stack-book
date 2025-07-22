import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Alert, Box, InputAdornment, IconButton, Divider, Link as MuiLink } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://mern-stack-assessment-backend.onrender.com/api/auth/register';

const Register = ({ onRegisterSuccess }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(API_URL, form);
      onRegisterSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', bgcolor: '#f5f6fa' }}>
      <Card sx={{ minWidth: 370, boxShadow: 6, borderRadius: 3, p: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <PersonAddAlt1Icon sx={{ fontSize: 40, color: 'black', mb: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Sign Up</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Create your account to get started.</Typography>
          </Box>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonAddAlt1Icon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ py: 1.2, fontWeight: 600, background: 'black', mb: 1 }}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <MuiLink component={Link} to="/login" sx={{ color: 'black', fontWeight: 600 }}>
              Login
            </MuiLink>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
