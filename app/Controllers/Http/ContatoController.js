'use strict'

class ContatoController {

    index({ view }) {
        return view.render("frontend.contato");
    }

}

module.exports = ContatoController
