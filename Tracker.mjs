// @ts-check

// @ts-expect-error
import Hotjar from 'https://unpkg.com/@hotjar/browser@1.0.9/dist/index.esm.js'

const HOTJAR_VERSION = 6

const HOTJAR_SITE_ID = 5093932;

class Tracker {
  #initialized = false

  #trackers = /** @type {Map<string, number>} */ (new Map())

  /** @param {string} feature */
  initialize(feature) {
    const count = this.#trackers.get(feature) ?? 0

    this.#trackers.set(feature, count + 1)

    if (this.#initialized) return

    this.#initialized = Hotjar.init(HOTJAR_SITE_ID, HOTJAR_VERSION, {
      debug: true
    })
  }

  /** @param {string} feature */
  finalize(feature) {
    const count = (this.#trackers.get(feature) ?? 1) - 1

    if (count === 0) {
      this.#trackers.delete(feature)
    } else {
      this.#trackers.set(feature, count)
    }

    if (this.#trackers.size > 0) return

    if (!this.#initialized) return

    const script = document.getElementById('hotjar-init-script')
    script?.remove()
    window.hj?.q?.splice(0, window.hj.q.length)
    window.hj?.metrics?.stop()
    delete window.hj?.metrics
    delete window.hj
  }
}

export default Tracker
