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
                history: ['home', 'about', 'dashboard']
            });
        default:
            return;
    }
}

const pageList = ['home', 'about', 'dashboard'];
const redirectList = ['go', 'cd'];
const showList = ['show', 'list', 'ls'];

const keywordsMapping = (word) => {
    let w = word.toLowerCase().trim();
    if(redirectList.includes(w)) {
        return 'go';
    } else if(showList.includes(w)) {
        return 'ls';
    }
}

const validatePage = (str) => {
    return pageList.includes(str.toLowerCase().trim());
}