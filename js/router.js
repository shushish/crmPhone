var Router = function (){
    this.routes = {};
    this.currentUrl = '';
}

Router.prototype.route = function(path,callback){
    this.routes[path] = callback || function(){};
};

Router.prototype.refresh = function(){
    var url = location.hash.slice(1);
    if(url.indexOf("_") > 0){
        this.currentUrl = url.substring(0,url.indexOf("_"));
    }else{
        this.currentUrl = location.hash.slice(1);
    }
    if(this.routes[this.currentUrl] != null && this.routes[this.currentUrl] != undefined && this.routes[this.currentUrl] != "")
    {
        this.routes[this.currentUrl]();
    }    
};

Router.prototype.init = function(){
    window.addEventListener('load',this.refresh.bind(this),false);
    window.addEventListener('hashchange',this.refresh.bind(this),false);
}

window.Router = new Router();
window.Router.init();