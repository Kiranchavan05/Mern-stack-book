import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Pagination from '@mui/material/Pagination';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Header from './components/Header';
import BookDialog from './components/BookDialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

const API_URL = 'https://mern-stack-assessment-backend.onrender.com/api/books';
// const API_URL = 'http://localhost:5000/api/books';


const sortOptions = [
  { value: 'title', label: 'Title' },
  { value: 'author', label: 'Author' },
  { value: 'publication_year', label: 'Year' },
];

function PrivateRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppContent() {
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [order, setOrder] = useState('asc');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return token && user ? { token, ...JSON.parse(user) } : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line
  }, [page, rowsPerPage, sortBy, order, search]);

  // Fetch all books (GET)
  const fetchBooks = async () => {
    try {
      const res = await axios.get(API_URL, {
        params: { page: page + 1, limit: rowsPerPage, sortBy, order, search },
        headers: user ? { Authorization: `Bearer ${user.token}` } : {},
      });
      setBooks(res.data.books);
      setTotal(res.data.total);
    } catch (err) {
      setSnackbar({ open: true, message: 'Error fetching books', severity: 'error' });
    }
  };

  const handleAdd = () => {
    setEditBook(null);
    setDialogOpen(true);
  };

  const handleEdit = (book) => {
    setEditBook(book);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditBook(null);
  };

  // Add or update book (POST/PUT)
  const handleSave = async (book) => {
    try {
      if (!user) throw new Error('Not authenticated');
      if (editBook) {
        await axios.put(`${API_URL}/${editBook._id}`, book, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setSnackbar({ open: true, message: 'Book updated!', severity: 'success' });
      } else {
        await axios.post(API_URL, book, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setSnackbar({ open: true, message: 'Book added!', severity: 'success' });
      }
      setDialogOpen(false);
      fetchBooks();
    } catch (err) {
      setSnackbar({ open: true, message: err.response?.data?.message || 'Error saving book', severity: 'error' });
    }
  };

  const handleDeleteClick = (book) => {
    setBookToDelete(book);
    setDeleteDialogOpen(true);
  };

  // Delete book (DELETE)
  const handleDeleteConfirm = async () => {
    if (!bookToDelete) return;
    try {
      if (!user) throw new Error('Not authenticated');
      await axios.delete(`${API_URL}/${bookToDelete._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSnackbar({ open: true, message: 'Book deleted!', severity: 'success' });
      setDeleteDialogOpen(false);
      setBookToDelete(null);
      if (books.length === 1 && page > 0) {
        setPage(page - 1);
      } else {
        fetchBooks();
      }
    } catch (err) {
      setSnackbar({ open: true, message: err.response?.data?.message || 'Error deleting book', severity: 'error' });
      setDeleteDialogOpen(false);
      setBookToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setBookToDelete(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleLoginSuccess = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser({ token: data.token, ...data.user });
    setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
    navigate('/');
  };

  const handleRegisterSuccess = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser({ token: data.token, ...data.user });
    setSnackbar({ open: true, message: 'Registration successful!', severity: 'success' });
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setSnackbar({ open: true, message: 'Logged out!', severity: 'info' });
    navigate('/login');
  };

  return (
    <Box sx={{ bgcolor: '#f0f2f5', minHeight: '97.5vh', py: 1 }}>
      <Header user={user} onLogout={handleLogout} />
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <Routes>
          <Route
            path="/register"
            element={<Register onRegisterSuccess={handleRegisterSuccess} />}
          />
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/"
            element={
              <PrivateRoute user={user}>
                {/* Add Book Button below header */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <Button
                    variant="contained"
                    sx={{ background: 'black', borderRadius: 2, fontWeight: 600, textTransform: 'none', px: 3, py: 1, fontSize: { xs: 14, sm: 16 } }}
                    onClick={handleAdd}
                  >
                    + Add Book
                  </Button>
                </Box>
                {/* Search and Sort Controls */}
                <Card sx={{ mb: 2, borderRadius: '8px' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                      <Box sx={{ flex: 1, minWidth: 200 }}>
                        <Typography variant="caption" color="text.secondary">Search Books</Typography>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          placeholder="Search by title or author..."
                          value={search}
                          onChange={e => { setSearch(e.target.value); setPage(0); }}
                        />
                      </Box>
                      <Box sx={{ minWidth: 150 }}>
                        <Typography variant="caption" color="text.secondary">Sort By</Typography>
                        <FormControl fullWidth size="small">
                          <Select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                          >
                            {sortOptions.map(opt => (
                              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box sx={{ minWidth: 150 }}>
                        <Typography variant="caption" color="text.secondary">Order</Typography>
                        <FormControl fullWidth size="small">
                          <Select
                            value={order}
                            onChange={e => setOrder(e.target.value)}
                          >
                            <MenuItem value="asc">Ascending</MenuItem>
                            <MenuItem value="desc">Descending</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                {/* Book List Table */}
                <Card sx={{ borderRadius: '8px' }}>
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="h6" sx={{ mb: 1, p: 1 }}>Books Collection</Typography>
                    <TableContainer sx={{ maxHeight: 300 }}>
                      <Table stickyHeader>
                        <TableBody>
                          {books.length === 0 ? (
                            <TableRow>
                              <TableCell>
                                <Typography>No books found.</Typography>
                              </TableCell>
                            </TableRow>
                          ) : (
                            books.map(book => (
                              <TableRow key={book._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{book.title}</Typography>
                                  <Typography variant="body2" color="text.secondary">by {book.author}</Typography>
                                  {book.publication_year && (
                                    <Typography variant="caption" color="text.secondary">
                                      {book.publication_year}
                                    </Typography>
                                  )}
                                </TableCell>
                                <TableCell align="right">
                                  {user && (
                                    <>
                                      <Button startIcon={<EditIcon />} onClick={() => handleEdit(book)} size="small" sx={{ mr: 1 }}>Edit</Button>
                                      <Button startIcon={<DeleteIcon />} onClick={() => handleDeleteClick(book)} color="error" size="small">Delete</Button>
                                    </>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Card>
                {/* Add/Edit Dialog */}
                <BookDialog
                  open={dialogOpen}
                  handleClose={handleDialogClose}
                  handleSave={handleSave}
                  initialBook={editBook}
                />
                {/* Delete Dialog */}
                <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
                  <DialogTitle>Delete Book</DialogTitle>
                  <DialogContent>
                    <Typography>Are you sure you want to delete this book?</Typography>
                    {bookToDelete && (
                      <Typography sx={{ fontWeight: 'bold', mt: 1 }}>{bookToDelete.title}</Typography>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDeleteCancel} color="secondary" sx={{ border: '1px solid grey' }}>No</Button>
                    <Button onClick={handleDeleteConfirm} variant="contained" sx={{ backgroundColor: 'black' }}>Yes</Button>
                  </DialogActions>
                </Dialog>
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
