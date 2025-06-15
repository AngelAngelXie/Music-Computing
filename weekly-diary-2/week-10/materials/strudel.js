// global messages to be exchanged between performers / controlled by web UI

// synth/timbre controls
let lpfSlider = slider(1073, 100, 2000, 1)
let roomSlider = slider(0.19, 0, 1, 0.01)
let fmSlider = slider(2.7, 0, 5, 0.1)
// More controls under construction...

// volume controls
let beatGain = .111
let lead1Gain = .111
let lead2Gain = .333
let bassGain = .111

// Melodic controls
let currentScale = "<A1 D2>/4:minor:pentatonic"
// GPT generated chords for fun
let sereneChord = "<C^9 C7b9 Fm9 Db^7>/2"      // dreamy, unresolved
let joyfulChord = "<D^9 A7#11 G^7 Bm7>/2"      // bright, uplifting
let angryChord = "<E7b9 F#7b9 G7#9 C7alt>/2"   // dissonant, tense, aggressive
let melancholyChord = "<Am9 Em9 Dm9 Gmaj7>/2"  // sad, introspective, minor key

let currentMood = sereneChord// joyfulChord, angryChord, hopefulChord, ...

// ==============================================================

let b1 = stack(
  s("bd(1,2,0)").delay(0),
  s("hh(5,8,0)").every(4, _ => s("east:4(6,8,0)")).delay(1/8),
  s("<casio(5,8,0) [rim(2,8,0)]>").delay(1/4),
  s("jazz:1(3,8,0) bb(1,2,0)").delay(1/2),
);

let b2 = stack(
  s("[bd rim(3,8,0)]*2,hh*8").cutoff(sine.range(500,4000)),
  s("[metal:9(4,8,0) sd]*2,bd*8").cutoff(sine.rangex(500,4000)),
  s("bd(5,8,0)").every(4, _ => s("metal:4(6,8,0)")).delay(1/8),
)

let b3 = stack(
  n("2*2 [4 3] 2 0 2 [~ 3]").sound("casio").rev(),
  n("1*3 [4 1 3] 7 1 [~ 6] 4").sound("east").jux(rev)
)

// creates a weighted sequence, with @ assigning probabilistic weight
// .pick randomly selects one of the 3 labels per cycle
beat: "< b1@6 b2@6 b3@4>".pick({b1, b2, b3})
  // distorts waveform
  .shape("<.777@6 .8@6 .2@4>").gain(beatGain)
  // 1/6 chances being triggered -> simultanously play the pattern twice to create thicker layer
  .when("<0!3 1!1>", x=>x.ply(2))

// ==============================================================

let l1 = n("<0 2 1 3 2>*4")
.scale(currentScale)
.s("supersaw").lpf(300).lpenv("<4 3 2>*4")
.clip("<2 1 .25 .5>")
.color("cyan magenta")

let l2 = n("<0 5 2 4>*2")
.scale(currentScale)
.s('sawtooth')
.lpenv(4).lpf(300)

let l3 = n("<0 4 <1 5> 4>*5")
.off(1/8, add(n(5)))
.off(1/5, add(n(7)))
.scale(currentScale)
.s('sine')
.dec(.3)
.room(roomSlider)

lead: "<l1@6 l2@6 l3@4>".pick({l1, l2, l3})
  //.ply(2)
  .shape("<.777@6 .8@6 .2@6>").gain(lead1Gain)
  .when("<0!10 1!2>", x=>x.ply(2))

// =============================================================

let m1 = chord(currentMood)
.dict('ireal').voicing()
.s("sawtooth")
.lpf(lpfSlider)
.scope()

let m2 = stack(
  chord(currentMood)
  .dict('ireal').voicing().fm(fmSlider)
  // try changing to different values: 0,.05,.1 
  .fmattack("<0.2>")
  // try changing to different values: 1,0.25 
  .clip("<0.5>"),

  chord(currentMood)
  .dict('ireal').voicing().fm(fmSlider)
  .fmdecay("<.01 .05 .1 .2>")
  .fmsustain(.4)             
)._scope()

let m3 = chord(currentMood)
.dict('ireal').voicing()
.s("sawtooth")
.lpf(lpfSlider)
.release(1).lpa(.5).lpenv(4)
.phaser(4)
.room(roomSlider)

lead2: "<m1@6 m2@6 m3@4>".pick({m1, m2, m3})
  //.ply(2)
  .shape("<.377@6 .4@6 .6@4>").gain(lead2Gain)
  .when("<0!10 1!2>", x=>x.ply(2))
