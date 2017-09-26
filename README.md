# About this project

Recently, I was asked to solve the exercises presented here in
(in my view) unreasonably short time. Since I was not satisfied with
the solutions I gave, I rewrote them without time pressure
for its own sake; this should explain the project title.

## Upper left corner - Term Calculator

```
((1 - (2 - (3 - (4 - (5 - 6))))) - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1) * -1
```

&nbsp;

Start with most inner bracket
```javascript
var open_bracket;
for ( var i = 0; i < term.length; i++ ) {
    if ( term[i] == '(' ) {
        open_bracket = i;
        continue;
    }
    if ( term[i] == ')' )
        return brackets( term.substring(0, open_bracket)
            + evaluate(term.substring(open_bracket + 1, i)) + term.substring(i + 1) );
}
```
```
(01)    ((1 - (2 - (3 - (4 - (5 - 6))))) - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1) * -1
(02)    ((1 - (2 - (3 - (4 - -1)))) - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1) * -1
(03)    ((1 - (2 - (3 - 5))) - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1) * -1
(04)    ((1 - (2 - -2)) - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1) * -1
(05)    ((1 - 4) - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1) * -1
(06)    (-3 - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1) * -1
(07)    (-3 - 7 * (7 - (6 - (5 - (4 - 1)))) + 1) * -1
(08)    (-3 - 7 * (7 - (6 - (5 - 3))) + 1) * -1
(09)    (-3 - 7 * (7 - (6 - 2)) + 1) * -1
(10)    (-3 - 7 * (7 - 4) + 1) * -1
(11)    (-3 - 7 * 3 + 1) * -1
(12)    -3 - (7 * 3) + 1
(13)    -3 - 21 + 1
(14)    (-3 - 21) + 1
(15)    -24 + 1
(16)    -23 * -1
```

&nbsp;

Start with most outer bracket
```javascript
var first_open_bracket = -1;
var bracket_counter = 0;
for ( var i = 0; i < term.length; ++i ) {
    if ( term[i] == '(' ) {
        ++bracket_counter;
        if ( first_open_bracket < 0 )
            first_open_bracket = i;
        continue;
    }
    if ( term[i] == ')' ) {
        --bracket_counter;
        if ( !bracket_counter )
            return brackets( term.substring(0, first_open_bracket)
                + brackets(term.substring(first_open_bracket + 1, i)) + term.substring(i + 1) );
    }
}
```
```
(01)    ((1 - (2 - (3 - (4 - (5 - 6))))) - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1) * -1
(02)    (1 - (2 - (3 - (4 - (5 - 6))))) - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1
(03)    1 - (2 - (3 - (4 - (5 - 6))))
(04)    2 - (3 - (4 - (5 - 6)))
(05)    3 - (4 - (5 - 6))
(06)    4 - (5 - 6)
(07)    5 - 6
(08)    4 - -1
(09)    3 - 5
(10)    2 - -2
(11)    1 - 4
(12)    - 3 - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1
(13)    7 - (6 - (5 - (4 - (3 - 2))))
(14)    6 - (5 - (4 - (3 - 2)))
(15)    5 - (4 - (3 - 2))
(16)    4 - (3 - 2)
(17)    3 - 2
(18)    4 - 1
(19)    5 - 3
(20)    6 - 2
(21)    7 - 4
(22)    -3 - 7 * 3 + 1
(23)    -3 - (7 * 3) + 1
(24)    7 * 3
(25)    -3 - 21 + 1
(26)    (-3 - 21) + 1
(27)    -3 - 21
(28)    -24 + 1
(29)    -23 * -1
```

&nbsp;

Start with most outer bracket, optimised
```javascript
var first_open_bracket = -1;
var bracket_counter = 0;
var remaining;
for ( var i = 0; i < term.length; ++i ) {
    if ( term[i] == '(' ) {
        ++bracket_counter;
        if ( first_open_bracket < 0 )
            first_open_bracket = i;
        continue;
    }
    if ( term[i] == ')' ) {
        --bracket_counter;
        if ( !bracket_counter ) {
            remaining = term.substring(i + 1);
            if ( remaining && remaining.match(/[\(]/) )
                return brackets( term.substring(0, first_open_bracket)
                    + brackets(term.substring(first_open_bracket + 1, i)) + brackets(remaining) );
            return brackets( term.substring(0, first_open_bracket)
                + brackets(term.substring(first_open_bracket + 1, i)) + remaining );
        }
    }
}
```
```
(01)    ((1 - (2 - (3 - (4 - (5 - 6))))) - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1) * -1
(02)    (1 - (2 - (3 - (4 - (5 - 6))))) - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1
(03)    1 - (2 - (3 - (4 - (5 - 6))))
(04)    2 - (3 - (4 - (5 - 6)))
(05)    3 - (4 - (5 - 6))
(06)    4 - (5 - 6)
(07)    5 - 6
(08)    4 - -1
(09)    3 - 5
(10)    2 - -2
(11)    1 - 4
(12)    -7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1
(13)    7 - (6 - (5 - (4 - (3 - 2))))
(14)    6 - (5 - (4 - (3 - 2)))
(15)    5 - (4 - (3 - 2))
(16)    4 - (3 - 2)
(17)    3 - 2
(18)    4 - 1
(19)    5 - 3
(20)    6 - 2
(21)    7 - 4
(22)    -7 * 3 + 1
(23)    (-7 * 3) + 1
(24)    -7 * 3
(25)    -21 + 1
(26)    -3 - 20
(27)    -23 * -1
```

---

Optimised `evaluate()`
```javascript
function evaluate (term) {
    
    var operators = term.match(/[+\-\*\/]/g);

    if ( !operators )
        return term;
    
    if ( operators.length == 1 )
        return single_calc(term, operators[0]);
    
    var numbers = term.match(/[z\d\.]+/g);

    if ( operators[0].match(/[+\-]/) && operators[1].match(/[\*\/]/) ) {
        numbers[2] = single_calc(numbers[1] + operators[1] + numbers[2], operators[1]);
        operators.splice(1, 1);
    }
    else {
        numbers[0] = single_calc(numbers[0] + operators[0] + numbers[1], operators[0]);
        operators.splice(0, 1);
    }
    numbers.splice(1, 1);
    
    var to_return = "";
    for ( var i = 0; i < operators.length; i++ )
        to_return += numbers[i] + operators[i];
    to_return += numbers[numbers.length - 1];
    
    return evaluate(to_return);
}
```

&nbsp;

Start with most inner bracket
```
(01)    ((1 - (2 - (3 - (4 - (5 - 6))))) - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1) * -1
                              5 - 6 = -1
                              
(02)    ((1 - (2 - (3 - (4 - -1)))) - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1) * -1
                         4 - -1 = 5
                         
(03)    ((1 - (2 - (3 - 5))) - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1) * -1
                    3 - 5 = -2
                    
(04)    ((1 - (2 - -2)) - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1) * -1
               2 - -2 = 4
               
(05)    ((1 - 4) - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1) * -1
          1 - 4 = -3
          
(06)    (-3 - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1) * -1
                                       3 - 2 = 1
                                       
(07)    (-3 - 7 * (7 - (6 - (5 - (4 - 1)))) + 1) * -1
                                  4 - 1 = 3
                                  
(08)    (-3 - 7 * (7 - (6 - (5 - 3))) + 1) * -1
                             5 - 3 = 2
                             
(09)    (-3 - 7 * (7 - (6 - 2)) + 1) * -1
                        6 - 2 = 4
                        
(10)    (-3 - 7 * (7 - 4) + 1) * -1
                   7 - 4 = 3
                   
(11)    (-3 - 7 * 3 + 1) * -1
         -3 - 7 * 3 + 1 = -3 - 21 + 1 = -24 + 1 = -23
         
(12)    -23 * -1
        -23 * -1 = 23
```
`brackets()` is called 12 times  
`evaluate()` is called 14 times  
Number of characters, respected by `brackets()`: 163 (of 366 given)

&nbsp;

Start with most outer bracket
```
(01)    ((1 - (2 - (3 - (4 - (5 - 6))))) - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1) * -1

(02)    (1 - (2 - (3 - (4 - (5 - 6))))) - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1

(03)    1 - (2 - (3 - (4 - (5 - 6))))

(04)    2 - (3 - (4 - (5 - 6)))

(05)    3 - (4 - (5 - 6))

(06)    4 - (5 - 6)

(07)    5 - 6
        5 - 6 = -1

(08)    4 - -1
        4 - -1 = 5

(09)    3 - 5
        3 - 5 = -2

(10)    2 - -2
        2 - -2 = 4

(11)    1 - 4
        1 - 4 = -3

(12)    -7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1

(13)    7 - (6 - (5 - (4 - (3 - 2))))

(14)    6 - (5 - (4 - (3 - 2)))

(15)    5 - (4 - (3 - 2))

(16)    4 - (3 - 2)

(17)    3 - 2
        3 - 2 = 1

(18)    4 - 1
        4 - 1 = 3

(19)    5 - 3
        5 - 3 = 2

(20)    6 - 2
        6 - 2 = 4

(21)    7 - 4
        7 - 4 = 3

(22)    -7 * 3 + 1
        -7 * 3 + 1 = -21 + 1 = -20

(23)    -3 - 20
        -3 - 20 = -23

(24)    -23 * -1
        -23 * -1 = 23
```
`brackets()` is called 24 times  
`evaluate()` is called 14 times  
Number of characters, respected by `brackets()`: 247 (of 278 given)

&nbsp;

Even combining inner and outer brackets doesn't help:
```javascript
var to_evaluate = "";
var bracket_content = "";
var bracket_counter = 0;
var allow_inner = 1;
for ( var i = 0; i < term.length; i++ ) {
    if ( term[i] == '(' ) {
        if ( bracket_counter ) {
            bracket_content += "(";
            allow_inner = 0;
        }
        bracket_counter++;
        continue;
    }
    if ( term[i] == ')' ) {
        bracket_counter--;
        if ( !bracket_counter ) {
            if ( allow_inner )
                to_evaluate += evaluate( bracket_content );
            else
                to_evaluate += brackets( bracket_content );
            bracket_content = "";
            allow_inner = 1;
        }
        else
            bracket_content += ")";
        continue;
    }
    if ( !bracket_counter )
        to_evaluate += term[i];
    else
        bracket_content += term[i];
}

return evaluate(to_evaluate);
```

leads to
```
(01)    ((1 - (2 - (3 - (4 - (5 - 6))))) - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1) * -1
(02)    (1 - (2 - (3 - (4 - (5 - 6))))) - 7 * (7 - (6 - (5 - (4 - (3 - 2))))) + 1
(03)    1 - (2 - (3 - (4 - (5 - 6))))
(04)    2 - (3 - (4 - (5 - 6)))
(05)    3 - (4 - (5 - 6))
(06)    4 - (5 - 6)
             5 - 6 = -1
             4 - -1 = 5
             3 - 5 = -2
             2 - -2 = 4
             1 - 4 = -3
(07)    7 - (6 - (5 - (4 - (3 - 2))))
(08)    6 - (5 - (4 - (3 - 2)))
(09)    5 - (4 - (3 - 2))
(10)    4 - (3 - 2)
             3 - 2 = 1
             4 - 1 = 3
             5 - 3 = 2
             6 - 2 = 4
             7 - 4 = 3
             -3 - 7 * 3 + 1 = -3 - 21 + 1 = -24 + 1 = -23
             -23 * -1 = 23
```
`brackets()` is called 10 times  
`evaluate()` is called 14 times  
Number of characters, respected by `brackets()`: 203 (of 203 given)

&nbsp;

## Upper right corner - Number search

> A number is seen as **special** if the value of each single digit is not greater than any digit's value right of it.  
> Find the highest _special_ number lower than or equal a given number.

&nbsp;

From a mathematical point of view, a solution could be
```
Define SPECIAL_NUMBER having the same value as GIVEN_NUMBER
While SPECIAL_NUMBER doesn't satisfy the condition
    Decrease SPECIAL_NUMBER by 1
```
This is perfectly valid but probably needs a lot of steps.

&nbsp;

Most simple fast solution is
```
Iterate through digits from most left to second most right
    If actual digit's value is greater than succeeding digit's value
        Decrease actual digit's value by 1
        Set all succeeding digits' values to 9
        Start again
If first value is 0
    Drop first digit
```

&nbsp;

If the digit before the actual digit has a value not equal the actual digit's (previous) value, `Start again` is not necessary. Therefore, most given numbers would benefit of the following:
```
Iterate through digits from most left to second most right
    If actual digit's value is greater than succeeding digit's value
        Decrease actual digit's value by 1
        Set all succeeding digits' values to 9
        If preceding digit exists and preceding digit's value is greater than actual digit's value
            Start again
        Stop iteration
If first value is 0
    Drop first digit
```

Nothing more to say about it.
