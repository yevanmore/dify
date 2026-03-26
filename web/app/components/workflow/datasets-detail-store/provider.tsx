/**
 * Stub provider for datasets detail.
 * The original datasets components were removed. This passthrough provider
 * keeps WorkflowWithDefaultContext compiling.
 */
'use client'

import type { ReactNode } from 'react'
import type { Node } from '../types'

type Props = {
  nodes: Node[]
  children: ReactNode
}

/**
 * Previously this provider watched knowledge-retrieval nodes and pre-fetched
 * dataset details. The stub simply renders children without side-effects.
 */
const DatasetsDetailProvider = ({ children }: Props) => {
  return <>{children}</>
}

export default DatasetsDetailProvider
