import React from "react";

export default function Header({ title }) {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 h-20 flex items-center">
            <div className="flex items-center justify-between w-full">
                <h2 className="text-2xl font-bold text-negro font-argentum">
                    {title}
                </h2>
            </div>
        </header>
    );
}
