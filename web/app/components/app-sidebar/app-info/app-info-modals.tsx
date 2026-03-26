import type { AppInfoModalType } from './use-app-info-actions'
import type { DuplicateAppModalProps } from '@/app/components/app/duplicate-modal'
import type { EnvironmentVariable } from '@/app/components/workflow/types'
import type { App, AppIconType, AppSSO } from '@/types/app'
import dynamic from 'next/dynamic'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

const SwitchAppModal = dynamic(() => import('@/app/components/app/switch-app-modal'), { ssr: false })
const DuplicateAppModal = dynamic(() => import('@/app/components/app/duplicate-modal'), { ssr: false })
const Confirm = dynamic(() => import('@/app/components/base/confirm'), { ssr: false })
const UpdateDSLModal = dynamic(() => import('@/app/components/workflow/update-dsl-modal'), { ssr: false })
const DSLExportConfirmModal = dynamic(() => import('@/app/components/workflow/dsl-export-confirm-modal'), { ssr: false })

type AppInfoModalsProps = {
  appDetail: App & Partial<AppSSO>
  activeModal: AppInfoModalType
  closeModal: () => void
  secretEnvList: EnvironmentVariable[]
  setSecretEnvList: (list: EnvironmentVariable[]) => void
  onEdit: (params: {
    name: string
    icon_type: AppIconType
    icon: string
    icon_background: string
    description: string
    use_icon_as_answer_icon?: boolean
    max_active_requests?: number | null
  }) => void
  onCopy: DuplicateAppModalProps['onConfirm']
  onExport: (include?: boolean) => Promise<void>
  exportCheck: () => void
  handleConfirmExport: () => void
  onConfirmDelete: () => void
}

const AppInfoModals = ({
  appDetail,
  activeModal,
  closeModal,
  secretEnvList,
  setSecretEnvList,
  _onEdit,
  onCopy,
  onExport,
  exportCheck,
  handleConfirmExport,
  onConfirmDelete,
}: AppInfoModalsProps) => {
  const { t } = useTranslation()

  return (
    <>
      {activeModal === 'switch' && (
        <SwitchAppModal
          inAppDetail
          show
          appDetail={appDetail}
          onClose={closeModal}
          onSuccess={closeModal}
        />
      )}
      {activeModal === 'duplicate' && (
        <DuplicateAppModal
          appName={appDetail.name}
          icon_type={appDetail.icon_type}
          icon={appDetail.icon}
          icon_background={appDetail.icon_background}
          icon_url={appDetail.icon_url}
          show
          onConfirm={onCopy}
          onHide={closeModal}
        />
      )}
      {activeModal === 'delete' && (
        <Confirm
          title={t('deleteAppConfirmTitle', { ns: 'app' })}
          content={t('deleteAppConfirmContent', { ns: 'app' })}
          isShow
          onConfirm={onConfirmDelete}
          onCancel={closeModal}
        />
      )}
      {activeModal === 'importDSL' && (
        <UpdateDSLModal
          onCancel={closeModal}
          onBackup={exportCheck}
        />
      )}
      {activeModal === 'exportWarning' && (
        <Confirm
          type="info"
          isShow
          title={t('sidebar.exportWarning', { ns: 'workflow' })}
          content={t('sidebar.exportWarningDesc', { ns: 'workflow' })}
          onConfirm={handleConfirmExport}
          onCancel={closeModal}
        />
      )}
      {secretEnvList.length > 0 && (
        <DSLExportConfirmModal
          envList={secretEnvList}
          onConfirm={onExport}
          onClose={() => setSecretEnvList([])}
        />
      )}
    </>
  )
}

export default React.memo(AppInfoModals)
