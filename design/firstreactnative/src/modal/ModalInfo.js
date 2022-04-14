import * as React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { style } from './ModalInfoStyle';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalInfo = (props, { navigation }) => {
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var fullMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [modalOpen, setModalOpen] = React.useState(false);
  const [language, setLanguage] = React.useState('');

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
    earthsIcons.push(require('../img/earth.png'));
    j = i;
  }
  if (props.earths - j > 0.5) {
    earthsIconHalf.push(require('../img/half-earth.png'));
  }

  const navig = useNavigation();
  return (
    <>
      {props.visible ? (
        <Card style={style.mainContainer}>
          <View style={style.topContainer}>
            <Image source={props.image} style={style.footImage}></Image>
            <View style={style.textContainer}>
              {
                language !== 'english' ?
                  language === 'dutch' ?
                    <>
                      <Text style={style.title}>{props.titleNL}</Text>
                      <Text style={style.description}>{props.descriptionNL}</Text>
                    </>
                    :
                    <>
                      <Text style={style.title}>{props.titleDE}</Text>
                      <Text style={style.description}>{props.descriptionDE}</Text>
                    </>
                  :
                  <>
                    <Text style={style.title}>{props.titleEN}</Text>
                    <Text style={style.description}>{props.descriptionEN}</Text>
                  </>
              }
              {/* <Text style={style.title}>{props.title}</Text>
              <Text style={style.description}>{props.description}</Text> */}
            </View>
            {props.isOnMap ? (
              <TouchableOpacity
                style={style.mapButton}
                onPress={() => {
                  navig.navigate('CarouselPage')
                  navig.navigate('MainFoot')
                }}>
                <Image
                  source={require('../img/cube.png')}
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
                  {
                    language !== 'english' ?
                      language === 'dutch' ?
                        <>
                          <Text style={style.titleOpen}>{props.size} Hectare</Text>
                          <Text style={style.contentOpen}>
                            Onze ecologische voetafdruk bestaat uit {props.size} hectaren wereldwijd. Dit betekent dat we gebruik maken van
                            de gemiddelde biocapaciteit van {props.size} hectare biologisch productief aardoppervlak. Waarom {props.size} hectare?
                            Denk aan wat je eet, hoeveel tijd je in de auto doorbrengt, hoeveel groene stroom je verbruikt
                            en hoe vaak je in het vliegtuig zit..
                          </Text>
                        </>
                        :
                        <>
                          <Text style={style.titleOpen}>{props.size} Hektar</Text>
                          <Text style={style.contentOpen}>
                            Unser ökologischer Fußabdruck umfasst {props.size} globale Hektar. Das bedeutet, dass wir die
                            durchschnittliche Biokapazität von {props.size} Hektar biologisch produktiver Erdoberfläche nutzen.
                            Warum {props.size} Hektar? Denken Sie darüber nach, was Sie essen, wie viel Zeit Sie im Auto verbringen, wie viel grüne Energie Sie verbrauchen und wie oft Sie im Flugzeug sitzen.
                          </Text>
                        </>
                      :
                      <>
                        <Text style={style.titleOpen}>{props.size} Hectares</Text>
                        <Text style={style.contentOpen}>
                          Our ecological footprint consists of {props.size} global
                          hectares. This means that we use the average biocapacity of{' '}
                          {props.size} hectares of biologically productive earth
                          surface. Why {props.size} hectares? Think about what you are
                          eating, how much time you are spending in a car, how much
                          green energy you are using and how often you are sitting on
                          a plane.
                        </Text>
                      </>
                  }
                  {
                    language !== 'english' ?
                      language === 'dutch' ?
                        <>
                          <Text style={style.titleOpen}>{props.earths} Aardes</Text>
                          <Text style={style.contentOpen}>
                            Als iedereen net als de gemiddelde Nederlander door het leven gaat, hebben we niet één,
                            maar {props.earths} aardes nodig om aan onze behoeften te voldoen.
                          </Text>
                        </>
                        :
                        <>
                          <Text style={style.titleOpen}>{props.earths} Erden</Text>
                          <Text style={style.contentOpen}>
                            Wenn jeder wie der durchschnittliche Niederländer durchs Leben geht,
                            brauchen wir nicht eine, sondern {props.earths} Erden, um unseren Bedarf zu decken.
                          </Text>
                        </>
                      :
                      <>
                        <Text style={style.titleOpen}>{props.earths} Earths</Text>
                        <Text style={style.contentOpen}>
                          If everyone goes through life just like the average Dutch
                          person, we need not one, but {props.earths} Earths to
                          suffice our needs.
                        </Text>
                      </>
                  }
                  <View style={style.earthIconsContainer}>
                    {earthsIcons.map(item => (
                      <Image source={item} style={style.earthIcon}></Image>
                    ))}
                    {earthsIconHalf.map(item => (
                      <Image source={item} style={style.earthIconHalf}></Image>
                    ))}
                  </View>
                  <Text style={style.titleOpen}>
                    {fullMonths[date.getMonth()]} {date.getDate()}
                  </Text>
                  {
                    language !== 'english' ?
                      language === 'dutch' ?
                        <Text style={style.contentOpen}>
                          Op deze datum hebben we overal op aarde alles gebruikt wat de natuur in een heel
                          jaar kan vernieuwen. Dit betekent dat alles wat we na deze datum gebruiken, de natuur
                          dat jaar niet meer kan vernieuwen.
                        </Text>
                        :
                        <Text style={style.contentOpen}>
                          An diesem Datum haben wir alles verbraucht, was die Natur in einem ganzen Jahr auf der
                          ganzen Erde erneuern kann. Das bedeutet, dass alles, was wir nach diesem Datum verwenden,
                          die Natur in diesem Jahr nicht erneuern kann.
                        </Text>
                      :
                      <Text style={style.contentOpen}>
                        On this date we have used everything that nature can renew
                        in a whole year all over the Earth. This means that anything
                        we use after this date, nature cannot renew it in that year.
                      </Text>
                  }
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
                  {
                    language !== 'english' ?
                      language === 'dutch' ?
                        <Text>Grootte</Text>
                        :
                        <Text>Größe</Text>
                      :
                      <Text>Size</Text>
                  }
                </View>
                <View style={style.infoContainer}>
                  <Text style={style.infoHeaderProps}>{props.earths}</Text>
                  {
                    language !== 'english' ?
                      language === 'dutch' ?
                        <Text>Aardes</Text>
                        :
                        <Text>Erden</Text>
                      :
                      <Text>Earths</Text>
                  }
                </View>
                <View style={style.infoContainer}>
                  <Text style={style.infoHeaderProps}>
                    {date.getDate()} {months[date.getMonth()]}
                  </Text>
                  {
                    language !== 'english' ?
                      language === 'dutch' ?
                        <Text>Overshoot Dag</Text>
                        :
                        <Text>Überschreitungstag</Text>
                      :
                      <Text>Overshoot Day</Text>
                  }
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
