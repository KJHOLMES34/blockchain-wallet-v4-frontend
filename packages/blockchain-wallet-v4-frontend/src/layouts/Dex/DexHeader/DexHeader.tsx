import React from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { IconPresent, IconRefresh, Navigation } from '@blockchain-com/constellation'

import { actions, selectors } from 'data'

const getUserAlias = ({
  email,
  firstName,
  lastName
}: {
  email: string
  firstName?: string
  lastName?: string
}) => {
  if (firstName && lastName) return `${firstName} ${lastName}`
  return firstName || lastName || email
}

type Props = {
  selectedTab?: 'home' | 'prices' | 'earn' | 'nfts' | 'dex'
}

export const DexHeader: React.FC<Props> = ({ selectedTab = 'home' }) => {
  const { formatMessage } = useIntl()
  const dispatch = useDispatch()

  const isDexEnabled = useSelector(selectors.core.walletOptions.getDexProductEnabled)
  const isNftExplorerEnabled = useSelector(selectors.core.walletOptions.getNftExplorer)
  const userData = useSelector(selectors.modules.profile.getUserData).getOrFail('No user data')

  const navigationTabs = [
    {
      key: 'home',
      label: formatMessage({
        defaultMessage: 'Home',
        id: 'navbar.primary.home'
      })
    },
    {
      key: 'prices',
      label: formatMessage({
        defaultMessage: 'Prices',
        id: 'navbar.primary.prices'
      })
    },
    {
      dot: true,
      key: 'earn',
      label: formatMessage({
        defaultMessage: 'Earn',
        id: 'navbar.primary.earn'
      })
    }
  ]

  if (isNftExplorerEnabled) {
    navigationTabs.push({
      dot: true,
      key: 'nfts',
      label: formatMessage({
        defaultMessage: 'NFTs',
        id: 'navbar.primary.nfts'
      })
    })
  }

  if (isDexEnabled) {
    navigationTabs.push({
      dot: true,
      key: 'dex',
      label: formatMessage({
        defaultMessage: 'DEX',
        id: 'navbar.primary.dex'
      })
    })
  }

  const accountDropdownItems = [
    {
      key: 'general',
      label: formatMessage({
        defaultMessage: 'General',
        id: 'navbar.dropdown.general'
      })
    },
    {
      key: 'security',
      label: formatMessage({
        defaultMessage: 'Security',
        id: 'navbar.dropdown.security'
      })
    },
    {
      key: 'trading-limits',
      label: formatMessage({
        defaultMessage: 'Trading Limits',
        id: 'navbar.dropdown.tradingLimits'
      })
    },
    {
      key: 'preferences',
      label: formatMessage({
        defaultMessage: 'Preferences',
        id: 'navbar.dropdown.preferences'
      })
    },
    {
      key: 'wallets-addresses',
      label: formatMessage({
        defaultMessage: 'Wallets & Addresses',
        id: 'navbar.dropdown.walletsAndAddresses'
      })
    },
    {
      key: 'refer-friend',
      label: formatMessage({
        defaultMessage: 'Refer a friend',
        id: 'navbar.dropdown.referFriend'
      })
    },
    {
      key: 'tax-center',
      label: formatMessage({
        defaultMessage: 'Tax Center',
        id: 'navbar.dropdown.taxCenter'
      })
    }
  ]

  const iconActions = [
    {
      icon: () => <IconRefresh />,
      label: formatMessage({
        defaultMessage: 'Refresh',
        id: 'navbar.icons.refresh'
      }),
      onClick: () => dispatch(actions.components.refresh.refreshClicked())
    },
    {
      icon: () => <IconPresent />,
      label: formatMessage({
        defaultMessage: 'Refer',
        id: 'navbar.icons.refer'
      }),
      // TODO: Same as click on "Refer a Friend" from a dropdown
      onClick: () => undefined
    }
  ]

  return (
    <Navigation
      defaultSelected={selectedTab}
      iconActions={iconActions}
      navigationTabs={navigationTabs}
      dropdownSecondSectionItems={accountDropdownItems}
      onSelectedChange={(key) => {
        switch (key) {
          // primary nav
          case 'home':
            dispatch(actions.router.push('/home'))
            break
          case 'prices':
            dispatch(actions.router.push('/prices'))
            break
          case 'earn':
            dispatch(actions.router.push('/earn'))
            break
          case 'nfts':
            dispatch(actions.router.push('/nfts'))
            break
          case 'dex':
            dispatch(actions.router.push('/dex'))
            break
          // dropdown nav
          case 'general':
            dispatch(actions.router.push('/settings/general'))
            break
          case 'security':
            dispatch(actions.router.push('/security-center'))
            break
          case 'preferences':
            dispatch(actions.router.push('/settings/preferences'))
            break
          case 'wallets-addresses':
            dispatch(actions.router.push('/settings/addresses'))
            break
          case 'tax-center':
            dispatch(actions.router.push('/tax-center'))
            break
          // TODO: Handle the following clicks
          case 'refer-friend':
          case 'trading-limits':
            break
          default:
            break
        }
      }}
      dropdownCtaButton={{
        onClick: () => undefined,
        text: 'Dropdown CTA button'
      }}
      title={formatMessage({
        defaultMessage: 'Wallet',
        id: 'navbar.title.wallet'
      })}
      dropdownSecondSectionSeparator={{
        key: 'account',
        label: formatMessage({
          defaultMessage: 'Account',
          id: 'navbar.dropdown.separator'
        })
      }}
      // TODO: Fetch correct information and handle a click
      walletButton={{
        id: '14qViLJfdGaP4EeHnDyJbEGQysnCpwk3gd',
        imgAlt: 'ETH',
        imgSrc:
          'https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/ZJZZK5B2ZNF25LYQHMUTBTOMLU.png',
        onClick: () => undefined
      }}
      user={{
        name: getUserAlias(userData),
        // TODO: Handle dropdown
        onClick: () => undefined
      }}
    />
  )
}
