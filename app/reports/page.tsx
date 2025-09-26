import { getDiagnosticReport } from "../utils/fetch-report";
import DiagnosticReport from "../components/DiagnosticReport";

export default async function Home() {
  try {
    const report = await getDiagnosticReport();

    return (
      // <main className='container mx-auto p-8 font-sans'>
      //   <h1 className='text-3xl font-bold mb-4'>Diagnostic Report Data</h1>
      //   <p className='mb-6'>
      //     Displaying your report:
      //   </p>
      //   <pre className='bg-gray-100 p-4 rounded-lg overflow-x-auto'>
      //     <code className='text-gray-800'>{JSON.stringify(report, null, 2)}</code>
      //   </pre>
      // </main>
      <main className="bg-gray-50 min-h-screen">
        <DiagnosticReport report={report} />
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
