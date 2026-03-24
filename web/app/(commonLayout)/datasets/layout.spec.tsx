import { describe, expect, it, vi } from 'vitest'

const mockRedirect = vi.fn()

vi.mock('next/navigation', () => ({
  redirect: (...args: unknown[]) => {
    mockRedirect(...args)
    throw new Error('NEXT_REDIRECT')
  },
}))

describe('DatasetsLayout', () => {
  it('should redirect to /apps', async () => {
    const { default: DatasetsLayout } = await import('./layout')
    expect(() => DatasetsLayout({ children: null })).toThrow('NEXT_REDIRECT')
    expect(mockRedirect).toHaveBeenCalledWith('/apps')
  })
})
