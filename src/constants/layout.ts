import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { colors, fontSize } from './tokens'
import { Platform } from 'react-native'

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
	...(Platform.OS === 'ios' && {
		headerLargeTitle: true,
		headerLargeStyle: {
			backgroundColor: colors.background,
		},
		headerLargeTitleStyle: {
			color: colors.text,
		},
		headerBlurEffect: 'prominent',
		headerTransparent: true,
	}),

	...(Platform.OS === 'android' && {
		headerStyle: {
			backgroundColor: colors.background,
			...Platform.select({
				android: {
					elevation: 0,
				},
			}),
		},
		headerTransparent: false,
		headerTitleStyle: {
			fontSize: fontSize['2xl'],
			color: colors.text,
			fontWeight: '700',
		},
	}),

	headerTintColor: colors.text,
	headerShadowVisible: false,
}
