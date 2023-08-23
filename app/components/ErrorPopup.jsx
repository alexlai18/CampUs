"use client"
import { XCircleIcon } from "lucide-react"
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert"

export function ErrorPopup(props) {
  const {message, severity, className} = props
  console.log(severity);
  const variant = severity ? "destructive" : null

  return (
    <Alert variant={variant} className ={className}>
      <XCircleIcon className="h-4 w-4" />
      <AlertTitle>{severity}</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  )
}