import '../scss/layouts/page.scss';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.min.css';

(() => {
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
                    autoHeight: true,
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
        }
    };

    /**
     * In tartiflette we trust !
     */
    (function initView() {
        _initSwiper();
    })();

})();