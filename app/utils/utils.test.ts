import { getDiagnosticReport } from "./fetch-report";
import { emptyFhirBundle, mockFhirBundle } from '../../__mocks__/mockReport';
import { parseDiagnosticReport } from "./parse-report";

// jest.mock('./parse-report', () => ({
//     ...jest.requireActual('./parse-report'),
//     parseDiagnosticReport: jest.fn(() => ({
//         reportName: 'Parsed Mock Report',
//         observations: [],   
//     }))
// }))

global.fetch = jest.fn();

describe('getDiagnosticReport', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    it('should fetch and return a parsed report on successful request', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockFhirBundle)
        })

        const result = await getDiagnosticReport();

        expect(fetch).toHaveBeenCalledWith('https://build.fhir.org/diagnosticreport-example.json');
        expect(result.reportName).toBe('Mock Hematology Report');
    });

    it('should throw and err if the network response is not ok', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            statusText: 'Not Found'
        });

        await expect(getDiagnosticReport()).rejects.toThrow('Failed to fetch data: Not Found');
    });
});

describe('parseDiagnosticReport', () => {
    it('should correctly parse a valid FHIR Bundle', () => {
        const rawData = mockFhirBundle;
        const result = parseDiagnosticReport(rawData);

        expect(result.reportName).toBe('Mock Hematology Report');
        expect(result.testPerformer).toBe('Acme Laboratory, Inc');
        expect(result.observations).toHaveLength(17);
        expect(result.observations[0].name).toBe('Haemoglobin');
    });

    it('should correctly format a reference range with only a high value', () => {
        const rawData = mockFhirBundle;
        const result = parseDiagnosticReport(rawData);

        const rawBasophilsLow = rawData?.entry[17]?.resource?.referenceRange
            ?.find(r => 'low' in r && r.low !== undefined); 

        expect(rawBasophilsLow || undefined).toBe(undefined);

        const basophils = result.observations[16];
        expect(basophils?.low).toBe(0);
        expect(basophils?.normalRange).toBe('0 - 0.21 x10*9/L');
    });

    it('should throw an error if the bundle is empty', () => {
        const rawData = emptyFhirBundle;
        expect(() => parseDiagnosticReport(rawData)).toThrow('Failed to parse DiagnosticReport');
    });
})