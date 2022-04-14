const data = [
  {
    key: 1,
    titleEN: 'Dutch ecological footprint',
    titleNL: 'Nederlandse voetafdruk',
    titleDE: 'Niederländischer Fußabdruck',
    photo: require('../img/dutchFoot.png'),
    descriptionEN: 'The ecological footprint of the dutch',
    descriptionNL: "De ecologische voetafdruk van de gemiddelde Nederlander",
    descriptionDE:
      'Der ökologische Fußabdruck des durchschnittlichen Niederländers',
    size: 5,
    earths: ((((5 * 1900 * 0.861842105) / 2620) * 100) / 100).toFixed(1),
    overshootDay:
      Math.floor(
        365 / ((((5 * 1900 * 0.861842105) / 2620) * 100) / 100).toFixed(1),
      ) - 1,
    dutch: true,
    ideal: false,
  },
  {
    key: 2,
    titleEN: 'Ideal ecological footprint',
    titleNL: 'Ideale voetafdruk',
    titleDE: 'Idealer Fußabdruck',
    photo: require('../img/idealFoot.png'),
    descriptionEN: 'The ecological footprint neccesary to sustain earth',
    descriptionNL:
      "De ecologische voetafdruk die nodig is om de aarde in stand te houden",
    descriptionDE:
      'Der zur Erhaltung der Erde notwendige ökologische Fußabdruck',
    size: 1.6,
    earths: ((((1.6 * 1900 * 0.861842105) / 2620) * 100) / 100).toFixed(1),
    overshootDay:
      Math.floor(
        365 / ((((1.6 * 1900 * 0.861842105) / 2620) * 100) / 100).toFixed(1),
      ) - 1,
    dutch: false,
    ideal: true,
  },
  {
    key: 3,
    titleEN: 'Your carbon footprint',
    titleNL: "Uw voetafdruk",
    titleDE: 'Dein Fußabdruck',
    photo: require('../img/personalFoot.png'),
    descriptionEN: 'Your ecological footprint based on answered questions',
    descriptionNL:
      "Uw ecologische voetafdruk gebaseerd op de beantwoorde vragen",
    descriptionDE:
      'Ihr ökologischer Fußabdruck basierend auf den beantworteten Fragen',
    dutch: false,
    ideal: false,
  },
];

const months = [
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
const fullMonths = [
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

const overshootDayText = {
  EN: "On this date we have used everything that nature can renew in a whole year all over the Earth. This means that anything we use after this date, nature cannot renew it in that year.",
  NL: "Dit is de datum wanneer we alles wat de natuur in een heel jaar kan vernieuwen hebben gebruikt over heel de Aarde. Dit betekent dat alles dat we na deze datum gebruiken, door de natuur niet kan worden vernieuwd.",
  DE: "An diesem Datum haben wir alles verbraucht, was die Natur in einem ganzen Jahr auf der ganzen Erde erneuern kann. Das bedeutet, dass alles, was wir nach diesem Datum verwenden, die Natur in diesem Jahr nicht erneuern kann."
}

export { data, months, fullMonths, overshootDayText };