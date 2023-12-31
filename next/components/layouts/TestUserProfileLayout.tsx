import cx from 'classnames'
import SectionContainer from 'components/forms/segments/SectionContainer/SectionContainer'
import { usePageWrapperContext } from 'components/layouts/PageWrapper'
import React from 'react'

import { AccountNavBar } from '../forms/segments/AccountNavBar/AccountNavBar'

interface GeneralLayoutProps {
  className?: string
}

const TestUserProfileLayout = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement> & GeneralLayoutProps) => {
  const { locale } = usePageWrapperContext()

  return (
    <div className={cx('flex', 'flex-col', 'h-screen', className)}>
      <div className="h-16 bg-white lg:h-14">
        <SectionContainer>
          <AccountNavBar currentLanguage={locale} menuItems={[]} />
        </SectionContainer>
      </div>

      <div className="flex grow flex-col bg-gray-50">{children}</div>
    </div>
  )
}

export default TestUserProfileLayout
