'use client'

import { RiRobot2Line } from '@remixicon/react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

type AppsProps = {
  onSuccess?: () => void
  onCreateFromBlank?: () => void
}

const Apps = ({
  onCreateFromBlank,
}: AppsProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-divider-burn py-3">
        <div className="min-w-[180px] pl-5">
          <span className="title-xl-semi-bold text-text-primary">{t('newApp.startFromTemplate', { ns: 'app' })}</span>
        </div>
        <div className="h-8 w-[180px]"></div>
      </div>
      <div className="relative flex flex-1 overflow-y-auto">
        <div className="flex h-full flex-1 items-center justify-center border-l border-divider-burn p-6 pt-2">
          <NoTemplateFound onCreateFromBlank={onCreateFromBlank} />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Apps)

function NoTemplateFound({ onCreateFromBlank: _onCreateFromBlank }: { onCreateFromBlank?: () => void }) {
  const { t } = useTranslation()
  return (
    <div className="w-full rounded-lg bg-workflow-process-bg p-4">
      <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-components-card-bg shadow-lg">
        <RiRobot2Line className="h-5 w-5 text-text-tertiary" />
      </div>
      <p className="title-md-semi-bold text-text-primary">{t('newApp.noTemplateFound', { ns: 'app' })}</p>
      <p className="system-sm-regular text-text-tertiary">{t('newApp.noTemplateFoundTip', { ns: 'app' })}</p>
    </div>
  )
}
