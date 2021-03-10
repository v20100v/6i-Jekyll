import '../../scss/views/tags.scss';
import * as Dom from "../utils/Dom";

Dom.ready(() => {

    const _showBlocExcerpt = () => {
        let btn = document.querySelector('#btn-show-excerpt');
        let blocExcerpt = document.querySelectorAll('.note-excerpt');
        [...blocExcerpt].forEach((node) => {
            node.classList.remove('d-none');
        });

        btn.title = "Hide all excerpts";
    };

    const _hideBlocExcerpt = () => {
        let btn = document.querySelector('#btn-show-excerpt');
        let blocExcerpt = document.querySelectorAll('.note-excerpt');
        [...blocExcerpt].forEach((node) => {
            node.classList.add('d-none');
        });

        btn.title = "Show all excerpts";
    };

    /**
     * Handle click to show post excerpt
     */
    const _handleClickShowExcerpt = () => {
        let btn = document.querySelector('#btn-show-excerpt');
        let blocExcerpt = document.querySelectorAll('.note-excerpt');

        btn.addEventListener('click', () => {
            if (blocExcerpt[0].classList.contains('d-none')) {
                _showBlocExcerpt(blocExcerpt, btn);
                window.localStorage.setItem("userPreferences.showExcerpt", true);
            } else {
                _hideBlocExcerpt(blocExcerpt, btn)
                window.localStorage.setItem("userPreferences.showExcerpt", false);
            }
        });
    };

    /**
     * Load user preferences in projects view page (show technologies, show as list or grid)
     */
    const _loadUserPreferences = () => {
        if (window.localStorage) {
            let userPreferences = {};
            userPreferences.showExcerpt = window.localStorage.getItem('userPreferences.showExcerpt');
            console.debug('[6i-Jekyll] Load user preferences from local storage ; userPreferences =', userPreferences);

            // Show or hide blocs technologies
            if (userPreferences.showExcerpt === 'true') {
                _showBlocExcerpt();
            } else {
                _hideBlocExcerpt();
            }
        } else {
            console.warn('[6i-Jekyll] Local Storage is not supported in your browser, please stop MINITEL !');
        }
    };

    /**
     * In tartiflette we trust !
     */
    (function initView() {
        console.debug('[6i-Jekyll] Init "Tags" view');

        _loadUserPreferences();
        _handleClickShowExcerpt();
    })();
});