import React, { createContext, useState, useContext, ReactNode } from "react";
import EpisodeModal from "@components/episodes/EpisodeModal";
import { IEpisode } from "@interfaces/series";

interface EpisodeModalContextType {
  openModal: (episode: IEpisodeShow) => void;
  closeModal: () => void;
}

interface IEpisodeShow extends IEpisode {
  watched: boolean;
}

const EpisodeModalContext = createContext<EpisodeModalContextType | undefined>(
  undefined,
);

interface EpisodeModalProviderProps {
  children: ReactNode;
}

export const EpisodeModalProvider: React.FC<EpisodeModalProviderProps> = ({
  children,
}) => {
  const [selectedEpisode, setSelectedEpisode] = useState<IEpisodeShow | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (episode: IEpisodeShow) => {
    setSelectedEpisode(episode);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedEpisode(null), 300); // Clear episode after animation
  };

  return (
    <EpisodeModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <EpisodeModal
        episode={selectedEpisode as IEpisodeShow}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </EpisodeModalContext.Provider>
  );
};

export const useEpisodeModalContext = () => {
  const context = useContext(EpisodeModalContext);
  if (context === undefined) {
    throw new Error(
      "useEpisodeModalContext must be used within an EpisodeModalProvider",
    );
  }
  return context;
};
