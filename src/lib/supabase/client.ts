import {createClient} from '@supabase/supabase-js';
const url=import.meta.env.VITE_SUPABASE_URL;
const key=import.meta.env.VITE_SUPABASE_ANON_KEY;
if(!url||!key) throw new Error('Missing Supabase environment variables. Configure .env from .env.example.');
if(!/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(url)) throw new Error('VITE_SUPABASE_URL must be the project root URL, without /rest/v1.');
export const supabase=createClient(url,key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
