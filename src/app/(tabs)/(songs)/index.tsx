import { View, ScrollView, Platform } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/styles'
import TrackList from '@/components/TrackList'
import { screenPadding } from '@/constants/tokens'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { trackTitleFilter } from '@/helpers/filter'
import CustomSearchHeader from '@/components/CustomSearchHeader'
import { useTracks } from '@/store/library'
import { generateTrackListId } from '@/helpers/miscellaneous'

const SongsScreen = () => {
	const { search, setSearch } = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs...',
		},
	})

	const tracks = useTracks()

	const filteredTracks = React.useMemo(() => {
		if (!search) return tracks

		const lower = search.toLowerCase()

		return tracks.filter(trackTitleFilter(lower))
	}, [search, tracks])

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
						placeholder="Find in songs..."
					/>
				)}
			</View>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<TrackList
					id={generateTrackListId('songs', search)}
					tracks={filteredTracks}
					scrollEnabled={false}
				/>
			</ScrollView>
		</View>
	)
}

export default SongsScreen
