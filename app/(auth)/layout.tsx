import React from 'react'

// The React.ReactNode type can include:

// JSX elements (e.g., <div>, <span>, custom components)
// Strings or numbers (for text content)
// Fragments (<></>)
// Arrays of elements or fragments
// null or undefined (for when a component has no children)

const AuthLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='flex items-center justify-center h-full'>
      {children}
    </div>
  )
}

export default AuthLayout
