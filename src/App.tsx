import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Activity } from './types';
import { activities } from './services/dataService';
import Header from './components/Header';
import ActivityCard from './components/ActivityCard';
import ActivityListItem from './components/ActivityListItem';
import { GridIcon, ListIcon } from './components/icons';

// A simple debounce hook to prevent search from firing on every key press.
const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

const App: React.FC = () => {
    const [allActivities, setAllActivities] = useState<Activity[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
    const [ageRange, setAgeRange] = useState({ min: 0, max: 120 });
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    useEffect(() => {
        // Simulate loading data
        setIsLoading(true);
        setTimeout(() => {
            setAllActivities(activities);
            setIsLoading(false);
        }, 500);
    }, []);

    const filteredActivities = useMemo(() => {
        return allActivities.filter(activity => {
            // Search Query Filter
            const query = debouncedSearchQuery.toLowerCase();
            const searchableText = `${activity.name} ${activity.category} ${activity.notes}`.toLowerCase();
            if (query && !searchableText.includes(query)) {
                return false;
            }

            // Category Filter
            if (selectedCategories.length > 0 && !selectedCategories.includes(activity.category)) {
                return false;
            }

            // Location Filter
            if (selectedLocations.length > 0 && !selectedLocations.includes(activity.communityCenter)) {
                return false;
            }
            
            // Price Filter
            if (activity.price !== null) {
                if (activity.price < priceRange.min || activity.price > priceRange.max) {
                    return false;
                }
            } else if (priceRange.min > 0) { // If it's free but min price is set
                return false;
            }

            // Age Range Filter (checks for overlap)
            if (activity.maxAge < ageRange.min || activity.minAge > ageRange.max) {
                return false;
            }

            return true;
        });
    }, [allActivities, debouncedSearchQuery, selectedCategories, priceRange, ageRange, selectedLocations]);

    const handleSetPriceRange = useCallback((range: {min: number, max: number}) => {
        setPriceRange({
            min: isNaN(range.min) || range.min < 0 ? 0 : range.min,
            max: isNaN(range.max) || range.max < 0 ? 2000 : range.max
        });
    }, []);

    const handleSetAgeRange = useCallback((range: {min: number, max: number}) => {
        setAgeRange({
            min: isNaN(range.min) || range.min < 0 ? 0 : range.min,
            max: isNaN(range.max) || range.max < 0 ? 120 : range.max
        });
    }, []);


    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center p-10">טוען נתונים...</div>;
        }

        if (filteredActivities.length === 0) {
            return <div className="text-center p-10 text-gray-600">לא נמצאו תוצאות התואמות את החיפוש שלך. נסה להרחיב את הסינון.</div>;
        }

        if (viewMode === 'grid') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredActivities.map(activity => (
                        <ActivityCard key={activity.id} activity={activity} />
                    ))}
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {filteredActivities.map(activity => (
                    <ActivityListItem key={activity.id} activity={activity} />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                priceRange={priceRange}
                setPriceRange={handleSetPriceRange}
                ageRange={ageRange}
                setAgeRange={handleSetAgeRange}
                selectedLocations={selectedLocations}
                setSelectedLocations={setSelectedLocations}
            />

            <main className="container mx-auto p-4 md:p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-gray-700 font-semibold">
                        נמצאו {filteredActivities.length} תוצאות
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                            <GridIcon />
                        </button>
                        <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                            <ListIcon />
                        </button>
                    </div>
                </div>
                {renderContent()}
            </main>

            <footer className="text-center py-6 mt-10 border-t border-gray-200">
                <p className="text-gray-500">&copy; {new Date().getFullYear()} Amitim Activity Finder. כל הזכויות שמורות.</p>
            </footer>
        </div>
    );
};

export default App;
