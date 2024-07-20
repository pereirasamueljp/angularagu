export function buildParams(object: any) {
    let params = '';
    if (!object) return params;
    let first = true;
    for (let attr in object) {
        if(first) params+=`?`
        if(!first) params+=`&`
        params+=`${attr}=${JSON.stringify(object[attr])}`
        first = false;
    }
    return params;
}