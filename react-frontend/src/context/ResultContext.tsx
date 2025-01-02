import React, { createContext, useContext, useState, ReactNode } from "react"

interface ResultContextType {
    result: string
    setResult: (result: string) => void
}

const ResultContext = createContext<ResultContextType | undefined>(undefined)

export const ResultProvider: React.FC<{ children: ReactNode }> = ({
                                                                    children,
                                                                }) => {
    const [result, setResult] = useState("")

    return (
        <ResultContext.Provider value={{ result, setResult }}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResult = () => {
    const context = useContext(ResultContext)
    if (!context) {
        throw new Error("useResult must be used within a ResultProvider")
    }
    return context
}