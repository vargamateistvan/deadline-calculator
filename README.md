# Deadline Calculator

## Install dependencies

```
yarn
```

## Run `main.js`

```
yarn start
```

## Run Tests

```
yarn test
```

This exercise focuses on assessing algorithmic skills and the ability to write production-ready code. The task involves creating a deadline calculator program that determines the resolution date and time for reported problems (bugs) based on specific rules:

- Working hours are from 9 AM to 5 PM, Monday through Friday.
- The program doesn't account for holidays; a holiday on a Thursday is still considered a working day, and a working Saturday is considered a nonworking day.
- Turnaround time is given in working hours. For instance, 2 days are equivalent to 16 working hours.
- Problems can only be reported during working hours (9 AM to 5 PM).

Your main task is to implement the `calculateDeadline` method, which takes the submit date and turnaround time as input and returns the date and time when the issue should be resolved.

Usage of third-party date-time libraries like moment.js or date-fns is not allowed.
