import { FlatList, FlatListProps, View } from 'react-native'
import React from 'react'
import TrackListItem from './TrackListItem'
import { utilsStyles } from '@/styles'

export type TrackListProps = Partial<FlatListProps<any>> & { tracks: any[] }

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
				renderItem={({ item: track }) => (
					<TrackListItem
						track={{
							...track,
							image: track.artwork,
						}}
					/>
				)}
				keyExtractor={(item: any, index) => item.id || index.toString()}
				{...flatlistProps}
			/>
		</View>
	)
}

export default TrackList
