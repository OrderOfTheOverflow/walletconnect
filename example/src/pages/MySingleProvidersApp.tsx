import React, { useMemo } from 'react'
import {
  useConnectedSingleAccounts,
  useConnectorSingleConfigs
} from '@xdefi/wallets-connector'
import Column from 'src/components/Column'
import Header from 'src/components/Header'
import { SContent, SLayoutSingle } from './styleds'
import AccountsBlock from 'src/components/AccountsBlock'

const MySingleProviderApp = () => {
  const accounts: any = useConnectedSingleAccounts()

  const configs = useConnectorSingleConfigs()

  const chains = useMemo(() => Object.keys(accounts || {}), [accounts])

  console.log('<--- DATA --->: ', { configs, accounts })

  return (
    <SLayoutSingle>
      <Column maxWidth={1200} spanHeight>
        <Header />
        {chains && (
          <SContent>
            {chains.map((chain: string) => {
              return (
                <AccountsBlock
                  key={chain}
                  chain={chain}
                  accounts={accounts[chain]}
                />
              )
            })}
          </SContent>
        )}
      </Column>
    </SLayoutSingle>
  )
}

export default MySingleProviderApp
