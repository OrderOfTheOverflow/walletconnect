import React from 'react'
import styled, { DefaultTheme } from 'styled-components'
import { useWalletsOptions } from '../hooks'
import { useWalletsModal } from './hooks'
import { Modal } from './Modal/Modal'

import { WalletProvider } from './Provider'
import ThemeProvider from './theme'

interface IModalCardStyleProps {
  maxWidth?: number
}

const SCard = styled.div<IModalCardStyleProps>`
  position: relative;
  width: 100%;
  border-radius: 12px;
  padding: 0;
  display: flex;
  min-width: fit-content;
  max-height: 100%;
  overflow: auto;
  display: grid;
  grid-template-columns: ${({ theme }) => theme.wallets.grid};
  grid-gap: 8px;
  margin-top: 24px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    grid-gap: 16px;
    grid-template-columns: 1fr;
    margin-top: 16px;
  `};
`

const SDescription = styled.div`
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  margin: 24px 0 21px 0;
  color: ${({ theme }) => theme.wallet.descColor};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin: 16px 0 0 0;
  `};
`
const STitle = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  color: ${({ theme }) => theme.wallet.titleColor};
  text-align: center;
  margin-top: 11px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-top: 18px;
  `};
`

interface IProps {
  trigger: any
  isDark?: boolean
  themeBuilder?: (isDark: boolean) => DefaultTheme
  className?: string
}

export const WalletsModal = ({
  trigger: Trigger,
  themeBuilder,
  isDark = true,
  className
}: IProps) => {
  const { providers: userOptions } = useWalletsOptions()

  const { isOpen, onClose, onOpen } = useWalletsModal()

  return (
    <ThemeProvider themeBuilder={themeBuilder} isDark={isDark}>
      <Modal isOpen={isOpen} onClose={onClose} className={className}>
        <STitle>Connect wallet</STitle>

        <SCard>
          {userOptions.map((provider: any) =>
            !!provider ? (
              <WalletProvider
                key={provider.name}
                provider={provider}
                onSelect={onClose}
              />
            ) : null
          )}
        </SCard>

        <SDescription>
          Non-XDEFI wallets are provided by external third-party providers and
          by connecting your wallet you confirm that you have agreed to the
          terms of the relevant third-party provider(s). Your access to the
          WebApp is reliant on the continued functionality and compatibility of
          the relevant third-party wallet provider(s).
        </SDescription>
      </Modal>
      <Trigger onClick={onOpen} />
    </ThemeProvider>
  )
}
