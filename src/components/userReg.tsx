import React from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system'; // Use styled from @mui/system instead of makeStyles


const StyledContainer = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
});

const StyledPaper = styled(Paper)({
  padding: '16px',
  maxWidth: '400px',
  width: '100%',
});

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const UserRegistration: React.FC = () => {
    return (
    <StyledContainer>
      <StyledPaper>
        <Typography variant="h4" component="div" gutterBottom>
          User Registration
        </Typography>

        <StyledForm>
          <TextField label="Name" variant="outlined" fullWidth />
          <TextField label="Email" variant="outlined" fullWidth />
          <TextField label="Password" type="password" variant="outlined" fullWidth />
          <TextField label="Confirm Password" type="password" variant="outlined" fullWidth />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Register
          </Button>
        </StyledForm>
      </StyledPaper>
    </StyledContainer>
  );
};

export default UserRegistration;
