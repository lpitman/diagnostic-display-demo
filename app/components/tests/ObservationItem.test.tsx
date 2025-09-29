import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ObservationItem from '../ObservationItem';
import { ObservationDetail } from '../../types';

describe('ObservationItem', () => {
    it('should render the observaton details correctly', () => {
        const mockObservation: ObservationDetail = {
            id: 'obs1',
            name: 'Hemoglobin',
            value: '15.1 g/dL',
            normalRange: '13.5 - 17.5 g/dL',
            valueQuantity: 15.1,
            low: 13.5,
            high: 17.5
        };

        render(<ObservationItem observation={mockObservation} />)

        expect(screen.getByText('Hemoglobin')).toBeInTheDocument();
        expect(screen.getByText('15.1 g/dL')).toBeInTheDocument();
        expect(screen.getByText('13.5 - 17.5 g/dL')).toBeInTheDocument();
    });

    it('should apply a red color class when the value is out of range', () => {
        const mockObservationOutOfRange: ObservationDetail = {
            id: 'obs2',
            name: 'WBC Count',
            value: '12.5 x10*9/L',
            normalRange: '4.5 - 11.0 x10*9/L',
            valueQuantity: 12.5,
            low: 4.5, 
            high: 11.0
        }

        render(<ObservationItem observation={mockObservationOutOfRange}/>);
        
        const valueElement = screen.getByText('12.5 x10*9/L');
        expect(valueElement).toHaveClass('text-red-800');
    })
})