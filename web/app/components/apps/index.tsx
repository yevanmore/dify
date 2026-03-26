'use client'
import { noop } from 'es-toolkit/function'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useEducationInit } from '@/app/education-apply/hooks'
import AppListContext from '@/context/app-list-context'
import useDocumentTitle from '@/hooks/use-document-title'
import { useImportDSL } from '@/hooks/use-import-dsl'
import DSLConfirmModal from '../app/create-from-dsl-modal/dsl-confirm-modal'
import List from './list'

const Apps = () => {
  const { t } = useTranslation()

  useDocumentTitle(t('menus.apps', { ns: 'common' }))
  useEducationInit()

  const [controlRefreshList, setControlRefreshList] = useState(0)
  const [controlHideCreateFromTemplatePanel, setControlHideCreateFromTemplatePanel] = useState(0)
  const onSuccess = useCallback(() => {
    setControlRefreshList(prev => prev + 1)
    setControlHideCreateFromTemplatePanel(prev => prev + 1)
  }, [])

  const [showDSLConfirmModal, setShowDSLConfirmModal] = useState(false)

  const {
    handleImportDSLConfirm,
    versions,
    isFetching,
  } = useImportDSL()

  const onConfirmDSL = useCallback(async () => {
    await handleImportDSLConfirm({
      onSuccess,
    })
  }, [handleImportDSLConfirm, onSuccess])

  return (
    <AppListContext.Provider value={{
      isShowTryAppPanel: false,
      setShowTryAppPanel: noop,
      controlHideCreateFromTemplatePanel,
    }}
    >
      <div className="relative flex h-0 shrink-0 grow flex-col overflow-y-auto bg-background-body">
        <List controlRefreshList={controlRefreshList} />

        {
          showDSLConfirmModal && (
            <DSLConfirmModal
              versions={versions}
              onCancel={() => setShowDSLConfirmModal(false)}
              onConfirm={onConfirmDSL}
              confirmDisabled={isFetching}
            />
          )
        }
      </div>
    </AppListContext.Provider>
  )
}

export default Apps
