import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Playlist } from '@/helpers/types'
import { defaultStyles } from '@/styles'
import { fontSize } from '@/constants/tokens'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { trackTitleFilter } from '@/helpers/filter'
import TrackList from './TrackList'
import { generateTrackListId } from '@/helpers/miscellaneous'
import FastImage from 'react-native-fast-image'
import QueueControls from './QueueControls'
import CustomSearchHeader from './CustomSearchHeader'

const PlaylistTrackList = ({ playlist }: { playlist: Playlist }) => {
	const { search, setSearch } = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs...',
		},
	})

	const filteredTracks = React.useMemo(() => {
		return playlist.tracks.filter(trackTitleFilter(search))
	}, [search, playlist.tracks])

	return (
		<>
			<View
				style={{
					paddingHorizontal: 0,
					flexDirection: 'row',
					marginBottom: 10,
				}}
			>
				{Platform.OS === 'android' && (
					<CustomSearchHeader
						query={search}
						onQueryChange={setSearch}
						placeholder="Find in songs..."
					/>
				)}
			</View>
			<TrackList
				id={generateTrackListId(playlist.name, search)}
				scrollEnabled={false}
				tracks={filteredTracks}
				hideQueueControls={true}
				ListHeaderComponent={
					<View style={styles.playlistHeaderContainer}>
						<View style={styles.artworkImageContainer}>
							<FastImage
								source={{
									uri: playlist.artworkPreview,
									priority: FastImage.priority.high,
								}}
								style={styles.playlistImage}
							/>
						</View>
						<Text numberOfLines={1} style={styles.playlistNameText}>
							{playlist.name}
						</Text>
						{search.length === 0 && (
							<QueueControls tracks={filteredTracks} style={{ paddingTop: 24 }} />
						)}
					</View>
				}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	playlistHeaderContainer: {
		flex: 1,
		marginBottom: 32,
	},
	artworkImageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: 300,
	},
	playlistImage: {
		width: '85%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 12,
	},
	playlistNameText: {
		...defaultStyles.text,
		marginTop: 22,
		textAlign: 'center',
		fontSize: fontSize.lg,
		fontWeight: 'bold',
	},
})

export default PlaylistTrackList
