import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types';
import axios from "axios"
import {Button,Label,Select} from "./theme/Form-theme"

import Currencies from "../data/countriesCurrencies"
import Error from "./Error"


export default function Form({setUserRequest}) {

    const [cryptos, setCryptos] = useState([])
    const [values, setValues] = useState({})
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!values.currency || !values.crypto) {
            return setError(true)
        }
        setError(false)

        setUserRequest(values)
    }

    useEffect(() => {
       const getCrypto = async () => {
           const URL = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
           try {
              const data = await axios.get(URL)
              setCryptos(data.data.Data)
           } catch (error) {
               console.error(error)
           }
       }
       getCrypto()
    }, [])
    
    return (
        <form
            onSubmit={handleSubmit}
        >
            {
                error && <Error message="Debes completar todos los campos" />
            }

            <Label>Elige tu Moneda</Label>
            <Select
                name="currency"
                onChange={handleChange}
            >
                <option value="">- Seleccione -</option>
                {
                    Currencies.map((currency)=>{
                       return <option value={currency.code} key={currency.code}>{currency.name}</option>
                    })
                }
            </Select>

            <Label>Elige tu Criptomoneda</Label>
            <Select
                name="crypto"
                onChange={handleChange}
            >
                <option value="">- Seleccione -</option>
                {
                    cryptos.length > 0
                    &&
                    cryptos.map((crypto)=>{
                       return <option value={crypto.CoinInfo.Name} key={crypto.CoinInfo.Name}>{crypto.CoinInfo.FullName}</option>
                    })
                }
            </Select>

            <Button>Calcular</Button>
        </form>
    )
}

Form.propTypes = {
    setUserRequest : PropTypes.func.isRequired
}

