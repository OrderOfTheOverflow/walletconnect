import React, { Fragment, createContext, useState, useEffect } from 'react'

import { WalletsConnector } from '../wallets'
import { IProviderOptions } from '../helpers'

export const WalletsContext = createContext<WalletsConnector | null>(null)

export const NetworkManager = ({
  children,
  options,
  network,
  cacheEnabled
}: {
  children: JSX.Element
  options: IProviderOptions
  network?: string
  cacheEnabled?: boolean
}) => {
  const [c, setC] = useState<WalletsConnector>(
    () => new WalletsConnector(options, network, cacheEnabled)
  )

  useEffect(() => {
    setC(new WalletsConnector(options, network, cacheEnabled))

    return () => {
      c && c.dispose()
    }
  }, [options, network, cacheEnabled])

  return (
    <WalletsContext.Provider value={c}>
      <Fragment>{children}</Fragment>
    </WalletsContext.Provider>
  )
}
