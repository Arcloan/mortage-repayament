import { Form } from "./Form";
import { useState } from "react";
import { Result } from "./Result";

export function Container(){
    const [result, setResult] = useState(null);
    return (
        <div className="grid mx-auto md:grid-cols-2 md:max-w-[80%] md:rounded-xl bg-white">
            <Form setResultOnSubmit={setResult}></Form>
            <Result value={result}></Result>
        </div>
    )
}