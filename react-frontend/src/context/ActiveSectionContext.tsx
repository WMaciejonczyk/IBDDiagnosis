import React, { createContext, useContext, useState, ReactNode } from "react"

interface ActiveSectionContextType {
    section: string
    setActiveSection: (result: string) => void
}

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined)

export const ActiveSectionProvider: React.FC<{ children: ReactNode }> = ({
                                                                      children,
                                                                  }) => {
    const [section, setActiveSection] = useState("")

    return (
        <ActiveSectionContext.Provider value={{ section, setActiveSection }}>
            {children}
        </ActiveSectionContext.Provider>
    )
}

export const useActiveSection = () => {
    const context = useContext(ActiveSectionContext)
    if (!context) {
        throw new Error("useActiveSection must be used within a ActiveSectionProvider")
    }
    return context
}