'use strict'

class OrdemServicoController {

    index({ view }) {
        return view.render("frontend.ordemservico");
    }

}

module.exports = OrdemServicoController
