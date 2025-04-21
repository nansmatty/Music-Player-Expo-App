import { useCallback, useLayoutEffect, useState } from 'react'
import { SearchBarProps } from 'react-native-screens'
import { colors } from '@/constants/tokens'
import { useNavigation } from 'expo-router'
import { Platform } from 'react-native'

const defaultSearchOptions: SearchBarProps = {
	tintColor: colors.primary,
	hideWhenScrolling: true,
}

export const useNavigationSearch = ({
	searchBarOptions,
}: {
	searchBarOptions?: SearchBarProps
}) => {
	const [search, setSearch] = useState('')

	const navigation = useNavigation()

	const handleOnChangeText: SearchBarProps['onChangeText'] = useCallback(
		({ nativeEvent: { text } }: { nativeEvent: { text: string } }) => {
			setSearch(text)
		},
		[],
	)

	//NOTE: When I am using the previous version of handleOnChangeText in the useLayoutEffect dependency array, dont have the handleOnChangeText function included

	useLayoutEffect(() => {
		if (Platform.OS === 'ios') {
			navigation.setOptions({
				headerSearchBarOptions: {
					...defaultSearchOptions,
					...searchBarOptions,
					onChangeText: handleOnChangeText,
				},
			})
		} else {
			navigation.setOptions({
				headerSearchBarOptions: undefined,
			})
		}
	}, [navigation, searchBarOptions, handleOnChangeText])

	return { search, setSearch }
}
