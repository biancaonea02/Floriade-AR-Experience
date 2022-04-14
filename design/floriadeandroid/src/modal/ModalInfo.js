import * as React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { style } from './ModalInfoStyle';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { data, months, fullMonths, overshootDayText } from './ModalData';
import { indexOf } from 'lodash';

const ModalInfo = (props, { navigation }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [language, setLanguage] = React.useState('');
  const navig = useNavigation();

  const handlePress = () => {
    setModalOpen(!modalOpen);
  };

  try {
    AsyncStorage.getItem('@lang', (err, item) => {
      if (item === 'dutch') {
        setLanguage('dutch');
      } else if (item === 'german') {
        setLanguage('german');
      } else {
        setLanguage('english');
      }
    });
  } catch (error) {
    console.log('Error retrieving data' + error);
  }

  var date = new Date('2022-01-01');
  date.setDate(date.getDate() + props.overshootDay);

  const earthsIcons = [];
  const earthsIconHalf = [];
  let j = 0;
  for (let i = 1; i <= props.earths; i++) {
    earthsIcons.push({
      key: i,
      value: require('../img/earth.png'),
    });
    // earthsIcons.push(require('../img/earth.png'));
    j = i;
  }
  if (props.earths - j > 0.5) {
    earthsIconHalf.push(require('../img/half-earth.png'));
  }

  return (
    <>
      {props.visible ? (
        <Card style={style.mainContainer}>
          <View style={style.topContainer}>
            <Image source={props.image} style={style.footImage}></Image>
            <View style={style.textContainer}>
              <Text style={style.title}>
                {language === 'english'
                  ? props.titleEN
                  : language === 'dutch'
                    ? props.titleNL
                    : props.titleDE}
              </Text>
              <Text style={style.description}>
                {language === 'english'
                  ? props.descriptionEN
                  : language === 'dutch'
                    ? props.descriptionNL
                    : props.descriptionDE}
              </Text>
            </View>
            {props.isOnMap ? (
              <TouchableOpacity
                style={style.mapButton}
                onPress={() => {
                  navig.navigate('CarouselPage');
                  navig.navigate('MainFoot');
                }}>
                <Image
                  source={require('../img/cube.png')}
                  style={style.mapButtonImage}></Image>
              </TouchableOpacity>
            ) : props.personal ? (
              <TouchableOpacity
                style={style.mapButton}
                onPress={props.onPressTest}>
                <Image
                  source={require('../img/redo.png')}
                  style={style.mapButtonImage}></Image>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={style.mapButton}
                onPress={() => navig.navigate('MapFoot')}>
                <Image
                  source={require('../img/map.png')}
                  style={style.mapButtonImage}></Image>
              </TouchableOpacity>
            )}
          </View>
          {modalOpen ? (
            <Card style={style.bottomContainerOpen}>
              <View style={style.bottomContainerViewOpen}>
                <View style={style.contentContainerOpen}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={style.titleOpen}>
                      {props.size}{' '}
                      {language === 'english'
                        ? 'Hectares'
                        : language === 'dutch'
                          ? 'Hectare'
                          : 'Hektar'}
                    </Text>
                    <Text style={style.contentOpen}>
                      {props.dutch
                        ? language === 'english'
                          ? 'Our carbon footprint consists of ' + //ok
                          props.size +
                          ' global hectares. This means that we use the average biocapacity of ' + //ok
                          props.size +
                          ' hectares of biologically productive earth surface. Why ' + //ok
                          props.size +
                          ' hectares? Think about what you are eating, how much time you are spending in a car, how much green energy you are using and how often you are sitting on a plane.' //ok
                          : language === 'dutch'
                            ? 'Onze ecologische voetafdruk bestaat uit ' + //ok
                            props.size +
                            ' wereldwijde hectare. Dit betekent dat we de gemiddelde biocapaciteit van ' + //ok
                            props.size +
                            ' hectare biologisch productief aardoppervlak. Waarom ' + //ok
                            props.size +
                            ' hectare? Denk aan wat je eet, hoeveel tijd je in de auto doorbrengt, hoeveel groene stroom je verbruikt en hoe vaak je in het vliegtuig zit.' //ok
                            : 'Unser ökologischer Fußabdruck besteht aus ' + //ok
                            props.size +
                            ' globale Hektar. Das bedeutet, dass wir die durchschnittliche Biokapazität von verwenden ' + //ok
                            props.size +
                            ' Hektar biologisch produktive Erdoberfläche. Warum ' + //ok
                            props.size +
                            ' Hektar? Denken Sie darüber nach, was Sie essen, wie viel Zeit Sie im Auto verbringen, wie viel grüne Energie Sie verbrauchen und wie oft Sie im Flugzeug sitzen.' //ok
                        : props.ideal
                          ? language === 'english'
                            ? 'Our precise ecological footprint consists of ' +
                            props.size +
                            ' global hectares. This means that we must use the biocapacity of ' +
                            props.size +
                            ' hectares of biologically productive earth surface. Why ' +
                            props.size +
                            ' hectares? If we devide all global hectares all over the Earth by the number of people, we currently have ' +
                            props.size +
                            " hectares available on Earth. This means that we use all available global hectares, so we'd prefer to need even less."
                            : language === 'dutch'
                              ? 'Onze precieze ecologische voetafdruk bestaat uit ' +
                              props.size +
                              ' wereldwijde hectare. Dit betekent dat we gebruik moeten maken van de biocapaciteit van ' +
                              props.size +
                              ' hectare biologisch productief aardoppervlak. Waarom ' +
                              props.size +
                              ' hectare? Als we alle wereldwijde hectaren over de hele aarde delen door het aantal mensen, hebben we momenteel ' +
                              props.size +
                              ' hectare beschikbaar op Aarde. Dit betekent dat we alle beschikbare wereldwijde hectaren gebruiken, dus we hebben liever nog minder nodig.'
                              : 'Unser genauer ökologischer Fußabdruck besteht aus ' +
                              props.size +
                              ' globale Hektar. Das bedeutet, dass wir die Biokapazität von nutzen müssen ' +
                              props.size +
                              ' Hektar biologisch produktive Erdoberfläche. Warum ' +
                              props.size +
                              ' Hektar? Wenn wir alle globalen Hektar auf der ganzen Erde durch die Anzahl der Menschen teilen, haben wir derzeit ' +
                              props.size + ' Hektar auf der Erde verfügbar. Das bedeutet, dass wir alle verfügbaren globalen Hektar nutzen, also am liebsten noch weniger brauchen.'
                          : language === 'english'
                            ? props.earths > 3.1
                              ? 'Your carbon footprint is made up to ' +
                              props.size +
                              ' global hectares. This means that you use the biocapacity of ' +
                              props.size +
                              " hectares of biologically productive earth surface. This is more than the average Dutch person, so we would advise you to start living greener, because we don't have unlimited resources and ultimately must make do with the earth we have now."
                              : 'Your carbon footprint is made up to ' +
                              props.size +
                              ' global hectares. This means that you use a biocapacity of ' + props.size + ' hectares of biologically productive earth surface. This is less than the average Dutch person, well done! Nevertheless, this does not mean that we should not start living greener, because in the end we must all make do with earth we have now.'
                            : language === 'dutch'
                              ? props.earths > 3.1
                                ? 'Uw ecologische voetafdruk bestaat uit ' +
                                props.size +
                                ' wereldwijde hectare. Dit betekent dat je gebruik maakt van de biocapaciteit van ' +
                                props.size +
                                " hectare biologisch productief aardoppervlak. Dit is meer dan de gemiddelde Nederlander, dus we raden je aan om groener te gaan leven, want we hebben geen onbeperkte hulpbronnen en moeten het uiteindelijk doen met de aarde die we nu hebben."
                                : 'Uw ecologische voetafdruk bestaat uit ' +
                                props.size +
                                ' wereldwijde hectare. Dit betekent dat je een biocapaciteit gebruikt van ' + props.size + ' hectare biologisch productief aardoppervlak. Dit is minder dan de gemiddelde Nederlander, goed gedaan! Toch betekent dit niet dat we niet groener moeten gaan leven, want uiteindelijk moeten we het allemaal doen met de aarde die we nu hebben.'
                              :
                              props.earths > 3.1
                                ? 'Ihr CO2-Fußabdruck wird ausgeglichen ' +
                                props.size +
                                ' globale Hektar. Das bedeutet, dass Sie die Biokapazität von nutzen ' +
                                props.size +
                                " Hektar biologisch produktive Erdoberfläche. Das ist mehr als der durchschnittliche Niederländer, daher würden wir Ihnen raten, grüner zu leben, denn wir haben keine unbegrenzten Ressourcen und müssen uns letztendlich mit der Erde begnügen, die wir jetzt haben."
                                : 'Ihr CO2-Fußabdruck wird ausgeglichen ' +
                                props.size +
                                ' globale Hektar. Das bedeutet, dass Sie eine Biokapazität von ' + props.size + ' Hektar biologisch produktiver Erdoberfläche nutzen. Das ist weniger als der durchschnittliche Niederländer, gut gemacht! Das bedeutet jedoch nicht, dass wir nicht anfangen sollten, grüner zu leben, denn am Ende müssen wir uns alle mit der Erde begnügen, die wir jetzt haben.'}
                    </Text>
                    <Text style={style.titleOpen}>
                      {props.earths}{' '}
                      {language === 'english' ? props.earths === '1.0' ? 'Earth' : 'Earths' : language === 'dutch' ? props.earths === '1.0' ? 'Aarde' : 'Aardes' : props.earths === '1.0' ? 'Erde' : 'Erden'}
                    </Text>
                    <Text style={style.contentOpen}>
                      {props.dutch
                        ? language === 'english'
                          ? 'If everyone goes through life just like the average Dutch person, we need not one, but ' +
                          props.earths +
                          ' Earths to suffice our needs.'
                          : language === 'dutch'
                            ? 'Als iedereen net als de gemiddelde Nederlander door het leven gaat, hebben we er niet één nodig, maar ' +
                            props.earths +
                            ' Aardes om aan onze behoeften te voldoen '
                            : 'Wenn jeder wie der durchschnittliche Niederländer durchs Leben geht, brauchen wir keinen, aber ' +
                            props.earths +
                            ' Erden, um unsere Bedürfnisse zu befriedigen.'
                        : props.ideal
                          ? language === 'english'
                            ? 'If we live life like this, we can get just enough from the Earth, but we are still on the brink of exhaustion.'
                            : language === 'dutch'
                              ? 'Als we zo leven, kunnen we net genoeg van de aarde krijgen, maar we zijn nog steeds op de rand van uitputting.'
                              :
                              'Wenn wir so leben, können wir gerade genug von der Erde bekommen, aber wir sind immer noch am Rande der Erschöpfung.'
                          : language === 'english'
                            ? 'If we would live like you do, we would need no less than ' +
                            props.earths +
                            ' earths to suffice our needs.'
                            : language === 'dutch'
                              ? 'Als we zouden leven zoals jij, zouden we niet minder nodig hebben dan ' +
                              props.earths +
                              ' aarde om in onze behoeften te voorzien.'
                              :
                              'Wenn wir so leben würden wie du, bräuchten wir nicht weniger als ' +
                              props.earths +
                              ' Erden, um unsere Bedürfnisse zu befriedigen.'}
                    </Text>
                    <View style={style.earthIconsContainer}>
                      {earthsIcons.map(item => (
                        <Image
                          key={item.key}
                          source={item.value}
                          style={style.earthIcon}></Image>
                      ))}
                      {earthsIconHalf.map(item => (
                        <Image
                          key={100}
                          source={item}
                          style={style.earthIconHalf}></Image>
                      ))}
                    </View>
                    <Text style={style.titleOpen}>
                      {isNaN(date)
                        ? '-'
                        : date.getDate() + ' ' + fullMonths[date.getMonth()]}
                    </Text>
                    <Text style={style.contentOpen}>
                      {language === 'english'
                        ? overshootDayText.EN
                        : language === 'dutch'
                          ? overshootDayText.NL
                          : overshootDayText.DE}
                    </Text>
                  </ScrollView>
                </View>
                <TouchableOpacity
                  style={style.arrowDownContainer}
                  onPress={() => handlePress()}>
                  <Image
                    source={require('../img/arrowDown.png')}
                    style={style.arrowButton}></Image>
                </TouchableOpacity>
              </View>
            </Card>
          ) : (
            <Card style={style.bottomContainer}>
              <View style={style.mainInfoContainer}>
                <View style={style.infoContainer}>
                  <Text style={style.infoHeaderProps}>{props.size} Ha</Text>
                  <Text>
                    {language === 'english'
                      ? 'Size'
                      : language === 'dutch'
                        ? 'Grootte'
                        : 'Größe'}
                  </Text>
                </View>
                <View style={style.infoContainer}>
                  <Text style={style.infoHeaderProps}>{props.earths}</Text>
                  <Text>
                    {language === 'english' ? props.earths === '1.0' ? 'Earth' : 'Earths' : language === 'dutch' ? props.earths === '1.0' ? 'Aarde' : 'Aardes' : props.earths === '1.0' ? 'Erde' : 'Erden'}
                  </Text>
                </View>
                <View style={style.infoContainer}>
                  <Text style={style.infoHeaderProps}>
                    {isNaN(date)
                      ? '-'
                      : date.getDate() + ' ' + months[date.getMonth()]}
                  </Text>
                  <Text>
                    {language === 'english'
                      ? 'Overshoot Day'
                      : language === 'dutch'
                        ? 'Overshoot Dag'
                        : 'Überschreitungstag'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={style.arrowUpContainer}
                  onPress={() => handlePress()}>
                  <Image
                    source={require('../img/arrowUp.png')}
                    style={style.arrowButton}></Image>
                </TouchableOpacity>
              </View>
            </Card>
          )}
        </Card>
      ) : null}
    </>
  );
};

export default ModalInfo;
