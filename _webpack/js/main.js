import bootstrap from 'bootstrap';
import '@fortawesome/fontawesome-free/js/all.min';
import '../scss/main.scss';

import * as Utils from './utils';

Utils.Dom.ready(() => {

    /**
     * In tartiflette we trust !
     */
    (function initView() {
        Utils.SocialShare.handlerSocialShare();
    })();
});