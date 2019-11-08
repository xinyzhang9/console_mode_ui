import { loadCompliance } from '../services/compliance';
import { loadLicense } from '../services/license';

export const process = (cmd) => {
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
                history:['operation succeeded']
            });
        case 'ls':
            return Promise.resolve({
                history: ['home', 'compliance', 'license']
            });
        case 'new':
            let component = cmd.substring(first.length+1).toLowerCase().trim();
            return Promise.resolve({
                history: ['operation succeeded'],
                component: component,
                action: 'new'
            });
        case 'get':
            let resource = cmd.substring(first.length+1).toLowerCase().trim();
            let resourceFn = mapResourceToFn(resource);
            return resourceFn().then(data => {
                if(data && data.length) {
                    return Promise.resolve({
                        history: ['operation succeeded'],
                        resource: resource,
                        data: data,
                        action: 'get'
                    });
                } else {
                    return Promise.resolve({
                        history: ['command not recorgnized']
                    })
                }
                
            })
        default:
            return Promise.resolve({
                history: ['command not recorgnized']
            });
    }
}

const pageList = ['home', 'compliance', 'license'];
const redirectList = ['go', 'cd'];
const showList = ['show', 'list', 'ls'];
const newList = ['new', 'add', 'create'];
const getList = ['get', 'got', 'getall', 'retrieve', 'findall'];

const keywordsMapping = (word) => {
    let w = word.toLowerCase().trim();
    if(redirectList.includes(w)) {
        return 'go';
    } else if(showList.includes(w)) {
        return 'ls';
    } else if(newList.includes(w)) {
        return 'new';
    } else if(getList.includes(w)) {
        return 'get';
    } else {
        return w;
    }
}

const validatePage = (str) => {
    return pageList.includes(str.toLowerCase().trim());
}

const mapResourceToFn = (resource) => {
    if(resource === 'compliance') {
        return loadCompliance;
    } else if(resource === 'license') {
        return loadLicense;
    } else 
        return () => Promise.resolve([]);
}