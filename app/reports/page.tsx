import { getDiagnosticReport } from "../utils/fetch-report";
import DiagnosticReport from "../components/DiagnosticReport";
import Link from 'next/link';
import CollapsibleReportItem from "../components/CollapsibleReportItem";

export default async function Home() {
  try {
    const report = await getDiagnosticReport();

    // simulating having multiple reports
    const reports = [
        {...report, reportName: 'Complete Blood Count (1)'},
        {...report, reportName: 'Complete Blood Count (2)'},
        {...report, reportName: 'Complete Blood Count (3)'},
    ]

    return (
      <main className='bg-gray-50 min-h-screen py-12'>
        {/* <DiagnosticReport report={report} /> */}
        <div className='max-w-4xl mx-auto px-4'>
            <Link href='/' className='text-blue-600 hover:underline mb-6 inline-block'>&larr; Back to Home</Link>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Diagnostic Reports</h1>
            <div className="space-y-4">
                {reports.map((report, index) => (
                    <CollapsibleReportItem key={index} report={report} />
                ))}
            </div>
        </div>
      </main>
    );
  } catch(error) {
    return (
      <main className='container mx-auto p-8 font-sans'>
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
          <strong className='font-bold'>Error: </strong>
          <span className='block sm:inline'>
            {error instanceof Error ? error.message : 'An unknown error occured.'}
          </span>
        </div>
      </main>
    );
  }
}
