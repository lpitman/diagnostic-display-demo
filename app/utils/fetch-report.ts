import { parseDiagnosticReport, FormattedReport } from "./parse-report";

// Fetch the DiagnosticReport from the provided url
export async function getDiagnosticReport(): Promise<FormattedReport>{
  const res = await fetch('https://build.fhir.org/diagnosticreport-example.json');
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  const rawData = await res.json();

  if (rawData.resourceType !== 'Bundle') {
    throw new Error(`Expected a Bundle resource, got ${rawData.resourceType}`);
  }

  return parseDiagnosticReport(rawData);
}


