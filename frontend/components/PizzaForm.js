import React from 'react'
import { useState } from 'react'
import { useCreateUserMutation } from '../state/usersApi'

const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

export default function PizzaForm() {
  const [
    createUser, {
      error: creationError,
      isLoading: userCreating,
    }] = useCreateUserMutation()

  const [formState, setFormState] = useState(initialFormState)

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log(event)

    // Initialize toppings array
    const toppings = [];

    // Iterate over the keys of initialFormState
    for (const key in initialFormState) {
      // If the value is true, add the key to the toppings array
      if (formState[key] === true) {
            toppings.push(key);
      }
    }

    createUser({
      fullName: formState.fullName,
      size: formState.size,
      toppings: toppings,
    }).then(() => {
      // Reset form state to initialFormState after successful submission
      setFormState(initialFormState)
    });
    
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    const newValue = type === 'checkbox' ? checked : value
    setFormState(prevState => ({
      ...prevState,
      [name]: newValue
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {userCreating && <div className='pending'>Order in progress...</div>}
      {creationError && <div className='failure'>Order failed: { creationError.data.message }</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={formState.fullName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" onChange={handleChange} value={formState.size}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" checked={formState['1']} onChange={handleChange} />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" checked={formState['2']} onChange={handleChange} />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" checked={formState['3']} onChange={handleChange} />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" checked={formState['4']} onChange={handleChange} />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" checked={formState['5']} onChange={handleChange} />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
