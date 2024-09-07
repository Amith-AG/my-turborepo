import React from 'react'
import { BeatLoader } from 'react-spinners'
export default function LoadingSpinner() {
  return (
    <div className="w-full flex justify-center items-center">
      <BeatLoader />
    </div>
  )
}
