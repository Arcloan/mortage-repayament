import { useForm } from "react-hook-form";

function calcMonthlyOwed(Rate, Amount, Years) {
    let totalMonths = Years * 12;
    Rate /= 1200;
    return Amount * (Rate * (((1 + Rate) ** totalMonths))) / 
        ((( 1 + Rate) ** totalMonths) - 1); 
}

function calcTotalOwed(monthlyPayament, years) {
    return monthlyPayament * years * 12;
}

function calcTotalInterestOwed(monthlyPayament, years, Amount) {
    return calcTotalOwed(monthlyPayament, years) - Amount;
}

function calcMonthlyInterestOwed(monthlyPayament, years, Amount) {
    return calcTotalInterestOwed(monthlyPayament, years, Amount) / (years * 12);
}

export function Form({ setResultOnSubmit }) {
    const { handleSubmit, register } = useForm();
    const onSubmit = (data) => {
        if (data.Type === "Repayament") {
            setResultOnSubmit({monthly: calcMonthlyOwed(data.Rate, data.Amount, data.Years).toFixed(2), total: calcTotalOwed(calcMonthlyOwed(data.Rate, data.Amount, data.Years), data.Years).toFixed(2)})
        }
        else {
            setResultOnSubmit({monthly: calcMonthlyInterestOwed(calcMonthlyOwed(data.Rate, data.Amount, data.Years), data.Years, data.Amount).toFixed(2), total: calcTotalInterestOwed(calcMonthlyOwed(data.Rate, data.Amount, data.Years), data.Years, data.Amount).toFixed(2) })
        }
    }
    
    return (
        <div className="md:rounded-xl bg-white grid p-4 gap-4 md:grid-cols-2">
            <div className="flex flex-col md:flex-row md:col-span-2 md:justify-between md:items-center">
                <h1 className="font-bold text-2xl">Mortage Calculator</h1>
                <p className="underline">Clear All</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 md:grid-cols-subgrid md:col-span-2">
                <label className="block" htmlFor="Amount">Mortage Amount</label>
                <div className="flex border-2 rounded border-black mb-2 md:col-span-2">
                    <p className="py-2 px-4 bg-(--color-slate100)">£</p>
                    <input {...register("Amount", {required : "this field is required", valueAsNumber: true})} className="grow-1 text-left pl-2" id="Amount" type="text" />
                </div>
                <div className="max-md:contents">
                    <label className="block md:mb-2" htmlFor="Years">Mortage Term</label>
                    <div className="flex border-2 rounded border-black mb-2">
                        <input {...register("Years", {required : "this field is required", valueAsNumber: true})} className="grow-1 text-left pl-2" type="text" id="Years" />
                        <p className="py-2 px-4 bg-(--color-slate100)">years</p>
                    </div>
                </div>
                <div className="max-md:contents">
                    <label className="block md:mb-2" htmlFor="InterestRate">Interest Rate</label>
                    <div className="flex border-2 rounded border-black mb-2">
                        <input {...register("Rate", {required : "this field is required", valueAsNumber: true})} className="grow-1 text-left pl-2" type="text" id="InterestRate" />
                        <p className="py-2 px-4 bg-(--color-slate100)">%</p>
                    </div>
                </div>
                <fieldset className="appereance-none mb-2 md:col-span-2">
                    <legend className="mb-2">Mortage Type</legend>
                    <label className="accent-(--color-lime) border-2 rounded border-black py-2 px-4 flex gap-4 items-center mb-2 md:col-span-2 has-checked:bg-(--color-lime)/30">
                        <input {...register("Type", {required : "this field is required"})} type="radio" value="Repayament" id="Repayament" />
                        <p>Repayament</p>
                    </label>
                    <label className="accent-(--color-lime) border-2 rounded border-black py-2 px-4 flex gap-4 items-center md:col-span-2 has-checked:bg-(--color-lime)/30">
                        <input {...register("Type", {required : "this field is required"})} type="radio" value="InterestOnly" id="InterestOnly" />
                        <p>Interest Only</p>
                    </label>
                </fieldset>
                <button className="flex justify-center gap-4 px-4 py-3 rounded-full bg-(--color-lime)" type="submit">
                    <img src="/assets/images/icon-calculator.svg" alt="" />Calculate Repayaments
                </button>
            </form>
        </div>
    )
}