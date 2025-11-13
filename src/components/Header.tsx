import React from 'react';
import { categories, locations } from '../services/dataService';
import { getCategoryDetails } from '../constants';
import { ChevronDownIcon, SearchIcon } from './icons';

interface HeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
    priceRange: { min: number; max: number };
    setPriceRange: (range: { min: number; max: number }) => void;
    ageRange: { min: number; max: number };
    setAgeRange: (range: { min: number; max: number }) => void;
    selectedLocations: string[];
    setSelectedLocations: (locations: string[]) => void;
}

const Header: React.FC<HeaderProps> = ({
    searchQuery, setSearchQuery,
    selectedCategories, setSelectedCategories,
    priceRange, setPriceRange,
    ageRange, setAgeRange,
    selectedLocations, setSelectedLocations
}) => {
    const [isAdvancedOpen, setIsAdvancedOpen] = React.useState(false);

    const toggleCategory = (category: string) => {
        const newSelection = selectedCategories.includes(category)
            ? selectedCategories.filter(c => c !== category)
            : [...selectedCategories, category];
        setSelectedCategories(newSelection);
    };

    const toggleLocation = (location: string) => {
        const newSelection = selectedLocations.includes(location)
            ? selectedLocations.filter(l => l !== location)
            : [...selectedLocations, location];
        setSelectedLocations(newSelection);
    };

    return (
        <header className="bg-white shadow-md p-4 md:p-6 sticky top-0 z-10">
            <div className="container mx-auto">
                <div className="text-center mb-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">מצא את החוג המושלם</h1>
                    <p className="text-lg text-gray-600 mt-2">גלה, סנן ומצא פעילויות מדהימות בעמיתים</p>
                </div>

                {/* Category Filters */}
                <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap mb-6">
                    {categories.map(category => {
                        const { icon, color } = getCategoryDetails(category);
                        const isSelected = selectedCategories.includes(category);
                        return (
                            <div key={category} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => toggleCategory(category)}>
                                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white transition-all duration-300 ${isSelected ? color : 'bg-gray-200'} group-hover:scale-110`}>
                                    <span className={`transform scale-150 ${isSelected ? 'text-white' : 'text-gray-600'}`}>{icon}</span>
                                </div>
                                <span className={`text-sm md:text-base font-semibold transition-colors ${isSelected ? 'text-blue-600' : 'text-gray-700'}`}>{category}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Search and Advanced Toggle */}
                <div className="max-w-3xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="לדוגמה: כדורגל, יוגה, ציור..."
                            className="w-full p-4 pe-12 text-lg border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                        <div className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400">
                           <SearchIcon />
                        </div>
                    </div>
                    <button onClick={() => setIsAdvancedOpen(!isAdvancedOpen)} className="flex items-center gap-2 mx-auto mt-4 text-gray-600 hover:text-blue-600 transition">
                        <span>סינון מתקדם</span>
                        <span className={`transition-transform duration-300 ${isAdvancedOpen ? 'rotate-180' : ''}`}>
                            <ChevronDownIcon />
                        </span>
                    </button>
                </div>

                {/* Advanced Filters Panel */}
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isAdvancedOpen ? 'max-h-screen' : 'max-h-0'}`}>
                    <div className="pt-6 mt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Age Range */}
                        <div>
                            <label className="block font-semibold mb-2 text-gray-700">טווח גילאים</label>
                            <div className="flex items-center gap-4">
                                <input type="number" placeholder="מגיל" value={ageRange.min} onChange={e => setAgeRange({ ...ageRange, min: +e.target.value })} className="w-full p-2 border rounded-md" />
                                <span>-</span>
                                <input type="number" placeholder="עד גיל" value={ageRange.max} onChange={e => setAgeRange({ ...ageRange, max: +e.target.value })} className="w-full p-2 border rounded-md" />
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <label className="block font-semibold mb-2 text-gray-700">טווח מחירים (₪)</label>
                            <div className="flex items-center gap-4">
                                <input type="number" placeholder="ממחיר" value={priceRange.min} onChange={e => setPriceRange({ ...priceRange, min: +e.target.value })} className="w-full p-2 border rounded-md" />
                                <span>-</span>
                                <input type="number" placeholder="עד מחיר" value={priceRange.max} onChange={e => setPriceRange({ ...priceRange, max: +e.target.value })} className="w-full p-2 border rounded-md" />
                            </div>
                        </div>

                        {/* Location Filter */}
                        <div className="md:col-span-3">
                            <label className="block font-semibold mb-2 text-gray-700">מיקום</label>
                            <div className="flex flex-wrap gap-2">
                                {locations.map(location => (
                                    <button
                                        key={location}
                                        onClick={() => toggleLocation(location)}
                                        className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedLocations.includes(location) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                    >
                                        {location}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
