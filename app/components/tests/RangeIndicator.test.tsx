import {render, screen } from '@testing-library/react';
import RangeIndicator  from '../RangeIndicator';

describe('RangeIndicator', () => {
    it('should render the low and high labels correctly', () => {
        render(<RangeIndicator value={50} low={0} high={100} />);

        const lowLabel = screen.getByTestId('low-label');
        const highLabel = screen.getByTestId('high-label');

        expect(lowLabel).toHaveTextContent('Lo (0)');
        expect(highLabel).toHaveTextContent('High (100)');
    });

    it('should position the marker correct for a value in the middle of the range', () => {
        render(<RangeIndicator value={50} low={0} high={100} />);

        const marker = screen.getByTitle('Value: 50');

        expect(marker.style.left).toBe('calc(50% - 8px)');
    });

    it('should position the marker at 0% when the value is equal to the low boundary', () => {
        render(<RangeIndicator value={10} low={10} high={90} />);

        const marker = screen.getByTitle('Value: 10');

        expect(marker.style.left).toBe('calc(0% - 8px)')
    });

    it('should clamp the marker position to 0% if the value is below the range', () => {
        render(<RangeIndicator value={0} low={10} high={90} />);

        const marker = screen.getByTitle('Value: 0');

        expect(marker.style.left).toBe('calc(0% - 8px)');
    });

    it('should clamp the marker position to 100% if the value is above the range', () => {
        render(<RangeIndicator value={100} low={10} high={90} />);

        const marker = screen.getByTitle('Value: 100');

        expect(marker.style.left).toBe('calc(100% - 8px)');
    });

});