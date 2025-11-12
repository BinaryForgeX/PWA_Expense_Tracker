import { useState, useEffect } from "react"

export const useLocationPermission = () => {
    const [permissionGranted, setPermissionGranted] = useState<boolean>(() => {
        return localStorage.getItem("locationPermission") === "true"
    })

    const [fetching, setFetching] = useState(false)
    const [location, setLocation] = useState<{
        latitude: number
        longitude: number
        address?: string
    } | null>(null)

    useEffect(() => {
        if (permissionGranted) fetchLocation()
    }, [permissionGranted])

    const fetchLocation = async () => {
        try {
            setFetching(true)
            if (!navigator.geolocation) throw new Error("Geolocation not supported")

            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const { latitude, longitude } = pos.coords
                    let address
                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                        )
                        const data = await response.json()
                        address = data.display_name
                    } catch {
                        address = undefined
                    }

                    const loc = { latitude, longitude, address }
                    setLocation(loc)
                    localStorage.setItem("userLocation", JSON.stringify(loc))
                },
                () => setFetching(false)
            )
        } catch {
            setFetching(false)
        } finally {
            setFetching(false)
        }
    }

    const grantPermission = () => {
        localStorage.setItem("locationPermission", "true")
        setPermissionGranted(true)
    }

    const revokePermission = () => {
        localStorage.removeItem("locationPermission")
        localStorage.removeItem("userLocation")
        setPermissionGranted(false)
        setLocation(null)
    }

    return {
        permissionGranted,
        grantPermission,
        revokePermission,
        fetchLocation,
        location,
        fetching,
    }
}
