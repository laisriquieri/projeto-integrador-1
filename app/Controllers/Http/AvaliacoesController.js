'use strict'

class AvaliacoesController {

    index({ view }) {
        return view.render("frontend.avaliacoes");
    }

}

module.exports = AvaliacoesController
