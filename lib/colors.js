'use strict'

const { LEVELS, LEVEL_NAMES } = require('./constants')

const nocolor = input => input
const plain = {
  default: nocolor,
  60: nocolor,
  50: nocolor,
  40: nocolor,
  30: nocolor,
  20: nocolor,
  10: nocolor,
  message: nocolor,
  greyMessage: nocolor
}

const { createColors } = require('colorette')
const { white, bgRed, red, yellow, green, blue, gray, cyan, bgGreen, bgYellow, bgCyan, bgWhite } = createColors({ useColor: true })

const colorMap = {
  'white': white,
  'bgRed': bgRed,
  'red': red,
  'yellow': yellow,
  'green': green,
  'blue': blue,
  'gray': gray,
  'cyan': cyan,
  'bgGreen': bgGreen,
  'bgYellow': bgYellow,
  'bgCyan': bgCyan,
  'bgWhite': bgWhite
}
const colored = {
  default: white,
  60: bgRed,
  50: red,
  40: yellow,
  30: green,
  20: blue,
  10: gray,
  message: cyan,
  greyMessage: gray
}

function colorizeLevel(level, colorizer, cLevel, nLEVELS) {
  if (Number.isInteger(+level)) {
    return Object.prototype.hasOwnProperty.call(cLevel, level)
      ? colorMap[colorizer[level]](cLevel[level])
      : colorizer.default(colorMap[cLevel.default])
  }

  const levelNum = nLEVELS[level.toLowerCase()] || 'default'
  return colorMap[colorizer[levelNum]](cLevel[levelNum])
}

function plainColorizer(level, co = plain, cLevel = LEVELS, nLEVELS = LEVEL_NAMES) {
  return colorizeLevel(level, co, cLevel, nLEVELS)
}
plainColorizer.message = plain.message
plainColorizer.greyMessage = plain.greyMessage

function coloredColorizer(level, co = colored, cLevel = LEVELS, nLEVELS = LEVEL_NAMES) {
  return colorizeLevel(level, co, cLevel, nLEVELS)
}
coloredColorizer.message = colored.message
coloredColorizer.greyMessage = colored.greyMessage

/**
 * Factory function get a function to colorized levels. The returned function
 * also includes a `.message(str)` method to colorize strings.
 *
 * @param {boolean} [useColors=false] When `true` a function that applies standard
 * terminal colors is returned.
 *
 * @returns {function} `function (level) {}` has a `.message(str)` method to
 * apply colorization to a string. The core function accepts either an integer
 * `level` or a `string` level. The integer level will map to a known level
 * string or to `USERLVL` if not known.  The string `level` will map to the same
 * colors as the integer `level` and will also default to `USERLVL` if the given
 * string is not a recognized level name.
 */
module.exports = function getColorizer(useColors = false) {
  return useColors ? coloredColorizer : plainColorizer
}
