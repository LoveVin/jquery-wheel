window.$ = window.jQuery = function(selectorOrArray){
    let elements;
    if(typeof(selectorOrArray) === 'string'){
        elements = document.querySelectorAll(selectorOrArray);
    }
    else if(selectorOrArray instanceof Array){
        elements = selectorOrArray;
    }
    const api = Object.create(jQuery.prototype);
    Object.assign(api, {
        elements: elements,//为了让原型中访问到elements
        oldApi: selectorOrArray.oldApi //若有则有，若无则为null
    })
    return api;
}

jQuery.prototype = {
    constructor:jQuery,
    addClass(className){
        for(let i=0; i<this.elements.length; i++){
            this.elements[i].classList.add(className); 
        }
        return this;
    },
    find(selector){
        let array = [];
        for(let i=0; i < this.elements.length; i++){
            array = array.concat(Array.from(this.elements[i].querySelectorAll(selector)));
        }
        array.oldApi = this;/*要换api了，记录之前的Api,Array是对象，对象可以加属性*/
        return jQuery(array);
    },
    end(){
        return this.oldApi;
    },/*返回上一层api对象 */
    each(fn){
        for(let i=0; i < this.elements.length; i++){
            fn.call(null, this.elements[i], i);
        }
        return this;
    },
    parent(){
        const array = [];
        this.each((node)=>{
            if(array.indexOf(node.parentNode) === -1){
                array.push(node.parentNode);
            }
        })
        array.oldApi = this;
        return jQuery(array);
    },
    children(){
        const array = [];
        this.each((node)=>{
            array.push(...node.children);
        })
        array.oldApi = this;
        return jQuery(array);
    },
    print(){
        console.log(this.elements);
    }
}