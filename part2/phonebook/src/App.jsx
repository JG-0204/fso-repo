import { useState, useEffect } from 'react';
import personServices from './services/persons';
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
    personServices.getAll().then((persons) => {
      setPersons(persons);
      setFilteredPersons(persons);
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

  const checkIfAlreadyInArray = () => {
    if (persons.find((person) => person.name === newName) !== undefined) {
      return true;
    }
    return false;
  };

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const updatePersonNumber = () => {
    const person = persons.find((person) => person.name === newName);
    const id = person.id;
    const personCopy = { ...person, number: newNumber };

    personServices.update(id, personCopy).then((person) => {
      setPersons(persons.map((p) => (p.id !== id ? p : person)));
      setFilteredPersons(persons.map((p) => (p.id !== id ? p : person)));
    });
  };

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (checkIfAlreadyInArray()) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replce the old number with a new one?`,
        )
      ) {
        updatePersonNumber();
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      personServices.create(newPerson).then((person) => {
        setPersons(persons.concat(person));
        setFilteredPersons(persons.concat(person));
      });
    }
    setNewName('');
    setNewNumber('');
  };

  const deletePerson = (id) => () => {
    const person = persons.find((person) => person.id === id);

    if (window.confirm(`Remove ${person.name} from the phonebook?`)) {
      personServices.remove(id, person);
      setFilteredPersons(persons.filter((p) => p !== person));
      setPersons(persons.filter((p) => p !== person));
    }
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
      {filteredPersons.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          event={deletePerson(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
