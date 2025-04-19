import { TrackWithPlaylist } from '@/helpers/types'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'
import library from '@/assets/data/library.json'
import { useMemo } from 'react'

interface LibraryState {
	tracks: TrackWithPlaylist[]
	toggleTrackFavorite: (track: Track) => void
	addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>((set) => ({
	tracks: library,
	toggleTrackFavorite: () => {},
	addToPlaylist: () => {},
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useFavoriteTracks = () => {
	const tracks = useTracks()

	const favouriteTracks = useMemo(() => {
		return tracks.filter((track) => track.rating === 1)
	}, [tracks])
	const toogleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite)
	return { favouriteTracks, toogleTrackFavorite }
}
