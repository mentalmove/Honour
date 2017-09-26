(function(){
    
    var forms = document.getElementsByTagName("form");
    
    function append_element (type, parent) {
        var element = document.createElement(type);
        parent.appendChild(element);
        return element;
    }
    function create_placeholder (parent) {
        var placeholder = append_element("span", parent);
        placeholder.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    
    function random_term () {
        var MAX = 120;
        var NUM = 12;
        
        function randy () {
            var tmp;
            do
                tmp = Math.floor( Math.random() * MAX ) - (MAX / 6);
            while ( !tmp );
            return tmp;
        }
        function operate () {
            var operators = [ "+", "-", "*", "/" ];
            return operators[Math.floor( Math.random() * operators.length )];
        }
        function make_term (a) {
            var s = a[0];
            for ( var i = 1; i < a.length; i++ ) {
                s += operate();
                if ( !a[i].toString().indexOf("-") )
                    s += " ";
                s += a[i];
            }
            return s;
        }
        
        var i, tmp, tmp2, rand, term;
        
        var src = [];
        for ( i = 0; i < NUM; i++ )
            src[i] = randy();
        
        while ( src.length > NUM / 4 ) {
            tmp = "(" + src.shift();
            rand = Math.floor(Math.random() * 2) + 2;
            for ( i = 0; i < rand; i++ ) {
                tmp2 = src.shift();
                if ( tmp2 < 0 )
                    tmp2 = " " + tmp2;
                tmp += operate() + tmp2;
            }
            tmp += ")";
            src.push(tmp);
            src.push( randy() );
        }
        
        return make_term(src);
    }
    var terms = [
        "1 + 2 + 3 * 4",
        "(1 + 2 + 3) * 4",
        "(3 - (3 - (3 - (3 - (2 - 1))))) - 1 * (4 - (4 - (4 - (4 - (3 - 1))))) + 2",
        "4 * (3 + 4) / 5 - 6 * (5 - 4 / 3) / 2 + (42 - 1) / 5"
    ];
    terms.push(random_term());
    function example_term () {
        
        var index = Math.floor(Math.random() * terms.length);
        forms[1]["in"].value = terms[index];                                    // For any reasons, the compress application doesn't like OBJECT.in
        terms[index] = random_term();
        
        forms[1].out.value = "";
    }
    
    var last_graph = -1;
    function example_graph () {
        
        var graphs = [
            "9x / 16",
            "10000 / x",
            "x * x / 480 - 240",
            "1000000 / ((x - 30) * (x - 30))",
            "30-(16+(-8-(37+8*29)/17)*12*((39- -7/x)/13+(11/28*(23*22/x))))/36"
        ];
        
        var index = last_graph;
        while ( index == last_graph )
            index = Math.floor(Math.random() * graphs.length);
        last_graph = index;
        forms[1]["in"].value = graphs[index];
        calculate(forms[1]);
    }
    
    function example_number () {
        
        var len = Math.ceil( Math.random() * 9 ) + 9;
        
        var a = [];
        var ideal, subtr, i, tmp, add;
        var lowest = 9;
        var highest = 1;
        for ( var i = 0; i < len; i++ ) {
            ideal = Math.floor(5 / len * i) + 5;
            subtr = Math.floor((2 * ideal - Math.floor(Math.random() * ideal)) / 2);
            tmp = ideal - Math.floor(Math.random() * subtr);
            if ( tmp < lowest )
                lowest = tmp;
            if ( tmp > highest )
                highest = tmp;
            a.push(tmp);
        }
        lowest--;
        
        add = lowest + 9 - highest;
        
        if ( lowest ) {
            for ( var i = 0; i < a.length; i++ )
                a[i] -= lowest;
        }
        
        for ( i = 0; i < a.length && add > 0; i++ ) {
            tmp = a.length - 1 - i;
            a[tmp] += add--;
        }
        
        for ( i = 0; i < (a.length - 1); i++ ) {
            if ( (!i && a[0] > 1) || (i && (a[i] - a[i - 1]) > 1) )
                a[i]--;
            if ( !Math.floor(Math.random() * len) )
                break;
            if ( a[i] > a[i + 1] )
                a[i + 1]++;
        }
        
        forms[0].out.value = "";
        forms[0]["in"].value = a.join("");
    }
    
    function create_examples () {
        
        var button, i;
    
        for ( i = 0; i < 3; i++ )
            create_placeholder(forms[1]);
        
        var button = append_element("input", forms[1]);
        button.type = "button";
        button.value = " Example Term ";
        button.onclick = example_term;
        
        create_placeholder(forms[1]);
        
        button = append_element("input", forms[1]);
        button.type = "button";
        button.value = " Example Graph ";
        button.onclick = example_graph;
        
        for ( i = 0; i < 9; i++ )
            create_placeholder(forms[0]);
        
        button = append_element("input", forms[0]);
        button.type = "button";
        button.value = " Example Number ";
        button.onclick = example_number;
    }
    
    demonstrate.create_examples = create_examples;
    
})();
