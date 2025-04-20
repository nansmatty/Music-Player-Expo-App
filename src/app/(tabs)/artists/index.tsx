import { View, Text, FlatList, Platform, TouchableHighlight, StyleSheet } from 'react-native'
import React from 'react'
import { defaultStyles, utilsStyles } from '@/styles'
import { ScrollView } from 'react-native-gesture-handler'
import { screenPadding } from '@/constants/tokens'
import { useArtists } from '@/store/library'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import CustomSearchHeader from '@/components/CustomSearchHeader'
import { artistNameFilter } from '@/helpers/filter'
import FastImage from 'react-native-fast-image'
import { unknownArtistImageUri } from '@/constants/images'
import { Link } from 'expo-router'

const ItemDivider = () => (
	<View
		style={{
			...utilsStyles.itemSperator,
			marginVertical: 9,
			marginLeft: 60,
		}}
	/>
)

const ArtistsScreen = () => {
	const { search, setSearch } = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in artists...',
		},
	})

	const artists = useArtists()

	const filteredArtists = React.useMemo(() => {
		if (!search) return artists

		return artists.filter(artistNameFilter(search))
	}, [search, artists])

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
						placeholder="Find in artists..."
					/>
				)}
			</View>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<FlatList
					contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
					data={filteredArtists}
					scrollEnabled={false}
					ItemSeparatorComponent={ItemDivider}
					ListFooterComponent={ItemDivider}
					ListEmptyComponent={
						<View>
							<Text style={utilsStyles.emptyContentText}>No artists found.</Text>
							<FastImage
								source={{
									uri: unknownArtistImageUri,
									priority: FastImage.priority.normal,
								}}
								style={utilsStyles.emptyContentImage}
							/>
						</View>
					}
					renderItem={({ item: artist }) => (
						<Link href={{ pathname: '/artists/[name]', params: { name: artist.name } }} asChild>
							<TouchableHighlight activeOpacity={0.8}>
								<View style={styles.artistItemContainer}>
									<View>
										<FastImage
											source={{
												uri: unknownArtistImageUri,
												priority: FastImage.priority.normal,
											}}
											style={styles.artistImage}
										/>
									</View>
									<View style={{ width: '100%' }}>
										<Text numberOfLines={1} style={styles.artistNameText}>
											{artist.name}
										</Text>
									</View>
								</View>
							</TouchableHighlight>
						</Link>
					)}
				/>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	artistItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
	},
	artistImage: {
		borderRadius: 32,
		width: 40,
		height: 40,
	},
	artistNameText: {
		...defaultStyles.text,
		fontSize: 17,
		maxWidth: '80%',
	},
})

export default ArtistsScreen
