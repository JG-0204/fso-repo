const Notification = ({ message, errorMessage }) => {
  if (message === null) return null;

  const divStyle = !errorMessage
    ? {
        backgroundColor: 'yellow',
        padding: '1rem',
        border: '3px solid black',
        marginBlock: '1.5rem',
      }
    : {
        backgroundColor: 'red',
        padding: '1rem',
        border: '3px solid black',
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
