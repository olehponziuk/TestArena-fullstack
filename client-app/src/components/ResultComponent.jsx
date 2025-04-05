import { useState, useEffect } from "react";

function ResultComponent() {
    const [score, setScore] = useState(() => {
        const storedScore = localStorage.getItem("Score");
        return storedScore ?? "0";
    });
    const [value, setValue] = useState(() => {
        const storedScore = localStorage.getItem("Value");
        return storedScore ?? "0";
    });
    const [maxValue, setMaxValue] = useState(() => {
        const storedScore = localStorage.getItem("MaxValue");
        return storedScore ?? "0";
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const updatedScore = localStorage.getItem("Score");
            setScore(updatedScore ? JSON.parse(updatedScore) : "NoRes");
            const updatedValue = localStorage.getItem("Value");
            setValue(updatedValue ? JSON.parse(updatedValue) : "NoRes");
            const updatedMaxValue = localStorage.getItem("MaxValue");
            setMaxValue(updatedMaxValue ? JSON.parse(updatedMaxValue) : "NoRes");
        };
     
        console.log("LLL" + JSON.parse(localStorage.getItem("Value")));
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);
    const numericScore = typeof score === "number" ? score : parseFloat(score);
    const isValidScore = !isNaN(numericScore);
    const progress = isValidScore ? Math.min(Math.max(numericScore, 0), 100) : 0;
    const isPassed = progress >= 50;

    return (
        <main className="flex-grow flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 m-[0.5rem] max-w-4xl min-h-[650px] w-full border-2 border-green-500">
                <h2 className="text-3xl font-bold mb-4 text-center">
                    {isValidScore ? `Ваш результат: ${progress}%` : "Результат ще не отримано"}
                </h2>

                <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden">
                    <div
                        className={`h-full transition-all duration-500 ${
                            isPassed ? "bg-green-500" : "bg-red-500"
                        }`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="mt-6">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div className="flex flex-col items-center">
            <p className="text-blue-800 text-lg font-medium mb-2">Правильні відповіді</p>
            <div className="bg-blue-100 rounded-lg p-6 shadow-md flex items-center justify-center w-full">
                <p className="text-5xl text-blue-800 font-medium text-center">
                    {value}/{maxValue}
                </p>
            </div>
        </div>

        <div className="flex flex-col items-center">
            <p className="text-green-800 text-lg font-medium mb-2">Набрані бали</p>
            <div className="bg-green-100 rounded-lg p-6 shadow-md flex items-center justify-center w-full">
                <p className="text-5xl text-green-800 font-medium text-center">
                    ...
                </p>
            </div>
        </div>
    </div>
</div>


            </div>
        </main>
    );
}

export default ResultComponent;
