import { Artist } from '@/helpers/types'

export const trackTitleFilter = (trackTitle: string) => (track: any) =>
	track.title?.toLowerCase().includes(trackTitle.toLowerCase())

export const artistNameFilter = (artistName: string) => (artist: Artist) =>
	artist.name.toLowerCase().includes(artistName.toLowerCase())
