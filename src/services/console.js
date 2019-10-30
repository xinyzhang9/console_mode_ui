export const process = (cmd) => {
    console.log('process ',cmd.length);
    let list = cmd.trim().split(' ');
    let first = keywordsMapping(list[0]);
    switch(first) {
        case 'go':
            let page = cmd.substring(first.length+1).trim();
            if(validatePage(page)) {
                if(page === 'home') page='';
            } else {
                page = '';
            }
            return Promise.resolve({
                page: page,
                history:['operation succeed']
            });
        case 'ls':
            return Promise.resolve({
                history: ['home', 'compliance', 'license']
            });
        case 'new':
            let component = cmd.substring(first.length+1).toLowerCase().trim();
            return Promise.resolve({
                history: ['operation succeed'],
                component: component,
                action: 'new'
            });
        default:
            return Promise.resolve({
                history: ['command not recorgnized']
            });
    }
}

const pageList = ['home', 'compliance', 'license'];
const redirectList = ['go', 'cd'];
const showList = ['show', 'list', 'ls'];
const newList = ['new', 'add'];

const keywordsMapping = (word) => {
    let w = word.toLowerCase().trim();
    if(redirectList.includes(w)) {
        return 'go';
    } else if(showList.includes(w)) {
        return 'ls';
    } else if(newList.includes(w)) {
        return 'new';
    } else {
        return w;
    }
}

const validatePage = (str) => {
    return pageList.includes(str.toLowerCase().trim());
}