window.addEventListener('scroll', () => {
    const stickynav = document.querySelector('.sticky')

    if (window.scrollY > (stickynav.offsetTop + (stickynav.offsetHeight - 1))) {
        stickynav.nextElementSibling.style['padding-top'] = stickynav.offsetHeight + 'px';
        stickynav.classList.add('stuck')
    } else {
        stickynav.nextElementSibling.removeAttribute('style')
        stickynav.classList.remove('stuck')
    }
})