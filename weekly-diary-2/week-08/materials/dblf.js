stack(
  // *** Intro ***
  // Drums (Slow buildup)
  s("bd(4,8,0)").delay(0),
  s("hh(5,8,0)").every(4, _ => s("east:4(6,8,0)")).delay(1/8),
  s("<rim(2,8,0) [metal:3(5,8,0), metal:6(8,8,0)!2, metal:9(3,8,0)]>").delay(1/4),
  s("casio(8,8,0) jazz:1(3,8,0)").delay(1/2),
  
  // Bass (Long sustained notes, slowly adding complexity)
  n("0 3 6 2 4 3 2 3").scale("A:<ritusen>").s("gm_acoustic_bass").delay(2/8),
  
  // Lead 
  n("0 1 3 5").scale("A:<bebop ritusen>").s("supersaw").delay(3/8),
  
  // *** Chorus ***
  
  // Lead (More complex melody, interwoven with bass)
  n("2 - 4 5 6 - - 3").scale("A:<ritusen>").s("triangle").every(3, _ =>  
    n("<[2 - 4 5 6 - 3 2], [6 - [2*5] [3*2] [4*3] - 5 [6*2]]>")
      .scale("A:<ritusen>")
      .s("kawai")
  ).delay(0.5),
  
  // Bass (Funkier rhythm with delay)
  n(sine.range(0, 16).slow(4).euclid(5, 16)).segment(16)
    .scale("A:ritusen").s("sine").delay(0.25),
  
  // *** Breakdown ***
  // Freaky Noises (Abstract sounds)
  s("wind:3(1,8,3)").delay(4/8),
  s("crow:2(5,8,0)").every(3, _ => s("metal:9(3,8,0)")).delay(2/8),
  s("wind:4(1,8,0)").every(3, _ => s("insect:2(2,8,0)")).delay(6/8),
  n(sine.range(0, 8).slow(5).euclid(6, 8)).segment(8)
    .scale("A:ritusen").transpose(-24).s("sine").delay(3/8),
  
  // Bass (Subtle and minimal)
  n("0 3 2 5").scale("A:<ritusen>").s("gm_acoustic_bass").delay(8/8)
)