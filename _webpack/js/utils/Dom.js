/**
 * The DOMContentLoaded event is fired when the document has been completely loaded and parsed, without waiting for
 * stylesheets, images, and subframes to finish loading (the load event can be used to detect a fully-loaded page).
 */
const ready = (callback) => {
    if (document.readyState !== 'loading') {
        // Document is already ready, call the callback directly
        callback();
    } else if (document.addEventListener) {
        // All modern browsers to register DOMContentLoaded
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        // Old IE browsers
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState === 'complete') {
                callback();
            }
        });
    }
}

/**
 * Call callback that will be triggered when the Fontawesome icons have been rendered. In order to change icon on
 * click, we must wait that all icons have been rendered to access svg content icon.
 *
 * More information here : https://fontawesome.com/how-to-use/on-the-web/advanced/svg-asynchronous-loading
 */
const fontawesomeReady = (callback) => {
    let intervalId;
    let fontawesomeReady = false;
    let counter = 40; // Wait 2s maximum (40*50ms)
    const _counterElapsed = (intervalId) => {
        clearInterval(intervalId);
        console.error('[6i-jekyll] Fontawesome is not ready after 2sec !!!');
    };

    const _nextCheck = (callback) => {
        let html = document.querySelector('html');
        if (typeof html.classList !== 'undefined') {
            if (html.classList.contains('fontawesome-i2svg-complete')) {
                fontawesomeReady = true;
                console.log('[6i-jekyll] Fontawesome is ready !');
                clearInterval(intervalId);
                callback();
            }
        }
    };

    intervalId = setInterval(() => {
        counter--;
        if (counter === 0) {
            _counterElapsed(intervalId);
        }
        _nextCheck(callback);
    }, 50)
};

export {
    ready,
    fontawesomeReady
};