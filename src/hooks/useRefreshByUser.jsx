import {useState} from 'react'

export default function useRefreshByUser(refetch) {
  const [isRefetchingByUser, setIsRefetchingByUser] = useState(false)

  async function refetchByUser() {
    setIsRefetchingByUser(true)

    try {
      await refetch()
    } finally {
      setIsRefetchingByUser(false)
    }
  }

  return {
    isRefetchingByUser,
    refetchByUser,
  }
}