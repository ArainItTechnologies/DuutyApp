import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import { citiesList } from "../../utils/Cities";

// LocationMultiSelect Component
export const LocationMultiSelect = ({ selectedLocations = [], onChange, label, placeholder, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleLocation = (locationName) => {
    const isSelected = selectedLocations.includes(locationName);
    if (isSelected) {
      onChange(selectedLocations.filter((name) => name !== locationName));
    } else {
      onChange([...selectedLocations, locationName]);
    }
  };

  const removeLocation = (locationName) => {
    onChange(selectedLocations.filter((name) => name !== locationName));
  };

  const isSelected = (locationName) => selectedLocations.includes(locationName);

  const getSelectedLocationObjects = () => {
    return citiesList.filter((city) => selectedLocations.includes(city.name));
  };

  // Filter and sort cities - selected ones first
  const filteredCities = citiesList
    .filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.state.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aSelected = isSelected(a.name);
      const bSelected = isSelected(b.name);
      
      // If one is selected and other is not, selected comes first
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      
      // If both are selected or both are not selected, sort alphabetically
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="mt-2">
      {label && (
        <label className="block text-sm/6 font-medium text-[--secondary-text-color] mb-2">
          {label}
        </label>
      )}

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`block w-full rounded-xl sm:h-[50px] h-[40px] bg-white sm:p-3 px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-[16px] text-[14px] flex items-center justify-between ${
            error ? "outline-red-500 focus:outline-red-500" : ""
          }`}
        >
          <span className="text-gray-900 text-left">
            {selectedLocations.length === 0
              ? placeholder || "Select locations..."
              : `${selectedLocations.length} location${selectedLocations.length > 1 ? "s" : ""} selected`}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""} flex-shrink-0`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-hidden">
            {/* Search Input */}
            <div className="p-3 border-b border-gray-200">
              <input
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Cities List */}
            <div className="max-h-60 overflow-y-auto">
              {filteredCities.length > 0 ? (
                filteredCities.map((city, index) => {
                  const cityIsSelected = isSelected(city.name);
                  const prevCity = filteredCities[index - 1];
                  const showDivider = index > 0 && cityIsSelected && prevCity && !isSelected(prevCity.name);
                  
                  return (
                    <div key={city.id}>
                      {/* Divider between selected and unselected */}
                      {showDivider && (
                        <div className="border-t-2 border-gray-200 my-1">
                          <div className="px-3 py-1 bg-gray-50">
                            <span className="text-xs text-gray-500 font-medium">Other Cities</span>
                          </div>
                        </div>
                      )}
                      
                      <div
                        onClick={() => toggleLocation(city.name)}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex-1">
                          <span className="text-gray-800 font-medium text-sm">
                            {city.name}
                          </span>
                          <span className="text-gray-500 text-xs ml-2">
                            {city.state}
                          </span>
                        </div>
                        {cityIsSelected && (
                          <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-3 text-center text-gray-500 text-sm">
                  No cities found
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Selected Locations Display - Same style as preferred roles */}
      {selectedLocations.length > 0 && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {getSelectedLocationObjects().map((city) => (
              <span
                key={city.name}
                 className="bg-gray-50 rounded-lg p-3 flex items-center gap-3 border border-gray-200"
              >
                {city.name}, {city.state}
                <button
                  type="button"
                  onClick={() => removeLocation(city.name)}
                   className="p-1 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
                >
                 <X className="w-4 h-4 text-red-500" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};