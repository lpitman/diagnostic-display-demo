import { ObservationDetail, FormattedReport } from "../types";
import ObservationItem from "./ObservationItem";

interface DiagnosticReportProps {
    report: FormattedReport;
}

const DiagnosticReport = ({ report }: DiagnosticReportProps) => {
    return (
        <div className="bg-white shadow-lg rouded-lg overflow-hidden max-w-4xl mx-auto">
            {/* Report Header */}
            <div className="bg-blue-900 text-white p-6">
                <h2 className="text-2xl font-bold">{report.reportName}</h2>
                <div className="flex justify-between items-center mt-2 text-blue-100">
                    <span>Performed by: <strong>{report.testPerformer}</strong></span>
                    <span>Date: <strong>{report.effectiveDateTime}</strong></span>
                </div>
            </div>

            {/* Observations List Section */}
            <div className="p-6">
                <div className="grid grid-cols-3 gap-4 pb-2 border-b-2 border-gray-300 mb-2 font-bold text-gray-600">
                    <div className="text-left">Test</div>
                    <div className="text-center">Result</div>
                    <div className="text-right">Reference Range</div>
                </div>

                {/* Iterate over the report observations */}
                {report.observations.map((obs) => (
                    <ObservationItem key={obs.id} observation={obs} />
                ))}
            </div>
        </div>
    );
}

export default DiagnosticReport