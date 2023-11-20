import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Person from './Person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [newSearchText, setNewSearchText] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((res) => {
      setPersons(res.data);
      setFilteredPersons(res.data);
    });
  }, []);

  const handleFilterInput = (e) => {
    const searchInputText = e.target.value;
    setNewSearchText(searchInputText);

    const filteredResult = persons.filter((person) =>
      person.name.toLowerCase().includes(searchInputText.toLowerCase()),
    );

    setFilteredPersons(filteredResult);
  };

  const checkIfAlreadyInArray = () =>
    persons.find((person) => person.name === newName);

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (checkIfAlreadyInArray() !== undefined) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newId = persons.length + 1;
      const newPerson = { id: newId, name: newName, number: newNumber };

      setPersons(persons.concat(newPerson));
      setFilteredPersons(filteredPersons.concat(newPerson));
    }
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearchText} event={handleFilterInput} />
      <h2>add a new</h2>
      <PersonForm
        formEvent={handleAddPerson}
        nameInputEvent={handleNameInput}
        numberInputEvent={handleNumberInput}
        nameInputValue={newName}
        numberInputValue={newNumber}
      />
      <h2>Numbers</h2>
      <Person persons={filteredPersons} />
    </div>
  );
};

export default App;
