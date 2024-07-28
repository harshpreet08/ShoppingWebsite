import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import styles from '../styles/login.module.css';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        'https://f7z9voe3d5.execute-api.us-east-1.amazonaws.com/ReactShopping-dev/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      console.log('Response:', data);

      if (data.statusCode === 200) {
        sessionStorage.setItem('username', email);
        navigate('/home');
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContainer}>
        <Container maxWidth="sm">
          <Paper elevation={3} className={styles.loginPaper}>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit} className={styles.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={styles.submitButton}
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Typography variant="body2" align="center" gutterBottom>
              Don't have an account? <Link to="/signin">Sign Up</Link>
            </Typography>
          </Paper>
        </Container>
      </div>
    </div>
  );
}

export default Login;
