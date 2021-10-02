
function LocalCookie(){
    const ns = 'office-addin';
    const sess = window.sessionStorage;
    const map = {};
    const store = sess.getItem(ns) || {};

    function set(k, v, o){
        map[k] = v;
        sess.setItem(ns, JSON.stringify(map));
        console.log('set', k, v, o)
    }

    function get(k){
        let raw = sess.getItem(ns);
        try {
            let val = JSON.parse(raw);
            console.log('get', k, val);

        } catch(err){
            console.error('Error parsing', err);
        }
    }


    return {
        set,
        get,
        store
    }

}

const cookies = new LocalCookie();
window.localCookies = cookies;
