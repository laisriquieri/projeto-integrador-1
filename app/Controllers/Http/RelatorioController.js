'use strict'

const Cliente = use('App/Models/Cliente');
const Database = use('Database');
const OrdemServico = use('App/Models/OrdemServico');

class RelatorioController {

    async index ({ view }) {

      var dropdown_os_mes_ano = await Database.raw(
      `SELECT DISTINCT CONCAT(MONTH(data_entrada),'-',YEAR(data_entrada)) mes_ano FROM ordem_servicos ORDER BY data_entrada DESC `);

      return view.render('frontend.relatorios.index', {meses: dropdown_os_mes_ano[0]});
    }

    async osPorMes ({ view, params, request }) {
   
      const mes_ano = request.only(['mes_ano']).mes_ano
      const mes_ano_split = mes_ano.split('-');
      const mes = mes_ano_split[0];
      const ano = mes_ano_split[1];

      var os_por_mes = await Database.raw(
      `SELECT id FROM ordem_servicos WHERE MONTH(data_entrada) = ${mes} AND YEAR(data_entrada) = ${ano}`);

      var id_os_por_mes = os_por_mes[0].map((os) => {return os.id});

      os_por_mes = await OrdemServico
                      .query()
                      .whereIn('id', id_os_por_mes)
                      .with('cliente')
                      .fetch()

      os_por_mes = os_por_mes['rows']
      const formataReais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

      os_por_mes.forEach( os => {
        os.valor_total_liquido = formataReais.format(os.valor_total_liquido);
      } )
      
      return view.render('frontend.relatorios.os-por-mes', { mes_ano: mes_ano,
              ordensservicos: os_por_mes } );
        
    }

    async aniversariantes ({ request, view }) {

      var aniversariantes = await Database.raw(
      `SELECT * FROM clientes WHERE tipo = 'PF' AND MONTH(data_nascimento) = MONTH(CURRENT_DATE()) AND DAY(data_nascimento) = DAY(CURRENT_DATE())`);

      return view.render('frontend.relatorios.aniversariantes',  { clientes: aniversariantes[0] });

    }

}

module.exports = RelatorioController
