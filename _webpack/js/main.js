import bootstrap from 'bootstrap';
import '../scss/main.scss';
import '@fortawesome/fontawesome-free/js/all.min';

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