const PersonForm = ({
  formEvent,
  nameInputValue,
  numberInputValue,
  nameInputEvent,
  numberInputEvent,
}) => {
  return (
    <form onSubmit={formEvent}>
      <div>
        name:
        <input value={nameInputValue} onChange={nameInputEvent} />
      </div>
      <div>
        number: <input value={numberInputValue} onChange={numberInputEvent} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
