/**
 * Stub store for datasets detail.
 * The original datasets components were removed. This stub keeps workflow
 * nodes that reference useDatasetsDetailStore compiling.
 */
import type { DataSet } from '@/models/datasets'
import { create } from 'zustand'

type DatasetsDetailState = {
  datasetsDetail: Record<string, DataSet>
  updateDatasetsDetail: (datasets: DataSet[]) => void
}

export const useDatasetsDetailStore = create<DatasetsDetailState>(set => ({
  datasetsDetail: {},
  updateDatasetsDetail: (datasets: DataSet[]) => {
    set((state) => {
      const newDetail = { ...state.datasetsDetail }
      datasets.forEach((d) => {
        newDetail[d.id] = d
      })
      return { datasetsDetail: newDetail }
    })
  },
}))
