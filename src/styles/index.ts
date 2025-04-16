import { colors, fontSize } from '@/constants/tokens'
import { StyleSheet } from 'react-native'

export const defaultStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	text: {
		fontSize: fontSize.base,
		color: colors.text,
	},
})

export const utilsStyles = StyleSheet.create({
	itemSperator: {
		borderColor: colors.textMuted,
		borderWidth: StyleSheet.hairlineWidth,
		opacity: 0.3,
	},
	emptyContentText: {
		...defaultStyles.text,
		textAlign: 'center',
		marginTop: 10,
		color: colors.textMuted,
	},
	emptyContentImage: {
		width: 200,
		height: 200,
		marginTop: 40,
		alignSelf: 'center',
		opacity: 0.3,
	},
})
