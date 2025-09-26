import { 
  DiagnosticReport, 
  Observation, 
  Quantity, 
  ObservationReferenceRange, 
  jsonToObject
} from 'fhir-models';

import { ObservationDetail, FormattedReport, ExtendedObservation } from '../types';



export function parseDiagnosticReport(rawData: any): FormattedReport {
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
    const normalRange = (range && range.high) 
      ? `${range?.low?.value || 0} - ${range.high.value} ${range.high.unit}`
      : `N/A`;
      
    return {
      id: obs.id || obsId,
      name: obs.code?.text || 'Unknown Vital',
      value: value,
      normalRange: normalRange,
      valueQuantity: obs.valueQuantity?.value,
      low: range?.low?.value || 0,
      high: range?.high?.value,
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