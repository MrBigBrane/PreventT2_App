import { supabase } from '../../lib/supabase'

export default async function fetchUser() {
    return { data: { user } } = await supabase.auth.getUser()
}