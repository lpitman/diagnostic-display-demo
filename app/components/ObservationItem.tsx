import { ObservationDetail } from "../types";

interface ObservationItemProps {
    observation: ObservationDetail;
}

const ObservationItem = ({ observation }: ObservationItemProps) => {
    return (
        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200 items-center">
           <div className="text-gray-800 font-medium">
            {observation.name}
           </div>

           <div className="text-gray-900 font-semibold text-center">
            {observation.value}
           </div>

           <div className="text-gray-600 text-right">
            {observation.normalRange}
           </div>
        </div>
    );
}

export default ObservationItem;