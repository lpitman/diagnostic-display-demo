import {render, screen, fireEvent } from '@testing-library/react';
import CollapsibleReportItem from '../CollapsibleReportItem';
import { FormattedReport } from '../../types';

jest.mock('../ObservationItem', () => {
    return function DummyObservationItem({ observation }: any) {
        return <div data-testid='observation-item'>{observation.name}</div>
    }
});

describe('CollapsibleReportItem', () => {
    const mockReport: FormattedReport = {
        reportName: 'Test Hematology Report',
        testPerformer: 'Test Lab',
        effectiveDateTime: 'Jan 01, 2025',
        observations: [{
            id: 'obs1',
            name: 'Hemoglobin',
            value: '15.1 g/dL',
            normalRange: '13.5 - 17.5 g/dL',
            valueQuantity: 15.1,
            low: 13.5,
            high: 17.5
            }]
    };

    it('should render the report header and be closed by default', () => {
        render(<CollapsibleReportItem report={mockReport}/>);
        
        expect(screen.getByText('Test Hematology Report')).toBeInTheDocument();
        expect(screen.queryByText('Hemoglobin')).not.toBeInTheDocument();
    });

    it('should open and show observation details when the header is clicked', () => {
        render(<CollapsibleReportItem report={mockReport}/>);

        const header = screen.getByText('Test Hematology Report');
        fireEvent.click(header);
        
        expect(screen.getByText('Hemoglobin')).toBeInTheDocument();
    });

    it('should close the accordion when the header is clicked again', () => {
        render(<CollapsibleReportItem report={mockReport}/>);

        const header = screen.getByText('Test Hematology Report');
        fireEvent.click(header);
        expect(screen.getByText('Hemoglobin')).toBeInTheDocument();

        fireEvent.click(header);
        expect(screen.queryByText('Hemoglobin')).not.toBeInTheDocument();
    })
})