"use client"

import * as React from "react"
import { ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionContextValue {
  value: string
  onValueChange: (value: string) => void
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined)

const Accordion = ({ 
  defaultValue, 
  value: controlledValue,
  onValueChange,
  type = "single",
  collapsible = true,
  children,
  className,
  ...props
}: {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  type?: "single" | "multiple"
  collapsible?: boolean
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")
  const value = controlledValue !== undefined ? controlledValue : internalValue
  const handleValueChange = (newValue: string) => {
    if (!collapsible && newValue === value) return // Don't close if not collapsible
    if (onValueChange) {
      onValueChange(newValue)
    } else {
      setInternalValue(newValue)
    }
  }

  return (
    <AccordionContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

const AccordionItem = ({ 
  value, 
  children, 
  className,
  ...props
}: {
  value: string
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("border-b", className)} {...props}>
      {children}
    </div>
  )
}

const AccordionTrigger = ({ 
  value, 
  children, 
  className,
  ...props
}: {
  value: string
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error("AccordionTrigger must be used within Accordion")
  
  const isOpen = context.value === value
  
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline",
        className
      )}
      onClick={() => context.onValueChange(isOpen ? "" : value)}
      {...props}
    >
      {children}
      <ChevronUp className={cn(
        "h-4 w-4 shrink-0 transition-transform duration-200",
        !isOpen && "rotate-180"
      )} />
    </button>
  )
}

const AccordionContent = ({ 
  value, 
  children, 
  className,
  ...props
}: {
  value: string
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) => {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error("AccordionContent must be used within Accordion")
  
  const isOpen = context.value === value
  
  return (
    <div
      className={cn(
        "overflow-hidden text-sm transition-all duration-200",
        isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
      )}
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

