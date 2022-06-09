import React, { useCallback, useState, Fragment } from 'react'
import styled from 'styled-components'
import { useWalletsOptions } from '../hooks'
import { Modal } from './Modal/Modal'

import { Provider } from './Provider'

interface IModalCardStyleProps {
  maxWidth?: number
}

const useWalletsModal = () => {
  const [isOpen, setOpen] = useState(false)

  const onClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const onOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  return {
    isOpen,
    onOpen,
    onClose
  }
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
}

export const WalletsModal = ({ trigger: Trigger }: IProps) => {
  const { providers: userOptions } = useWalletsOptions()

  const { isOpen, onClose, onOpen } = useWalletsModal()

  return (
    <Fragment>
      <Modal isOpen={isOpen} onClose={onClose}>
        <STitle>Connect wallet</STitle>

        <SCard>
          {userOptions.map((provider: any) =>
            !!provider ? (
              <Provider key={provider.name} provider={provider} />
            ) : null
          )}
        </SCard>

        <SDescription>
          Non-XDEFI wallets are provided by external providers and by selecting
          you agree to terms of those providers. Your access to the wallet might
          be reliant on the external provider being operational.
        </SDescription>
      </Modal>
      <Trigger onClick={onOpen} />
    </Fragment>
  )
}
