import AccountContainer from 'components/forms/segments/AccountContainer/AccountContainer'
import AccountMarkdown from 'components/forms/segments/AccountMarkdown/AccountMarkdown'
import Button from 'components/forms/simple-components/Button'
import { useTranslation } from 'next-i18next'
import React from 'react'

const AccountActivator = () => {
  const { t } = useTranslation('account')
  return (
    <AccountContainer className="mb-0">
      <div className="flex flex-col gap-2 rounded-xl bg-gray-50 px-5 py-4 md:rounded-none md:bg-gray-0 md:p-0">
        <h3 className="text-h3">{t('account_activator.title')}</h3>
        <AccountMarkdown variant="sm" content={`${t('account_activator.content')}`} />
        <Button
          className="mt-2 md:mt-4"
          size="sm"
          variant="link-category"
          href="https://bratislava.sk/konto"
          label={t('account_activator.button_text')}
          hrefIconHidden
        />
      </div>
    </AccountContainer>
  )
}

export default AccountActivator
