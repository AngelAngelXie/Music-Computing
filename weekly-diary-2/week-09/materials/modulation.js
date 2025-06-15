wait loadOrc('github:kunstmusik/csound-live-code/master/livecode.orc')

stack(
  // cutoff can be controled by the sine function to create "fluid" modulation effect
  n("<[2 - 4 5 6 - 3 2], [6 - [2*5] [3*2] [4*3] - 5 [6*2]]>")
    .scale("A:<ritusen>").s("kawai")
    .cutoff(sine.range(200, 2000).slow(4)),

  n("0 3 6 2 4 3 2 3")
    .scale("A:<ritusen>").csound("SSaw")
    .cutoff(sine.range(1000, 3000).slow(4)),

  n("0 3 2 5")
    .scale("A:<ritusen>").csound("VoxHumana"),

  n("<[2 - [4*3] 5 6 - [3*4] 2], [6 - [2*5] [3*2] [4*3] - 5 [6*2]]>")
    .scale("A:<ritusen>").csound("Mode1"),

  
  // the effect of low pass filter: 
  // lpf: allow frequenceis below the cutoff to pass through. 
  //      I started with the 200 given in class, then noticed that using 
  //      the tri signal pattern can further add variation to the lowpass filter
  // lpq: boosts frequencies near the cutoff point to create emphasis
  // lpenv: filter envelopes modulate the cutoff frequency overtime, creating expressive sweep
  // lpa: time for the cutoff to rise from its base value to the peak
  // gain: sets the volume level per cycle
  // room: reverb
  // use sometimesBy to shift a note up or down an octave


n(`<[2 - [4*3] 5 6 - [3*4] 2], [6 - [2*5] [3*2] [4*3] - 5 [6*2]]
    [0 - 2 [3*3] 4 - 1 [0*5]]>`)
  .scale("B:<major>")
  .sometimesBy(0.5, x => x.transpose("<12 -12>")) // 50% chance to shift up or down an octave
  .every(2, p => p.rev())
  .gain("0.4|0.5|0.6")
  .sound("supersaw")
  .lpf(tri.range(100,8000).slow(2))
  .lpq(20)
  .lpa(.1)
  .lpr(.5)
  .lpenv("<1 3 5>")
  .every(5, p => p.room("0.8:4"))

)