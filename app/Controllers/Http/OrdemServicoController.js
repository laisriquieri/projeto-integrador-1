'use strict'

class OrdemServicoController {

    show({ view }) {
        return view.render('frontend.ordensservicos.show');
    }

    create({ view }) {
        return view.render('frontend.ordensservicos.create');
    }

}

module.exports = OrdemServicoController
