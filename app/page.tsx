import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className='flex items-center justify-center min-h-screen bg-gray-50'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>
          Diagnostic Services Portal
        </h1>
        <p className='text-lg text-gray-600 mb-8'>
          Access your diagnostic reports and lab results.
        </p>
        <Link 
          href='/reports' 
          className='bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg 
            shadow-md hover:bg-blue-600 transition-colors duration-300'>
            View Lab Results & Diagnostics
        </Link>
      </div>
    </main>
  );
}