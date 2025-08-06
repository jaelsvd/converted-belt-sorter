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
        <div className="grid grid-flow-row auto-rows-max">
            <div className="">
                <h1 className="text-2xl font-bold mb-4">Converted Belt Sorter</h1>

                <div className="sorter-description">
                    <p>
                        A package is <strong>bulky</strong>  if its volume (Width x Height x Length) is greater than or equal to 1,000,000 cm³ or when one of its dimensions is greater or equal to 150 cm.
                    </p>
                    <p>
                        A package is <strong>heavy</strong> when its mass is greater or equal to 20 kg.
                    </p>
                </div>
            </div>
            <div className="grid grid-flow-col">
                <div>
                    <form onSubmit={handleSubmit} className="space-y-4 sorter-form">
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
                                    className="w-full border rounded py-2"
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
                    <div className="stackable-box">
                        <div>
                            <h2 className="box-subtitle">Dispatch Result</h2>
                            <p className="box-result">{result}</p>
                        </div>
                    </div>
                )}
            </div>            
        </div>
    );
}
