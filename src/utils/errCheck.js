
export function resErrCheck(data,  fallback, isShowToast = false) {
  if( data === undefined || data === null){
    return fallback
  }
  return data;
}
