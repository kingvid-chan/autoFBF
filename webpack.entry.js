require('./src/css/normalize.css');
require('./src/css/style.scss');
require('./src/css/sprite.css');
require('./src/css/fullpage.css');

require('./src/plugins/fullpage.js');
$(document).ready(function(){
    $('.pages').height($(window).height());
})
if (NODE_ENV === 'development') {
    const htmlContext = require.context('./src', true, /\.html$/i);
    htmlContext.keys().forEach((key) => {
        htmlContext(key);
    });
    require('./src/js/main.js');
}
