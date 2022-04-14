import * as React from 'react';
import { Animated, Dimensions, Image, Text, View, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
import { carouselStyle } from './CarouselPageStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import english from '../../languages/english'
import dutch from './../../languages/dutch';
import german from './../../languages/german';
import data from './CarouselPageData';

const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 2.1;

export default function CarouselPage({ navigation }) {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [language, setLanguage] = React.useState("");

    try {
        AsyncStorage.getItem('@lang', (err, item) => {
            setLanguage(item)
        });
    } catch (error) {
        console.log("Error retrieving data" + error);
    }

    const Indicator = ({ scrollX }) => {
        return <View style={{
            position: 'absolute',
            bottom: 7,
            flexDirection: 'row'

        }}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.8, 1.4, 0.8]
                })
                return <Animated.View
                    key={`indicator-${i}`}
                    style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: "#357C3C",
                        margin: 10,
                        transform: [{
                            scale,
                        }]
                    }}
                />
            })}
        </View>
    }

    return (
        <View style={carouselStyle.container}>
            <StatusBar hidden />
            <Animated.FlatList
                data={data}
                keyExtractor={item => item.key}
                horizontal
                showsHorizontalScrollIndicator={false}
                onSnapToItem={(index) => setCurrentIndex(index)}
                pagingEnabled
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width
                    ];
                    const translateX = scrollX.interpolate({
                        inputRange,
                        outputRange: [-width * .7, 0, width * .7],
                    })
                    return (
                        <View style={{ width, justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
                            <View style={{
                                borderRadius: 18,
                                shadowColor: '#000',
                                shadowOpacity: 0.23,
                                shadowRadius: 2.62,
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                padding: 12,
                                backgroundColor: 'white',
                                elevation: 4,

                            }}>
                                <View style={{
                                    width: ITEM_WIDTH,
                                    height: ITEM_HEIGHT,
                                    overflow: 'hidden',
                                    alignItems: 'center',
                                    borderRadius: 14,
                                }}>
                                    <Animated.Image source={item.photo} style={{
                                        width: ITEM_WIDTH * 1.4,
                                        height: ITEM_HEIGHT / 2.8,
                                        resizeMode: 'contain',
                                        transform: [
                                            {
                                                translateX,
                                            }
                                        ]
                                    }}
                                    />
                                    {
                                        item.key !== 3 ?
                                            <>
                                                {language !== 'english' ?
                                                    language === 'dutch' ?
                                                        <Text style={carouselStyle.cardTitle}>{item.titleNL}</Text>
                                                        :
                                                        <Text style={carouselStyle.cardTitle}>{item.titleDE}</Text>
                                                    :
                                                    <Text style={carouselStyle.cardTitle}>{item.titleEN}</Text>}
                                                <Image source={item.icon} style={carouselStyle.icon}></Image>
                                                {
                                                    language !== 'english' ?
                                                        language === 'dutch' ?
                                                            <Text style={carouselStyle.cardContent}>{item.contentNL}</Text>
                                                            :
                                                            <Text style={carouselStyle.cardContent}>{item.contentDE}</Text>
                                                        :
                                                        <Text style={carouselStyle.cardContent}>{item.contentEN}</Text>
                                                }
                                            </>
                                            :
                                            <>
                                                {language !== 'english' ?
                                                    language === 'dutch' ?
                                                        <Text style={[carouselStyle.cardTitle, { fontSize: 20 }]}>{item.title1NL}</Text>
                                                        :
                                                        <Text style={[carouselStyle.cardTitle, { fontSize: 20 }]}>{item.title1DE}</Text>
                                                    :
                                                    <Text style={[carouselStyle.cardTitle, { fontSize: 20 }]}>{item.title1EN}</Text>}
                                                <View style={carouselStyle.view3Foot}>
                                                    <View style={carouselStyle.viewRow3Foot}>
                                                        <Image style={carouselStyle.iconRow} source={item.iconDutch}></Image>
                                                        {
                                                            language !== 'english' ?
                                                                language === 'dutch' ?
                                                                    <Text style={{ color: 'black' }}>{item.dutchFootContentNL}</Text>
                                                                    :
                                                                    <Text style={{ color: 'black' }}>{item.dutchFootContentDE}</Text>
                                                                :
                                                                <Text style={{ color: 'black' }}>{item.dutchFootContentEN}</Text>
                                                        }
                                                    </View>
                                                    <View style={carouselStyle.viewRow3Foot}>
                                                        <Image style={carouselStyle.iconRow} source={item.iconIdeal}></Image>
                                                        {
                                                            language !== 'english' ?
                                                                language === 'dutch' ?
                                                                    <Text style={{ color: 'black' }}>{item.idealFootContentNL}</Text>
                                                                    :
                                                                    <Text style={{ color: 'black' }}>{item.idealFootContentDE}</Text>
                                                                :
                                                                <Text style={{ color: 'black' }}>{item.idealFootContentEN}</Text>
                                                        }
                                                    </View>
                                                    <View style={carouselStyle.viewRow3Foot}>
                                                        <Image style={carouselStyle.iconRow} source={item.iconPersonal}></Image>
                                                        {
                                                            language !== 'english' ?
                                                                language === 'dutch' ?
                                                                    <Text style={{ color: 'black' }}>{item.personalFootContentNL}</Text>
                                                                    :
                                                                    <Text style={{ color: 'black' }}>{item.personalFootContentDE}</Text>
                                                                :
                                                                <Text style={{ color: 'black' }}>{item.personalFootContentEN}</Text>
                                                        }
                                                    </View>
                                                </View>
                                                {
                                                    language !== 'english' ?
                                                        language === 'dutch' ?
                                                            <Text style={{ color: 'black' }}>{item.content1NL}</Text>
                                                            :
                                                            <Text style={{ color: 'black' }}>{item.content1DE}</Text>
                                                        :
                                                        <Text style={{ color: 'black' }}>{item.content1EN}</Text>
                                                }
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ flex: 1, height: 1, backgroundColor: '#e4e4e4', marginTop: 10 }} />
                                                </View>
                                                {
                                                    language !== 'english' ?
                                                        language === 'dutch' ?
                                                            <>
                                                                <Text style={[carouselStyle.cardTitle, { fontSize: 20, marginTop: 10, marginBottom: 10 }]}>{item.title1NL}</Text>
                                                                <Text style={{ color: 'black' }}>{item.content2NL}</Text>
                                                            </>
                                                            :
                                                            <>
                                                                <Text style={[carouselStyle.cardTitle, { fontSize: 20, marginTop: 10, marginBottom: 10 }]}>{item.title2DE}</Text>
                                                                <Text style={{ color: 'black' }}>{item.content2DE}</Text>
                                                            </>
                                                        :
                                                        <>
                                                            <Text style={[carouselStyle.cardTitle, { fontSize: 20, marginTop: 10, marginBottom: 10 }]}>{item.title2EN}</Text>
                                                            <Text style={{ color: 'black' }}>{item.content2EN}</Text>
                                                        </>
                                                }
                                                <View style={carouselStyle.viewInfo3}>
                                                    <View style={carouselStyle.viewRow3Foot}>
                                                        <Image style={carouselStyle.exclamation} source={require('../../img/exclamation.png')}></Image>
                                                        {
                                                            language !== 'english' ?
                                                                language === 'dutch' ?
                                                                    <Text style={carouselStyle.dataInfo_3}>{item.dataInfo1NL}</Text>
                                                                    :
                                                                    <Text style={carouselStyle.dataInfo_3}>{item.dataInfo1DE}</Text>
                                                                :
                                                                <Text style={carouselStyle.dataInfo_3}>{item.dataInfo1EN}</Text>
                                                        }
                                                    </View>
                                                    <View style={carouselStyle.viewRow3Foot}>
                                                        <Image style={carouselStyle.exclamation} source={require('../../img/exclamation.png')}></Image>
                                                        {
                                                            language !== 'english' ?
                                                                language === 'dutch' ?
                                                                    <Text style={carouselStyle.dataInfo_3}>{item.dataInfo2NL}</Text>
                                                                    :
                                                                    <Text style={carouselStyle.dataInfo_3}>{item.dataInfo2DE}</Text>
                                                                :
                                                                <Text style={carouselStyle.dataInfo_3}>{item.dataInfo2EN}</Text>
                                                        }
                                                    </View>
                                                </View>
                                                <Button style={carouselStyle.cardButton} uppercase={false} onPress={() =>
                                                    navigation.navigate('MainFoot')
                                                }>
                                                    {
                                                        language !== 'english' ?
                                                            language === 'dutch' ?
                                                                <Text style={{ color: 'white' }}>{dutch.pageCarouselButton3}</Text>
                                                                :
                                                                <Text style={{ color: 'white' }}>{german.pageCarouselButton3}</Text>
                                                            :
                                                            <Text style={{ color: 'white' }}>{english.pageCarouselButton3}</Text>
                                                    }
                                                </Button>
                                            </>
                                    }
                                </View>
                                <Image
                                    source={item.paginator} style={carouselStyle.iconPaginator}
                                />
                            </View>
                        </View>
                    );
                }}
            />
            <Indicator scrollX={scrollX} />
        </View>
    );
}
