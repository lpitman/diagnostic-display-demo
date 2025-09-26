'use client';

import { useState } from 'react';
import { ObservationDetail, FormattedReport } from '../types';
import ObservationItem from './ObservationItem';

interface CollapsibleReportItemProps {
    report: FormattedReport;
}

const CollapsibleReportItem = ({ report }: CollapsibleReportItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleReport = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className='bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200'>
            <div 
                className='flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50'
                onClick={toggleReport}
            >
                <div>
                    <h3 className='font-bold text-lg text-gray-800'>{report.reportName}</h3>
                    <p className='text-sm text-gray-800'>Test Performer: {report.testPerformer}</p>
                    <p className='text-sm text-gray-500'>Result Date and Time: {report.effectiveDateTime}</p>    
                </div>    
                <svg
                    className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>

            {/* Collapsible Report */}
            {isOpen && (
                <div className='border-t border-gray-200 p-4'>
                    <div className='grid grid-cols-3 gap-4 pb-2 border-b-2 border-gray-300 mb-2 font-bold text-gray-600'>
                        <div className="text-left">Test</div>
                        <div className="text-center">Result</div>
                        <div className="text-right">Reference Range</div>
                    </div>
                    {report.observations.map((obs) => (
                        <ObservationItem key={obs.id} observation={obs} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CollapsibleReportItem;