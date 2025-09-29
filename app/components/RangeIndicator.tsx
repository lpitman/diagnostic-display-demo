
interface RangeIndicatorProps {
    value: number;
    low: number;
    high: number;
}

const RangeIndicator = ({ value, low, high }: RangeIndicatorProps) => {
    const range = high - low;
    const position = ((value - low) / range) * 100; // percentage of the range
    const clampedPosition = Math.max(0, Math.min(100, position));

    return (
        <div className="mt-2 col-span-3">
            <div className="w-3/5 mx-auto">
                <div className="relative h-2 w-full bg-gray-200 rounded-full">
                    <div className="absolute top-[-4px] w-4 h-4 bg-blue-800 rounded-full border-2 border-white"
                        style={{ left: `calc(${clampedPosition}% - 8px)`}}
                        title={`Value: ${value}`}   
                    >
                    </div>
                </div>
                <div className="flex justify-between text-xs pb-3 text-gray-500 mt-1">
                    <span data-testid='low-label' >Lo ({ low })</span>
                    <span data-testid='high-label' >High ({ high })</span>
                </div>
            </div>
        </div>
    );
}

export default RangeIndicator;