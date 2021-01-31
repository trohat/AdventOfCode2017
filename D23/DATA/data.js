let inputdata = `
set b 99        // 0: b = 99
set c b         // 1: c = b
jnz a 2         // 2: if (a != 0) skipnext
jnz 1 5         // 3: goto 8
mul b 100       // 4: b *= 100
sub b -100000   // 5: b += 100000
set c b         // 6: c = b
sub c -17000    // 7: c += 17000
set f 1         // 8: f = 1
set d 2         // 9: d = 2
set e 2         // 10: e = 2
set g d         // 11: g = d
mul g e         // 12: g *= e
sub g b         // 13: g -= b
jnz g 2         // 14: if (g != 0) skipnext
set f 0         // 15: f = 0
sub e -1        // 16: e++
set g e         // 17: g = e
sub g b         // 18: g -= b
jnz g -8        // 19: if (g != 0) goto 11
sub d -1        // 20: d++
set g d         // 21: g = d
sub g b         // 22: g -= b
jnz g -13       // 23: if (g != 0) goto 10
jnz f 2         // 24: if (f != 0) skipnext
sub h -1        // 25: h++
set g b         // 26: g = b
sub g c         // 27: g -= c
jnz g 2         // 28: if (g != 0) skipnext
jnz 1 3         // 29: exit
sub b -17       // 30: b += 17
jnz 1 -23`;     // 31: goto 8