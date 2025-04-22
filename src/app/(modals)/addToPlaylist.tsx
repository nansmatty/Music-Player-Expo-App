import PlaylistList from '@/components/PlaylistList'
import { Playlist } from '@/helpers/types'
import { usePlaylists, useTracks } from '@/store/library'
import { useQueue } from '@/store/queue'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import TrackPlayer, { Track } from 'react-native-track-player'
import { useHeaderHeight } from '@react-navigation/elements'
import { Platform, StyleSheet, View } from 'react-native'
import { defaultStyles } from '@/styles'
import { screenPadding } from '@/constants/tokens'
import CustomSearchHeader from '@/components/CustomSearchHeader'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import React from 'react'
import { playlistNameFilter } from '@/helpers/filter'

const AddToPlaylistModal = () => {
	const router = useRouter()
	const headerHeight = useHeaderHeight()
	const { activeQueueId } = useQueue()
	const { trackUrl } = useLocalSearchParams<{ trackUrl: Track['url'] }>()
	const tracks = useTracks()
	const { playlists, addToPlaylist } = usePlaylists()

	const { search, setSearch } = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in playlist...',
		},
	})

	const track = tracks.find((currentTrack) => trackUrl === currentTrack.url)

	if (!track) return null

	const availablePlaylists = playlists.filter(
		(playlist) => !playlist.tracks.some((playlistTrack) => playlistTrack.url === trackUrl),
	)

	const filteredPlaylists = React.useMemo(() => {
		if (!search) return availablePlaylists

		return availablePlaylists.filter(playlistNameFilter(search))
	}, [search, availablePlaylists])

	const handlePlaylistPress = async (playlist: Playlist) => {
		addToPlaylist(track, playlist.name)
		router.dismiss()

		//if the current queue is the playlist we're adding to, add the track at the end of the queue
		if (activeQueueId?.startsWith(playlist.name)) {
			await TrackPlayer.add(track)
		}
	}

	return (
		<SafeAreaView style={[styles.modalContainer]}>
			<View
				style={{
					flexDirection: 'row',
					marginTop: -30,
					marginBottom: 10,
				}}
			>
				{Platform.OS === 'android' && (
					<CustomSearchHeader
						query={search}
						onQueryChange={setSearch}
						placeholder="Find in playlist..."
					/>
				)}
			</View>
			<PlaylistList playlists={filteredPlaylists} onPlaylistPress={handlePlaylistPress} />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
	},
})

export default AddToPlaylistModal
