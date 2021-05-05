import {useState,useEffect} from "react"
import axios from "axios"
import {Container,BackgroundImage,Heading} from "./components/theme/App-theme"

import image from "./assets/cryptomonedas.png"
import Form from "./components/Form"
import CryptoValue from "./components/CryptoValue"
import Spinner from "./components/Spinner"

function App() {

  const [userRequest, setUserRequest] = useState({
    currency:"",
    crypto:""
  })
  const [cryptoData, setCryptoData] = useState({})
  const [showSpinner, setShowSpinner] = useState(false)

  const {currency,crypto} = userRequest

  useEffect(() => {
    if(currency && crypto) {
      setShowSpinner(true)
      const getCryptoData = async () => {
        const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${currency}`;
        try {
          const data = await axios.get(URL)
          setShowSpinner(false)
          setCryptoData(data.data.DISPLAY[crypto][currency])
        } catch (error) {
          console.error(error)
        }
      }
      getCryptoData()
    }
  }, [currency,crypto])

  return (
    <Container>
          <div>
              <BackgroundImage 
                src={image}
                alt="imagen de cripto monedas"
              />
          </div>

          <div>
              <Heading>
                Cotiza Criptomonedas al Instante
              </Heading>

              <Form 
                setUserRequest={setUserRequest}
              />

              {
                showSpinner
                ?
                <Spinner />
                :
                <CryptoValue 
                  cryptoData={cryptoData}
                />
              }
          </div>
    </Container>
  );
}

export default App;
