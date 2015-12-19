# DecimalTime

DecimalTime is a small (UTC-only) implementation of the decimal time units.

In decimal time, a day has 10 hours, an hour has 100 minutes and a minute has 100 seconds. 
A decimal second is exactly 0.864 _normal_ seconds long.

## The beauty of decimal time

Decimal time is great because its units are all `base 10^n` to the next smaller unit.
This means you can easily add or subtract time fractions without converting between units:

> Imagine you worked 2 hours and 30 minutes today. That's `0.23` days, or `230` minutes, or `2300` seconds
> Now if you started working at noon (`5:00`) and drove home by `8:20`, how long was your lunchbreak?
> Easy! `8:20 - 5:00 - 2:30 =  0:90`. It's that easy! 
