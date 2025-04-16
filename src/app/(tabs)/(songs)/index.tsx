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
				<TrackList tracks={filteredTracks} scrollEnabled={false} />
			</ScrollView>
		</View>
	)
}

export default SongsScreen
