/**
 * Handler of social share buttons in footer of each pages
 */
const handleClickFullscreenImages = () => {
    let images = document.querySelectorAll('img');

    images.forEach((image) => {
        image.addEventListener('click', event => {
            if (!event.target.matches('img')) {
                return;
            }
            event.preventDefault();

            let img = document.createElement('img');
            img.classList.add('overlay-img');
            img.src = event.target.src;

            let overlay = document.createElement('div');
            overlay.classList.add('overlay');
            overlay.append(img);

            overlay.addEventListener('click', event => {
                if (event.target.classList.contains('overlay')) {
                    event.target.remove();
                } else if (event.target.classList.contains('overlay-img')) {
                    event.target.parentNode.remove();
                }
            }, {'once': true});

            document.body.appendChild(overlay);
        });
    });
}

export {
    handleClickFullscreenImages
};