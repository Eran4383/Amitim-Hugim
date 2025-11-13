import React from 'react';
import { ArtIcon, CommunityIcon, SportsIcon, GoldenAgeIcon } from './components/icons';

export const CATEGORY_DETAILS: { [key: string]: { icon: React.ReactElement; color: string; imageSeed: string } } = {
  'ספורט והתעמלות': {
    icon: <SportsIcon />,
    color: 'bg-blue-500',
    imageSeed: 'sports',
  },
  'אומנות': {
    icon: <ArtIcon />,
    color: 'bg-purple-500',
    imageSeed: 'art',
  },
  'חברה וקהילה': {
    icon: <CommunityIcon />,
    color: 'bg-green-500',
    imageSeed: 'community',
  },
  'גיל הזהב': { // Placeholder as this is not a distinct category in the data, but good for demonstration
    icon: <GoldenAgeIcon />,
    color: 'bg-yellow-500',
    imageSeed: 'senior',
  },
  'Default': {
    icon: <CommunityIcon />,
    color: 'bg-gray-500',
    imageSeed: 'activity',
  },
};

export const getCategoryDetails = (category: string) => {
  return CATEGORY_DETAILS[category] || CATEGORY_DETAILS['Default'];
};
