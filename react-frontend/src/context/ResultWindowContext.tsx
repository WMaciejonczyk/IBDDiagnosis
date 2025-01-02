import React, { createContext, useContext, useState, ReactNode } from "react"

interface ResultWindowContextType {
    showResultWindow: boolean
    setShowResultWindow: (showed: boolean) => void
}

const ResultWindowContext = createContext<ResultWindowContextType | undefined>(
    undefined,
)

export const ResultWindowProvider: React.FC<{ children: ReactNode }> = ({
                                                                          children,
                                                                      }) => {
    const [showResultWindow, setShowResultWindow] = useState(false)

    return (
        <ResultWindowContext.Provider value={{ showResultWindow, setShowResultWindow }}>
            {children}
        </ResultWindowContext.Provider>
    )
}

export const useResultWindow = () => {
    const context = useContext(ResultWindowContext)
    if (!context) {
        throw new Error("useResultWindow must be used within a ResultWindowProvider")
    }
    return context
}
