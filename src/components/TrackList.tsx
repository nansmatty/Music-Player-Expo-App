import { FlatList, FlatListProps, View } from 'react-native'
import React from 'react'
import library from '@/assets/data/library.json'
import TrackListItem from './TrackListItem'
import { utilsStyles } from '@/styles'

export type TrackListProps = Partial<FlatListProps<unknown>>

const ItemDivider = () => (
	<View
		style={{
			...utilsStyles.itemSperator,
			marginVertical: 9,
			marginLeft: 60,
		}}
	/>
)

const TrackList = ({ ...flatlistProps }: TrackListProps) => {
	return (
		<FlatList
			data={library}
			ItemSeparatorComponent={ItemDivider}
			renderItem={({ item: track }) => (
				<TrackListItem
					track={{
						...track,
						image: track.artwork,
					}}
				/>
			)}
			{...flatlistProps}
		/>
	)
}

export default TrackList
