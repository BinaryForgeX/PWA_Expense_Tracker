import React from "react"
import {
    IndianRupee,
    FileText,
    PlusCircle,
    StickyNote,
    MapPin,
} from "lucide-react"
import { useAddExpense } from "@/hooks/useAddExpense"
import { useLocationContext } from "@/context"
import { InputField, Popup, TextAreaField } from "@/base"

export const AddExpense: React.FC = () => {
    const {
        title,
        amount,
        description,
        error,
        popupMessage,
        popupType,
        showPopup,
        setTitle,
        setAmount,
        setDescription,
        setShowPopup,
        handleSubmit,
    } = useAddExpense()

    const { permissionGranted, location } = useLocationContext()

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="space-y-6 p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm animate-fade-in"
            >
                <InputField
                    icon={<FileText />}
                    label="Expense Title"
                    placeholder="e.g. Coffee, Groceries, Taxi"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <InputField
                    icon={<IndianRupee />}
                    label="Amount (₹)"
                    placeholder="Enter amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <TextAreaField
                    icon={<StickyNote />}
                    label="Description (Optional)"
                    placeholder="Add notes like purpose, who, or where..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* 📍 Location Display */}
                {permissionGranted && location && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 gap-2">
                        <MapPin className="h-4 w-4" />
                        {location.address ||
                            `${location.latitude.toFixed(3)}, ${location.longitude.toFixed(3)}`}
                    </div>
                )}

                {error && (
                    <div className="text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-sm font-medium p-3 rounded-xl text-center">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!title || !amount}
                    className={`w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 shadow-sm transition-transform duration-300 ${title && amount
                            ? "bg-linear-to-r from-blue-500 to-indigo-600 hover:scale-[1.03] active:scale-[0.97] hover:shadow-md"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    <PlusCircle className="h-5 w-5" />
                    Add Expense
                </button>
            </form>

            <Popup
                message={popupMessage}
                type={popupType}
                show={showPopup}
                onClose={() => setShowPopup(false)}
            />
        </>
    )
}