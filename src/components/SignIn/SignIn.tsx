import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import styles from '../styles/signup.module.css';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    if (password !== confirmPassword && confirmPassword) {
      setPasswordError('Passwords do not match.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !email ||
      emailError ||
      passwordError ||
      !password ||
      !confirmPassword
    ) {
      if (!validateEmail(email))
        setEmailError('Please enter a valid email address.');
      if (password !== confirmPassword)
        setPasswordError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch(
        'https://f7z9voe3d5.execute-api.us-east-1.amazonaws.com/ReactShopping-dev/signin',
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

      if (response.ok) {
        setOpen(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000); // Wait for 3 seconds before navigating
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.pageContainer}>
      <Container maxWidth="sm">
        <Paper elevation={6} className={styles.signupPaper}>
          <Typography variant="h4" gutterBottom className={styles.header}>
            Sign Up
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={handlePasswordChange}
                  error={!!passwordError}
                  helperText={
                    password !== confirmPassword ? 'Passwords must match.' : ''
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  variant="outlined"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={!!passwordError}
                  helperText={passwordError}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={styles.submitButton}
                  disabled={
                    !!emailError ||
                    !!passwordError ||
                    !email ||
                    !password ||
                    !confirmPassword
                  }
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
          <Typography
            variant="body1"
            align="center"
            className={styles.footerText}
          >
            Already have an account? <Link to="/login">Log In</Link>
          </Typography>
        </Paper>
      </Container>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Signup successful! Redirecting...
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignUpPage;
