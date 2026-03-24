import { redirect } from 'next/navigation'

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  redirect('/apps')
}
