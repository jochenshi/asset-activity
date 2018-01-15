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

//判断获取权限的方法,pass不传则取all与stable的交集，否则依据pass进行相关判断
const getAuthority = (all = [], stable = [], pass) => {
    let ret = {};
    if (all.length && stable.length) {
        if (pass) {
            if (Object.prototype.toString.call(pass) !== '[object Array]') {
                let aa = [];
                aa.push(pass);
                pass = aa;
            }
        } else {
            pass = stable;
        }
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

const transformOption = (data) => {
    let option = [];
    data.forEach((val) => {
        option.push({text: val.text, value: val.value})
    });
    return option;
};

const dateFormat = (format, date) => {
    let tagArr = 'YYYY-MM-DD-hh-mm-ss'.split('-');
    date = date ? new Date(date) : new Date();
    format = format || 'YYYY年MM月DD日 hh:mm:ss';
    let year = date.getFullYear();
    let month = fillZero(date.getMonth() + 1);
    let day = fillZero(date.getDate());
    let hour = fillZero(date.getHours());
    let minute = fillZero(date.getMinutes());
    let second = fillZero(date.getSeconds());
    let param = [year, month, day, hour, minute, second];
    return param.reduce(function (accumate, val, index) {
        return accumate.split(tagArr[index]).join(val)
    }, format)
};


// 对于数字，在不足两位时在前面补0，只针对于大于等于0的数值
const fillZero = (val) => {
    var temp = Number(val),res;
    if (isNaN(temp)) {
        console.log('error: value type is not number')
    } else {
        if (temp < 10) {
            res = '0' + temp
        } else {
            res = temp.toString()
        }
    }
    return res
};

export {
    handleData, getCookie, getAuthority, transformOption,
    dateFormat
}