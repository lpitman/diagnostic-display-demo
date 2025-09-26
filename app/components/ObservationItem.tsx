import { ObservationDetail } from "../types";
import RangeIndicator from "./RangeIndicator";

interface ObservationItemProps {
    observation: ObservationDetail;
}

const ObservationItem = ({ observation }: ObservationItemProps) => {
    const {valueQuantity, low, high } = observation;

    const canShowIndicator = 
        valueQuantity !== undefined && low !== undefined && high !== undefined;

    const isOutOfRange = 
        canShowIndicator &&
        (valueQuantity < low || valueQuantity > high);
    
    return (
        <div className="grid grid-cols-3 gap-4 py-3 first:border-t-0 first:pt-3 border-t pt-4  border-gray-200 items-center">
           <div className="text-gray-800 font-medium">
            {observation.name}
           </div>

           {/* Conditionally highlight out-of-range Observations */}
           <div
            className={`font-semibold text-center ${
                isOutOfRange ? 'text-red-800' : 'text-gray-900' 
            }`}
            >
                {observation.value}
           </div>

           <div className="text-gray-600 text-right">
                {observation.normalRange}
           </div>

           {/* Conditionally show the range indicator */}
           {canShowIndicator && (
                <RangeIndicator value={valueQuantity} low={low} high={high} />
           )}
        </div>
    );
}

export default ObservationItem;