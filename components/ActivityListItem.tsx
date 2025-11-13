
import React from 'react';
import { Activity } from '../types';
import { getCategoryDetails } from '../constants';

interface ActivityListItemProps {
    activity: Activity;
}

const ActivityListItem: React.FC<ActivityListItemProps> = ({ activity }) => {
    const { color } = getCategoryDetails(activity.category);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4">
            <div className="flex-shrink-0">
                <div className={`px-3 py-1 text-sm text-white rounded-full ${color}`}>
                    {activity.category}
                </div>
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-800">{activity.name}</h3>
                <p className="text-sm text-gray-500">
                    {activity.communityCenter} • {activity.ageGroup}
                </p>
                <p className="text-sm text-gray-600 mt-1">{activity.schedule || 'לא צוין מועד'}</p>
            </div>
            <div className="flex-shrink-0 w-full sm:w-auto flex sm:flex-col items-center justify-between mt-2 sm:mt-0">
                 <p className="text-xl font-bold text-blue-600">{activity.price ? `₪${activity.price}` : 'חינם'}</p>
                 <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors font-semibold mt-0 sm:mt-2 text-sm">
                    פרטים
                </a>
            </div>
        </div>
    );
};

export default ActivityListItem;
