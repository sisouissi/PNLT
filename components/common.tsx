
import React from 'react';

// Reusable Card Component
export const Card: React.FC<{ children: React.ReactNode; className?: string; borderColor?: string }> = ({ children, className = '', borderColor = 'border-red-500' }) => (
    <div className={`bg-white rounded-2xl p-6 md:p-8 mb-6 shadow-xl border-l-[6px] ${borderColor} transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl ${className}`}>
        {children}
    </div>
);

// Reusable Alert Component
type AlertVariant = 'info' | 'warning' | 'danger' | 'success';
const alertStyles: Record<AlertVariant, string> = {
    info: 'bg-gradient-to-br from-[#d1ecf1] to-[#aed6f1] border-[#3498db] text-[#0c5460]',
    warning: 'bg-gradient-to-br from-[#fff3cd] to-[#ffeaa7] border-[#f39c12] text-[#856404]',
    danger: 'bg-gradient-to-br from-[#f8d7da] to-[#fadbd8] border-[#e74c3c] text-[#721c24]',
    success: 'bg-gradient-to-br from-[#d4edda] to-[#a9dfbf] border-[#27ae60] text-[#155724]',
};
export const Alert: React.FC<{ variant: AlertVariant; children: React.ReactNode; className?: string }> = ({ variant, children, className }) => (
    <div className={`p-5 rounded-2xl mb-6 border-l-[6px] ${alertStyles[variant]} ${className}`}>
        {children}
    </div>
);

// Icon Component
export const Icon: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="text-xl mr-2">{children}</span>;

// Card Title Component
export const CardTitle: React.FC<{ icon: string; children: React.ReactNode }> = ({ icon, children }) => (
    <h3 className="text-[#2c3e50] mb-5 text-xl font-bold flex items-center gap-2">
        <Icon>{icon}</Icon>
        {children}
    </h3>
);

// Statistic Card
export const StatCard: React.FC<{ number: string; label: string }> = ({ number, label }) => (
    <div className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-2xl text-center shadow-lg border-l-4 border-blue-500 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <div className="text-4xl font-bold text-red-600 mb-2">{number}</div>
        <div className="text-gray-600 text-sm uppercase tracking-wider">{label}</div>
    </div>
);

// Symptom Card
export const SymptomCard: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
    <div className="bg-gradient-to-br from-red-500 to-orange-500 text-white p-6 rounded-2xl text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <h4 className="mb-4 text-xl font-semibold">{title}</h4>
        <ul className="text-left list-none space-y-2">
            {items.map((item, index) => (
                <li key={index} className="pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-white/90 before:font-bold">
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

// Diagnostic Flow Step
export const FlowStep: React.FC<{ title: string; description: string; isLast?: boolean }> = ({ title, description, isLast = false }) => (
    <div className={`relative ${!isLast ? 'pb-10' : ''}`}>
        <div className="bg-gradient-to-br from-gray-50 to-gray-200 border-4 border-blue-500 rounded-2xl p-6 text-center transition-all duration-300 ease-in-out hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 hover:translate-x-2">
            <h4 className="text-[#2c3e50] mb-3 text-lg font-semibold">{title}</h4>
            <p className="text-gray-700">{description}</p>
        </div>
        {!isLast && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-xl shadow-lg">
                ↓
            </div>
        )}
    </div>
);

// Generic List
export const ThemedList: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
    <ul className="list-none space-y-2">
        {items.map((item, index) => (
            <li key={index} className="pl-6 relative before:content-['▶️'] before:absolute before:left-0 before:text-sm">
                {item}
            </li>
        ))}
    </ul>
);

// Treatment Table
export const TreatmentTable: React.FC<{ headers: string[]; rows: (string | React.ReactNode)[][], className?: string }> = ({ headers, rows, className }) => (
    <div className={`w-full rounded-2xl overflow-hidden shadow-xl mt-6 ${className}`}>
        <table className="w-full border-collapse bg-white">
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} className="p-4 text-left bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold uppercase text-sm tracking-wider">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-gray-200 even:bg-blue-500/5 hover:bg-gray-100 transition-colors duration-200">
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="p-4 text-gray-800">{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
