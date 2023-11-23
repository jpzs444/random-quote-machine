const Button = ({ onButtonClick }) => {
  const handleOnClick = () => {
    onButtonClick();
  }

  return (
    <button 
      id="new-quote" 
      type="button"
      onClick={handleOnClick}
      className="btn btn-dark rounded-pill btn-sm"
    >
      New Quote
    </button>
  )
}

export default Button