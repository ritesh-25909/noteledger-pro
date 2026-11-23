import {supabase} from '../supabase/client';import type {Student,Subject,Note,Purchase} from '../../types';
const fail=(e:{message:string}|null)=>{if(e)throw new Error(e.message)};
export const api={
 students:async()=>{const {data,error}=await supabase.from('students').select('*').order('created_at',{ascending:false});fail(error);return data as Student[]},
 subjects:async()=>{const {data,error}=await supabase.from('subjects').select('*').order('name');fail(error);return data as Subject[]},
 notes:async()=>{const {data,error}=await supabase.from('notes_catalog').select('*,subjects(name)').order('created_at',{ascending:false});fail(error);return data as Note[]},
 purchases:async()=>{const {data,error}=await supabase.from('purchases').select('*,students(full_name,phone),subjects(name),notes_catalog(chapter_name)').order('purchased_at',{ascending:false});fail(error);return data as Purchase[]},
 save:async(table:'students'|'subjects'|'notes_catalog'|'purchases',value:Record<string,unknown>,id?:string)=>{const {error}=id?await supabase.from(table).update(value).eq('id',id):await supabase.from(table).insert(value);fail(error)},
 remove:async(table:'students'|'subjects'|'notes_catalog'|'purchases',id:string)=>{const {error}=await supabase.from(table).delete().eq('id',id);fail(error)},
 upload:async(file:File)=>{if(file.type!=='application/pdf'||file.size>25*1024*1024)throw Error('Only PDFs up to 25 MB are allowed');const path=`${crypto.randomUUID()}.pdf`;const {error}=await supabase.storage.from('private-notes').upload(path,file,{contentType:'application/pdf',upsert:false});fail(error);return path},
 signedUrl:async(path:string,download=false)=>{const {data,error}=await supabase.storage.from('private-notes').createSignedUrl(path,120,download?{download:true}:undefined);fail(error);return data!.signedUrl},
 deleteFile:async(path:string)=>{const {error}=await supabase.storage.from('private-notes').remove([path]);fail(error)}
};