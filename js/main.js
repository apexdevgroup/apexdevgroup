document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('section div') // fade all the things

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.35 // adjust threshold as needed
    }

    const handleIntersection = (elements, observer) => {
        elements.forEach((element) => {
            if (element.isIntersecting && element.intersectionRatio > 0) {
                element.target.classList.add('fade-in-up')
                observer.unobserve(element.target)
            }
        })
    }

    const observer = new IntersectionObserver(handleIntersection, options)

    elements.forEach((element) => {
        element.style.setProperty('opacity', 0) // prevent fouc/foutc
        observer.observe(element)
    })
})

const formEl = document.getElementById('contact-form')
const errEl = document.getElementById('contact-form-error')
const errMsgEl = document.getElementById('contact-form-error-msg')

formEl.addEventListener('submit', formSubmit)

async function formSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.target)

    try {
        const response = await fetch('https://getform.io/f/62ac0733-2fcb-483d-9f2d-ae015ec86b1b', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            }
        })
        // console.log(response)

        if (!response.ok) {
            // Handle HTTP error status codes
            // throw new Error(`HTTP error! Status: ${response.status}`)
            handleError(`HTTP Error ${response.status}`)
        } else {
            errEl.classList.add('hidden')
            formEl.classList.add('hidden')
            formEl.nextElementSibling.classList.remove('hidden')
        }
    } catch (error) {
        // console.error(error)
        handleError(error.message)
    }
}

function handleError(err) {
    errEl.classList.remove('hidden')
    errMsgEl.textContent = err
}