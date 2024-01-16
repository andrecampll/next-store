'use search'

import { useSearchParams } from 'next/navigation'

export function CurrentSearch() {
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  return (
    <p>
      Results for: <span className="font-semibold">{query ?? ''}</span>
    </p>
  )
}
