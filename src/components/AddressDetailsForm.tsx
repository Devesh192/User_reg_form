import React, { useState, } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Autocomplete, TextField, Button, Container, Paper, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AddressDetailsForm_ } from '../types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import UserTable from './userTable';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  address: yup.string(),
  state: yup.string(),
  city: yup.string(),
  country: yup.string(),
  pincode: yup.number().transform((originalValue, originalObject) => (originalObject === '' ? undefined : originalValue)),
});

interface AddressDetailsFormProps {
  onSubmit: SubmitHandler<AddressDetailsForm_>;
}

const AddressDetailsForm: React.FC<AddressDetailsFormProps> = ({ onSubmit }) => {
  const [countryOptions, setCountryOptions] = useState<string[]>([]);
  const handleCountryChange = async (value: string) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${value}`);
      const countries = response.data.map((country: any) => country.name.common);
      setCountryOptions(countries);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressDetailsForm_>({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmitWithRedirect: SubmitHandler<AddressDetailsForm_> = async (data) => {
    dispatch({ type: 'SET_ADDRESS_DETAILS', payload: data });
    dispatch({ type: 'ADD_USER', payload: data });
    navigate('/');

  };

  return (
    <>
      <form onSubmit={handleSubmit((data) => onSubmitWithRedirect(data))}>
        <Container component="main" maxWidth="xs">
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h5" align="center">
              Address Details
            </Typography>
            <Controller
              name="address"
              control={control}
              render={({ field }) => <TextField {...field} label="Address" error={!!errors.address} helperText={errors.address?.message} fullWidth margin="normal" />}
            />

            <Controller
              name="state"
              control={control}
              render={({ field }) => <TextField {...field} label="State" error={!!errors.state} helperText={errors.state?.message} fullWidth margin="normal" />}
            />

            <Controller
              name="city"
              control={control}
              render={({ field }) => <TextField {...field} label="City" error={!!errors.city} helperText={errors.city?.message} fullWidth margin="normal" />}
            />

            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={countryOptions}
                  loading={countryOptions.length === 0}
                  onInputChange={(event, value) => handleCountryChange(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Country" error={!!errors.country} helperText={errors.country?.message} fullWidth margin="normal" />
                  )}
                />

              )}
            />

            <Controller
              name="pincode"
              control={control}
              render={({ field }) => <TextField {...field} label="Pincode" error={!!errors.pincode} helperText={errors.pincode?.message} fullWidth margin="normal" />}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
              Submit
            </Button>
          </Paper>
        </Container>
      </form>
      <UserTable />
    </>
  );
};

export default AddressDetailsForm;
