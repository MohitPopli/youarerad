import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import Account from '../components/forms/Guild/Account.js'
import { fetchGetJSON } from '../components/utils/api-helpers.js'
import { supabase } from '../components/utils/supabaseClient.js'

const Success = () => {
  const [session, setSession] = useState(null)
  const {
    query: { session_id },
  } = useRouter()

  const { data, error } = useSWR(() => `/api/checkout_sessionsguild/${session_id}`, fetchGetJSON)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div>
      {error ? (
        ''
      ) : !data ? (
        <div>loading</div>
      ) : (
        <section className="max-w-screen-md">
          {!session ? '' : <Account key={session.user.id} session={session} />}
        </section>
      )}
    </div>
  )
}

export default Success
