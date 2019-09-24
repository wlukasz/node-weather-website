const ownLocationButton = document.querySelector('#own-loc-btn')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

ownLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) { //naviggator is a browser feature
        return alert('Geolocation is not supported by your browser.')
    }

    ownLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude= position.coords.longitude

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

        fetch(`/weather/own?lat=${latitude}&lon=${longitude}`).then((response) => {
            response.json().then(({error, forecast, location} = {}) => {
                
                if (error) {
                    messageOne.textContent = error
                } else {
                    messageOne.textContent = location
                    messageTwo.textContent = forecast
                }
                ownLocationButton.removeAttribute('disabled')
            })
        })
    })
})

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then(({error, forecast, location} = {}) => {
            
            if (error) {
                messageOne.textContent = error
            } else {
                messageOne.textContent = location
                messageTwo.textContent = forecast
            }
            search.value = ''
        })
    })
})