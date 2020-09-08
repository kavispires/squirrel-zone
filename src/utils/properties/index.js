import { FUR } from './fur';

const PROPS = {
  FUR,
  HEAD: {
    'hair-style': [15],
    'hair-bangs-style': [15],
    'hair-color': [10],
    'head-prop': ['none', 'beanie', 'cowboy-hat', 'headphones', 'hat', 'hat-backwards'],

    'eye-color': [8],
    'eye-style': ['normal', 'angry', 'calm', 'suspicious', 'tired', 'high', 'not-impressed'],
    'eye-prop': ['none', 'sunglasses-1', 'sunglasses-2', 'glasses', 'cool-glasses'],

    'snout-color': [5],
    nose: ['small', 'normal', 'large'],
    'nose-color': [5],
    tooth: ['large', 'normal', 'large', 'chipped', 'doubled', 'braces'],
    'ear-prop': ['none', 'earring', 'piercing', 'cut', 'cross'],
    'facial-hair': ['none', 'mustache', 'goatee', 'beard'],
  },
  body: {
    hands: [
      'gloves',
      'globes-white',
      'nail-polish-color',
      'mail-polish-black',
      'bracelet-1',
      'bracelet-2',
    ],

    necklace: ['none', 'army', 'hippie', 'simple'],

    'under-shirt': [
      'none',
      'short-sleeve',
      'short-sleeve-v',
      'long-sleeve',
      'long-sleeve-v',
      'tank-top',
      'tank-top-v',
    ],
    'under-shirt-color': [30],

    shirt: ['none', 'closed', 'open', 'half-open', 'polo'],

    jacket: ['none', 'vest', 'overcoat', 'life-vest'],

    pants: ['normal', 'shorts', 'cargo'],
    'pants-color': [15],

    shoe: ['dress', 'sneakers', 'boots', 'flipflops'],
    'shoe-color': [30],

    tail: ['spiked', 'droopie', 'normal'],
  },
};

export default PROPS;
