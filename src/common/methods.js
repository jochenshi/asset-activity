/*export function handleData (data, keys) {

}*/
const handleData = (data, keys) => {

};


const getCookie = (name) => {
    if (!name) {
        console.log('no input name');
        return null
    }
    let getCookie = document.cookie, flag = false;
    name += '=';
    let start_index = getCookie.indexOf(name);
    if (start_index > -1) {
        let end_index = getCookie.indexOf(';', start_index);
        if (end_index == -1) {
            end_index = getCookie.length
        }
        start_index += name.length;
        return getCookie.substring(start_index, end_index)
    } else {
        return null
    }
};

//判断获取权限的方法
const getAuthority = (all = [], stable = [], pass = []) => {
    let ret = {};
    if (pass.length && all.length && stable.length) {
        stable.forEach((val) => {
            if (all.includes(val) && pass.includes(val)) {
                ret[val] = true
            } else {
                ret[val] = false
            }
        });
    } else {
        stable.forEach((val) => {
            ret[val] = false;
        })
    }
    return ret;
};

export {handleData, getCookie, getAuthority}