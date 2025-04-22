import { useFavouriteTracks } from '@/store/library'
import { useCallback } from 'react'
import TrackPlayer, { useActiveTrack } from 'react-native-track-player'

export const useTrackPlayerFavourites = () => {
	const activeTrack = useActiveTrack()
	const { favouriteTracks, toggleTrackFavorite } = useFavouriteTracks()

	const isFavourite = favouriteTracks.find((track) => track.url === activeTrack?.url)?.rating === 1

	const toggleFavorite = useCallback(async () => {
		const id = await TrackPlayer.getActiveTrackIndex()

		console.log('ID', id)

		if (id == null) return

		// here we are updating track player internal state
		await TrackPlayer.updateMetadataForTrack(id, {
			rating: isFavourite ? 0 : 1,
		})

		// here we are updating application internal state
		if (activeTrack) {
			toggleTrackFavorite(activeTrack)
		}
	}, [isFavourite, toggleTrackFavorite, activeTrack])

	return { isFavourite, toggleFavorite }
}
