const data = [
  {
    key: 1,
    titleEN: 'Dutch ecological footprint',
    titleNL: "Nederlandse voetafdruk",
    titleDE: "Niederländischer Fußabdruck",
    photo: require('../img/dutchFoot.png'),
    descriptionEN: 'The ecological footprint of the dutch',
    descriptionNL: "De ecologische voetafdruk van de gemiddelde nederlander",
    descriptionDE: "Der ökologische Fußabdruck des durchschnittlichen Niederländers",
    size: 5,
    earths: Math.round((((5 * 1900) * 0.861842105) / 2620) * 100 / 100).toFixed(1),
    overshootDay: Math.floor(365 / (Math.round((((5 * 1900) * 0.861842105) / 2620) * 100 / 100).toFixed(1)))
  },
  {
    key: 2,
    titleEN: 'Ideal ecological footprint',
    titleNL: "Ideale voetafdruk",
    titleDE: "Idealer Fußabdruck",
    photo: require('../img/idealFoot.png'),
    descriptionEN: 'The ecological footprint neccesary to sustain earth',
    descriptionNL: "De ecologische voetafdruk die nodig is om de aarde in stand te houden",
    descriptionDE: "Der zur Erhaltung der Erde notwendige ökologische Fußabdruck",
    size: 1.6,
    earths: Math.round((((1.6 * 1900) * 0.861842105) / 2620) * 100 / 100).toFixed(1),
    overshootDay: Math.floor(365 / (Math.round((((1.6 * 1900) * 0.861842105) / 2620) * 100 / 100).toFixed(1))) - 1
  },
  {
    key: 3,
    titleEN: 'Your carbon footprint',
    titleNL: "Jouw voetafdruk",
    titleDE: "Dein Fußabdruck",
    photo: require('../img/personalFoot.png'),
    descriptionEN: 'Your ecological footprint based on answered questions',
    descriptionNL: "Jouw ecologische voetafdruk gebaseerd op de beantwoorde vragen",
    descriptionDE: "Ihr ökologischer Fußabdruck basierend auf den beantworteten Fragen",
  },
];

export default data;