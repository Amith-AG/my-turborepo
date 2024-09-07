import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { FaCircleExclamation } from 'react-icons/fa6'

interface IStatusProps {
  message: string
}
export const FormSucess = ({ message }: IStatusProps) => {
  return (
    <div className="flex gap-2 mt-5 text-sm">
      <FaCheckCircle className="w-5 h-5 text-green-400" />
      <p>{message}</p>
    </div>
  )
}

export const FormError = ({ message }: IStatusProps) => {
  return (
    <div className="flex gap-2 mt-5 text-sm">
      <FaCircleExclamation className="w-5 h-5 text-red-500" />
      <p>{message}</p>
    </div>
  )
}
