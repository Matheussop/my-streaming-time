import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@components/ui/dialog";
import { Play, Calendar, Clock } from "lucide-react";
import SafeImage from "@components/common/SafeImage";
import { IEpisode } from "@interfaces/series";
import { Button } from "@components/ui/button";

interface EpisodeModalProps {
  episode: IEpisodeShow | null;
  isOpen: boolean;
  onClose: () => void;
}

interface IEpisodeShow extends IEpisode {
  watched: boolean;
}

const EpisodeModal: React.FC<EpisodeModalProps> = ({
  episode,
  isOpen,
  onClose,
}) => {
  if (!episode) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl overflow-hidden border-0 p-0 shadow-xl sm:rounded-lg">
        <div className="relative">
          <div className="relative h-64 w-full overflow-hidden md:h-80">
            <SafeImage
              src={episode.poster}
              alt={episode.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent pt-24 pb-8 text-white">
              <div className="px-6">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-primary text-lg font-medium md:text-xl">
                    Episode {episode.episodeNumber}
                  </h3>
                </div>
                <DialogTitle className="mb-1 text-2xl font-bold md:text-3xl">
                  {episode.title}
                </DialogTitle>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 dark:bg-gray-900">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button className="bg-primary hover:bg-primary/90 gap-2 text-white">
                  <Play size={18} />
                  {episode.watched ? "Watch Again" : "Play"}
                </Button>
                {episode.watched && (
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
                    Watched
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                {episode.releaseDate && (
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{episode.releaseDate}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{episode.durationInMinutes} min</span>
                </div>
                {/* {episode.rating && (
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={cn(
                            "fill-current",
                            star <= episode.rating! / 2
                              ? "text-yellow-400"
                              : "text-gray-300",
                          )}
                        />
                      ))}
                    </div>
                    <span>{episode.rating}/10</span>
                  </div>
                )} */}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="mb-2 text-lg font-medium">Synopsis</h4>
              <p className="text-gray-700 dark:text-gray-300">{episode.plot}</p>
            </div>

            <div className="overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
              <div className="p-4">
                <h4 className="mb-2 text-lg font-medium">Trailer</h4>
                <div className="relative aspect-video overflow-hidden rounded">
                  <div className="flex h-full w-full items-center justify-center bg-black/10">
                    <div className="bg-primary flex h-16 w-16 items-center justify-center rounded-full text-white">
                      <Play size={24} className="ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EpisodeModal;
