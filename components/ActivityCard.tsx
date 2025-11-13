
import React from 'react';
import { Activity } from '../types';
import { getCategoryDetails } from '../constants';

interface ActivityCardProps {
    activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
    const { color, imageSeed } = getCategoryDetails(activity.category);
    const imageUrl = `https://picsum.photos/seed/${imageSeed}/400/300`;

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="relative">
                <img src={imageUrl} alt={activity.name} className="w-full h-48 object-cover" />
                <div className={`absolute top-0 right-0 m-2 px-3 py-1 text-sm text-white rounded-full ${color}`}>
                    {activity.category}
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{activity.name}</h3>
                <p className="text-gray-600 mb-1"><strong>מיקום:</strong> {activity.communityCenter}</p>
                <p className="text-gray-600 mb-1"><strong>קהל יעד:</strong> {activity.ageGroup}</p>
                <p className="text-gray-600 mb-4"><strong>מועדים:</strong> {activity.schedule || 'לא צוין'}</p>
                
                <div className="mt-auto flex justify-between items-center">
                    <p className="text-2xl font-bold text-blue-600">{activity.price ? `₪${activity.price}` : 'חינם'}</p>
                    <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors font-semibold">
                        לפרטים נוספים
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
