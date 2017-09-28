function make_calculation (first, second, operator) {
    switch ( operator ) {
        case "+":
            return (first + second);
        break;
        case "-":
            return (first - second);
        break;
        case "*":
            return (first * second);
        break;
        case "/":
            if ( !second )
                return 0;
            return (first / second);
    }
}
function calculate_polish (stack) {

    var index = 0;
    while ( stack.length > 1 ) {
        while ( !isNaN(stack[index]) )
            index++;
        stack[index] = make_calculation(stack[index - 2], stack[index - 1], stack[index]);
        stack.splice(index - 2, 2);
        index -= 2;
    }

    return stack[0];
}
/**
 * Invention of Edsger Dijkstra
 */
function shunting_yard (src) {

    /**
     * Could be extended, i.e. with exponents...
     */
    var operator_precedence = {
        "+": 2,
        "-": 2,
        "*": 3,
        "/": 3
    };

    var output = [];
    var operators = [];

    var token;
    while ( src.length ) {
        token = src.shift();
        if ( !isNaN(token) ) {
            output.push(token);
            continue;
        }
        if ( operator_precedence[token] ) {
            while ( operators.length && operator_precedence[operators[operators.length - 1]] >= operator_precedence[token] )
                output.push(operators.pop());
            operators.push(token);
            continue;
        }
        if ( token == "(" ) {
            operators.push(token);
            continue;
        }
        if ( token == ")" ) {
            while ( operators[operators.length - 1] != "(" )
                output.push(operators.pop());
            operators.pop();
        }
    }
    while ( operators.length )
        output.push(operators.pop());

    return output;
}
function rpl (raw_term) {

    var term = minus_to_z(raw_term);
    term = term.replace(/([+\-\*\/\(\)])/g, " $1 ");
    term = term.replace(/^\s+/, "");
    term = term.replace(/\s+$/, "");
    term = term.replace(/\s+/g, " ");
    term = term.replace(/z/g, "-");

    /**
     * Numbers as numbers needed
     */
    var src = term.split(" ");
    for ( var i = 0; i < src.length; i++ ) {
        if ( !isNaN(src[i]) )
            src[i] = parseFloat(src[i]);
    }

    console.log( "Infix Notation:\n\t" + src.join(" ").replace(/\(\s?/g, "(").replace(/\s?\)/g, ")") );

    var polish = shunting_yard(src);
    console.log( "Postfix Notation:\n\t" + polish.join(" ") );

    if ( polish.length < 3 )
        return;

    var result = calculate_polish(polish);
    console.log( "Result: " + result );
    console.log( "" );
}
