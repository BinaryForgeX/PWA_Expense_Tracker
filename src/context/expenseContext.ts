import { ExpenseContext } from '@/types'
import { useContext } from 'react'

export const useExpenseContext = () => {
    const ctx = useContext(ExpenseContext)
    if (!ctx) throw new Error('useExpenseContext must be used within ExpenseProvider')
    return ctx
}
