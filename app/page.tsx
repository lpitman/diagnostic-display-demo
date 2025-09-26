import { 
  DiagnosticReport, 
  Observation, 
  Quantity, 
  ObservationReferenceRange, 
  jsonToObject
} from 'fhir-models';


// Declaring interfaces for FHIR data
interface ObservationDetail {
  id: string;
  name: string;
  value: string;
  normalRange: string;
}

interface FormattedReport {
  reportName: string;
  testPerformer: string;
  effectiveDateTime: string;
  observations: ObservationDetail[];
}

interface ExtendedObservation extends Observation {
  valueQuantity?: Quantity;
  referenceRange?: ObservationReferenceRange[];
}

async function getDiagnosticReport(): Promise<FormattedReport> {
  const res = await fetch('https://build.fhir.org/diagnosticreport-example.json');
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  const rawData = await res.json();

  if (rawData.resourceType !== 'Bundle') {
    throw new Error(`Expected a Bundle resource, got ${rawData.resourceType}`);
  }

  // parsing the DiagnosticReport from the Bundle
  const diagnosticReportJson = rawData.entry.find(
    (e: any) => e.resource?.resourceType === 'DiagnosticReport'
  )?.resource;

  const parsedDiagnosticReport = jsonToObject(DiagnosticReport, diagnosticReportJson);

  if (parsedDiagnosticReport instanceof Error) {
    throw new Error(`Failed to parse DiagnosticReport`);
  }

  // Map to hold Observations
  const observationMap = new Map<string, ExtendedObservation>();
  rawData.entry.filter((e: any) => e.resource?.resourceType === 'Observation')
    .forEach((e: any) => {
      const observation = jsonToObject(Observation, e.resource);
      const valueQuantity = jsonToObject(Quantity, e.resource.valueQuantity); 
      const refRange = jsonToObject(ObservationReferenceRange, e.resource.referenceRange?.[0]);

      if (!(observation instanceof Error) 
        && !(valueQuantity instanceof Error) 
        && !(refRange instanceof Error) 
        && observation.id) {
        let extObs: ExtendedObservation = observation;
        extObs.valueQuantity = valueQuantity;
        extObs.referenceRange = [refRange]; 
        observationMap.set(observation.id, extObs)
      }
    });

  const observations: ObservationDetail[] = parsedDiagnosticReport.result?.map((ref) => {
    if (!ref.reference) return null;

    // format of the reference is e.g. "Observation/r1"
    const obsId = ref.reference.split('/')[1];
    const obs = observationMap.get(obsId);

    if (!obs) return null;
    const value = obs.valueQuantity
      ? `${obs.valueQuantity.value} ${obs.valueQuantity.unit}` 
      : `N/A`;
    
      const range = obs.referenceRange?.[0];
    const normalRange = (range && range.low && range.high) 
      ? `${range.low.value} - ${range.high.value} ${range.high.unit}`
      : `N/A`;
      
    return {
      id: obs.id || obsId,
      name: obs.code?.text || 'Unknown Vital',
      value: value,
      normalRange: normalRange
    }
  }).filter((o): o is ObservationDetail => o !== null) ?? [];

  // Creating a formatted report
  return {
    reportName: parsedDiagnosticReport.code?.text ?? 'Unnamed Report',
    testPerformer: parsedDiagnosticReport.performer?.[0]?.display ?? 'Unknown Performer',
    effectiveDateTime: new Date(parsedDiagnosticReport.effectiveDateTime ?? '').toLocaleString(),
    observations
  };
}

export default async function Home() {
  try {
    const report = await getDiagnosticReport();

    return (
      <main className='container mx-auto p-8 font-sans'>
        <h1 className='text-3xl font-bold mb-4'>Diagnostic Report Data</h1>
        <p className='mb-6'>
          Displaying your report:
        </p>
        <pre className='bg-gray-100 p-4 rounded-lg overflow-x-auto'>
          <code className='text-gray-800'>{JSON.stringify(report, null, 2)}</code>
        </pre>
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
