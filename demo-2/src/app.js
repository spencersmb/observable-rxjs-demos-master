var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
var common_1 = require('angular2/common');
var http_1 = require('angular2/http');
require('rxjs/Rx');
var App = (function () {
    function App(_formBuilder, _http) {
        var _this = this;
        this._formBuilder = _formBuilder;
        this._http = _http;
        var API_URL = 'https://www.googleapis.com/youtube/v3/search';
        var API_KEY = '';
        this.searchForm = this._formBuilder.group({
            'search': ['', common_1.Validators.required]
        });
        this.results$ = this.searchForm.controls.search.valueChanges
            .debounceTime(500)
            .switchMap(function (query) { return _this._http.get(API_URL + "?q=" + query + "&key=" + API_KEY + "&part=snippet"); })
            .map(function (res) { return res.json(); })
            .map(function (res) { return res.items; });
    }
    App = __decorate([
        core_1.Component({
            selector: 'demo-app',
            templateUrl: 'src/app.html'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof common_1.FormBuilder !== 'undefined' && common_1.FormBuilder) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object])
    ], App);
    return App;
    var _a, _b;
})();
exports.App = App;
browser_1.bootstrap(App, [
    common_1.FORM_PROVIDERS,
    http_1.HTTP_PROVIDERS
]);
