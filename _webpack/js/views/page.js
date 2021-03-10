import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.min.css';

import '../../scss/views/page.scss';
import * as Dom from "../utils/Dom";

Dom.ready(() => {
    let swipers = [];

    /**
     * Init all swipers present in DOM, i.e. a node with a class equals to 'swiper-container'
     */
    const _initSwiper = () => {
        let items = document.querySelectorAll('.swiper-container');

        if (items.length > 0) {
            for (let item of items) {

                let temp = new Swiper(item, {
                    loop: true,
                    zoom: true,
                    spaceBetween: 40,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    keyboard: {
                        enabled: true,
                        onlyInViewport: true
                    }
                });
                swipers.push(temp);
            }

            console.debug('[6i-Jekyll] Found ' + items.length + ' carousel "swipers.js" to initialize');
        }
    };

    /**
     * In tartiflette we trust !
     */
    (function initView() {
        _initSwiper();
    })();
});