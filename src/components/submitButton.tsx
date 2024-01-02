import {Button} from '@nextui-org/react'
import React from 'react'
import {useFormStatus} from 'react-dom'

export const SubmitButton = ({children}: {children: React.ReactNode}) => {
  const {pending} = useFormStatus()
  return (
    <Button color="primary" type="submit" isLoading={pending}>
      {children ?? 'Save'}
    </Button>
  )
}
