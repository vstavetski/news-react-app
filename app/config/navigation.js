import React from "react";
import { createStackNavigator, HeaderBackButton } from 'react-navigation';
import HomeScreen from '../screen/HomeScreen';
import ArticlePreviewScreen from '../screen/ArticlePreviewScreen';

const AppStackNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        ArticlePreview: {
            screen: ArticlePreviewScreen,
            navigationOptions: ({navigation}) => ({
                title: 'Mega News',
                headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
            })
        },
    },
    {
        initialRouteName: "Home",
    }
);

export default AppStackNavigator;
