import React, { useState } from "react";
import { useUser } from "../hooks/Hooks";
import { useTranslation } from "../translations/TranslationHook";

const Profile = () => {

  const { t, reset } = useTranslation();
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user.name,
    phone: user.phone,
    experience: user.experience,
    specialties: [user.specialties],
    location: user.location,
    availability: [user.availability],
    photo: null
  });


  const specialtyOptions = ['french', 'italian', 'asian', 'pastry', 'grill', 'seafood', 'vegetarian', 'baking'];
  const availabilityOptions = ['fullTime', 'partTime', 'weekends', 'evenings'];

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TODO: Add API call to save profile data
    console.log("Saving:", profile);
    setIsEditing(false);
  };

  return (
    <div className="container p-4 pb-20">

      {/* Profile Photo */}
      {/* <div className="bg-white rounded-xl p-6 shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">{t('photo')}</h2>
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center overflow-hidden">
            {profile.photo ? (
              <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Camera className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <label className="bg-orange-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-orange-600 transition-colors">
            {profile.photo ? t('changePhoto') : t('addPhoto')}
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
          </label>
        </div>
      </div> */}

      {/* Personal Information */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">{t('personalInfo')}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('name')}</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder={t('name')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('phone')}</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="+33 1 23 45 67 89"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('location')}</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Paris, Lyon, Marseille..."
            />
          </div>
        </div>
      </div>

      {/* Experience Level */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">{t('experience')}</h2>
        <div className="space-y-2">
          {['beginner', 'intermediate', 'advanced'].map((level) => (
            <label key={level} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="experience"
                value={level}
                checked={profile.experience === level}
                onChange={(e) => setProfile(prev => ({ ...prev, experience: e.target.value }))}
                className="mr-3"
              />
              <span className="text-gray-700">{t(level)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Specialties */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">{t('specialties')}</h2>
        <div className="grid grid-cols-2 gap-2">
          {specialtyOptions.map((specialty) => (
            <label key={specialty} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={profile.specialties.includes(specialty)}
                onChange={() => handleSpecialtyToggle(specialty)}
                className="mr-3"
              />
              <span className="text-sm text-gray-700">{t(specialty)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">{t('availability')}</h2>
        <div className="space-y-2">
          {availabilityOptions.map((availability) => (
            <label key={availability} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="availability"
                value={availability}
                checked={profile.availability === availability}
                onChange={(e) => setProfile(prev => ({ ...prev, availability: e.target.value }))}
                className="mr-3"
              />
              <span className="text-gray-700">{t(availability)}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => alert(t('profileSaved'))}
        className="w-full bg-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
      >
        {t('save')} {t('profile')}
      </button>
    </div>
  );
};

export default Profile;
