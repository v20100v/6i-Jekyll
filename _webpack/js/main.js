// Import Bootstrap's Javascript
import bootstrap from 'bootstrap';
import '@fortawesome/fontawesome-free/js/all';

// Any CSS you import will output into a single css file (app.css in this case)
import '../scss/main.scss';

(() => {

    /**
     * Handle social share buttons on footer of each page
     */
    function _handleSocialShare() {
        let shareButton = document.getElementById('shareButton');
        let collapseSocialButtons = document.getElementById('collapseSocialButtons');

        shareButton.addEventListener('click', event => {
            let svg = shareButton.querySelectorAll('svg[data-fa-i2svg]')[1];
            svg.classList.toggle('fa-times');
            svg.classList.toggle('fa-share-alt');
        });

        collapseSocialButtons.addEventListener('shown.bs.collapse', event => {
            window.scrollTo(0, document.body.scrollHeight);
        }, false);
    }

    /**
     * In tartiflette we trust !
     */
    (function initView() {
        _handleSocialShare();
    })();

})();