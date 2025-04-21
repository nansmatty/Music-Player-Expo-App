import { Artist, Playlist } from '@/helpers/types'

export const trackTitleFilter = (trackTitle: string) => (track: any) =>
	track.title?.toLowerCase().includes(trackTitle.toLowerCase())

export const artistNameFilter = (artistName: string) => (artist: Artist) =>
	artist.name.toLowerCase().includes(artistName.toLowerCase())

export const playlistNameFilter = (playlistName: string) => (playlist: Playlist) =>
	playlist.name.toLowerCase().includes(playlistName.toLowerCase())
