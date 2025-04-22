import React, { useMemo } from 'react'
import { View, ScrollView, Platform } from 'react-native'
import { defaultStyles } from '@/styles'
import TrackList from '@/components/TrackList'
import { screenPadding } from '@/constants/tokens'
import CustomSearchHeader from '@/components/CustomSearchHeader'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useFavouriteTracks } from '@/store/library'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTrackListId } from '@/helpers/miscellaneous'

const FavouritesScreen = () => {
	const { search, setSearch } = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs...',
		},
	})

	const { favouriteTracks } = useFavouriteTracks()

	const favouriteFilteredTracks = useMemo(() => {
		if (!search) return favouriteTracks

		const lower = search.toLowerCase()

		return favouriteTracks.filter(trackTitleFilter(lower))
	}, [search, favouriteTracks])

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
					id={generateTrackListId('favourites', search)}
					tracks={favouriteFilteredTracks}
					scrollEnabled={false}
				/>
			</ScrollView>
		</View>
	)
}

export default FavouritesScreen
