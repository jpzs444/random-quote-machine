const Button = ({ onButtonClick }) => {
  const handleOnClick = () => {
    onButtonClick();
  }

  return (
    <button 
      id="new-quote" 
      type="button"
      onClick={handleOnClick}
    >
      New Quote
    </button>
  )
}

export default Button