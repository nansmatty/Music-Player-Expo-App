import { FlatList, FlatListProps, Text, View } from 'react-native'
import React from 'react'
import TrackListItem from '@/components/TrackListItem'
import { utilsStyles } from '@/styles'
import TrackPlayer, { Track } from 'react-native-track-player'
import FastImage from 'react-native-fast-image'
import { unknownTrackImageUri } from '@/constants/images'

export type TrackListProps = Partial<FlatListProps<Track>> & { tracks: Track[] }

const ItemDivider = () => (
	<View
		style={{
			...utilsStyles.itemSperator,
			marginVertical: 9,
			marginLeft: 60,
		}}
	/>
)

const TrackList = ({ tracks, ...flatlistProps }: TrackListProps) => {
	// const { search, setSearch } = useNavigationSearch({})

	// const filteredTracks = React.useMemo(() => {
	// 	const lower = search.toLowerCase()

	// 	return library.filter(trackTitleFilter(lower))
	// }, [search])

	const handleTrackSelect = async (track: Track) => {
		await TrackPlayer.load(track)
		await TrackPlayer.play()
	}

	return (
		<View>
			{/* {Platform.OS === 'android' && (
				<CustomSearchHeader
					query={search}
					onQueryChange={setSearch}
					placeholder="Search for songs..."
				/>
			)} */}
			<FlatList
				data={tracks}
				contentContainerStyle={{
					paddingTop: 10,
					paddingBottom: 128,
				}}
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
				renderItem={({ item: track }) => (
					<TrackListItem track={track} onTrackSelect={handleTrackSelect} />
				)}
				keyExtractor={(item: any, index) => item.id || index.toString()}
				{...flatlistProps}
			/>
		</View>
	)
}

export default TrackList
