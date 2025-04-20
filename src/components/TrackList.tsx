import { FlatList, FlatListProps, Text, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import TrackListItem from '@/components/TrackListItem'
import { utilsStyles } from '@/styles'
import TrackPlayer, { Track } from 'react-native-track-player'
import FastImage from 'react-native-fast-image'
import { unknownTrackImageUri } from '@/constants/images'
import { useQueue } from '@/store/queue'
import QueueControls from './QueueControls'

export type TrackListProps = Partial<FlatListProps<Track>> & {
	id: string
	tracks: Track[]
	hideQueueControls?: boolean
}

const ItemDivider = () => (
	<View
		style={{
			...utilsStyles.itemSperator,
			marginVertical: 9,
			marginLeft: 60,
		}}
	/>
)

const TrackList = ({ id, tracks, hideQueueControls = false, ...flatlistProps }: TrackListProps) => {
	const queueOffset = useRef(0)
	const { activeQueueId, setActiveQueueId } = useQueue()

	// console.log('current id:', id)
	// console.log('active queue id:', activeQueueId)
	// console.log('tracks length:', tracks.length)

	const handleTrackSelect = useCallback(
		async (selectedTrack: Track) => {
			const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.url)

			if (trackIndex === -1) return

			const isChangingQueue = !activeQueueId || id !== activeQueueId

			if (isChangingQueue) {
				// console.log(`Rebuilding and Changing queue from ${activeQueueId} to ${selectedTrack.title}`)

				const beforeTracks = tracks.slice(0, trackIndex)
				const afterTracks = tracks.slice(trackIndex + 1)

				await TrackPlayer.reset()
				// we construct the new queue with the selected track first
				await TrackPlayer.add(selectedTrack)
				await TrackPlayer.add(afterTracks)
				await TrackPlayer.add(beforeTracks)

				await TrackPlayer.play()

				queueOffset.current = trackIndex
				setActiveQueueId(id)
			} else {
				// console.log(`Changing track to ${selectedTrack.title}`)

				const nextTrackIndex =
					trackIndex - queueOffset.current < 0
						? tracks.length + trackIndex - queueOffset.current
						: trackIndex - queueOffset.current

				await TrackPlayer.skip(nextTrackIndex)
				await TrackPlayer.play()
			}
		},
		[activeQueueId, id, setActiveQueueId, tracks],
	)

	const renderItem = useCallback(
		({ item }: { item: Track }) => <TrackListItem track={item} onTrackSelect={handleTrackSelect} />,
		[handleTrackSelect],
	)

	return (
		<View>
			<FlatList
				data={tracks}
				contentContainerStyle={{
					paddingTop: 10,
					paddingBottom: 128,
				}}
				ListHeaderComponent={
					!hideQueueControls ? (
						<QueueControls tracks={tracks} style={{ paddingBottom: 20 }} />
					) : undefined
				}
				ListFooterComponent={ItemDivider}
				ItemSeparatorComponent={ItemDivider}
				ListEmptyComponent={
					<View>
						<Text style={utilsStyles.emptyContentText}>No songs found.</Text>
						<FastImage
							source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
							style={utilsStyles.emptyContentImage}
						/>
					</View>
				}
				renderItem={renderItem}
				keyExtractor={(item) => item.id || item.url}
				{...flatlistProps}
			/>
		</View>
	)
}

export default TrackList
