import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BookIcon from '@mui/icons-material/MenuBook';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

const Header = ({ user, onLogout }) => (
  <AppBar
    position="static"
    elevation={0}
    sx={{
      bgcolor: '#fff',
      color: 'black',
      boxShadow: '0 2px 8px 0 rgba(60,72,88,0.07)',
      borderRadius: 2,
      // mt: 2,
      mx: 'auto',
      maxWidth: 900,
      width: '98%',
    }}
  >
    <Toolbar
      sx={{
        minHeight: 44,
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        px: { xs: 1, sm: 2 },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
        <BookIcon sx={{ mr: 1, color: 'black', fontSize: 32 }} />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            letterSpacing: 1,
            fontSize: { xs: 20, sm: 24 },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>BookManager</Link>
        </Typography>
      </Box>
      {user && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          <Avatar sx={{ bgcolor: '#222', width: 36, height: 36, fontSize: 18 }}>
            {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
          </Avatar>
          <Typography sx={{ fontWeight: 500, color: '#222', minWidth: 0, fontSize: { xs: 14, sm: 16 }, maxWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user.name || user.email}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, fontSize: { xs: 12, sm: 14 } }}
            onClick={onLogout}
          >
            Logout
          </Button>
        </Box>
      )}
    </Toolbar>
  </AppBar>
);

export default Header; 