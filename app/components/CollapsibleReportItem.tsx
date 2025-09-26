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
                     <div className='flex bg-blue-200 border border-blue-400 px-4 py-3 mb-5 rounded relative' role='alert'>
                        <svg className=" text-blue-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>

                        <span className='pl-2 pt-0.5 sm:inline font-bold text-sm text-gray-800'>
                            It is not uncommon for results to be out of range.
                        </span>
                    </div>
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