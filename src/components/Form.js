import React, { useState } from "react";

function Form(props) {
  const [firstName, setFirstName] = useState("Sylvia");
  const [lastName, setLastName] = useState("Woods");
  const [submittedData, setSubmittedData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isValidEmail, setIsValidEmail] = useState(true);

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
    const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(event.target.value);
    setIsValidEmail(isValid)
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }
  


  function handleSubmit(event) {
    event.preventDefault();
    if(firstName.length > 0 && lastName.length >0 && isValidEmail ){
    const formData = { firstName: firstName, lastName: lastName };
    const dataArray = [...submittedData, formData];
    setSubmittedData(dataArray);
    setFirstName("");
    setLastName("");
    setErrors([])
    } else if(firstName.length <= 0){
      setErrors(['First Name is required'])
    } else if(lastName.length <=0 ){
      setErrors([...errors,'Last Name is required'])
    }
  }

  const listOfSubmissions = submittedData.map((data, index) => {
    return (
      <div key={index}>
        {data.firstName} {data.lastName}
      </div>
    );
  });



  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleFirstNameChange} value={firstName} />
      <input type="text" onChange={handleLastNameChange} value={lastName} />
      <button type="submit">Submit</button>
    </form>
    {!isValidEmail && 'Please enter a valid email address'}
    {errors.length > 0
      ? errors.map((error, index) => (
          <p key={index} style={{ color: "red" }}>
            {error}
          </p>
        ))
      : null}
    <h3>Submissions</h3>
    {listOfSubmissions}
    </div>
  );
}

export default Form;
