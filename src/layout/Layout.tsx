// eslint-disable-next-line prettier/prettier
import React from 'react'
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native'

interface LayoutProps {
	children: React.ReactNode
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff'
	},
	scroll: {
		flexGrow: 1
	},
	main: {
		flex: 1,
		position: 'relative',

		minHeight: 694,
		backgroundColor: '#faf9f9',
		borderBlockColor: 'red'
	}
})

const Layout = ({children}: LayoutProps) => (
	<SafeAreaView style={styles.container}>
		<StatusBar backgroundColor="#faf9f9" barStyle="dark-content" />
		{/* <ScrollView style={styles.scroll}> */}
		<View style={styles.main}>{children}</View>
		{/* </ScrollView> */}
	</SafeAreaView>
)

export default Layout
