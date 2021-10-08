'use strict'

class OrdemServicoController {

    index({ view }) {
        return view.render('frontend.ordensservicos.index');
    }

    create({ view }) {
        return view.render('frontend.ordensservicos.create');
    }

}

module.exports = OrdemServicoController
