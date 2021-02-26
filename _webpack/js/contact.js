import '../scss/layouts/contact.scss';
import * as Dom from "./utils/Dom";
import Swiper from "swiper";

Dom.ready(() => {

    /**
     * Set height of div contact-footer, in order to stick it with the contact-form
     */
    const _setHeightContactFooter = () => {
        let contactFooter = document.querySelector('.contact-footer');
        contactFooter.style.height = '0px';

        let bodyHeight = document.querySelector('body').scrollHeight;
        let header = document.getElementById('main-header');
        let headerHeight = header.offsetHeight;
        let headerMarginBottom = parseInt(window.getComputedStyle(header, null).getPropertyValue('margin-bottom'));
        let containerHeight = document.querySelector('#main-container .container').offsetHeight;
        let mainFooterHeight = document.getElementById('main-footer').offsetHeight;
        let wave = document.querySelector('.wave');
        let waveHeight = parseInt(window.getComputedStyle(wave, null).getPropertyValue('height'));

        let availableHeight = bodyHeight - (headerHeight + headerMarginBottom + containerHeight + mainFooterHeight) + waveHeight + 10;
        availableHeight = (availableHeight > 0) ? availableHeight : 0;
        contactFooter.style.height = availableHeight + 'px';


    };

    const _setNumberRowsOfTextarea = () => {
        let textarea = document.querySelector('textarea');
        textarea.setAttribute('rows', 1);

        let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        let header = document.getElementById('main-header');
        let headerHeight = header.offsetHeight;
        let headerMarginBottom = parseInt(window.getComputedStyle(header, null).getPropertyValue('margin-bottom'));
        let containerHeight = document.querySelector('#main-container .container').offsetHeight;
        let mainFooterHeight = document.getElementById('main-footer').offsetHeight;

        let availableHeight = vh - (headerHeight + headerMarginBottom + containerHeight + mainFooterHeight);
        let rows;
        if (availableHeight < 25 * 4) {
            rows = 4;
        } else {
            rows = Math.floor(availableHeight / 25);
        }
        textarea.setAttribute('rows', rows);

        // console.debug('vh = ' + vh);
        // console.debug('headerHeight = ' + headerHeight);
        // console.debug('headerMarginBottom = ' + headerMarginBottom);
        // console.debug('containerHeight = ' + containerHeight);
        // console.debug('mainFooterHeight = ' + mainFooterHeight);
        // console.debug('availableHeight = ' + availableHeight);
        // console.debug('rows = ' + rows);
        // console.debug('--- end ---')
    }

    /**
     * When windows is resized, refresh the height of contact footer
     */
    const _handleResizeWindow = () => {
        Dom.handleResizeWindow(() => {
            console.debug('[6i-Jekyll] Windows is resized');
            _setNumberRowsOfTextarea();
            _setHeightContactFooter();
        });
    };

    /**
     * When textarea is resized, refresh the height of contact footer
     */
    const _handleResizeTextarea = () => {
        let timer;
        let textarea = document.querySelector('textarea');
        let width = textarea.clientWidth, height = textarea.clientHeight;

        textarea.addEventListener('mouseup', () => {
            clearTimeout(timer);
            timer = setTimeout(function () {
                if (textarea.clientWidth !== width || textarea.clientHeight !== height) {
                    console.debug('[6i-Jekyll] textarea is resized');
                    _setNumberRowsOfTextarea();
                    _setHeightContactFooter();
                }
                width = textarea.clientWidth;
                height = textarea.clientHeight;
            }, 75);
        });


    };

    /**
     * Automatically expand a textarea as the user types into it.
     */
    const _handleAutoExpandTextarea = () => {
        let textarea = document.querySelector('textarea');

        textarea.addEventListener('input', () => {
            textarea.style.height = 'inherit';

            let computed = window.getComputedStyle(textarea);
            let height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                + parseInt(computed.getPropertyValue('padding-top'), 10)
                + textarea.scrollHeight
                + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

            textarea.style.height = height + 'px';
        });
    };

    /**
     * In tartiflette we trust !
     */
    (function initView() {
        console.debug('[6i-Jekyll] Init "Contact" view.');

        if(document.querySelector('.contact') !== null) {
            _setNumberRowsOfTextarea();
            _setHeightContactFooter();
            _handleResizeWindow();
            _handleResizeTextarea();
            _handleAutoExpandTextarea();
        }
    })();
});