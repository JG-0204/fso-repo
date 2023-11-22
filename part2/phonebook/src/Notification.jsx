const Notification = ({ message, isErrorMessage }) => {
  if (message === null) return null;

  const divStyle = !isErrorMessage
    ? {
        padding: '1rem',
        border: '5px solid green',
        marginBlock: '1.5rem',
      }
    : {
        padding: '1rem',
        border: '5px solid red',
        marginBlock: '1.5rem',
      };

  const pStyle = {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Arial',
  };
  return (
    <div style={divStyle}>
      <p style={pStyle}>{message}</p>
    </div>
  );
};

export default Notification;
