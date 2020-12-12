import React,{useState, useEffect} from 'react';
import Grafico from './grafico'

import './form.css'

const axios = require('axios')
const parser = new DOMParser();

const xmlDoc = data => parser.parseFromString(data, "text/html");
const cidade = data => data.replace(/( )+/g, '%20').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")


const formatarData = data => new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

function getDias(ct_info) {
  let dias = []
  let minima = ct_info.querySelectorAll('minima')
  let maxima = ct_info.querySelectorAll('maxima')
  let dia = ct_info.querySelectorAll('dia')

  for (let i = 0; i <= 5; i += 1) {
    dias.push({
      minima: minima[i].childNodes[0].nodeValue,
      maxima: maxima[i].childNodes[0].nodeValue,
      dia: dia[i].childNodes[0].nodeValue
    })

  }
  return dias
}

function Main() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('Brasilia');
  const [info, setInfo] = useState({})
  const [graph, setGraph] = useState()

  useEffect(() => {
    const url_id_city = `http://servicos.cptec.inpe.br/XML/listaCidades?city=${cidade(query)}`

    async function fetchData() {
      await axios.get(url_id_city).then(resp => {
        if (xmlDoc(resp.data).getElementsByTagName('cidade')[0] === undefined) {
          return setInfo({ nome: `N/A`, uf: 'N/A' })
        } else {
          return xmlDoc(resp.data).getElementsByTagName('cidade')[0].getElementsByTagName('id')[0].childNodes[0].nodeValue
        }

      }).then(resp => {
        const url_city = axios.get(`http://servicos.cptec.inpe.br/XML/cidade/7dias/${resp}/previsao.xml`)
        const url_city_mar = axios.get(`http://servicos.cptec.inpe.br/XML/cidade/${resp}/dia/1/ondas.xml`)
        
        axios.all([url_city, url_city_mar]).then(axios.spread((...resp) => {

          const city_info = resp[0].data
          const city_info_mar = resp[1].data

          let info = {
            nome: xmlDoc(city_info).getElementsByTagName('nome')[0].childNodes[0].nodeValue,
            uf: xmlDoc(city_info).getElementsByTagName('uf')[0].childNodes[0].nodeValue,
            atualizacao: formatarData(xmlDoc(city_info).getElementsByTagName('atualizacao')[0].childNodes[0].nodeValue),
            dias: getDias(xmlDoc(city_info)),

            ondas: `${xmlDoc(city_info_mar).getElementsByTagName('altura')[0].childNodes[0].nodeValue} m`,
            "Data/Hora": xmlDoc(city_info_mar).getElementsByTagName('dia')[0].childNodes[0].nodeValue.replace(/(Z)+/g, ' '),
            agitacao: xmlDoc(city_info_mar).getElementsByTagName('agitacao')[0].childNodes[0].nodeValue,
            vento: `${xmlDoc(city_info_mar).getElementsByTagName('vento')[0].childNodes[0].nodeValue} km`
          }
          setInfo(info)
          setGraph(<Grafico info={info}></Grafico>)


        }))
        setSearch('')
        setGraph('')


      })
    }

    fetchData()

  }, [query])


  return (
    <>
      <form onSubmit={e => {
        e.preventDefault()
        setQuery(search)
      }}>

        <div className="form">
          <input type="text" name="municipio" required value={search} onChange={(e) => setSearch(e.target.value)}/>
          <label htmlFor="municipio" className="label-name">
            <span className="content-name">Municipio / Cidade</span>
          </label>
        </div>
        <button type="submit">Buscar</button>

      </form>

      <div className="cidade">
        <div className="atualizacao">
          <h3>Ultima atualização</h3>
          <h4>{info.atualizacao}</h4>
        </div>

        <div className="local">
          <h3>{info.nome}</h3>
          <h4>{info.uf}</h4>
        </div>
      </div>

      <div className="infos">
        {
          Object.entries(info).map((e, key) => {
            if (e[1] !== 'undefined m' && e[1] !== 'undefined' && e[1] !== 'undefined km' && e[0] !== 'atualizacao' && e[0] !== 'dias' && e[1] !== "00/00/0000 00:00:00" && e[0] !== 'nome' && e[0] !== 'uf') {
              return <div key={key} className="col">
                <h5>{e[0]}</h5>
                <h4>{e[1]}</h4>
              </div>
            }
          })
        }
      </div>
      {graph}
    </>
  );
}


export default Main