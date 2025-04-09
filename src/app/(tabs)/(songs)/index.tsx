import { View, ScrollView, Platform } from 'react-native'
import React from 'react'
import library from '@/assets/data/library.json'
import { defaultStyles } from '@/styles'
import TrackList from '@/components/TrackList'
import { screenPadding } from '@/constants/tokens'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { trackTitleFilter } from '@/helpers/filter'
import CustomSearchHeader from '@/components/CustomSearchHeader'

const SongsScreen = () => {
	const { search, setSearch } = useNavigationSearch({})

	const filteredTracks = React.useMemo(() => {
		if (!search) return library

		const lower = search.toLowerCase()

		return library.filter(trackTitleFilter(lower))
	}, [search])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<View>
					{Platform.OS === 'android' && (
						<CustomSearchHeader
							query={search}
							onQueryChange={setSearch}
							placeholder="Search for songs..."
						/>
					)}
				</View>
				<TrackList tracks={filteredTracks} scrollEnabled={false} />
			</ScrollView>
		</View>
	)
}

export default SongsScreen
