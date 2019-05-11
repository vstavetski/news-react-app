import React from 'react';
import { ScrollView, ActivityIndicator, View } from 'react-native';
import { API_KEY } from '../config/constants';
import AppHeader from '../components/AppHeader';
import { ListItem } from 'react-native-elements/src/index';
import { getDateString } from '../utils';

class HomeScreen extends React.Component {
    state = {
        isLoading: true,
        articles: [],
    };

    static navigationOptions = { header: null };

    componentDidMount() {
        this.update();
    };

    update = () => {
        this.setState({
            isLoading: true,
        });

        fetch(`https://newsapi.org/v2/everything?q=bitcoin&language=ru&pageSize=50&apiKey=${ API_KEY }`)
            .then(res => res.json())
            .then(json => {
                const articles = json.articles
                    .map(article => ({
                        img: article.urlToImage,
                        title: article.title,
                        date: article.publishedAt,
                        description: article.description,
                        url: article.url,
                    }));

                this.setState({
                    isLoading: false,
                    articles,
                })
            })
            .catch((e) => {
                console.log('Cannot get articles from web.', e);
            })
    };

    render() {
        const { navigation } = this.props;
        const { isLoading, articles } = this.state;

        const articleItems = articles.map((article, index) => (
            <ListItem
                key={ index }
                title={ article.title }
                subtitle={ getDateString(article.date) }
                leftAvatar={ { source: { uri: article.img } } }
                onPress={() => {
                    navigation.navigate('ArticlePreview', {
                        article: article,
                    });
                }}
            />
        ));

        return (
            <View>
                <AppHeader
                    onUpdate={ this.update }
                />

                { isLoading ? (
                    <ActivityIndicator
                        size="large"
                    />
                ) : (
                    <ScrollView>
                        <View>
                            { articleItems }
                        </View>
                    </ScrollView>
                ) }
            </View>
        );
    }
}

export default HomeScreen;