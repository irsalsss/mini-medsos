import React from 'react';

const ErrorPage = () => {

  const redirect = () => {
    window.location.href = '/main'
  }
  
  return (
    <div>
      <p>Something went wrong</p>
      <button onClick={redirect} className="py-2 px-4">
        Back to homepage
      </button>
    </div>
  )
}

export default ErrorPage