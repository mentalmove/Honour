(function(){
    var scripts = document.getElementsByTagName("script");
    var first_line, first_letter, i, j, content;
    var content_collection = [];

    content = scripts[1].innerHTML;
    content_collection[0] = content.split("\n");

    for ( i = 0; i < content_collection[0].length; i++ ) {
        first_letter = content_collection[0][i].search(/\w/);
        if ( first_letter != -1 ) {
            first_line = i;
            break;
        }
    }

    content = scripts[2].innerHTML;
    content_collection[1] = content.split("\n");

    var draw_zone = iD("draw_zone");
    var context = draw_zone.getContext("2d");
    context.clearRect(0, 0, draw_zone.width, draw_zone.height);

    context.font = "11pt monostyle";
    context.textAlign = "left";
    context.strokeStyle = "#424244";

    var line;
    var line_add = 17;

    var lines = [ first_line, 0 ];

    for ( i = 0; i < content_collection.length ; i++ ) {
        for ( j = lines[i]; j < content_collection[i].length; j++ ) {
            if ( j == lines[i] )
                line = 31;
            if ( content_collection[i][j].length <= first_letter )
                continue;
            context.strokeText(content_collection[i][j].substr(first_letter), parseInt((content_collection.length - i - 1) * draw_zone.width / 2) + 7, line);
            line += line_add;
            if ( line + line_add > draw_zone.height )
                break;
        }
    }

    var saved_code_image = context.getImageData(0, 0, draw_zone.width, draw_zone.height);
    
    var f = function () {
        context.putImageData(saved_code_image, 0, 0);
    };
    window.restore_code = f;

    context.clearRect(0, 0, draw_zone.width, draw_zone.height);

    draw_zone.style.display = "inline";
})();
