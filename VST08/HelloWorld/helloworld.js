var tl = require('vso-task-lib');
var art = require('ascii-art');

var msg = tl.getInput('msg', true);

art.font(msg, 'Contessa', 'magenta', function (rendered) {
    rendered = rendered.replace('\033[35m', '').replace('\033[0m','');
    console.log(rendered);
});




