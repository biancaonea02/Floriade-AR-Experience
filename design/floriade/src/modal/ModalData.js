const data = [
  {
    key: 1,
    title: 'Dutch ecological footprint',
    photo: require('../img/dutchFoot.png'),
    description: 'The ecological footprint of the dutch',
    size: 5,
    earths: Math.round((((5 * 1900) * 0.861842105) / 2620) * 100 / 100).toFixed(1),
    overshootDay: Math.floor(365 / (Math.round((((5 * 1900) * 0.861842105) / 2620) * 100 / 100).toFixed(1)))
  },
  {
    key: 2,
    title: 'Ideal ecological footprint',
    photo: require('../img/idealFoot.png'),
    description: 'The ecological footprint neccesary to sustain earth',
    size: 1.6,
    earths: Math.round((((1.6 * 1900) * 0.861842105) / 2620) * 100 / 100).toFixed(1),
    overshootDay: Math.floor(365 / (Math.round((((1.6 * 1900) * 0.861842105) / 2620) * 100 / 100).toFixed(1))) - 1
  },
  {
    key: 3,
    title: 'Your carbon footprint',
    photo: require('../img/personalFoot.png'),
    description: 'Your ecological footprint based on answered questions',
  },
];

export default data;