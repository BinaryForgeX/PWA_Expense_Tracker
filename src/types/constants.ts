import { createContext } from 'react'
import type { ExpenseContextType, ThemeContextType } from '../types'
import { useLocationPermission } from '@/hooks'

export const ThemeContext = createContext<ThemeContextType | null>(null)
export const ExpenseContext = createContext<ExpenseContextType | null>(null)
export const LocationContext = createContext<ReturnType<typeof useLocationPermission> | null>(null)

export type Theme = 'light' | 'dark'
export type ModalType = "info" | "success" | "warning" | "error"