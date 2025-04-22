import { View, ScrollView, Platform } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/styles'
import { screenPadding } from '@/constants/tokens'
import CustomSearchHeader from '@/components/CustomSearchHeader'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { usePlaylists } from '@/store/library'
import { playlistNameFilter } from '@/helpers/filter'
import { Playlist } from '@/helpers/types'
import { useRouter } from 'expo-router'
import PlaylistList from '@/components/PlaylistList'

const PlaylistsScreen = () => {
	const router = useRouter()

	const { search, setSearch } = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in playlist...',
		},
	})

	const { playlists } = usePlaylists()

	const filteredPlaylists = React.useMemo(() => {
		if (!search) return playlists

		return playlists.filter(playlistNameFilter(search))
	}, [search, playlists])

	const handlePlaylistPress = (playlist: Playlist) => {
		router.push({ pathname: '/(tabs)/playlists/[name]', params: { name: playlist.name } })
	}

	return (
		<View style={defaultStyles.container}>
			<View
				style={{
					paddingHorizontal: 15,
					flexDirection: 'row',
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
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<PlaylistList
					scrollEnabled={false}
					playlists={filteredPlaylists}
					onPlaylistPress={handlePlaylistPress}
				/>
			</ScrollView>
		</View>
	)
}

export default PlaylistsScreen
