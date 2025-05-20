import React from 'react'
import {Text, View} from 'react-native'
import Layout from '../layout/Layout'
import FloatingUtils from '../components/common/FloatingUtils'

export default function HomeScreen() {
	return (
		<Layout>
			<FloatingUtils />
			<View>
				<Text>HomeScreen</Text>
			</View>
		</Layout>
	)
}
