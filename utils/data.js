const reactions = {
    thumbsup: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀',
    shocked: '😮',
    mindBlown: '🤯',
    laugh: '😆',
    smile: '😄',
    sad: '😢',
    angry: '😠',
    confused: '😕',
    scared: '😱',
    sick: '🤢',
    angry: '😡',
    poop: '💩',
    party: '🥳',
    clap: '👏',
    thumbsdown: '👎',
    smart: '🤓',
    cool: '😎',
    heart_eyes: '😍',
    star: '⭐️',
    fire: '🔥',
    rainbow: '🌈',
    unicorn: '🦄',
    dog: '🐶',
    cat: '🐱',
    fox: '🦊',
    panda: '🐼',
    monkey: '🐵',
    pig: '🐷',
    chicken: '🐔',
    penguin: '🐧',
    koala: '🐨',
    bear: '🐻',
    tiger: '🐯',
    lion: '🦁',
    cow: '🐮',
    rabbit: '🐰',
    mouse: '🐭',
    hamster: '🐹',
    wolf: '🐺',
    frog: '🐸',
    octopus: '🐙',
    squid: '🦑',
    shrimp: '🦐',
    crab: '🦀',
    lobster: '🦞',
    bus: '🚌',
    car: '🚗',
    airplane: '✈️',
    train: '🚂',
    alien: '👽',
    earth: '🌍',
    moon: '🌕',
    sun: '☀️',
    cloud: '☁️',
    umbrella: '☔️',
    snowman: '⛄️',
    snowflake: '❄️',
    lightning: '⚡️',
    tornado: '🌪',
    volcano: '🌋',
}

const emojis = Object.keys(reactions)

const getRandomEmoji = () => {
    const index = Math.floor(Math.random() * emojis.length)
    return emojis[index]
}

const getRandomReaction = () => {
    const emoji = getRandomEmoji()
    return reactions[emoji]
}

module.exports = {
    reactions,
    emojis,
    getRandomEmoji,
    getRandomReaction,
}

