import * as React from 'react';
import { Animated, Dimensions, Image, Text, View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { carouselStyle } from './CarouselPageStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import english from '../../languages/english'
import dutch from './../../languages/dutch';
import german from './../../languages/german';

const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 2;
const data = [
    {
        key: 1,
        titleEN: "AR Experience",
        titleNL: "AR Ervaring",
        titleDE: "AR Erfahrung",
        photo: require('./carousel1.png'),
        icon: require('./cubeCarousel.png'),
        paginator: require('./1.png'),
        contentEN: 'Aim your camera towards the floriade map and you will see a foot appear. This foot will show you how big of a piece of ground a person needs to live. Using the feet in the top-right corner you can switch between different sizes.',
        contentNL: 'Richt je camera op de kaart van Florida en je ziet een voet verschijnen. Deze voet laat zien hoe groot een stuk grond is dat iemand nodig heeft om te leven. Met de voetjes in de rechterbovenhoek kun je wisselen tussen verschillende maten.',
        contentDE: 'Richten Sie Ihre Kamera auf die Floriade-Karte und Sie werden einen Fuß sehen. Dieser Fuß zeigt Ihnen, wie viel Boden ein Mensch zum Leben braucht. Mit den Füßen in der oberen rechten Ecke können Sie zwischen verschiedenen Größen wechseln.'

    },
    {
        key: 2,
        titleEN: 'Map Experience',
        titleNL: 'Kaartervaring',
        titleDE: 'Kartenerfahrung',
        photo: require('./carousel2.png'),
        icon: require('./mapCarousel.png'),
        paginator: require('./2.png'),
        contentEN: 'Two feet will be shown on the map in your screen. These foot will show the average dutch carbon footprint (in red) and the perfect one (in green). The blue point will be showing where you are located. While wandering about you will be able to see here if you are in one of the feet. This way you can get a feeling of the size of these feet and how much area you need.',
        contentNL: 'Twee voeten worden weergegeven op de kaart in uw scherm. Deze voet toont de gemiddelde Nederlandse CO2-voetafdruk (in rood) en de perfecte (in groen). Het blauwe punt geeft aan waar u zich bevindt. Terwijl je ronddwaalt, kun je hier zien of je in een van de voeten zit. Op deze manier kunt u een idee krijgen van de grootte van deze voeten en hoeveel ruimte u nodig heeft.',
        contentDE: 'Auf der Karte auf Ihrem Bildschirm werden zwei Fuß angezeigt. Diese Füße zeigen den durchschnittlichen niederländischen CO2-Fußabdruck (in Rot) und den perfekten (in Grün). Der blaue Punkt zeigt an, wo Sie sich befinden. Während Sie umherwandern, können Sie hier sehen, ob Sie sich in einem der Füße befinden. Auf diese Weise können Sie ein Gefühl dafür bekommen, wie groß diese Füße sind und wie viel Fläche Sie benötigen.'

    },
    {
        key: 3,
        title1EN: 'Carbon Footprint',
        title1NL: 'CO2-voetafdruk',
        title1DE: 'CO2-Fußabdruck',
        dutchFootContentEN: 'The Dutch carbon footprint',
        dutchFootContentNL: 'De Nederlandse CO2-voetafdruk',
        dutchFootContentDE: 'Der niederländische CO2-Fußabdruck',
        idealFootContentEN: 'The Ideal carbon footprint',
        idealFootContentNL: 'De ideale ecologische voetafdruk',
        idealFootContentDE: 'Der ideale CO2-Fußabdruck',
        personalFootContentEN: 'Your personal carbon footprint',
        personalFootContentNL: 'Uw persoonlijke ecologische voetafdruk',
        personalFootContentDE: 'Ihr persönlicher CO2-Fußabdruck',
        content1EN: 'You can switch between viewing the different footprints by selecting the feet show above.',
        content1NL: 'U kunt schakelen tussen het bekijken van de verschillende voetafdrukken door de hierboven getoonde voeten te selecteren.',
        content1DE: 'Sie können zwischen der Anzeige der verschiedenen Fußabdrücke wechseln, indem Sie die oben gezeigten Füße auswählen.',
        title2EN: 'Your personal carbon footprint',
        title2NL: 'Uw persoonlijke ecologische voetafdruk',
        title2DE: 'Ihr persönlicher CO2-Fußabdruck',
        content2EN: 'By selecting your personal carbon footprint you can calculate your own footprint. Answer the 12 questions by dragging the bar.',
        content2NL: 'Door uw persoonlijke ecologische voetafdruk te selecteren, kunt u uw eigen voetafdruk berekenen. Beantwoord de 12 vragen door de balk te verslepen.',
        content2DE: 'Durch die Auswahl Ihres persönlichen CO2-Fußabdrucks können Sie Ihren eigenen Fußabdruck berechnen. Beantworten Sie die 12 Fragen, indem Sie den Balken ziehen.',
        dataInfo1EN: 'Your data will not be saved',
        dataInfo1NL: 'Uw gegevens worden niet opgeslagen',
        dataInfo1DE: 'Ihre Daten werden nicht gespeichert',
        dataInfo2EN: 'Calculated carbon footprint is not fully accurate',
        dataInfo2NL: 'Berekende CO2-voetafdruk is niet volledig nauwkeurig',
        dataInfo2DE: 'Der berechnete CO2-Fußabdruck ist nicht ganz genau',
        photo: require('./carousel3.png'),
        iconDutch: require('../../img/dutchFoot.png'),
        iconIdeal: require('../../img/idealFoot.png'),
        iconPersonal: require('../../img/personalFoot.png'),
        paginator: require('./3.png'),
        // contentEN: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        // contentNL: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        // contentDE: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

    }
];

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
        <View style={styles.container}>
            {/* <TouchableOpacity style={carouselStyle.backIconContainer} onPress={() =>
                navigation.navigate('HomeScreen')
            }>
                <Image style={carouselStyle.backIcon} source={require('../../img/back.png')}></Image>
            </TouchableOpacity> */}
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
                                                {/* <Text style={[carouselStyle.cardTitle, { fontSize: 20 }]}>{item.title1EN}</Text> */}
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
                                                        {/* <Text style={{ color: 'black' }}>{item.dutchFootContentEN}</Text> */}
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
                                                        {/* <Text style={{ color: 'black' }}>{item.idealFootContentEN}</Text> */}
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
                                                        {/* <Text style={{ color: 'black' }}>{item.personalFootContentEN}</Text> */}
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
                                                {/* <Text style={{ color: 'black' }}>{item.content1EN}</Text> */}
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
                                                {/* <Text style={[carouselStyle.cardTitle, { fontSize: 20, marginTop: 10, marginBottom: 10 }]}>{item.title2EN}</Text>
                                                <Text style={{ color: 'black' }}>{item.content2EN}</Text> */}
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
                                                        {/* <Text style={carouselStyle.dataInfo_3}>{item.dataInfo1EN}</Text> */}
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
                                                        {/* <Text style={carouselStyle.dataInfo_3}>{item.dataInfo2EN}</Text> */}
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

                                    {/* {
                                        language !== 'english' ?
                                            language === 'dutch' ?
                                                <Text style={carouselStyle.cardTitle}>{item.titleNL}</Text>
                                                :
                                                <Text style={carouselStyle.cardTitle}>{item.titleDE}</Text>
                                            :
                                            <Text style={carouselStyle.cardTitle}>{item.titleEN}</Text>
                                    } */}
                                    {/* <Image source={item.icon} style={carouselStyle.icon}></Image> */}
                                    {/* {
                                        language !== 'english' ?
                                            language === 'dutch' ?
                                                <Text style={carouselStyle.cardContent}>{item.contentNL}</Text>
                                                :
                                                <Text style={carouselStyle.cardContent}>{item.contentDE}</Text>
                                            :
                                            <Text style={carouselStyle.cardContent}>{item.contentEN}</Text>
                                    } */}
                                    {/* {
                                        item.key !== 3 ?
                                            null
                                            :
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
                                    } */}
                                </View>
                                <Image
                                    source={item.paginator} style={carouselStyle.iconPaginator}
                                />
                            </View>
                        </View>
                    );
                }}
            />
            < Indicator scrollX={scrollX} />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
