// var functionBasedPropVal = anime({
//   targets: '#functionBasedPropVal .el',
//   translateX: function (el) {
//     return el.getAttribute('data-x')
//   },
//   translateY: function (el, i) {
//     return 50 + (-50 * i)
//   },
//   scale: function (el, i, l) {
//     return (l - i) + 1.00
//   },
//   rotate: function () { return anime.random(-360, 360) },
//   duration: function () { return anime.random(1200, 1800) },
//   duration: function () { return anime.random(800, 1600) },
//   delay: function () { return anime.random(0, 1000) },
//   direction: 'alternate',
//   loop: true
// })

var specificPropertyParameters = anime({
  targets: '#specificPropertyParameters .el',
  loop: true,
  rotate: {
    value: 1080,
    duration: 500,
    easing: 'easeInOutSine'
  },
  scale: {
    value: 5,
    duration: 1000,
    delay: 100,
    easing: 'easeInOutQuart'
  }
  // delay: 250 // All properties except 'scale' inherit 250ms delay

})
