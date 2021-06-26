import React from "react"
import PropTypes from "prop-types"
import { Container, Information, Price } from "./theme/CryptoValue-theme"

export default function CryptoPrice({ cryptoData }) {
  if (Object.keys(cryptoData).length < 1) {
    return null
  }

  return (
    <Container>
      <Price>
        El precio es: <span>{cryptoData.PRICE}</span>{" "}
      </Price>

      <Information>
        Precio más alto del día: <span>{cryptoData.HIGHDAY}</span>{" "}
      </Information>

      <Information>
        Precio más bajo del día: <span>{cryptoData.LOWDAY}</span>{" "}
      </Information>

      <Information>
        Variación últimas 24 horas: <span>{cryptoData.CHANGEPCT24HOUR}</span>{" "}
      </Information>

      <Information>
        Última Actualización: <span>{cryptoData.LASTUPDATE}</span>{" "}
      </Information>
    </Container>
  )
}

CryptoPrice.propTypes = {
  cryptoData: PropTypes.object.isRequired,
}
