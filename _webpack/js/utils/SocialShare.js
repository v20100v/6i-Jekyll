/**
 * Handler of social share buttons in footer of each pages
 */
const handlerSocialShare = () => {
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

export {
    handlerSocialShare
};