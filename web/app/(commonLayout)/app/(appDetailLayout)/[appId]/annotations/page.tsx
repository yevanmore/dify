import { redirect } from 'next/navigation'

type IProps = {
  params: Promise<{ appId: string }>
}

const AnnotationsRedirect = async ({ params }: IProps) => {
  const { appId } = await params
  redirect(`/app/${appId}/logs`)
}

export default AnnotationsRedirect
