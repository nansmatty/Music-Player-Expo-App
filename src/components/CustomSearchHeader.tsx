// components/CustomSearchHeader.tsx
import React from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '@/constants/tokens'

interface CustomSearchHeaderProps {
	query: string
	onQueryChange: (text: string) => void
	placeholder?: string
}

const CustomSearchHeader = ({
	query,
	onQueryChange,
	placeholder = 'Search...',
}: CustomSearchHeaderProps) => {
	return (
		<View style={styles.container}>
			<Ionicons name="search" size={20} color={colors.text} />
			<TextInput
				style={styles.input}
				placeholder={placeholder}
				placeholderTextColor={colors.text + '80'}
				value={query}
				onChangeText={onQueryChange}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.textMuted,
		borderRadius: 10,
		paddingHorizontal: 12,
		height: 40,
		marginBottom: 10,
		flex: 1,
	},
	input: {
		flex: 1,
		marginLeft: 8,
		color: colors.text,
		fontSize: 16,
	},
})

export default CustomSearchHeader
