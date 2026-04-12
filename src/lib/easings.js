// Studio-grade easing curves for XYRIN scroll experience
// Named semantically by the feeling they produce, not by math

export const EASE = {
  // Premium deceleration — like high-end furniture settling into place
  silk: 'power4.out',

  // Quick entrance with elegant overshoot
  snap: 'back.out(1.4)',

  // Slow start, fast middle, slow end — Apple-style cinematic
  cinematic: 'power3.inOut',

  // Extremely gentle deceleration for parallax layers
  drift: 'power2.out',

  // For values/words that feel alive and organic
  elastic: 'elastic.out(1, 0.5)',

  // For large text/hero elements with visual weight
  heavy: 'expo.out',

  // Aggressive acceleration into view
  punch: 'power2.in',

  // Smooth symmetrical — section color transitions
  smooth: 'power1.inOut',
}
