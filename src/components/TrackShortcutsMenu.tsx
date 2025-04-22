import { StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import TrackPlayer, { Track } from 'react-native-track-player'
import { MenuView } from '@react-native-menu/menu'
import { match } from 'ts-pattern'
import { useFavouriteTracks } from '@/store/library'
import { useQueue } from '@/store/queue'
import { useRouter } from 'expo-router'

type TrackShortcutsMenuProps = PropsWithChildren<{ track: Track }>

const TrackShortcutsMenu = ({ track, children }: TrackShortcutsMenuProps) => {
	const router = useRouter()
	const isFavourite = track.rating === 1

	const { toogleTrackFavorite } = useFavouriteTracks()
	const { activeQueueId } = useQueue()

	const handlePressAction = (id: string) => {
		match(id)
			.with('add-to-favourite', async () => {
				toogleTrackFavorite(track)

				// if the track is not in the favourite queue, then add it
				if (activeQueueId?.startsWith('favourite')) {
					await TrackPlayer.add(track)
				}
			})
			.with('remove-from-favourite', async () => {
				toogleTrackFavorite(track)

				// if the track is in the favourite queue, we need to remove it
				if (activeQueueId?.startsWith('favourite')) {
					const queue = await TrackPlayer.getQueue()
					const trackToRemove = queue.findIndex((queueTrack) => queueTrack.url === track.url)
					await TrackPlayer.remove(trackToRemove)
				}
			})
			.with('add-to-playlist', () => {
				// this will open the add to playlist modal
				//@ts-expect-error
				router.push({ pathname: '/modals/addToPlaylist', params: { trackUrl: track.url } })
			})
			.otherwise(() => console.warn('Unknown menu action: ', id))
	}

	return (
		<MenuView
			onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
			actions={[
				{
					id: isFavourite ? 'remove-from-favourite' : 'add-to-favourite',
					title: isFavourite ? 'Remove from favourite' : 'Add to favourite',
					image: isFavourite ? 'star.fill' : 'star',
				},
				{
					id: 'add-to-playlist',
					title: 'Add to playlist',
					image: 'plus',
				},
			]}
		>
			{children}
		</MenuView>
	)
}

export default TrackShortcutsMenu
