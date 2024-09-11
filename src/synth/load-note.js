var soundsCache = require('./sounds-cache')

async function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('soundfonts-cache', 1)
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains('sounds')) {
        db.createObjectStore('sounds', { keyPath: 'id' })
      }
    }
    request.onsuccess = (event) => resolve(event.target.result)
    request.onerror = (event) => reject(event.target.error)
  })
}

async function getFromCache(db, key) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['sounds'], 'readonly')
    const store = transaction.objectStore('sounds')
    const request = store.get(key)
    request.onsuccess = (event) => resolve(event.target.result && event.target.result.data)
    request.onerror = (event) => reject(event.target.error)
  })
}

async function saveToCache(db, key, blob) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['sounds'], 'readwrite')
    const store = transaction.objectStore('sounds')
    const request = store.put({ id: key, data: blob })
    request.onsuccess = () => resolve()
    request.onerror = (event) => reject(event.target.error)
  })
}

var getNote = async function (url, instrument, name, audioContext) {
  if (!soundsCache[instrument]) soundsCache[instrument] = {}
  var instrumentCache = soundsCache[instrument]
  const cacheKey = `${instrument}-${name}`

  try {
    const db = await openDatabase()
    const cachedSound = await getFromCache(db, cacheKey)

    if (!instrumentCache[name]) {
      instrumentCache[name] = new Promise(async function (resolve, reject) {
        const loadNote = () => {
          let noteUrl = url + instrument + '-mp3/' + name + '.mp3'
          var xhr = new XMLHttpRequest()
          xhr.open('GET', noteUrl, true)
          xhr.responseType = 'arraybuffer'
          xhr.onload = async function () {
            if (xhr.status !== 200) {
              reject(Error("Can't load sound at " + noteUrl + ' status=' + xhr.status))
              return
            }
            const data = xhr.response
            saveToCache(db, cacheKey, new Blob([data]))
            var noteDecoded = async function (audioBuffer) {
              resolve({
                instrument: instrument,
                name: name,
                status: 'loaded',
                audioBuffer: audioBuffer,
              })
            }
            var maybePromise = audioContext.decodeAudioData(xhr.response, noteDecoded, function () {
              reject(Error("Can't decode sound at " + noteUrl))
            })
            if (maybePromise && typeof maybePromise.catch === 'function') maybePromise.catch(reject)
          }
          xhr.onerror = function () {
            reject(Error("Can't load sound at " + noteUrl))
          }
          xhr.send()
        }

        if (cachedSound) {
          const reader = new FileReader()
          reader.onload = function (event) {
            audioContext.decodeAudioData(
              event.target.result,
              function (audioBuffer) {
                resolve({
                  instrument: instrument,
                  name: name,
                  status: 'loaded',
                  audioBuffer: audioBuffer,
                })
              },
              function () {
                loadNote()
                console.error("Can't decode cached sound at " + cacheKey)
              },
            )
          }
          reader.onerror = function () {
            loadNote()
            console.error("Can't read cached sound at " + cacheKey)
          }
          reader.readAsArrayBuffer(cachedSound)
        } else {
          loadNote()
        }
      }).catch((err) => {
        console.error("Didn't load note", instrument, name, ':', err.message)
        throw err
      })
    }
  } catch (error) {
    console.error('Error accessing cache or loading note', instrument, name, ':', error.message)
    reject(error)
  }

  return instrumentCache[name]
}

module.exports = getNote
