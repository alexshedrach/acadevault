
  import React from 'react'
  
  export default function FormSection({ title, children }) {
    return (
      <div className='p-6 rounded-xl border border-gray-200 space-y-6'>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      {children}
    </div>
    )
  }
  