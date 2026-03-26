'use client'
import type { FC } from 'react'
import type { CustomRunFormProps } from './types'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@/app/components/base/button'
// TODO: Data source UI components (LocalFile, OnlineDocuments, WebsiteCrawl, OnlineDrive,
// DataSourceProvider, useDataSourceStore) were removed with the datasets/rag-pipeline deletion.
// This form is stubbed to keep the workflow node compilable.
import PanelWrap from '../_base/components/before-run-form/panel-wrap'
import useBeforeRunForm from './hooks/use-before-run-form'

const BeforeRunForm: FC<CustomRunFormProps> = (props) => {
  const {
    payload,
    onCancel,
  } = props
  const { t } = useTranslation()

  const {
    isPending,
    handleRunWithSyncDraft,
    startRunBtnDisabled,
  } = useBeforeRunForm(props)

  return (
    <PanelWrap
      nodeName={payload.title}
      onHide={onCancel}
    >
      <div className="flex flex-col gap-y-5 px-4 pt-4">
        <div className="text-text-tertiary text-sm">
          {/* TODO: Restore data source selection UI */}
          Data source configuration UI is not yet available.
        </div>
        <div className="flex justify-end gap-x-2">
          <Button onClick={onCancel}>
            {t('operation.cancel', { ns: 'common' })}
          </Button>
          <Button
            onClick={handleRunWithSyncDraft}
            variant="primary"
            loading={isPending}
            disabled={isPending || startRunBtnDisabled}
          >
            {t('singleRun.startRun', { ns: 'workflow' })}
          </Button>
        </div>
      </div>
    </PanelWrap>
  )
}

export default React.memo(BeforeRunForm)
