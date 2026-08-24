import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function PublicLayout() {
  return (
   <Stack screenOptions={{
    headerShown:false
   }}>
    <Stack.Screen name='welcome' options={{headerShown:false}}/>
    <Stack.Screen name='sign-up' options={{headerShown:false}}/>
   </Stack>
  )
}