'use strict'

class CategoriaController {

    index({ view }) {
        return view.render("frontend.categoria");
    }

}

module.exports = CategoriaController
