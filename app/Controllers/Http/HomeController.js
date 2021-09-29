'use strict'

class HomeController {

    index({ view }) {
        return view.render("frontend.home");
    }

}

module.exports = HomeController
