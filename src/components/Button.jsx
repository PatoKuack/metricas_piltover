import React from 'react';

const Button = ({type, onFunction, content}) => {
  const loginHandleClick = () => {
    onFunction
  }
  return (
    <button type={type} id="verifyLoginButton" className="w-fit self-center mt-8 px-4 py-2 border border-solid border-current rounded-md" onClick={loginHandleClick}>
      {content}
    </button>
  )
}

export default Button;