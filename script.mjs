import Tracker from './Tracker.mjs'

document.addEventListener('readystatechange', (event) => {
  if (document.readyState !== 'complete') return

  const tracker = new Tracker()
  
  document.getElementById('start').addEventListener('click', () => {
    tracker.initialize('site')
  })
  
  document.getElementById('stop').addEventListener('click', () => {
    tracker.finalize('site')
  })
})

