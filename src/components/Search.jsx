import React from 'react'
import { cn } from '../lib/utils'
import { useIsMobile } from '../hooks/use-mobile'

function Search() {
    const isMobile = useIsMobile()
  return (
    <div className={cn(
          "flex flex-col h-full bg-card border-r p-3",
          isMobile && "fixed inset-y-0 left-0 z-40 w-80 transition-transform duration-300 ease-in-out transform",
          isMobile && (isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full")
        )}>Search</div>
  )
}

export default Search