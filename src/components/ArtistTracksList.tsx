import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Artist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { trackTitleFilter } from '@/helpers/filter'
import TrackList from './TrackList'
import { generateTrackListId } from '@/helpers/miscellaneous'
import FastImage from 'react-native-fast-image'
import { unknownArtistImageUri } from '@/constants/images'
import { defaultStyles } from '@/styles'
import { fontSize } from '@/constants/tokens'
import QueueControls from './QueueControls'

const ArtistTracksList = ({ artist }: { artist: Artist }) => {
	const { search } = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs...',
		},
	})

	const filteredTracks = React.useMemo(() => {
		return artist.tracks.filter(trackTitleFilter(search))
	}, [search, artist.tracks])

	return (
		<TrackList
			id={generateTrackListId(artist.name, search)}
			scrollEnabled={false}
			tracks={filteredTracks}
			hideQueueControls={true}
			ListHeaderComponent={
				<View style={styles.artistHeaderContainer}>
					<View style={styles.artworkImageContainer}>
						<FastImage
							source={{
								uri: unknownArtistImageUri,
								priority: FastImage.priority.high,
							}}
							style={styles.artistImage}
						/>
					</View>
					<Text numberOfLines={1} style={styles.artistNameText}>
						{artist.name}
					</Text>
					{search.length === 0 && (
						<QueueControls tracks={filteredTracks} style={{ paddingTop: 24 }} />
					)}
				</View>
			}
		/>
	)
}

const styles = StyleSheet.create({
	artistHeaderContainer: {
		flex: 1,
		marginBottom: 32,
	},
	artworkImageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: 200,
	},
	artistImage: {
		width: '60%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 128,
	},
	artistNameText: {
		...defaultStyles.text,
		marginTop: 22,
		textAlign: 'center',
		fontSize: fontSize.lg,
		fontWeight: 'bold',
	},
})

export default ArtistTracksList
