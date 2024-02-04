import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import PersonalDetailsForm from './components/PersonalDetailsForm';
import AddressDetailsForm from './components/AddressDetailsForm';
import { Provider } from 'react-redux';
import store from './store/actions/store';

function App() {
  const handleFormSubmit = (data) => {
    console.log(data);
  }
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<PersonalDetailsForm onSubmit={handleFormSubmit} />} />
            <Route path="/2" element={<AddressDetailsForm onSubmit={undefined} />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
