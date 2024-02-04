import UserTable from './userTable';
import React from "react";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { MenuItem, TextField, Button, Container, Paper, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import {useDispatch } from "react-redux";
import * as yup from 'yup';
import { PersonalDetailsForm_ } from '../types';

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  age: yup.number().required('Age is required').positive('Age must be a positive number'),
  sex: yup.string().required('Sex is required').oneOf(['Male', 'Female'], 'Invalid sex'),
  mobile: yup.string().required('Mobile is required'),
  govtIdType: yup.string().required('ID Type is required').oneOf(['Aadhar', 'PAN'], 'Invalid ID Type'),
});

interface PersonalDetailsFormProps {
  onSubmit: SubmitHandler<PersonalDetailsForm_>;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<PersonalDetailsForm_>({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmitWithRedirect: SubmitHandler<PersonalDetailsForm_> = async (data) => {
    dispatch({ type: 'SET_PERSONAL_DETAILS', payload: data });
    navigate('/2');
  };

  return (
    <>
      <form onSubmit={handleSubmit((data) => onSubmitWithRedirect(data))}>
        <Container component="main" maxWidth="xs">
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h5" align="center">
              Personal Details
            </Typography>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField {...field}
                  label="Name" error={!!errors.name} helperText={errors.name?.message} fullWidth margin="normal"

                />
              )}
            />

            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Age" type="number" error={!!errors.age} helperText={errors.age?.message} fullWidth margin="normal" />
              )}
            />
            <Controller
              name="sex"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Sex"
                  select
                  error={!!errors.sex}
                  helperText={errors.sex?.message}
                  fullWidth margin="normal"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <TextField {...field}
                  label="Mobile" error={!!errors.mobile} helperText={errors.mobile?.message} fullWidth margin="normal" />
              )}
            />
            <Controller
              name="govtIdType"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Govt Issued ID Type"
                  select
                  error={!!errors.govtIdType}
                  helperText={errors.govtIdType?.message}
                  fullWidth margin="normal"
                >
                  <MenuItem value="Aadhar">Aadhar</MenuItem>
                  <MenuItem value="PAN">PAN</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="govtId"
              control={control}
              render={({ field }) => (
                <TextField {...field}
                  value={field.value || ''}
                  label="Govt Issued ID" error={!!errors.govtId} helperText={errors.govtId?.message} fullWidth margin="normal" />
              )}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
              Next
            </Button>
          </Paper>
        </Container>
      </form>
      <UserTable />
    </>

  );
};

export default PersonalDetailsForm;

