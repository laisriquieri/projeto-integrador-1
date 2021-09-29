'use strict'

class FilmesController {

    index({ view }) {
        return view.render("frontend.filmes");
    }

}

module.exports = FilmesController
