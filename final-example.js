// prendiamo la temperatura max e min di Roma per oggi!

const getMinAndMax = function () {
  fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=41.8919&longitude=12.5113&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin&forecast_days=1'
  )
    .then((res) => {
      if (res.ok) {
        // preleverò i dati del meteo
        return res.json()
      } else {
        if (res.status === 404) {
          throw new Error('Not found')
        } else if (res.status === 500) {
          throw new Error('Internal Server Error')
        } else {
          throw new Error('Errore nella chiamata API')
        }
      }
    })
    .then((data) => {
      console.log(data)
      let spinnerContainer = document.getElementById('spinner-container')
      spinnerContainer.classList.add('d-none')
      //   prendo un riferimento alla colonna
      let mainCol = document.getElementById('main-col')
      mainCol.innerHTML = `
        <h3>MIN: ${data.daily.temperature_2m_min[0]}</h3>
        <h3>MAX: ${data.daily.temperature_2m_max[0]}</h3>
    `
    })
    .catch((err) => {
      console.log(err)
    })
}

getMinAndMax()

setInterval(getMinAndMax, 300000)
