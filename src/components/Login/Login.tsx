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
  const [emailError, setEmailError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || !email || !password) {
      if (!validateEmail(email))
        setEmailError('Please enter a valid email address.');
      return;
    }

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
      <Container maxWidth="sm">
        <Paper elevation={6} className={styles.loginPaper}>
          <Typography variant="h4" gutterBottom className={styles.header}>
            Login
          </Typography>
          <form onSubmit={handleSubmit} className={styles.form}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                  error={!!emailError}
                  helperText={emailError}
                  className={styles.textField}
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
                  className={styles.textField}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={styles.submitButton}
                  disabled={loading || !email || !password || !!emailError}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Grid>
            </Grid>
          </form>
          <Typography
            variant="body1"
            align="center"
            className={styles.footerText}
          >
            Don't have an account? <Link to="/signin">Sign Up</Link>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
}

export default Login;
