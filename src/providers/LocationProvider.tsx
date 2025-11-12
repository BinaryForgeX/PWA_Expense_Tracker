import React from "react"
import { LocationContext } from "@/types"
import { useLocationPermission } from "@/hooks"

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const locationHook = useLocationPermission()
    return (
        <LocationContext.Provider value={locationHook}>
            {children}
        </LocationContext.Provider>
    )
}
