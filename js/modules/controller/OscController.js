export class OscController {
  constructor () {
    this.audioctx = new AudioContext()
    this.osc = this.audioctx.createOscillator()
    this.gain = this.audioctx.createGain()
    this.osc.connect(this.gain)
    this.gain.connect(this.audioctx.destination)
    // this.osc.frequency.value = 880
  }
  play (t) {
    this.osc.start(t)
    console.log('start!', t)
  }

  stop (t) {
    this.osc.stop(t)
    console.log('stop!', t)
  }

  get osc () { return this._osc }
  set osc (val) { this._osc = val }
  get gain () { return this._gain }
  set gain (val) { this._gain = val }
}

export default OscController
