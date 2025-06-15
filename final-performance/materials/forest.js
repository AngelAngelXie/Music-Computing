// ************************************************************************************************
// ******************************************* Section 1 *******************************************

// ********** leads **********
let lead1_2 = n("1@2 4@2 7@2 3@2")
    .scale("F:major:pentatonic")
    .sound("sine, triangle")
    .clip("<0.25>")                                        // Tips: In later parts, you may consider "0.5"
    .gain("<0.10 0.20 0.25 0.30 0.35 0.40 0.45 0.50 0.55 0.60>")
    .cpm(30)

let mel1_2 = n("7 5 6 4 5 3 4 2")
let mel2_2 = n("1@2 2@2 3@2 4@2 5 4 3 2, 1 2 3 4, 5 3 2 1")
let mel3_2 = n("<[7 5 6 4 5 3 4 2]*2 [1 3 5 7 6 4 2 1]*2>")
let mel4_2 = n("1 4 2 5 3 6 2 7")

let lead2_2 = "<mel1_2!8>".pick({mel1_2, mel2_2, mel3_2, mel4_2}) 
    .scale("F:major:pentatonic")
    .sound("sine, triangle, gm_xylophone")
    .clip("<0.9>")
    .gain("<0.25 0.30 0.35 0.40 0.45 0.50 0.55 0.60>")
    .cpm("30")
    .when("<0!10 1!3>", x=>x.ply(2))
    .pan("<-1 0 1 0>")                                  // Tips: uncomment this for sound movements 
    .adsr("0.01 :0.1:0.3:0.5")                          // Tips: uncomment this for a clearer, ring-bell like sound
    .delay(0.5).delayfeedback(0.7).delaytime("0.1")     // Tips: uncomment for echoing effects!

let lead3_2 = "<mel3_2!2 mel1_2!1>".pick({mel1_2, mel2_2, mel3_2, mel4_2}) 
    .scale("F:major:pentatonic")
    .sound("sine, triangle, gm_xylophone")
    .clip("<0.9>")
    .gain("<0.10 0.20 0.25 0.30 0.35 0.40 0.45 0.50 0.55 0.60>")
    .cpm("30")
    .when("<0!10 1!3>", x=>x.ply(2))

let lead4_2 = "<mel1_2!2 mel3_2!3 mel2_2!1 mel4_2!1 mel3_2!3 mel3_2!3 mel2_2!1 mel4_2!3>".pick({mel1_2, mel2_2, mel3_2, mel4_2}) 
    .scale("F:major:pentatonic")
    .sound("<sine, triangle, piano>")                       // Tips: Try adding in more instruments for the climax: "<sine, triangle, gm_xylophone gm_synth_strings_2, piano>"
    .clip("<0.9>")
    .gain("<0.60 0.70 0.80 0.90>")
    .cpm("30")
    .when("<0!10 1!3>", x=>x.ply(2))

let lead5_2 = n("[7 5 3 1 2 4 6 7]*2")
  .scale("F:major:pentatonic")
  .sound("sine, triangle, gm_vibraphone")
  .clip("<0.25 0.125 0.125 0.5>")
  .gain("<0.2 0.4 0.6 0.8 1 0.8 0.6 0.4>")
  .cpm(30)
  .adsr("0.01:0.1:0.5:0.15")
  .delay(0.25)
  .pan(sine)
  .penv("<-0.1 0.05 0.1>")
  .phaser(16)
  .when("1!4", x => x.ply(2))


// ********** bass **********
let bass1_2 = n("<[1 1 1 1 1 1 1 1] [1@8] [3 3 3 3 3 3 3 3] [3@8]>")
    .scale("F:major:pentatonic")
    .sound("gm_synth_strings_1")
    .lpf(500)
    .clip("<1>")
    .gain("0.8")
    .cpm("30")
    .delay(0.5)
    .room(0.4)
    .rsize(10)

let sprinkle1_2 = n(sine.range(0, 16).slow(4).euclid(5, 16)) 
    .segment(16)
    .scale("F:major:pentatonic")
    .s("sine")
    .delay(0.25)
    // .gain("1 0.3 0 0.6 0.4 1 0 1")                      // Tips: play with this to create variety to notes

// ******** Sound Effects **********
let wind1_2 = n("<[0*4 0*5 0*4] [0*5 0*4 0*3], [2*8]>")
    .sound("wind")
    .adsr("10, 0, 1, 20")
    .lpf(sine.range(200, 400))
    .room(10).size(0.9)
    .cpm(20)
    .gain("<0.02 0.10 0.20 0.30 0.40 0.50>")

let wind2_2 = s("wind:3(1,8,3)")
    .delay(4/8)

let wind3_2 = s("wind:4(1,8,0)")
    .every(3, _ => s("insect:2(1,8,0)")).delay(6/8)

let insects_2 = s("<[sh*2 rim*5 hh] [rim sh hh lt]>")        // Tips: Try other patterns by adding "sd", "oh", "lt", "mt", "rd", "cr", "ht", "bd", "rim", "hh" ...
  .bank("AlesisHR16")
  .fast("<1 2 0.1 1>")                                     // Tips: Try different values
  .decay("<.1 .5 .3>*3")                                   // Tips: Try different values
  .velocity(rand.range(0.1,8).fast(1))
  .bpf(sine.range(100, 4021))                              // Tips: Try swapping ".bpf" with ".lpf" or "hpf" for different tonal emphasis
  .sometimesBy(0.4,x=>x.jux(rev))
  .sometimesBy(0.5, x=>x.pan("<0 1>"))
  .room(0.5)                                               // Tips: Try different values
  .gain(0.8, 0, 0.5, 0)
  .cpm(30)

// ******** Beats **********
// A very deep drum 
let drum_2 = s("bd bd")
  .slow(2)
  .room(2)
  .lpf(300)
  .decay(2)
  .gain("<0.2 0.4 0.8 1 1 0.8 0.4>")
  .gain("0.4")
  // .bank("<RolandTR707 ViscoSpaceDrum AkaiLinn>")       // Tips: Try a different drum "ViscoSpaceDrum", "AkaiLinn"
  .crush(8)                                            // Tips: Uncomment this to add lightening sound effects

let light_add_on_beats2_2 = s("hh(5,8,0)")
  .every(4, _ => s("east:4(6,8,0)"))
  .delay(1/8)
  .gain("0.8")
  .delayfeedback(0.5)
  .room(0.7)                                            // Tips: Try uncommenting

let heavy_add_on_beats3_2 = s("bd(4,8,0)")
  .delay(0)
  .gain("0.3")


// Intro1 – Yunkai – 00:00
_intro1_2: stack(
  wind1_2
)
// Intro2 – Yunkai – 00:10
_intro2_2: stack(
  wind1_2,
  lead1_2.gain(0.8).clip(1.5),
  drum_2.gain(0.15).slow(1.5)
)
// devA – Angel – 00:35
_devA_2: stack(
  bass1_2.cpm(30),
  lead1_2.gain(0.15).clip(1.5),
  //sprinkle1_2.gain(0.5).clip(2),
  wind2_2,
  drum_2.gain(0.2),
)
// devB – Angel – 01:00
_devB_2: stack(
  lead1_2.gain(0.35),
  lead2_2.gain(0.2),
  sprinkle1_2.gain(0.3),
  wind2_2,
  bass1_2.gain(0.4),
  light_add_on_beats2_2.gain(0.2),
  drum_2.gain(0.25)
)
//Climax – Darcy – 01:20
_climax_2: stack(
  lead1_2.gain(0.7).penv("<0.1 0 -0.1>").clip(0.6),
  lead2_2.gain(0.6).phaser(12).delay(0.1),
  sprinkle1_2.gain(0.8).clip(0.5).delay(0.1),
  bass1_2.gain(0.9),
  drum_2.gain(1).clip(0.5),
  light_add_on_beats2_2.gain(0.4),

  // add in the following tracks one by one:
  // lead3_2.gain(0.7).pan(sine).clip(0.75),
  // insects_2.gain(0.7),
  // lead4_2.gain(0.7),
  // lead5_2.gain(0.7),
  // heavy_add_on_beats3_2.gain(0.8),
  // wind3_2,
)

// devC – Darcy – 02:00
_devC_2: stack(
  lead1_2.gain(0.6),
  lead2_2.gain(0.5),
  lead3_2.gain(0.4).delay(0.4),
  sprinkle1_2.gain(0.6),
  bass1_2,
  drum_2.gain(0.7),
  wind3_2,
  insects_2.gain(0.7)
)

// outro1 – Darcy – 02:20
_outro1_2: stack(
  lead2_2.gain(0.2).delay(1).lpf(700),
  bass1_2.gain(0.3).adsr("0.1:0.2:0.1:2"),
  wind2_2,
  sprinkle1_2.gain(0.1),
  drum_2.gain(0.1),
  insects_2.gain(0.2)
)
// outro2 – Darcy – 02:40
_outro2_2: stack(
  lead1_2.gain(0.1).clip(1.5).cpm(15),
  wind1_2,
  wind3_2,
  sprinkle1_2.gain(0.05).clip(2)
)

// Ends around 3 minutes

// **************************************************************************************************
// ******************************************** Section 2 *******************************************
// **************************************************************************************************

let mel1_3 = n("<[[1 5] [8,10] [7,9] [5,7]] [[5 8] [5 7] [2,5] 3]>")
let mel2_3 = n("<[[1 5] [[8,10] 4] [[7,9] 3] [[5,7] 1]] [[[1,4,6] -3] [5 3] 5 6]>")
let lead1_3 = "<mel1_3!6 mel2_3!4>".pick({mel1_3, mel2_3})
  .add("<-2 <0 -5>>")
  .scale("F:major:pentatonic")
  .sound("sine")                    // Tips: change this to "sine, piano" for one singing frog
  .adsr(".1:.1:.1:.2")
  // .fm(sine.range(1, 6))          // Tips: Uncomment this for TWO singing frogs! :)
  .lpf("820")
  .lpq("14")
  .lpa("0.44")
  .lpd("0.55")
  .lps("0.5")
  .lpr("0.63")
  .lpenv("10")
  .penv("<-0.2 0 0.2 0>")
  .gain("0.7")
  .cpm(30)

let mel_resp1_3 = n("<[~ [9] ~ [7,8]] [~ [4,6] ~ 5]>")
let mel_resp2_3 = n("<[[6,8] ~ [9] ~] [[4] [3,5] ~ ~]>")
let mel_resp3_3 = n("<[[5,7] [~ 8] ~ [6]] [[4] ~ [3 4] ~]>")
let mel_resp4_3 = n("<[[7] [5,6] [~ 8] ~] [~ [2 4] [5] ~]>")
let mel_resp5_3 = n("<[~ ~ [7] ~] [~ ~ [5] ~]>")
let lead2_3 = "<mel_resp1_3!4 mel_resp2_3!3 mel_resp3_3!2 mel_resp4_3!2 mel_resp5_3!1>"
  .pick({mel_resp1_3, mel_resp2_3, mel_resp3_3, mel_resp4_3, mel_resp5_3})
  .add("<-3 <-1 -5>>")
  .scale("F:major:pentatonic")
  .dec(.5)
  .delay(0.777).delaytime(0.1).delayfeedback(0.888)
  .s("sine, triangle")
  .fm("4")                          // Tips: Try "0" or "10" for fun sounds! (smaller = muffler, larger = sharper)
  .lpenv("<<2.5 -3>!2 -3>")
  .lpq("0.4")                       // Tips: Try "0.1" or "20" (smaller = smoother, larger = sharper & more pronounced peak)
  .adsr(".05:.15:.2:.25")
  .lpf("1600, 300")
  .phaser("14")                     // Tips: Try "1" "10" "20" (small = gentle, ambient sound, larger = fluttering, trembling)
  .lpa("0.81")
  .lpd("1")
  // .tremolo("8, 0.5")             // Tips: Try uncomment this for shimmer
  .lps("0.81")
  .lpr("0.74")
  .penv("<0 0.2 -0.2 0.1>")         // Tips: select value between -1 & 1 get different pitch effects
  .gain("0.3")
  .cpm("30")

let lead3_3 = n("<-2 -3> [1@2] [6 3] [1 7 - 3]".add("<-3 <1 -1>>"))
  .every(6, _ => n("-5 1@2,4,6 - 3 1,8 3 1 2"))
  .scale("F:major:pentatonic")
  .sound("gm_acoustic_bass")         // Tips: Try adding different instruments "gm_xylophone", "triangle", "piano"
  .gain("1")
  .adsr("[.1 0]:.3:.9:[1 0]")        
  // .adsr(".05:.1:.2:.3")           // Tips: Uncomment this for shorter, violin-like notes

let bass1_3 = n("<[10] [~ 9,4 11 10] [3@4] [2@4] [4@4] [~ 8,4 12 19] [2@4] [3@4] [5@4] [~ 8,5 12 15]>".add("-12"))
  .scale("F:major:pentatonic")
  .sound("<gm_xylophone>")
  .lpf(1638)                         // Tips: Try "600". low = blurry sound ; high = clearer sound
  .release(2)
  .phaser(10.2)                      // Tips: Try "30" for a lower, metallic sound
  .pan(sine)
  .gain("1")
  .cpm(30)

let bass2_3 = n("<[7 4] ~ [5,6] [8*2] ~>")
  .scale("F:major:pentatonic")
  .sound("sine")
  .gain("0.3")
  .pan(sine)
  .delay("0.5")
  .delayfeedback("0.3")
  .adsr("0.05:0.1:0.3:1.2")
  .phaser("10")                       // Tips: try "10" for floaty, ghostly ambient sound


// Intro1 – Yunkai – 03:00
_intro1_3: stack(
  bass1_3
)
// Intro2 – Yunkai – 03:05
_intro2_3: stack(
  bass1_3, bass2_3
)
// devA – Matt – 03:15
_devA_3: stack(
  lead1_3.cpm(15).penv("<-0.1 0 0.1 0>").gain(0.6),
  bass1_3,  bass2_3
)
// devB – Matt – 03:35
_devB_3: stack(
  lead1_3.gain(0.7).lpf(1000),
  lead2_3.gain(0.3).delay(0.8),
  bass1_3, bass2_3
)
// Climax – Angel– 03:50
_climax_3: stack(
  lead1_3.lpf(1400).penv("<0.2 0 -0.1 0>").gain(0.9),
  lead2_3.gain(0.4).phaser(15),
  lead3_3.pan(sine),
  bass1_3, bass2_3.gain(0.4)
)
// Outro1 – Angel – 04:30
_outro1_3: stack(
  lead2_3.delay(1).gain(0.2).phaser(16).lpf(1200),
  bass2_3.gain(0.2).adsr("0.1:0.2:0.1:2.5")
)
// Outro2 – Angel– 04:45
_outro2_3: stack(
  lead1_3.gain(0.2).penv("<-0.2 -0.1 0 0>").lpf(600).cpm(6),
  bass1_3.gain(0.3).release(4)
)






