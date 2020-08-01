window.$ = window.jQuery = function(selectorOrArray){
    let elements;
    if(typeof(selectorOrArray) === 'string'){
        elements = document.querySelectorAll(selectorOrArray);
    }
    else if(selectorOrArray instanceof Array){
        elements = selectorOrArray;
    }
    /*const api = {
        addClass(className){
            for(let i=0; i<elements.length; i++){
                elements[i].classList.add(className); 
            }
            //return null;
            //return api;
            return this;
        }
    }
    return api;*/
    const api = Object.create(jQuery.prototype);//创造一个对象，这个对象的__proto__为jQuery.prototype
    /*return {
        elements: elements,
        oldApi: selectorOrArray.oldApi
    }*/
    /*api.elements = elements;
    api.oldApi = selectorOrArray.oldApi;*/
    Object.assign(api, {
        elements: elements,//为了让原型中访问到elements
        oldApi: selectorOrArray.oldApi //若有则有，若无则为null
    })//将后面对象的属性一一复制给前面的对象
    return api;
}
/*window.jQuery = window.$;*/

jQuery.fn = jQuery.prototype = {
    constructor:jQuery,
    jQuery: true,
    addClass(className){
        for(let i=0; i<this.elements.length; i++){
            this.elements[i].classList.add(className); 
        }
        //return api;
        return this;
    },
    find(selector){
        let array = [];
        for(let i=0; i < this.elements.length; i++){
            array = array.concat(Array.from(this.elements[i].querySelectorAll(selector)));
        }
        /*elements = childArray; 不能这样返回，因为返回的对象是同一个对象，当elements被修改时，
        之前获得该api对象里面的elements也会被修改*/
        array.oldApi = this;/*要换api了，记录之前的Api,Array是对象，对象可以加属性*/
        /*const newApi = jQuery(array);
        return newApi;*/
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
            /*if(array.indexOf(node.parentNode) >= 0)*/
            if(array.indexOf(node.parentNode) === -1){
                array.push(node.parentNode);
            }
        })
        return jQuery(array);
    },
    children(){
        const array = [];
        this.each((node)=>{
            array.push(...node.children);/*...是JS中的展开操作符，将数组每一项展开push*/
        })
        return jQuery(array);
    },
    print(){
        console.log(this.elements);
    }
}