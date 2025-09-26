import { Observation, Quantity, ObservationReferenceRange } from "fhir-models";

// Declaring interfaces for FHIR data
export interface ObservationDetail {
  id: string;
  name: string;
  value: string;
  normalRange: string;
}

export interface FormattedReport {
  reportName: string;
  testPerformer: string;
  effectiveDateTime: string;
  observations: ObservationDetail[];
}

export interface ExtendedObservation extends Observation {
  valueQuantity?: Quantity;
  referenceRange?: ObservationReferenceRange[];
}