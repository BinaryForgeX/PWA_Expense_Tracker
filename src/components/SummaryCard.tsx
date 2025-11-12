export const SummaryCard = ({ title, value, gradient }: {
    title: string
    value: string
    gradient: string
}) => (
    <div className={`flex flex-col items-center justify-center text-center
                    bg-linear-to-br ${gradient}
                    text-white rounded-2xl
                    p-3 sm:p-4 shadow-xl hover:shadow-2xl
                    transition-transform duration-300 hover:scale-[1.04] active:scale-[0.97]`}
    >
        <p className="text-xs sm:text-sm uppercase font-bold tracking-wider opacity-80">
            {title}
        </p>
        <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 leading-tight drop-shadow-md">
            {value}
        </p>
    </div>
)