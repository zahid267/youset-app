import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const ContactForm = ({setSelectedPack, selectedData}) => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({age: '', email: '', gender: '' });
  
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    const FormData = { ...userFormData, ...selectedData }; /// Merge user and package data

    console.log("formdata ", FormData);
    fetch('https://www.example.com', {
      method: 'POST',
      mode: 'no-cors',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(FormData)
    })
    .then((response) => response.json())
    //Then with the data from the response in JSON...
    .then((data) => {
      console.log('Success:', data);
      setSelectedPack(-1);
      setUserFormData();
    })
    //Then with the error genereted...
    .catch((error) => {
      console.error('Error:', error);
      setShowAlert(true);
    });
    
    setUserFormData({
      age: '',
      email: '',
      gender: '',
    });
    
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form className="signup-top" noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your submit data!
        </Alert>
        

        <Form.Group>
          <Form.Label htmlFor='email'>What's your email?</Form.Label>
          <Form.Control
            type='email'
            placeholder='email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form">
          <Form.Label htmlFor='age'>How old are you?</Form.Label>
          <Form.Control
            type='number'
            placeholder='age'
            name='age'
            onChange={handleInputChange}
            value={userFormData.age}
            required
          />
          <Form.Control.Feedback type='invalid'>Age is required!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='gender'>What is your gender?</Form.Label>
          
            <Form.Select name='gender' aria-label="Select gender" onChange={handleInputChange}>
              <option defaultValue>gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </Form.Select>
          <Form.Control.Feedback type='invalid'>gender is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.age && userFormData.email && userFormData.gender)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default ContactForm;
