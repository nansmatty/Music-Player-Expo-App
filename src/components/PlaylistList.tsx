import { FlatList, FlatListProps, Text, View } from 'react-native'
import React from 'react'
import { Playlist } from '@/helpers/types'
import { utilsStyles } from '@/styles'
import FastImage from 'react-native-fast-image'
import { unknownTrackImageUri } from '@/constants/images'
import PlaylistListItem from '@/components/PlaylistListItem'

type PlaylistListProps = {
	playlists: Playlist[]
	onPlaylistPress: (playlist: Playlist) => void
} & Partial<FlatListProps<Playlist>>

const ItemDivider = () => (
	<View
		style={{
			...utilsStyles.itemSperator,
			marginVertical: 12,
			marginLeft: 80,
		}}
	/>
)

const PlaylistList = ({
	playlists,
	onPlaylistPress: handlePlaylistPress,
	...flatListProps
}: PlaylistListProps) => {
	// const renderItem = useCallback(
	// 	({ playlist }: { playlist: Playlist }) => (
	// 		<PlaylistListItem playlist={playlist} onPress={() => handlePlaylistPress(playlist)} />
	// 	),
	// 	[handlePlaylistPress],
	// )

	return (
		<FlatList
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ItemSeparatorComponent={ItemDivider}
			ListFooterComponent={ItemDivider}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyContentText}>No playlist found.</Text>
					<FastImage
						source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
						style={utilsStyles.emptyContentImage}
					/>
				</View>
			}
			data={playlists}
			renderItem={({ item: playlist }) => (
				<PlaylistListItem playlist={playlist} onPress={() => handlePlaylistPress(playlist)} />
			)}
			{...flatListProps}
		/>
	)
}

export default PlaylistList
