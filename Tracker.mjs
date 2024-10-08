import Hotjar from "https://unpkg.com/@hotjar/browser@1.0.9/dist/index.esm.js";

const HOTJAR_VERSION = 6;

const HOTJAR_SITE_ID = 5_093_932;

class Tracker {
  #initialized = false;

  #trackers = new Map();

  initialize(feature) {
    const count = this.#trackers.get(feature) ?? 0;

    this.#trackers.set(feature, count + 1);

    if (this.#initialized) return;

    // const stub = window.hj;

    // if (stub && Symbol.for("is stub hj") in stub) {
    //   delete window.hj;
    // }

    // defines 'window.hj'
    if (!window.hj)
      this.#initialized = Hotjar.init(HOTJAR_SITE_ID, HOTJAR_VERSION, {
        debug: true,
      });
    else
      window.hj.metrics.start()

    // // defines stub as 'window.hj' when couldn't initialize it
    // if (!window.hj && stub) {
    //   window.hj = stub;
    // }
  }

  finalize(feature) {
    const count = (this.#trackers.get(feature) ?? 1) - 1;

    if (count === 0) {
      this.#trackers.delete(feature);
    } else {
      this.#trackers.set(feature, count);
    }

    if (this.#trackers.size > 0) return;

    if (!this.#initialized) return;

    // const script = document.getElementById("hotjar-init-script");
    // const iframe = document.querySelector("iframe[title=_hjSafeContext]");
    // script?.remove();
    // iframe?.remove();
    // window.hj?.q?.splice(0, window.hj.q.length);
    window.hj?.metrics?.stop();
    // delete window.hj?.metrics;
    // delete window.hj;

    // creates an stub hotjar object to avoid errors
    // window.hj = {
    //   [Symbol.for("is stub hj")]: true,
    //   hq() {},
    //   tryCatch() {},
    // };

    this.#initialized = false;
  }
}

export default Tracker;
