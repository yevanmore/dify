import { redirect } from 'next/navigation'

export default function DatasetsLayout({ children }: { children: React.ReactNode }) {
  redirect('/apps')
}
