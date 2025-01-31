import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, Typography, IconButton, Slider, Box } from "@mui/material";
import { PlayArrow, Pause, SkipNext, SkipPrevious, VolumeUp } from "@mui/icons-material";

const basePath = import.meta.env.BASE_URL; // Detects "/site/" on GitHub Pages

// Function to fetch songs from playlist.json
const fetchSongs = async () => {
  try {
    const response = await fetch(`${basePath}playlist.json`); // Load the playlist file
    if (!response.ok) throw new Error("Failed to load playlist.");
    const songs = await response.json();
    return songs.length ? shuffleArray(songs) : [];
  } catch (error) {
    console.error("Error loading songs:", error);
    return [];
  }
};

// Function to shuffle the playlist
const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);

const MusicPlayer: React.FC = () => {
  const [playlist, setPlaylist] = useState<{ title: string; src: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch playlist on load
  useEffect(() => {
    const loadSongs = async () => {
      const songs = await fetchSongs();
      if (songs.length) setPlaylist(songs);
    };
    loadSongs();
  }, []);

  // Handle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      console.log("Now Playing:", playlist[currentIndex].src); // Log the actual file URL
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle next song
  const nextSong = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    setIsPlaying(true); // Ensure the new song is marked as playing
  };

  // Handle previous song
  const prevSong = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  // Handle volume change
  const handleVolumeChange = (_: Event, newValue: number | number[]) => {
    const volumeLevel = newValue as number;
    setVolume(volumeLevel);
    if (audioRef.current) {
      audioRef.current.volume = volumeLevel;
    }
  };

  // Handle progress change
  const handleProgressChange = (_: Event, newValue: number | number[]) => {
    const seekTime = (newValue as number) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
    setProgress(seekTime);
  };

  // Update progress bar
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.addEventListener("timeupdate", () => {
        setProgress(audioRef.current!.currentTime);
      });
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current!.duration);
      });
      audioRef.current.addEventListener("ended", nextSong); // Auto-play next song
    }
  }, [currentIndex, volume]);

  if (!playlist.length) {
    return <Typography sx={{ padding: "1rem" }}>🎵 Loading songs...</Typography>;
  }

  return (
    <Card sx={{ width: "100%", margin: "1rem", padding: "1rem", background: "#f5f5f5" }}>
      <CardContent>
        <Typography variant="h6" align="center">
          🎵 {playlist[currentIndex].title}
        </Typography>

        {/* Audio Element */}
        <audio ref={audioRef} src={playlist[currentIndex].src} />

        {/* Controls */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
          <IconButton onClick={prevSong}>
            <SkipPrevious />
          </IconButton>

          <IconButton onClick={togglePlay}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>

          <IconButton onClick={nextSong}>
            <SkipNext />
          </IconButton>
        </Box>

        {/* Progress Bar */}
        <Slider
          value={progress / duration}
          onChange={handleProgressChange}
          min={0}
          max={1}
          step={0.01}
          sx={{ mt: 2 }}
        />

        {/* Timestamps */}
        <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#666" }}>
          <Typography>{new Date(progress * 1000).toISOString().substr(14, 5)}</Typography>
          <Typography>{new Date(duration * 1000).toISOString().substr(14, 5)}</Typography>
        </Box>

        {/* Volume Control */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <VolumeUp sx={{ mr: 1 }} />
          <Slider value={volume} onChange={handleVolumeChange} min={0} max={1} step={0.01} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MusicPlayer;
