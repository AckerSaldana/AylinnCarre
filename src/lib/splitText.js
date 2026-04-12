// Split text utilities for scroll-driven reveals
// Double-wrapper technique: outer = mask (overflow:hidden), inner = animated element

export function splitIntoWords(text) {
  return text.split(' ').map((word, i) => ({
    word,
    index: i,
  }))
}

export function splitIntoChars(text) {
  return text.split('').map((char, i) => ({
    char: char === ' ' ? '\u00A0' : char,
    index: i,
  }))
}
