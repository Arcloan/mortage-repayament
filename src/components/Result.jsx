export function Result({ value }){
    if (value === null) {
        return (
            <div className="grid place-items-center bg-(--color-slate900) p-4 md:rounded-r-xl md:rounded-bl-[3rem]">
                <div className="md:p-4">
                    <img className="mx-auto" src="/illustration-empty.svg" alt="" />
                    <h2 className="text-center mb-4 text-xl text-white font-semibold">Results shown here</h2>
                    <p className="text-slate-500 text-center">Complete the form and click "calculate repayaments" to
                    see what your monthly repayaments would be.
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div className="text-slate-400 bg-(--color-slate900)/90 p-6 md:rounded-r-xl md:rounded-bl-[3rem]">
            <div className="grid gap-4">
            <h2 className="text-white font-semibold">Your results</h2>
            <p className="">Your results are shown below base on the information you provided. To adjust the results, edit the form
                and click "calculate repayaments" again.
            </p>
            <div className="p-4 grid gap-4 bg-(--color-slate900) rounded-xl border-4 border-transparent border-t-(--color-lime)">
                <div className="grid gap-2">
                    <p>Your monthly repayaments</p>
                    <p className="text-6xl text-(--color-lime)">£{value.monthly}</p>
                </div>
                <hr className="text-slate-400"/>
                <div className="grid gap-2">
                    <p>Total you'll repay over the term</p>
                    <p className="text-white text-xl">£{value.total}</p>
                </div>
            </div>
            </div>
        </div>
    )
}