// ProfileContext.tsx
import React, { createContext, useContext, ReactNode } from "react";

interface ProfileContextType {
  isCompanyView: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
  isCompanyView: boolean;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
  isCompanyView,
}) => {
  return (
    <ProfileContext.Provider value={{ isCompanyView }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
