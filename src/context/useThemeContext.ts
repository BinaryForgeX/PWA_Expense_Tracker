import { ThemeContext } from '@/types'
import { useContext } from 'react'

export const useThemeContext = () => {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useThemeContext must be used within ThemeProvider')
    return ctx
}
