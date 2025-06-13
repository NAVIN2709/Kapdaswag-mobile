import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function _layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarButton: (props:any) => (
                    <TouchableWithoutFeedback {...props}>
                        <View style={props.style}>
                            {props.children}
                        </View>
                    </TouchableWithoutFeedback>
                ),
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons size={27} name={focused ? "home" : "home-outline"} />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ fontSize:10,color: focused ? 'deeppink' : 'black' }}>
                            Home
                        </Text>
                    ),
                }}
            />
            <Tabs.Screen
                name="likes"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons size={27} name={focused ? "heart" : "heart-outline"} />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{fontSize:10, color: focused ? 'deeppink' : 'black' }}>
                            Likes
                        </Text>
                    ),
                }}
            />
            <Tabs.Screen
                name="chatlist"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons size={27} name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"} />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{fontSize:10, color: focused ? 'deeppink' : 'black' }}>
                            Chats
                        </Text>
                    ),
                }}
            />
            <Tabs.Screen
                name="community"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons size={27} name={focused ? "people" : "people-outline"} />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{fontSize:10, color: focused ? 'deeppink' : 'black', width:60}}>
                            Swaggers
                        </Text>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons size={27} name={focused ? "person" : "person-outline"} />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{fontSize:10, color: focused ? 'deeppink' : 'black' }}>
                            Youu
                        </Text>
                    ),
                }}
            />
        </Tabs>
    );
}