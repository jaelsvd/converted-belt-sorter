import React, { useState } from "react";

export interface FormData {
    width: string;
    height: string;
    length: string;
    mass: string;
}

export type FormFieldName = keyof FormData;

export default function ConvertedBeltSorter() {
    const [formData, setFormData] = useState<FormData>({
        width: "",
        height: "",
        length: "",
        mass: "",
    });

    const [result, setResult] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { width, height, length, mass } = formData;
        const parsed = {
            width: parseFloat(width),
            height: parseFloat(height),
            length: parseFloat(length),
            mass: parseFloat(mass),
        };
        setResult(sort(parsed.width, parsed.height, parsed.length, parsed.mass));
    };

    const sort = (width: number, height: number, length: number, mass: number): string => {
        const volume = width * height * length;
        const isBulky =
            volume >= 1000000 || width >= 150 || height >= 150 || length >= 150;
        const isHeavy = mass >= 20;

        if (isHeavy && isBulky) return "REJECTED";
        if (isHeavy || isBulky) return "SPECIAL";
        return "STANDARD";
    };

    return (
        <div className="grid grid-cols-2 gap-2">
            <div>
                <h1 className="text-2xl font-bold mb-4">Converted Belt Sorter</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { label: "Width (cm)", name: "width" },
                        { label: "Height (cm)", name: "height" },
                        { label: "Length (cm)", name: "length" },
                        { label: "Mass (kg)", name: "mass" },
                    ].map(({ label, name }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium mb-1">{label}</label>
                            <input
                                type="number"
                                name={name}
                                value={formData[name as FormFieldName]}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                    >
                        Sort Package
                    </button>
                </form>
            </div>

            {result && (
                <div>
                    <div className="bg-yellow-300 animate-bounce shadow-lg rounded-lg p-4 w-full max-w-sm text-center border-3 border-yellow-400">
                        <h2 className="text-xl font-bold mb-2 text-gray-900">Dispatch Result</h2>
                        <p className="text-2xl font-extrabold text-gray-800">{result}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
