webpackJsonp([0],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/Services/core.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CoreService = (function () {
    // LOCALHOST
    // ipDaApi: string = '192.168.52.3:8080';
    // ipDaSocket: string = '192.168.52.3:3000';
    function CoreService() {
        // JOAO
        this.ipDaApi = '192.168.52.75:8080';
        this.ipDaSocket = '192.168.52.75:3000';
    }
    return CoreService;
}());
CoreService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], CoreService);

//# sourceMappingURL=core.service.js.map

/***/ }),

/***/ "../../../../../src/app/Services/dados-de-usuario.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_service__ = __webpack_require__("../../../../../src/app/Services/core.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DadosDeUsuarioService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DadosDeUsuarioService = (function () {
    function DadosDeUsuarioService(router, http, core) {
        this.router = router;
        this.http = http;
        this.core = core;
    }
    DadosDeUsuarioService.prototype.criarCookie = function (tokken) {
        var data = new Date();
        data.setTime(data.getTime() + (24 * 60 * 60 * 1000));
        // tokken = tokken.substring(1, tokken.length - 1);
        var tokkenCompleto = 'Bearer ' + tokken;
        document.cookie = 'tokken=Bearer ' + tokken + '; expires=' + data.toUTCString() + '; path=/';
        ('Criou o cookie');
        // (this.getCookieTokken());
    };
    DadosDeUsuarioService.prototype.getCookieTokken = function () {
        var cookie;
        var tokkenCookie;
        try {
            cookie = document.cookie.split('tokken=');
            cookie = cookie[1].split(';');
            tokkenCookie = cookie[0];
        }
        catch (e) {
            ('Efetue o login');
            // this.router.navigate(['/home']);
        }
        return tokkenCookie;
    };
    // LOGAR (USERINFO)
    DadosDeUsuarioService.prototype.verificaUsuarioLogin = function (usuario) {
        var url = 'http://' + this.core.ipDaApi + '/userinfo?user=' + usuario;
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    // ALTERAR USUARIO (USERINFO)
    DadosDeUsuarioService.prototype.verificaUsuarioExiste = function (usuario) {
        var url = 'http://' + this.core.ipDaApi + '/usernameInfo?user=' + usuario;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Authorization', this.getCookieTokken());
        return this.http.get(url, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DadosDeUsuarioService.prototype.gerarTokken = function (user, pass) {
        var url = 'http://' + this.core.ipDaApi + '/login';
        var json = JSON.stringify({
            user: user,
            password: pass
        });
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(url, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DadosDeUsuarioService.prototype.logar = function () {
        var url = 'http://' + this.core.ipDaApi + '/session';
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Authorization', 'Bearer ' + this.getCookieTokken());
        return this.http.get(url, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DadosDeUsuarioService.prototype.verificaUsuarioAutenticado = function () {
        if (this.getCookieTokken()) {
            var url = 'http://' + this.core.ipDaApi + '/session';
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
            headers.append('Authorization', 'Bearer ' + this.getCookieTokken());
            return this.http.get(url, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                // console.log('Autenticado');
                return true;
            }, function (error) {
                // this.logout();
                return false;
            });
        }
        else {
            // console.log('Fazendo logout');
            this.logout();
            return false;
        }
    };
    DadosDeUsuarioService.prototype.verificaEmailExiste = function (email) {
        var url = 'http://' + this.core.ipDaApi + '/emailExists/?user=' + email;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        return this.http.get(url, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DadosDeUsuarioService.prototype.recuperarDadosDeUsuario = function () {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/user';
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Authorization', 'Bearer ' + this.getCookieTokken());
        return this.http.get(url, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.dados = res;
            // console.log(this.dados);
        }, function (error) {
            // console.log(error);
        }, function () {
        });
    };
    DadosDeUsuarioService.prototype.alterarDadosDeUsuario = function (name, username, img, email) {
        var url = 'http://' + this.core.ipDaApi + '/session/change';
        var json = JSON.stringify({
            name: name,
            username: username,
            imgBase64: img,
            email: email
        });
        // console.log(json)
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.getCookieTokken());
        return this.http.put(url, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DadosDeUsuarioService.prototype.alterarSenhaDeUsuario = function (oldpass, newpass) {
        var url = 'http://' + this.core.ipDaApi + '/session/changepassword';
        var json = JSON.stringify({
            oldpass: oldpass,
            newpass: newpass
        });
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.getCookieTokken());
        return this.http.put(url, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DadosDeUsuarioService.prototype.autenticacao = function (tokken) {
        var url = 'http://' + this.core.ipDaApi + '/authentication';
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Authorization', 'Bearer ' + tokken);
        return this.http.get(url, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DadosDeUsuarioService.prototype.logout = function () {
        document.cookie = 'tokken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        this.router.navigate(['/home']);
    };
    return DadosDeUsuarioService;
}());
DadosDeUsuarioService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__core_service__["a" /* CoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__core_service__["a" /* CoreService */]) === "function" && _c || Object])
], DadosDeUsuarioService);

var _a, _b, _c;
//# sourceMappingURL=dados-de-usuario.service.js.map

/***/ }),

/***/ "../../../../../src/app/alterar-dados-de-usuario/alterar-dados-de-usuario.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#file {\r\n  display: none;\r\n}\r\n\r\n.fullLogin {\r\n  width: 100%;\r\n  height: calc(100vh - 56px);\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n}\r\n\r\n.fullLogin .login {\r\n  width: 400px;\r\n  /*min-height: 500px;*/\r\n  background-color: #FAFAFA;\r\n  box-shadow: 0px 0px 2px rgba(0, 0, 0, .14),\r\n  0px 2px 2px rgba(0, 0, 0, .12),\r\n  0px 1px 3px rgba(0, 0, 0, .20);\r\n}\r\n\r\n.fullLogin .login .image {\r\n  position: relative;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  padding: 8px;\r\n}\r\n\r\n.forms {\r\n  width: 100%;\r\n  height: 100%;\r\n  padding: 8px;\r\n  box-sizing: border-box;\r\n  overflow-x: hidden;\r\n\r\n}\r\n\r\n.campo {\r\n  height: 60px;\r\n  width: 100%;\r\n  margin-top: 10px;\r\n}\r\n\r\n.imageUser {\r\n  width: 140px;\r\n  height: 140px;\r\n  background-color: #006064;\r\n  color: #FFF;\r\n  border-radius: 50%;\r\n  line-height: 140px;\r\n  text-align: center;\r\n  font-family: 'Roboto';\r\n  font-size: 72px;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  box-shadow: 0px 0px 2px rgba(0, 0, 0, .14),\r\n  0px 2px 2px rgba(0, 0, 0, .12),\r\n  0px 1px 3px rgba(0, 0, 0, .20);\r\n  background-size: cover;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n}\r\n\r\n.addImageUser {\r\n  width: 45px;\r\n  height: 45px;\r\n  background-color: #FAFAFA;\r\n  color: #006064;\r\n  border-radius: 50%;\r\n  position: absolute;\r\n  top: 105px;\r\n  left: 225px;\r\n  line-height: 45px;\r\n  text-align: center;\r\n  font-size: 30px;\r\n  cursor: pointer;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  box-shadow: 0px 0px 2px rgba(0, 0, 0, .14),\r\n  0px 2px 2px rgba(0, 0, 0, .12),\r\n  0px 1px 3px rgba(0, 0, 0, .20);\r\n}\r\n\r\n@media screen and (max-width: 480px) {\r\n  .fullLogin .login {\r\n    width: 300px;\r\n  }\r\n\r\n  .addImageUser {\r\n    top: 110px;\r\n    left: 175px;\r\n  }\r\n\r\n  .forms {\r\n    padding: 16px;\r\n  }\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/alterar-dados-de-usuario/alterar-dados-de-usuario.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<div class=\"login\" *ngIf=\"dadosDoUsuario?.dados?.name\">-->\r\n\r\n<!--<div style=\"width:300px; height: 100%; padding-top:10px;\">-->\r\n<!--<input type=\"file\" (change)=\"previewFile($event.target)\" id=\"file\" style=\"display: none;\">-->\r\n<!--<div *ngIf=\"img64\" class=\"imageUser\" id=\"preview\" [style.background-image]=\"'url('+ img64 +')'\"></div>-->\r\n<!--<div *ngIf=\"dadosDoUsuario?.dados?.img == '/imgsUser/default.png' && img64 == ''\" class=\"imageUser\">{{-->\r\n<!--dadosDoUsuario?.dados.name.charAt(0) | uppercase }}-->\r\n<!--</div>-->\r\n<!--<div *ngIf=\"dadosDoUsuario?.dados?.img != '/imgsUser/default.png' && img64 == ''\" id=\"preview\" class=\"imageUser\"-->\r\n<!--[style.background-image]=\"'url('+ 'http://'+ core.ipDaApi + '/' + dadosDoUsuario?.dados?.img +')'\"></div>-->\r\n<!--<div class=\"addImageUser\" (click)=\"chamaFile()\">+</div>-->\r\n\r\n<!--<div style=\"position: relative; width: 200px; float:left; margin-left: 50px; margin-right: 50px;\">-->\r\n<!--<input #HTMLNome [(ngModel)]=\"dadosDoUsuario.dados.name\" (blur)=\"chama()\" (blur)=\"vericaNome()\" type=\"text\"-->\r\n<!--id=\"nome\"-->\r\n<!--class=\"textFields\"/>-->\r\n<!--<label class=\"labelText\" for=\"nome\">Nome</label>-->\r\n<!--<div class=\"border\"></div>-->\r\n<!--<label class=\"helperText\"-->\r\n<!--[style.color]=\"codeSatusNome == '400' ? '#F44336' : ''\"-->\r\n<!--[style.display]=\"codeSatusNome == '400' ? 'block' : 'none'\"-->\r\n<!--&gt;{{ errorNome }}</label>-->\r\n<!--</div>-->\r\n\r\n<!--<div style=\"position: relative; width: 200px; float:left; margin-left: 50px; margin-top:60px;\">-->\r\n<!--<input #HTMLUsername [(ngModel)]=\"dadosDoUsuario?.dados.username\" (blur)=\"chama()\" (blur)=\"verificaUsername()\"-->\r\n<!--type=\"text\"-->\r\n<!--id=\"username\" class=\"textFields\"/>-->\r\n<!--<label class=\"labelText\" for=\"username\">Username</label>-->\r\n<!--<div class=\"border\"></div>-->\r\n<!--<label class=\"helperText\"-->\r\n<!--[style.color]=\"codeSatusUsername == '409' ? '#F44336' : ''\"-->\r\n<!--[style.display]=\"codeSatusUsername == '409' ? 'block' : 'none'\"-->\r\n<!--&gt;{{ errorUsername }}</label>-->\r\n<!--</div>-->\r\n\r\n\r\n<!--<div style=\"position: relative; width: 200px; float:left; margin-left: 50px; margin-top:60px;\">-->\r\n<!--<input #HTMLEmail autocomplete=\"off\" [(ngModel)]=\"dadosDoUsuario.dados.email\" (blur)=\"chama()\"-->\r\n<!--(blur)=\"verificaEmail()\"-->\r\n<!--type=\"text\" id=\"email\" class=\"textFields\"/>-->\r\n<!--<label class=\"labelText\" for=\"email\">Email</label>-->\r\n<!--<div class=\"border\"></div>-->\r\n<!--<label class=\"helperText\"-->\r\n<!--[style.color]=\"codeSatusEmail == '400' || '409' ? '#F44336' : ''\"-->\r\n<!--[style.display]=\"codeSatusEmail == '400' || '409' ? 'block' : 'none'\"-->\r\n<!--&gt; {{ errorEmail }} </label>-->\r\n<!--</div>-->\r\n\r\n\r\n<!--<button-->\r\n<!--(click)=\"altera()\"-->\r\n<!--class=\"denseButton\"-->\r\n<!--style=\"float:left; width:200px; margin-top:60px; margin-left:50px;\"-->\r\n<!--#HTMLCadastrar>-->\r\n<!--ALTERAR-->\r\n<!--</button>-->\r\n\r\n<!--</div>-->\r\n\r\n<!--</div>-->\r\n\r\n<section class=\"fullLogin\" *ngIf=\"dadosDoUsuario?.dados?.name\">\r\n  <section class=\"login\">\r\n    <section class=\"image\">\r\n      <input type=\"file\" (change)=\"previewFile($event.target)\" id=\"file\">\r\n\r\n      <div *ngIf=\"img64\" class=\"imageUser\" id=\"preview\" [style.background-image]=\"'url('+ img64 +')'\"></div>\r\n\r\n      <div *ngIf=\"dadosDoUsuario?.dados?.img == '/imgsUser/default.png' && !img64\" class=\"imageUser\">\r\n        {{ dadosDoUsuario?.dados.name.charAt(0) | uppercase }}\r\n      </div>\r\n\r\n      <div *ngIf=\"dadosDoUsuario?.dados?.img != '/imgsUser/default.png' && !img64\" id=\"preview\" class=\"imageUser\"\r\n           [style.background-image]=\"'url('+ 'http://'+ core.ipDaApi + '/' + dadosDoUsuario?.dados?.img +')'\"></div>\r\n\r\n      <div class=\"addImageUser\" (click)=\"chamaFile()\">+</div>\r\n    </section>\r\n    <section class=\"forms\">\r\n      <section class=\"campo\">\r\n        <section class=\"relative\">\r\n          <input #HTMLNome [(ngModel)]=\"dadosDoUsuario.dados.name\"\r\n                 (blur)=\"chama(); vericaNome()\" type=\"text\"\r\n                 id=\"nome\"\r\n                 class=\"textFields\"/>\r\n          <label class=\"labelText\" for=\"nome\">Nome</label>\r\n          <div class=\"border\"></div>\r\n          <label class=\"helperText\"\r\n                 [style.color]=\"codeSatusNome == '400' ? '#F44336' : ''\"\r\n                 [style.display]=\"codeSatusNome == '400' ? 'block' : 'none'\"\r\n          >{{ errorNome }}</label>\r\n        </section>\r\n      </section>\r\n\r\n      <section class=\"campo\">\r\n        <section class=\"relative\">\r\n          <input #HTMLUsername [(ngModel)]=\"dadosDoUsuario?.dados.username\"\r\n                 (blur)=\"chama(); verificaUsername()\"\r\n                 type=\"text\"\r\n                 id=\"username\" class=\"textFields\"/>\r\n          <label class=\"labelText\" for=\"username\">Username</label>\r\n          <div class=\"border\"></div>\r\n          <label class=\"helperText\"\r\n                 [style.color]=\"codeSatusUsername == '409' ? '#F44336' : ''\"\r\n                 [style.display]=\"codeSatusUsername == '409' ? 'block' : 'none'\"\r\n          >{{ errorUsername }}</label>\r\n        </section>\r\n      </section>\r\n\r\n      <section class=\"campo\">\r\n        <section class=\"relative\">\r\n          <input #HTMLEmail autocomplete=\"off\" [(ngModel)]=\"dadosDoUsuario.dados.email\"\r\n                 (blur)=\"chama(); verificaEmail()\"\r\n                 type=\"text\" id=\"email\" class=\"textFields\"/>\r\n          <label class=\"labelText\" for=\"email\">Email</label>\r\n          <div class=\"border\"></div>\r\n          <label class=\"helperText\"\r\n                 [style.color]=\"codeSatusEmail == '400' || '409' ? '#F44336' : ''\"\r\n                 [style.display]=\"codeSatusEmail == '400' || '409' ? 'block' : 'none'\"\r\n          > {{ errorEmail }} </label>\r\n        </section>\r\n      </section>\r\n\r\n      <section class=\"buttons\">\r\n        <button\r\n          (click)=\"altera()\"\r\n          class=\"denseButton fullwidth\"\r\n          #HTMLCadastrar>\r\n          ALTERAR\r\n        </button>\r\n      </section>\r\n\r\n\r\n    </section>\r\n  </section>\r\n</section>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/alterar-dados-de-usuario/alterar-dados-de-usuario.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_dados_de_usuario_service__ = __webpack_require__("../../../../../src/app/Services/dados-de-usuario.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_snackbars_snackbars_service__ = __webpack_require__("../../../../../src/app/components/snackbars/snackbars.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_core_service__ = __webpack_require__("../../../../../src/app/Services/core.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlterarDadosDeUsuarioComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AlterarDadosDeUsuarioComponent = (function () {
    function AlterarDadosDeUsuarioComponent(router, activatedRoute, http, core, dadosDoUsuario, snackbarService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.http = http;
        this.core = core;
        this.dadosDoUsuario = dadosDoUsuario;
        this.snackbarService = snackbarService;
        this.nome = '';
        this.email = '';
        this.senha = '';
        this.img64 = '';
        this.codeSatusNome = '200';
        this.errorNome = '';
        this.codeSatusUsername = '200';
        this.errorUsername = '';
        this.codeSatusEmail = '200';
        this.errorEmail = '';
        this.CondVerificaEmail = false;
    }
    AlterarDadosDeUsuarioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dadosDoUsuario.verificaUsuarioAutenticado();
        this.dadosDoUsuario.recuperarDadosDeUsuario();
        setTimeout(function () {
            console.log(_this.dadosDoUsuario.dados);
            _this.userName = _this.dadosDoUsuario.dados.username;
            _this.nome = _this.dadosDoUsuario.dados.name;
            _this.email = _this.dadosDoUsuario.dados.email;
            _this.vericaNome();
            _this.verificaUsername();
            _this.verificaEmail();
            _this.chama();
        }, 400);
    };
    AlterarDadosDeUsuarioComponent.prototype.ngAfterViewInit = function () {
    };
    AlterarDadosDeUsuarioComponent.prototype.chamaFile = function () { document.getElementById('file').click(); };
    AlterarDadosDeUsuarioComponent.prototype.chama = function () {
        this.dadosDoUsuario.dados.name.length > 0 ? this.HTMLNome.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLNome.nativeElement.classList.remove('textFieldsPreenchido');
        this.dadosDoUsuario.dados.username.length > 0 ? this.HTMLUsername.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLUsername.nativeElement.classList.remove('textFieldsPreenchido');
        this.dadosDoUsuario.dados.email.length > 0 ? this.HTMLEmail.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLEmail.nativeElement.classList.remove('textFieldsPreenchido');
    };
    AlterarDadosDeUsuarioComponent.prototype.vericaNome = function () {
        var filtro = /^[A-Za-z ]+$/;
        if (filtro.test(this.dadosDoUsuario.dados.name) || this.dadosDoUsuario.dados.name == '') {
            if (this.dadosDoUsuario.dados.name.length > 2 && this.dadosDoUsuario.dados.name.length < 80) {
                this.codeSatusNome = '200';
                this.errorNome = '';
                return true;
            }
            else if (this.dadosDoUsuario.dados.name == '') {
                this.codeSatusNome = '400';
                this.errorNome = 'Campo necessario';
                return false;
            }
            else {
                this.codeSatusNome = '400';
                this.errorNome = 'Deve conter entre 3 á 80 caracteres!';
                return false;
            }
        }
        else {
            this.codeSatusNome = '400';
            this.errorNome = 'Nome invalido';
            return false;
        }
    };
    AlterarDadosDeUsuarioComponent.prototype.verificaUsername = function () {
        var _this = this;
        if (this.dadosDoUsuario.dados.username != this.userName) {
            this.dadosDoUsuario.verificaUsuarioExiste(this.dadosDoUsuario.dados.username)
                .subscribe(function (res) {
                _this.codeSatusUsername = '200';
                _this.errorUsername = '';
            }, function (error) {
                _this.codeSatusUsername = '409';
                _this.errorUsername = 'Esse usuario já está sendo usado';
            });
        }
        else {
            this.codeSatusUsername = '200';
            this.errorUsername = '';
        }
    };
    AlterarDadosDeUsuarioComponent.prototype.verificaEmail = function () {
        var _this = this;
        var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (this.dadosDoUsuario.dados.email == '') {
            this.codeSatusEmail = '400';
            this.errorEmail = 'Campo necessario';
            this.CondVerificaEmail = false;
        }
        else if (filtro.test(this.dadosDoUsuario.dados.email)) {
            if (this.dadosDoUsuario.dados.email != this.email) {
                this.dadosDoUsuario.verificaUsuarioExiste(this.dadosDoUsuario.dados.email)
                    .subscribe(function (res) {
                    _this.codeSatusEmail = '200';
                    _this.errorEmail = '';
                    _this.CondVerificaEmail = true;
                }, function (error) {
                    _this.codeSatusEmail = '409';
                    _this.errorEmail = 'Esse email já está sendo usado';
                    _this.CondVerificaEmail = false;
                });
            }
            else {
                this.codeSatusEmail = '200';
                this.errorEmail = '';
                this.CondVerificaEmail = true;
            }
        }
        else {
            this.codeSatusEmail = '400';
            this.errorEmail = 'Email Invalido';
            this.CondVerificaEmail = false;
        }
        return this.CondVerificaEmail;
    };
    AlterarDadosDeUsuarioComponent.prototype.altera = function () {
        var _this = this;
        console.log(this.verificaEmail());
        console.log(this.vericaNome());
        console.log(this.codeSatusUsername);
        if (this.verificaEmail() && this.vericaNome() && this.codeSatusUsername) {
            this.dadosDoUsuario.alterarDadosDeUsuario(this.dadosDoUsuario.dados.name, this.dadosDoUsuario.dados.username, this.img64, this.dadosDoUsuario.dados.email)
                .subscribe(function (data) {
                // console.log(data);
                _this.snackbarService.inserirSnackbar('Dados modificados com sucesso!');
                // this.dadosDoUsuario.criarCookie(data.token);
                // this.dadosDoUsuario.logar();
                _this.dadosDoUsuario.recuperarDadosDeUsuario();
                //
                setTimeout(function () {
                    window.location.reload();
                }, 480);
                //
            }, function (error) {
                // console.log(error);
            });
        }
        else {
        }
    };
    AlterarDadosDeUsuarioComponent.prototype.previewFile = function (el) {
        var _this = this;
        var reader = new FileReader();
        reader.onloadend = function (e) {
            _this.img64 = reader.result;
        };
        if (el) {
            reader.readAsDataURL(el.files[0]);
        }
    };
    return AlterarDadosDeUsuarioComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('login'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object)
], AlterarDadosDeUsuarioComponent.prototype, "login", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('tela1'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _b || Object)
], AlterarDadosDeUsuarioComponent.prototype, "tela1", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('tela2'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _c || Object)
], AlterarDadosDeUsuarioComponent.prototype, "tela2", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLNome'),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _d || Object)
], AlterarDadosDeUsuarioComponent.prototype, "HTMLNome", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLUsername'),
    __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _e || Object)
], AlterarDadosDeUsuarioComponent.prototype, "HTMLUsername", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLEmail'),
    __metadata("design:type", typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _f || Object)
], AlterarDadosDeUsuarioComponent.prototype, "HTMLEmail", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLNovaSenha'),
    __metadata("design:type", typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _g || Object)
], AlterarDadosDeUsuarioComponent.prototype, "HTMLNovaSenha", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLConfirmaSenha'),
    __metadata("design:type", typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _h || Object)
], AlterarDadosDeUsuarioComponent.prototype, "HTMLConfirmaSenha", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLCadastrar'),
    __metadata("design:type", typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _j || Object)
], AlterarDadosDeUsuarioComponent.prototype, "HTMLCadastrar", void 0);
AlterarDadosDeUsuarioComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-alterar-dados-de-usuario',
        template: __webpack_require__("../../../../../src/app/alterar-dados-de-usuario/alterar-dados-de-usuario.component.html"),
        styles: [__webpack_require__("../../../../../src/app/alterar-dados-de-usuario/alterar-dados-de-usuario.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_6__Services_core_service__["a" /* CoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__Services_core_service__["a" /* CoreService */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_4__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_5__components_snackbars_snackbars_service__["a" /* SnackbarsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__components_snackbars_snackbars_service__["a" /* SnackbarsService */]) === "function" && _q || Object])
], AlterarDadosDeUsuarioComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
//# sourceMappingURL=alterar-dados-de-usuario.component.js.map

/***/ }),

/***/ "../../../../../src/app/alterar-senha-de-usuario/alterar-senha-de-usuario.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".login {\r\n  margin-top: calc(50vh - 200px);\r\n  margin-left: calc(50vw - 150px);\r\n  width: 300px;\r\n  height: 260px;\r\n  padding-top: 20px;\r\n  padding-bottom: 20px;\r\n  background-color: rgba(255,255,255, .5);\r\n  display: block;\r\n  box-shadow: 0px 0px 2px rgba(0,0,0,.14),\r\n              0px 2px 2px rgba(0,0,0,.12),\r\n              0px 1px 3px rgba(0,0,0,.20);\r\n}\r\n\r\n\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/alterar-senha-de-usuario/alterar-senha-de-usuario.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"login\">\r\n\r\n  <div style=\"width:300px; height: 100%; padding-top:10px;\">\r\n\r\n    <div style=\"position: relative; width: 200px; float:left; margin-left: 50px; margin-right: 50px;\">\r\n      <input #HTMLNovaSenha [(ngModel)]=\"novaSenha\" (blur)=\"chama()\" (blur)=\"validaNovaSenha()\" type=\"password\" id=\"novaSenha\" class=\"textFields\"/>\r\n      <label class=\"labelText\" for=\"novaSenha\">Nova Senha</label>\r\n      <div class=\"border\"></div>\r\n\r\n      <label class=\"helperText\"\r\n             [style.color]=\"codeNovaSenha == '400' ? '#F44336' : ''\"\r\n             [style.display]=\"codeNovaSenha == '400' ? 'block' : 'none'\"\r\n      >{{ errorNovaSenha }}</label>\r\n\r\n    </div>\r\n\r\n    <div style=\"position: relative; width: 200px; float:left; margin-left: 50px; margin-top:60px;\">\r\n      <input #HTMLConfirmaNovaSenha [(ngModel)]=\"confirmaNovaSenha\" (blur)=\"chama()\" (blur)=\"validaConfirmaNovaSenha()\" type=\"password\" id=\"confirmaNovaSenha\" class=\"textFields\"/>\r\n      <label class=\"labelText\" for=\"confirmaNovaSenha\">Confirme a Nova Senha</label>\r\n      <div class=\"border\"></div>\r\n\r\n      <label class=\"helperText\"\r\n             [style.color]=\"codeConfirmNovaSenha == '400' ? '#F44336' : ''\"\r\n             [style.display]=\"codeConfirmNovaSenha == '400' ? 'block' : 'none'\"\r\n      >{{ errorConfirmaNovaSenha }}</label>\r\n    </div>\r\n\r\n    <hr style=\"position: relative; width: 300px; float: left; margin-left: 0px; margin-top: 70px;\">\r\n\r\n\r\n    <div style=\"position: relative; width: 200px; float:left; margin-left: 50px; margin-top:20px;\">\r\n      <input #HTMLSenhaAtual autocomplete=\"off\" [(ngModel)]=\"senhaAtual\" (blur)=\"chama()\" (blur)=\"validaSenhaAtual()\" type=\"password\" id=\"senhaAtual\" class=\"textFields\"/>\r\n      <label class=\"labelText\" for=\"senhaAtual\">Digite a Senha Atual</label>\r\n      <div class=\"border\"></div>\r\n\r\n      <label class=\"helperText\"\r\n             [style.color]=\"codeSenhaAtual == '400' || '401' ? '#F44336' : ''\"\r\n             [style.display]=\"codeSenhaAtual == '400' || '401' ? 'block' : 'none'\"\r\n      >{{ errorSenhaAtual }}</label>\r\n    </div>\r\n\r\n\r\n    <button\r\n      (click)=\"altera()\"\r\n      class=\"denseButton\"\r\n      style=\"float:left; width:200px; margin-top:60px; margin-left:50px;\"\r\n      #HTMLCadastrar>\r\n      ALTERAR\r\n    </button>\r\n\r\n  </div>\r\n\r\n</div>\r\n\r\n<!--<app-snackbars>\r\n\r\n</app-snackbars>-->\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/alterar-senha-de-usuario/alterar-senha-de-usuario.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_dados_de_usuario_service__ = __webpack_require__("../../../../../src/app/Services/dados-de-usuario.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_snackbars_snackbars_service__ = __webpack_require__("../../../../../src/app/components/snackbars/snackbars.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_core_service__ = __webpack_require__("../../../../../src/app/Services/core.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlterarSenhaDeUsuarioComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AlterarSenhaDeUsuarioComponent = (function () {
    function AlterarSenhaDeUsuarioComponent(router, activatedRoute, http, dadosDoUsuario, snackbarService, core) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.http = http;
        this.dadosDoUsuario = dadosDoUsuario;
        this.snackbarService = snackbarService;
        this.core = core;
        this.novaSenha = '';
        this.confirmaNovaSenha = '';
        this.senhaAtual = '';
    }
    AlterarSenhaDeUsuarioComponent.prototype.ngOnInit = function () {
        this.dadosDoUsuario.verificaUsuarioAutenticado();
        this.alterar = this.activatedRoute.snapshot.data['alterar'];
    };
    AlterarSenhaDeUsuarioComponent.prototype.chama = function () {
        this.novaSenha.length > 0 ? this.HTMLNovaSenha.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLNovaSenha.nativeElement.classList.remove('textFieldsPreenchido');
        this.confirmaNovaSenha.length > 0 ? this.HTMLConfirmaNovaSenha.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLConfirmaNovaSenha.nativeElement.classList.remove('textFieldsPreenchido');
        this.senhaAtual.length > 0 ? this.HTMLSenhaAtual.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLSenhaAtual.nativeElement.classList.remove('textFieldsPreenchido');
    };
    AlterarSenhaDeUsuarioComponent.prototype.validaNovaSenha = function () {
        if (this.novaSenha.length > 5 && this.novaSenha.length < 17) {
            this.codeNovaSenha = '200';
            this.errorNovaSenha = '';
        }
        else if (this.novaSenha == '') {
            this.codeNovaSenha = '400';
            this.errorNovaSenha = 'Esse campo é necessario';
        }
        else {
            this.codeNovaSenha = '400';
            this.errorNovaSenha = 'Deve conter de 6 á 16 caracteres';
        }
    };
    AlterarSenhaDeUsuarioComponent.prototype.validaConfirmaNovaSenha = function () {
        if (this.confirmaNovaSenha == '' || this.novaSenha == '' && this.confirmaNovaSenha == '') {
            this.codeConfirmNovaSenha = '400';
            this.errorConfirmaNovaSenha = 'Esse campo é necessario';
        }
        else if (this.novaSenha == this.confirmaNovaSenha) {
            this.codeConfirmNovaSenha = '200';
            this.errorConfirmaNovaSenha = '';
        }
        else {
            this.codeConfirmNovaSenha = '400';
            this.errorConfirmaNovaSenha = 'As senhas não conferem';
        }
    };
    AlterarSenhaDeUsuarioComponent.prototype.validaSenhaAtual = function () {
        if (this.senhaAtual == '') {
            this.codeSenhaAtual = '400';
            this.errorSenhaAtual = 'Esse campo é necessario!';
        }
        else {
            this.codeSenhaAtual = '200';
            this.errorSenhaAtual = '';
        }
    };
    AlterarSenhaDeUsuarioComponent.prototype.altera = function () {
        var _this = this;
        this.validaNovaSenha();
        this.validaConfirmaNovaSenha();
        this.validaSenhaAtual();
        if (this.codeNovaSenha == '200' && this.codeConfirmNovaSenha == '200' && this.codeSenhaAtual) {
            this.dadosDoUsuario.alterarSenhaDeUsuario(this.senhaAtual, this.novaSenha)
                .subscribe(function (data) {
                _this.snackbarService.inserirSnackbar('Senha modificada com sucesso!');
            }, function (error) {
                _this.codeSenhaAtual = error.status;
                if (error.status == 401) {
                    _this.errorSenhaAtual = 'Senha incorreta';
                }
            });
        }
    };
    return AlterarSenhaDeUsuarioComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('snackbar'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object)
], AlterarSenhaDeUsuarioComponent.prototype, "snackbar", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLNovaSenha'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _b || Object)
], AlterarSenhaDeUsuarioComponent.prototype, "HTMLNovaSenha", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLConfirmaNovaSenha'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _c || Object)
], AlterarSenhaDeUsuarioComponent.prototype, "HTMLConfirmaNovaSenha", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLSenhaAtual'),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _d || Object)
], AlterarSenhaDeUsuarioComponent.prototype, "HTMLSenhaAtual", void 0);
AlterarSenhaDeUsuarioComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-alterar-senha-de-usuario',
        template: __webpack_require__("../../../../../src/app/alterar-senha-de-usuario/alterar-senha-de-usuario.component.html"),
        styles: [__webpack_require__("../../../../../src/app/alterar-senha-de-usuario/alterar-senha-de-usuario.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_5__components_snackbars_snackbars_service__["a" /* SnackbarsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__components_snackbars_snackbars_service__["a" /* SnackbarsService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_6__Services_core_service__["a" /* CoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__Services_core_service__["a" /* CoreService */]) === "function" && _k || Object])
], AlterarSenhaDeUsuarioComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=alterar-senha-de-usuario.component.js.map

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cadastro_cadastro_component__ = __webpack_require__("../../../../../src/app/cadastro/cadastro.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__main_main_component__ = __webpack_require__("../../../../../src/app/main/main.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__alterar_dados_de_usuario_alterar_dados_de_usuario_component__ = __webpack_require__("../../../../../src/app/alterar-dados-de-usuario/alterar-dados-de-usuario.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pagina_inicial_pagina_inicial_component__ = __webpack_require__("../../../../../src/app/pagina-inicial/pagina-inicial.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__esqueci_minha_senha_esqueci_minha_senha__ = __webpack_require__("../../../../../src/app/esqueci-minha-senha/esqueci-minha-senha.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__esqueci_minha_senha_esqueceu_sua_senha_esqueceu_sua_senha_component__ = __webpack_require__("../../../../../src/app/esqueci-minha-senha/esqueceu-sua-senha/esqueceu-sua-senha.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__esqueci_minha_senha_esqueceu_seu_senha_alterar_esqueceu_seu_senha_alterar_component__ = __webpack_require__("../../../../../src/app/esqueci-minha-senha/esqueceu-seu-senha-alterar/esqueceu-seu-senha-alterar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__autentica_autentica_component__ = __webpack_require__("../../../../../src/app/autentica/autentica.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__page_not_found_page_not_found_component__ = __webpack_require__("../../../../../src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__alterar_senha_de_usuario_alterar_senha_de_usuario_component__ = __webpack_require__("../../../../../src/app/alterar-senha-de-usuario/alterar-senha-de-usuario.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__projects_alterar_projects_alterar_projects_component__ = __webpack_require__("../../../../../src/app/projects/alterar-projects/alterar-projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__drag_drop_drag_drop_component__ = __webpack_require__("../../../../../src/app/drag-drop/drag-drop.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__notification_all_notification_all_notification_component__ = __webpack_require__("../../../../../src/app/notification/all-notification/all-notification.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// import { AutenticacaoComponent } from './autenticacao/autenticacao.component';















var APP_ROUTES = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_2__login_login_component__["a" /* LoginComponent */] },
    { path: 'cadastro', component: __WEBPACK_IMPORTED_MODULE_3__cadastro_cadastro_component__["a" /* CadastroComponent */] },
    { path: 'authentication/:id', component: __WEBPACK_IMPORTED_MODULE_11__autentica_autentica_component__["a" /* AutenticaComponent */] },
    { path: 'esqueciMinhaSenha', component: __WEBPACK_IMPORTED_MODULE_8__esqueci_minha_senha_esqueci_minha_senha__["a" /* EsqueciMinhaSenhaComponent */], children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_9__esqueci_minha_senha_esqueceu_sua_senha_esqueceu_sua_senha_component__["a" /* EsqueceuSuaSenhaComponent */] },
            { path: 'alterarSenha', component: __WEBPACK_IMPORTED_MODULE_10__esqueci_minha_senha_esqueceu_seu_senha_alterar_esqueceu_seu_senha_alterar_component__["a" /* EsqueceuSeuSenhaAlterarComponent */] }
        ] },
    { path: '', component: __WEBPACK_IMPORTED_MODULE_4__main_main_component__["a" /* MainComponent */], children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_6__pagina_inicial_pagina_inicial_component__["a" /* PaginaInicialComponent */], children: [
                    {
                        path: 'detalheProjeto/:id',
                        component: __WEBPACK_IMPORTED_MODULE_14__projects_alterar_projects_alterar_projects_component__["a" /* AlterarProjectsComponent */]
                    }
                ] },
            { path: 'main', component: __WEBPACK_IMPORTED_MODULE_6__pagina_inicial_pagina_inicial_component__["a" /* PaginaInicialComponent */],
                children: [
                    {
                        path: 'alterarProject/:id',
                        component: __WEBPACK_IMPORTED_MODULE_14__projects_alterar_projects_alterar_projects_component__["a" /* AlterarProjectsComponent */]
                    }
                ]
            },
            { path: 'alterarDados',
                component: __WEBPACK_IMPORTED_MODULE_5__alterar_dados_de_usuario_alterar_dados_de_usuario_component__["a" /* AlterarDadosDeUsuarioComponent */],
            },
            { path: 'alterarSenha',
                component: __WEBPACK_IMPORTED_MODULE_13__alterar_senha_de_usuario_alterar_senha_de_usuario_component__["a" /* AlterarSenhaDeUsuarioComponent */],
            },
            { path: 'project/:id', component: __WEBPACK_IMPORTED_MODULE_15__drag_drop_drag_drop_component__["a" /* DragDropComponent */] },
            { path: 'notification', component: __WEBPACK_IMPORTED_MODULE_16__notification_all_notification_all_notification_component__["a" /* AllNotificationComponent */] }
        ] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_7__home_home_component__["a" /* HomeComponent */] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_12__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(APP_ROUTES)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_not_found_page_not_found_component__ = __webpack_require__("../../../../../src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__main_main_component__ = __webpack_require__("../../../../../src/app/main/main.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__cadastro_cadastro_component__ = __webpack_require__("../../../../../src/app/cadastro/cadastro.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__alterar_dados_de_usuario_alterar_dados_de_usuario_component__ = __webpack_require__("../../../../../src/app/alterar-dados-de-usuario/alterar-dados-de-usuario.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Services_dados_de_usuario_service__ = __webpack_require__("../../../../../src/app/Services/dados-de-usuario.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Services_core_service__ = __webpack_require__("../../../../../src/app/Services/core.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__alterar_senha_de_usuario_alterar_senha_de_usuario_component__ = __webpack_require__("../../../../../src/app/alterar-senha-de-usuario/alterar-senha-de-usuario.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_snackbars_snackbars_module__ = __webpack_require__("../../../../../src/app/components/snackbars/snackbars.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pagina_inicial_pagina_inicial_component__ = __webpack_require__("../../../../../src/app/pagina-inicial/pagina-inicial.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__esqueci_minha_senha_esqueci_minha_senha_module__ = __webpack_require__("../../../../../src/app/esqueci-minha-senha/esqueci-minha-senha.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_autenticacao_autenticacao_module__ = __webpack_require__("../../../../../src/app/components/autenticacao/autenticacao.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__autentica_autentica_component__ = __webpack_require__("../../../../../src/app/autentica/autentica.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_popup_confirmacao_popup_confirmacao_module__ = __webpack_require__("../../../../../src/app/components/popup-confirmacao/popup-confirmacao.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__projects_projects_module__ = __webpack_require__("../../../../../src/app/projects/projects.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__projects_projects_service_service__ = __webpack_require__("../../../../../src/app/projects/projects-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__drag_drop_drag_drop_module__ = __webpack_require__("../../../../../src/app/drag-drop/drag-drop.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_menu_menu_module__ = __webpack_require__("../../../../../src/app/components/menu/menu.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_menu_info_user_menu_info_user_module__ = __webpack_require__("../../../../../src/app/components/menu-info-user/menu-info-user.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_arrow_back_arrow_back_module__ = __webpack_require__("../../../../../src/app/components/arrow-back/arrow-back.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_ng_socket_io__ = __webpack_require__("../../../../ng-socket-io/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_28_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__notification_notification_module__ = __webpack_require__("../../../../../src/app/notification/notification.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












// import {DadosDeUsuarioResolve} from './dadosDeUsuario.resolve';
















// import { SocketService } from './Services/socket.service';




var config = { url: __WEBPACK_IMPORTED_MODULE_31__environments_environment__["a" /* environment */].ipSocket, options: {} };
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_7__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */],
            __WEBPACK_IMPORTED_MODULE_8__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_9__main_main_component__["a" /* MainComponent */],
            __WEBPACK_IMPORTED_MODULE_10__cadastro_cadastro_component__["a" /* CadastroComponent */],
            __WEBPACK_IMPORTED_MODULE_11__alterar_dados_de_usuario_alterar_dados_de_usuario_component__["a" /* AlterarDadosDeUsuarioComponent */],
            __WEBPACK_IMPORTED_MODULE_14__alterar_senha_de_usuario_alterar_senha_de_usuario_component__["a" /* AlterarSenhaDeUsuarioComponent */],
            __WEBPACK_IMPORTED_MODULE_16__pagina_inicial_pagina_inicial_component__["a" /* PaginaInicialComponent */],
            __WEBPACK_IMPORTED_MODULE_17__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_20__autentica_autentica_component__["a" /* AutenticaComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_29__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_18__esqueci_minha_senha_esqueci_minha_senha_module__["a" /* EsqueciMinhaSenhaModule */],
            __WEBPACK_IMPORTED_MODULE_15__components_snackbars_snackbars_module__["a" /* SnackbarsModule */],
            __WEBPACK_IMPORTED_MODULE_19__components_autenticacao_autenticacao_module__["a" /* AutenticacaoModule */],
            __WEBPACK_IMPORTED_MODULE_21__components_popup_confirmacao_popup_confirmacao_module__["a" /* PopupConfirmacaoModule */],
            __WEBPACK_IMPORTED_MODULE_22__projects_projects_module__["a" /* ProjectsModule */],
            __WEBPACK_IMPORTED_MODULE_24__drag_drop_drag_drop_module__["a" /* DragDropModule */],
            __WEBPACK_IMPORTED_MODULE_25__components_menu_menu_module__["a" /* MenuModule */],
            __WEBPACK_IMPORTED_MODULE_26__components_menu_info_user_menu_info_user_module__["a" /* MenuInfoUserModule */],
            __WEBPACK_IMPORTED_MODULE_27__components_arrow_back_arrow_back_module__["a" /* ArrowBackModule */],
            __WEBPACK_IMPORTED_MODULE_30__notification_notification_module__["a" /* NotificationModule */],
            __WEBPACK_IMPORTED_MODULE_28_ng_socket_io__["SocketIoModule"].forRoot(config),
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_12__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */],
            // DadosDeUsuarioResolve,
            __WEBPACK_IMPORTED_MODULE_13__Services_core_service__["a" /* CoreService */],
            __WEBPACK_IMPORTED_MODULE_23__projects_projects_service_service__["a" /* ProjectsServiceService */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/autentica/autentica.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\r\n  width: 100vw;\r\n  height: 100vh;\r\n  background-color: #000;\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/pexels.jpg") + ");\r\n  background-size: 1642px 1088px;\r\n  background-position: center;\r\n}\r\n.meio {\r\n  float: left;\r\n  background-color: rgba(255,255,255,0.5);\r\n  width: 200px;\r\n  /*height: 130px;*/\r\n  margin-left: calc(50vw - 100px);\r\n  margin-top: calc(50vh - 65px);\r\n  text-align: center;\r\n  line-height: 40px;\r\n  padding: 20px 0;\r\n  color: #006064;\r\n  font-size: 18px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/autentica/autentica.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div class=\"meio\">\r\n    <span [style.color]=\"mensagem == 'Usuario Autenticado' ? '#006064' : '#F44336'\"\r\n    >{{ mensagem }}</span>\r\n  </div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/autentica/autentica.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_dados_de_usuario_service__ = __webpack_require__("../../../../../src/app/Services/dados-de-usuario.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutenticaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AutenticaComponent = (function () {
    function AutenticaComponent(route, router, dadosDeUsuarioService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.dadosDeUsuarioService = dadosDeUsuarioService;
        this.id = this.route.snapshot.params['id'];
        this.dadosDeUsuarioService.autenticacao(this.id)
            .subscribe(function (data) {
            _this.mensagem = 'Usuario Autenticado';
            setTimeout(function () {
                _this.router.navigate(['/main']);
            }, 5000);
        }, function (error) {
            _this.mensagem = 'Erro ao Autenticar Usuario';
        });
    }
    AutenticaComponent.prototype.ngOnInit = function () {
    };
    return AutenticaComponent;
}());
AutenticaComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-autentica',
        template: __webpack_require__("../../../../../src/app/autentica/autentica.component.html"),
        styles: [__webpack_require__("../../../../../src/app/autentica/autentica.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */]) === "function" && _c || Object])
], AutenticaComponent);

var _a, _b, _c;
//# sourceMappingURL=autentica.component.js.map

/***/ }),

/***/ "../../../../../src/app/cadastro/cadastro.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\r\n  width: 100%;\r\n  height: 100vh;\r\n  background-color: #006064;\r\n  background-size: 100% 100vh;\r\n  overflow: hidden;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-line-pack: center;\r\n      align-content: center;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n}\r\n\r\n.login {\r\n  margin: auto;\r\n  width: 480px;\r\n  background-color: rgba(255, 255, 255, .5);\r\n  background-color: #FAFAFA;\r\n  position: relative;\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, .15), 0 2px 6px rgba(0, 0, 0, .2);\r\n  display: block;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  padding: 16px;\r\n  box-sizing: border-box;\r\n}\r\n\r\n#file {\r\n  display: none;\r\n}\r\n\r\n.forms {\r\n  width: 100%;\r\n  height: 100%;\r\n  overflow-x: hidden;\r\n\r\n}\r\n\r\n.campo {\r\n  height: 60px;\r\n  width: 100%;\r\n  margin-top: 10px;\r\n}\r\n\r\n.image {\r\n  position: relative;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  padding: 8px;\r\n}\r\n\r\n.imageUser {\r\n  width: 140px;\r\n  height: 140px;\r\n  background-color: #CCC;\r\n  color: #FFF;\r\n  border-radius: 50%;\r\n  line-height: 140px;\r\n  text-align: center;\r\n  font-family: 'Roboto';\r\n  font-size: 72px;\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/addPhoto.svg") + ");\r\n  background-repeat: no-repeat;\r\n  background-size: 80px 80px;\r\n  background-position: center;\r\n}\r\n\r\n.addImageUser {\r\n  width: 45px;\r\n  height: 45px;\r\n  background-color: #006064;\r\n  color: #FFF;\r\n  border-radius: 50%;\r\n  position: absolute;\r\n  top: 115px;\r\n  left: 235px;\r\n  line-height: 45px;\r\n  text-align: center;\r\n  font-size: 30px;\r\n  cursor: pointer;\r\n}\r\n\r\n.buttons {\r\n  width: 100%;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  /*flex-direction: row-reverse;*/\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n}\r\n\r\n.arrow_back {\r\n  position: absolute;\r\n  top: 8px;\r\n  left: 8px;\r\n  cursor: pointer;\r\n}\r\n\r\n@media screen and (max-width: 480px) {\r\n  .login {\r\n    width: 100%;\r\n    height: 100vh;\r\n    padding: 0;\r\n  }\r\n  .image {\r\n    padding: 0;\r\n  }\r\n  .imageUser {\r\n    border-radius: 0;\r\n    width: 100%;\r\n    height: 180px;\r\n  }\r\n  .addImageUser {\r\n    background-color: transparent;\r\n    top: 8px;\r\n    right: 8px;\r\n    left: auto;\r\n    color: #000;\r\n    height: 24px;\r\n    width: 24px;\r\n    overflow: hidden;\r\n    line-height: 24px;\r\n  }\r\n  .forms {\r\n    padding: 8px;\r\n    box-sizing: border-box;\r\n  }\r\n}\r\n\r\n\r\n@media screen and (max-width: 1440px) {\r\n  .container {\r\n    background-size: 1642px 1088px;\r\n    background-position: center;\r\n  }\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/cadastro/cadastro.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div class=\"login\">\r\n    <input type=\"file\" (change)=\"previewFile($event.target)\" id=\"file\">\r\n\r\n    <section class=\"image\">\r\n      <i class=\"material-icons arrow_back\" routerLink=\"/home\">arrow_back</i>\r\n      <img *ngIf=\"img64\" [style.background-image]=\"'url('+ img64 +')'\" [style.background-size]=\"'cover'\"\r\n           class=\"imageUser\"\r\n           id=\"preview\"/>\r\n      <div *ngIf=\"!img64\" class=\"imageUser\"></div>\r\n      <div class=\"addImageUser\" (click)=\"chamaFile()\">+</div>\r\n    </section>\r\n\r\n    <section class=\"forms\">\r\n      <section class=\"campo\">\r\n        <section class=\"relative\">\r\n          <input #formNome=\"ngModel\" [(ngModel)]=\"nome\" #HTMLNome\r\n                 (blur)=\"geraUserName(nome); chama();\"\r\n                 (input)=\"verificaNome(nome); habilitaBotao()\"\r\n                 type=\"text\" id=\"nome\"\r\n                 class=\"textFields\"/>\r\n          <label class=\"labelText\" for=\"nome\"\r\n                 [style.color]=\"codeSatusNome == '400' || formNome.touched && !this.nome ? '#F44336' : ''\"\r\n          >Nome*</label>\r\n          <div class=\"border\"\r\n               [style.background-color]=\"codeSatusNome == '400' || formNome.touched && !this.nome ? '#F44336' : ''\"\r\n\r\n          ></div>\r\n          <label *ngIf=\"!formNome.touched || this.nome\"\r\n                  class=\"helperText\"\r\n                 [style.color]=\"codeSatusNome == '400' || formNome.touched && !this.nome ? '#F44336' : ''\"\r\n                 [style.display]=\"codeSatusNome == '400' || formNome.touched && !this.nome ? 'block' : 'none'\"\r\n          >{{ errorNome }}</label>\r\n            <label class=\"helperText\" *ngIf=\"formNome.touched && !this.nome\"\r\n                   [style.color]=\"'#F44336'\">\r\n              Campo necessario\r\n            </label>\r\n        </section>\r\n      </section>\r\n\r\n      <section class=\"campo\">\r\n        <section class=\"relative\">\r\n          <input #HTMLEmail #formEmail=\"ngModel\" autocomplete=\"off\" spellcheck=\"false\" [(ngModel)]=\"email\"\r\n                 type=\"text\" id=\"email\" class=\"textFields\"\r\n                 (blur)=\"chama();\"\r\n                 (input)=\"verificaEmail(); habilitaBotao()\"\r\n          />\r\n          <label class=\"labelText\"\r\n                 for=\"email\"\r\n                 [style.color]=\"codeSatusEmail == '400' || formEmail.touched && !this.email ? '#F44336' : ''\"\r\n          >Email*</label>\r\n          <div class=\"border\"\r\n               [style.background-color]=\"codeSatusEmail == '400' || formEmail.touched && !this.email ? '#F44336' : ''\"\r\n          ></div>\r\n          <label class=\"helperText\"\r\n                 [style.color]=\"codeSatusEmail == '400' || formEmail.touched && !this.email ? '#F44336' : '409' ? '#F44336' : ''\"\r\n                 [style.display]=\"codeSatusEmail == '400' || formEmail.touched && !this.email ? 'block' : '409' ? 'block' : 'none'\"\r\n          >{{ errorEmail }}</label>\r\n\r\n          <label class=\"helperText\"\r\n                 *ngIf=\"formEmail.touched && !this.email\"\r\n                 [style.color]=\"'#F44336'\">\r\n            Campo necessario\r\n          </label>\r\n\r\n        </section>\r\n      </section>\r\n\r\n      <section class=\"campo\">\r\n        <section class=\"relative\">\r\n          <input #HTMLSenha #formSenha=\"ngModel\" [(ngModel)]=\"senha\"\r\n                 type=\"password\" id=\"senha\" class=\"textFields\"\r\n                 (blur)=\" senhasConferem(); chama()\"\r\n                 (input)=\"habilitaBotao(); verificaSenha();\"\r\n          />\r\n          <label class=\"labelText\" for=\"senha\"\r\n                 [style.color]=\"codeSatusSenha == '400' || formSenha.touched && !this.senha ? '#F44336' : ''\"\r\n          >Senha*</label>\r\n          <div class=\"border\"\r\n               [style.background-color]=\"codeSatusSenha == '400' || formSenha.touched && !this.senha ? '#F44336' : ''\"\r\n          ></div>\r\n          <label class=\"helperText\"\r\n                 [style.color]=\"codeSatusSenha == '400' || formSenha.touched && !this.senha ? '#F44336' : ''\"\r\n                 [style.display]=\"codeSatusSenha == '400' || formSenha.touched && !this.senha ? 'block' : 'none'\"\r\n          >{{ errorSenha }}</label>\r\n          <label class=\"helperText\"\r\n                 *ngIf=\"formSenha.touched && !this.senha\"\r\n                 [style.color]=\"'#F44336'\">\r\n            Campo necessario\r\n          </label>\r\n        </section>\r\n      </section>\r\n\r\n      <section class=\"campo\">\r\n        <section class=\"relative\">\r\n          <input #HTMLConfirmaSenha #formConfirmaSenha=\"ngModel\" [(ngModel)]=\"confirmaSenha\"\r\n                 (keyup.enter)=\"criaUsuario()\"\r\n                 (blur)=\" chama(); \"\r\n                 (input)=\" habilitaBotao(); verificaConfirmaSenha(); senhasConferem(); habilitaBotao()\"\r\n                 type=\"password\" id=\"confirmaSenha\" class=\"textFields\" autocomplete=\"off\"/>\r\n          <label class=\"labelText\" for=\"confirmaSenha\"\r\n                 [style.color]=\"codeSatusConfirmaSenha == '400' || formConfirmaSenha.touched && !this.confirmaSenha ? '#F44336' : ''\"\r\n          >Confirme sua senha*</label>\r\n          <div class=\"border\"\r\n               [style.background-color]=\"codeSatusConfirmaSenha == '400' || formConfirmaSenha.touched && !this.confirmaSenha ? '#F44336' : ''\"\r\n          ></div>\r\n          <label class=\"helperText\"\r\n                 [style.color]=\"codeSatusConfirmaSenha == '400' || formConfirmaSenha.touched && !this.confirmaSenha ? '#F44336' : ''\"\r\n                 [style.display]=\"codeSatusConfirmaSenha == '400' || formConfirmaSenha.touched && !this.confirmaSenha ? 'block' : 'none'\"\r\n          >{{ errorConfirmaSenha }}</label>\r\n          <label class=\"helperText\"\r\n                 *ngIf=\"formConfirmaSenha.touched && !this.confirmaSenha\"\r\n                 [style.color]=\"'#F44336'\">\r\n            Campo necessario\r\n          </label>\r\n        </section>\r\n\r\n      </section>\r\n\r\n      <section class=\"buttons\">\r\n        <button\r\n          (click)=\"criaUsuario()\"\r\n          class=\"denseButton disabledButton fullwidth\"\r\n          #HTMLCadastrar>\r\n          CADASTRAR\r\n        </button>\r\n      </section>\r\n    </section>\r\n\r\n\r\n\r\n  </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/cadastro/cadastro.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_dados_de_usuario_service__ = __webpack_require__("../../../../../src/app/Services/dados-de-usuario.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_core_service__ = __webpack_require__("../../../../../src/app/Services/core.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CadastroComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CadastroComponent = (function () {
    function CadastroComponent(http, router, dadosDoUsuario, core) {
        this.http = http;
        this.router = router;
        this.dadosDoUsuario = dadosDoUsuario;
        this.core = core;
        this.nome = '';
        this.userName = '';
        this.email = '';
        this.senha = '';
        this.confirmaSenha = '';
        this.tokken = '';
        this.img64 = '';
        this.podeCriarUsuario = false;
    }
    CadastroComponent.prototype.ngOnInit = function () {
    };
    CadastroComponent.prototype.chamaFile = function () {
        var el = document.getElementById('file');
        el.click();
    };
    CadastroComponent.prototype.chama = function () {
        this.nome.length > 0 ? this.HTMLNome.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLNome.nativeElement.classList.remove('textFieldsPreenchido');
        this.email.length > 0 ? this.HTMLEmail.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLEmail.nativeElement.classList.remove('textFieldsPreenchido');
        this.senha.length > 0 ? this.HTMLSenha.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLSenha.nativeElement.classList.remove('textFieldsPreenchido');
        this.confirmaSenha.length > 0 ? this.HTMLConfirmaSenha.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLConfirmaSenha.nativeElement.classList.remove('textFieldsPreenchido');
    };
    CadastroComponent.prototype.geraUserName = function (nome) {
        if (nome) {
            var userName = nome + Math.floor(Math.random() * 10000);
            userName = userName.replace(' ', '');
            this.userName = userName;
        }
    };
    CadastroComponent.prototype.verificaNome = function (nome) {
        var filtro = /^[A-Za-z ]+$/;
        if (filtro.test(nome) || nome == '') {
            if (nome.length > 2 && nome.length < 80) {
                this.codeSatusNome = '200';
                this.errorNome = '';
                return true;
            }
            else if (this.nome == '') {
                this.codeSatusNome = '400';
                this.errorNome = 'Campo necessario';
                return false;
            }
            else {
                this.codeSatusNome = '400';
                this.errorNome = 'Deve conter entre 3 á 80 caracteres!';
                return false;
            }
        }
        else {
            this.codeSatusNome = '400';
            this.errorNome = 'Nome invalido';
            return false;
        }
    };
    CadastroComponent.prototype.verificaEmail = function () {
        var _this = this;
        var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (this.email == '') {
            this.codeSatusEmail = '400';
            this.errorEmail = 'Campo necessario';
        }
        else if (filtro.test(this.email)) {
            this.dadosDoUsuario.verificaEmailExiste(this.email)
                .subscribe(function (res) {
                // console.log(res)
                _this.codeSatusEmail = '200';
                _this.errorEmail = '';
            }, function (error) {
                _this.codeSatusEmail = '409';
                _this.errorEmail = 'Esse email já está sendo usado';
                // console.log(error);
            });
        }
        else {
            this.codeSatusEmail = '400';
            this.errorEmail = 'Email Invalido';
        }
    };
    CadastroComponent.prototype.verificaSenha = function () {
        if (this.senha == '') {
            this.codeSatusSenha = '400';
            this.errorSenha = 'Campo Necessario';
            return false;
        }
        else if (this.senha.length >= 6 && this.senha.length <= 16) {
            this.codeSatusSenha = '200';
            this.errorSenha = '';
            return true;
        }
        else {
            this.codeSatusSenha = '400';
            this.errorSenha = 'Deve conter entre 6 á 16 caracteres';
            return true;
        }
    };
    CadastroComponent.prototype.senhasConferem = function () {
        if (this.senha && this.confirmaSenha) {
            if (this.senha && this.confirmaSenha && this.senha === this.confirmaSenha) {
                this.codeSatusConfirmaSenha = '200';
                this.errorConfirmaSenha = '';
                return true;
            }
            else {
                this.codeSatusConfirmaSenha = '400';
                this.errorConfirmaSenha = 'As senhas não conferem';
                return false;
            }
        }
    };
    CadastroComponent.prototype.verificaConfirmaSenha = function () {
        if (this.confirmaSenha == '') {
            this.codeSatusConfirmaSenha = '400';
            this.errorConfirmaSenha = 'Campo necessario';
            return false;
        }
    };
    CadastroComponent.prototype.habilitaBotao = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.codeSatusNome == '200' && _this.codeSatusEmail == '200' && _this.codeSatusSenha == '200' && _this.codeSatusConfirmaSenha == '200') {
                _this.podeCriarUsuario = true;
                _this.HTMLCadastrar.nativeElement.classList.remove('disabledButton');
            }
            else {
                _this.podeCriarUsuario = false;
                _this.HTMLCadastrar.nativeElement.classList.add('disabledButton');
            }
        }, 50);
    };
    CadastroComponent.prototype.criaUsuario = function () {
        var _this = this;
        if (this.podeCriarUsuario == true) {
            var url = 'http://' + this.core.ipDaApi + '/newuser';
            var json = JSON.stringify({
                name: this.nome,
                username: this.userName,
                email: this.email,
                password: this.senha,
                imgBase64: this.img64
            });
            var params = json;
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            return this.http.post(url, params, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                // console.log(data);
            }, function (error) {
                // console.log(error);
            }, function () {
                _this.fazerLogin();
            });
        }
        else {
        }
    };
    CadastroComponent.prototype.fazerLogin = function () {
        var _this = this;
        if (this.senha) {
            this.dadosDoUsuario.gerarTokken(this.userName, this.senha)
                .subscribe(function (data) {
                _this.tokken = data.token;
            }, function (error) {
            }, function () {
                _this.dadosDoUsuario.criarCookie(_this.tokken);
                // Limpa a variavel tokken
                _this.tokken = '';
                _this.dadosDoUsuario.logar()
                    .subscribe(function (res) {
                }, function (error) {
                }, function () {
                    _this.router.navigate(['/main']);
                });
            });
        }
    };
    CadastroComponent.prototype.previewFile = function (el) {
        var _this = this;
        var fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
        var fSize = el.files[0].size;
        var i = 0;
        while (fSize > 900) {
            fSize = fSize / 1024;
            i++;
        }
        fSize = (Math.round(fSize * 100) / 100) + ' ' + fSExt[i];
        var reader = new FileReader();
        if (el) {
            reader.readAsDataURL(el.files[0]);
        }
        reader.onloadend = function (e) {
            _this.img64 = reader.result;
        };
    };
    return CadastroComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLNome'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object)
], CadastroComponent.prototype, "HTMLNome", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLEmail'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _b || Object)
], CadastroComponent.prototype, "HTMLEmail", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLSenha'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _c || Object)
], CadastroComponent.prototype, "HTMLSenha", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLConfirmaSenha'),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _d || Object)
], CadastroComponent.prototype, "HTMLConfirmaSenha", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLCadastrar'),
    __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _e || Object)
], CadastroComponent.prototype, "HTMLCadastrar", void 0);
CadastroComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-cadastro',
        template: __webpack_require__("../../../../../src/app/cadastro/cadastro.component.html"),
        styles: [__webpack_require__("../../../../../src/app/cadastro/cadastro.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_5__Services_core_service__["a" /* CoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_core_service__["a" /* CoreService */]) === "function" && _j || Object])
], CadastroComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j;
//# sourceMappingURL=cadastro.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/arrow-back/arrow-back.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "div {\r\n  display: none;\r\n  width: 24px;\r\n  height: 24px;\r\n  position: fixed;\r\n  border-radius: 50%;\r\n  top: 16px;\r\n  left: 16px;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  z-index: 50;\r\n  transition: all ease 180ms;\r\n  cursor: pointer;\r\n\r\n}\r\ndiv:hover {\r\n  background-color: #009587;\r\n}\r\n\r\n@media screen and (max-width: 480px) {\r\n  div {\r\n    display: block;\r\n  }\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/arrow-back/arrow-back.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <i class=\"material-icons\">arrow_back</i>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/arrow-back/arrow-back.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrowBackComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ArrowBackComponent = (function () {
    // @Output() acao: EventEmitter<any> = new EventEmitter();
    function ArrowBackComponent() {
    }
    ArrowBackComponent.prototype.ngOnInit = function () {
    };
    return ArrowBackComponent;
}());
ArrowBackComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-arrow-back',
        template: __webpack_require__("../../../../../src/app/components/arrow-back/arrow-back.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/arrow-back/arrow-back.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ArrowBackComponent);

//# sourceMappingURL=arrow-back.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/arrow-back/arrow-back.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__arrow_back_component__ = __webpack_require__("../../../../../src/app/components/arrow-back/arrow-back.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrowBackModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ArrowBackModule = (function () {
    function ArrowBackModule() {
    }
    return ArrowBackModule;
}());
ArrowBackModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["k" /* CommonModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__arrow_back_component__["a" /* ArrowBackComponent */]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__arrow_back_component__["a" /* ArrowBackComponent */]]
    })
], ArrowBackModule);

//# sourceMappingURL=arrow-back.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/autenticacao/autenticacao.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "aside {\r\n  padding: 5px;\r\n  width: calc(100vw - 10px);\r\n  background-color: #212121;\r\n  line-height: 20px;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  -ms-flex-line-pack: center;\r\n      align-content: center;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  position: relative;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  cursor: pointer;\r\n  color: #f4f4f4;\r\n}\r\n\r\naside section {\r\n  width: calc(100% - 50px);\r\n  text-align: center;\r\n}\r\n\r\naside section span:nth-of-type(2) {\r\n  text-decoration: underline;\r\n}\r\n\r\naside .fecha {\r\n  width: 20px;\r\n  height: 20px;\r\n  text-align: center;\r\n  line-height: 20px;\r\n  border-radius: 50%;\r\n  font-size: 18px;\r\n  position: absolute;\r\n  right: 30px;\r\n}\r\n\r\naside .fecha:hover {\r\n  background-color: rgba(255, 255, 255, 0.23);\r\n}\r\n\r\n@media screen and (max-width: 700px) {\r\n  aside {\r\n    font-size: 14px;\r\n  }\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/autenticacao/autenticacao.component.html":
/***/ (function(module, exports) {

module.exports = "<aside #autenticacao>\r\n  <section>\r\n    <span>Confirme seu endereço de email: {{ dadosDoUsuario?.dados?.email }}.</span><span (click)=\"reenvia(dadosDoUsuario?.dados?.email)\"> Reenviar email</span>\r\n  </section>\r\n\r\n  <div class=\"fecha\" (click)=\"fecha()\">\r\n    X\r\n  </div>\r\n</aside>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/autenticacao/autenticacao.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_dados_de_usuario_service__ = __webpack_require__("../../../../../src/app/Services/dados-de-usuario.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_core_service__ = __webpack_require__("../../../../../src/app/Services/core.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__snackbars_snackbars_service__ = __webpack_require__("../../../../../src/app/components/snackbars/snackbars.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutenticacaoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AutenticacaoComponent = (function () {
    function AutenticacaoComponent(router, http, dadosDoUsuario, core, snackbarService) {
        this.router = router;
        this.http = http;
        this.dadosDoUsuario = dadosDoUsuario;
        this.core = core;
        this.snackbarService = snackbarService;
    }
    AutenticacaoComponent.prototype.ngOnInit = function () {
    };
    AutenticacaoComponent.prototype.fecha = function () {
        this.autenticacao.nativeElement.style = 'display: none';
    };
    AutenticacaoComponent.prototype.reenvia = function (email) {
        var _this = this;
        this.snackbarService.inserirSnackbar('Aguarde...');
        var url = 'http://' + this.core.ipDaApi + '/resendEmail';
        var json = JSON.stringify({
            email: email,
            who: false
        });
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.dadosDoUsuario.getCookieTokken());
        return this.http.post(url, params, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.snackbarService.inserirSnackbar('Email enviado com sucesso!');
        }, function (error) {
        });
    };
    return AutenticacaoComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('autenticacao'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object)
], AutenticacaoComponent.prototype, "autenticacao", void 0);
AutenticacaoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-autenticacao',
        template: __webpack_require__("../../../../../src/app/components/autenticacao/autenticacao.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/autenticacao/autenticacao.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__Services_core_service__["a" /* CoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_core_service__["a" /* CoreService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__snackbars_snackbars_service__["a" /* SnackbarsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__snackbars_snackbars_service__["a" /* SnackbarsService */]) === "function" && _f || Object])
], AutenticacaoComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=autenticacao.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/autenticacao/autenticacao.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__autenticacao_component__ = __webpack_require__("../../../../../src/app/components/autenticacao/autenticacao.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__snackbars_snackbars_module__ = __webpack_require__("../../../../../src/app/components/snackbars/snackbars.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__snackbars_snackbars_component__ = __webpack_require__("../../../../../src/app/components/snackbars/snackbars.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutenticacaoModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AutenticacaoModule = (function () {
    function AutenticacaoModule() {
    }
    return AutenticacaoModule;
}());
AutenticacaoModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["k" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_3__snackbars_snackbars_module__["a" /* SnackbarsModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__autenticacao_component__["a" /* AutenticacaoComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__autenticacao_component__["a" /* AutenticacaoComponent */],
            __WEBPACK_IMPORTED_MODULE_4__snackbars_snackbars_component__["a" /* SnackbarsComponent */]
        ]
    })
], AutenticacaoModule);

//# sourceMappingURL=autenticacao.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/menu-info-user/menu-info-user.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@-webkit-keyframes abertura {\r\n  0% {-webkit-transform: scale(0);transform: scale(0);}\r\n  100% {-webkit-transform: scale(1);transform: scale(1);}\r\n}\r\n@keyframes abertura {\r\n  0% {-webkit-transform: scale(0);transform: scale(0);}\r\n  100% {-webkit-transform: scale(1);transform: scale(1);}\r\n}\r\n.opPerfilOff {\r\n  width: 170px;\r\n  background-color: #FFF;\r\n  box-shadow: 0px 9px 12px rgba(0,0,0,.14),\r\n              0px 3px 16px rgba(0,0,0,.12),\r\n              0px 5px 6px rgba(0,0,0,.20);\r\n  -webkit-transform-origin: top right;\r\n          transform-origin: top right;\r\n  transition: All 300ms ease-in;\r\n}\r\n\r\n.opPerfil {\r\n  width: 170px;\r\n  background-color: #FFF;\r\n  box-shadow: 0px 9px 12px rgba(0,0,0,.14),\r\n              0px 3px 16px rgba(0,0,0,.12),\r\n              0px 5px 6px rgba(0,0,0,.20);\r\n  -webkit-transform-origin: top right;\r\n          transform-origin: top right;\r\n  transition: All 280ms ease-in;\r\n}\r\n.on {\r\n  -webkit-transform: scale(1);\r\n          transform: scale(1);\r\n\r\n}\r\n.off {\r\n  -webkit-transform: scale(0);\r\n          transform: scale(0);\r\n}\r\n.opPerfil ul {\r\n  list-style: circle;\r\n  cursor: pointer;\r\n}\r\n/deep/ .opPerfil ul li {\r\n  width: 100%;\r\n  height: 35px;\r\n}\r\n\r\n/deep/ .opPerfil ul li img {\r\n  float: left;\r\n  margin-left: 5px;\r\n  /*margin-top: 5.5px;*/\r\n  width: 24px;\r\n}\r\n/deep/ .opPerfil ul li span {\r\n  float: left;\r\n  margin-left: 5px;\r\n  line-height: 35px;\r\n  font-size: 16px;\r\n  outline: none;\r\n}\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/menu-info-user/menu-info-user.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template>\r\n  <section>\r\n    <ul style=\"list-style: none; cursor: pointer;\">\r\n      <ng-content>\r\n\r\n      </ng-content>\r\n    </ul>\r\n  </section>\r\n</ng-template>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/menu-info-user/menu-info-user.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuInfoUserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MenuInfoUserComponent = (function () {
    function MenuInfoUserComponent(elementRef) {
        this.elementRef = elementRef;
        this.closeChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* EventEmitter */]();
    }
    MenuInfoUserComponent.prototype.ngOnInit = function () {
    };
    MenuInfoUserComponent.prototype.close = function () {
        this.closeChange.emit();
    };
    return MenuInfoUserComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* TemplateRef */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* TemplateRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* TemplateRef */]) === "function" && _a || Object)
], MenuInfoUserComponent.prototype, "templateRef", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* EventEmitter */]) === "function" && _b || Object)
], MenuInfoUserComponent.prototype, "closeChange", void 0);
MenuInfoUserComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-menu-info-user',
        template: __webpack_require__("../../../../../src/app/components/menu-info-user/menu-info-user.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/menu-info-user/menu-info-user.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _c || Object])
], MenuInfoUserComponent);

var _a, _b, _c;
//# sourceMappingURL=menu-info-user.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/menu-info-user/menu-info-user.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuInfoUserDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MenuInfoUserDirective = (function () {
    function MenuInfoUserDirective(viewContainerRef, elementRef) {
        this.viewContainerRef = viewContainerRef;
        this.elementRef = elementRef;
    }
    MenuInfoUserDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.menuInfoUser.closeChange.subscribe(function () {
            _this.close(null);
        });
        this.close(null);
        this.elementRef.nativeElement.addEventListener('click', function (event) {
            var pos = _this.elementRef.nativeElement;
            pos = pos.getBoundingClientRect();
            var position = {
                'x': pos.right,
                'y': pos.top
            };
            _this.render(position);
        });
        document.addEventListener('mouseup', function (e) {
            if (_this.elementRef.nativeElement !== e.target) {
                _this.close(e.target);
            }
        });
        document.addEventListener('scroll', function (e) {
            if (_this.elementRef.nativeElement !== e.target) {
                _this.close(e.target);
            }
        });
        document.addEventListener('resize', function (e) {
            if (_this.elementRef.nativeElement !== e.target) {
                _this.close(e.target);
            }
        });
        document.addEventListener('touchend', function (e) {
            if (_this.elementRef.nativeElement !== e.target) {
                _this.close(e.target);
            }
        });
    };
    MenuInfoUserDirective.prototype.render = function (coordenada) {
        this.viewRef = this.viewContainerRef.createEmbeddedView(this.menuInfoUser.templateRef);
        this.viewRef.detectChanges();
        this.viewRef.rootNodes.forEach(function (rootNode) {
            rootNode.style = 'position: absolute; top:' + (coordenada.y) + 'px;' + 'left:' + (coordenada.x - 160) + 'px;' + 'z-index: 24;';
            document.body.appendChild(rootNode);
            if (rootNode.classList == '') {
                rootNode.classList = 'opPerfil off';
            }
            if (rootNode.clientWidth && rootNode.classList != 'opPerfil on') {
                rootNode.classList = 'opPerfil on';
            }
        });
    };
    MenuInfoUserDirective.prototype.close = function (e) {
        var _this = this;
        if (this.viewContainerRef.length) {
            var viewRef_1 = this.viewRef;
            viewRef_1.rootNodes.forEach(function (rootNode) {
                if (rootNode.classList) {
                    rootNode.classList = 'opPerfil off';
                }
            });
            setTimeout(function () { return _this.viewContainerRef.remove(_this.viewContainerRef.indexOf(viewRef_1)); }, 400);
        }
    };
    return MenuInfoUserDirective;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Input */])('menuInfoUser'),
    __metadata("design:type", Object)
], MenuInfoUserDirective.prototype, "menuInfoUser", void 0);
MenuInfoUserDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Directive */])({
        selector: '[menuInfoUser]'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ViewContainerRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ViewContainerRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _b || Object])
], MenuInfoUserDirective);

var _a, _b;
//# sourceMappingURL=menu-info-user.directive.js.map

/***/ }),

/***/ "../../../../../src/app/components/menu-info-user/menu-info-user.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_info_user_component__ = __webpack_require__("../../../../../src/app/components/menu-info-user/menu-info-user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu_info_user_directive__ = __webpack_require__("../../../../../src/app/components/menu-info-user/menu-info-user.directive.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuInfoUserModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MenuInfoUserModule = (function () {
    function MenuInfoUserModule() {
    }
    return MenuInfoUserModule;
}());
MenuInfoUserModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["k" /* CommonModule */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__menu_info_user_component__["a" /* MenuInfoUserComponent */],
            __WEBPACK_IMPORTED_MODULE_3__menu_info_user_directive__["a" /* MenuInfoUserDirective */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__menu_info_user_component__["a" /* MenuInfoUserComponent */],
            __WEBPACK_IMPORTED_MODULE_3__menu_info_user_directive__["a" /* MenuInfoUserDirective */]
        ]
    })
], MenuInfoUserModule);

//# sourceMappingURL=menu-info-user.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/menu/menu.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "ul {\r\n  box-shadow: 0 8px 10px 1px rgba(0,0,0, 0.14),\r\n              0 3px 14px 3px rgba(0,0,0,0.12),\r\n              0 4px 15px 0px rgba(0, 0, 0, 0.20);\r\n}\r\n\r\n\r\n@media screen and (max-width: 480px) {\r\n  ul {\r\n    margin-top: -5px;\r\n    margin-left: 20px;\r\n  }\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/menu/menu.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template>\r\n  <section class=\"nav\">\r\n    <ul style=\"list-style: none; width: 200px;\">\r\n      <ng-content>\r\n      </ng-content>\r\n    </ul>\r\n  </section>\r\n</ng-template>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/menu/menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MenuComponent = (function () {
    function MenuComponent(elementRef) {
        this.elementRef = elementRef;
        this.closeChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* EventEmitter */]();
    }
    MenuComponent.prototype.ngOnInit = function () {
    };
    MenuComponent.prototype.close = function () {
        this.closeChange.emit();
    };
    return MenuComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* TemplateRef */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* TemplateRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* TemplateRef */]) === "function" && _a || Object)
], MenuComponent.prototype, "templateRef", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* EventEmitter */]) === "function" && _b || Object)
], MenuComponent.prototype, "closeChange", void 0);
MenuComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-menu',
        template: __webpack_require__("../../../../../src/app/components/menu/menu.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/menu/menu.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _c || Object])
], MenuComponent);

var _a, _b, _c;
//# sourceMappingURL=menu.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/menu/menu.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MenuDirective = (function () {
    function MenuDirective(viewContainerRef, elementRef) {
        this.viewContainerRef = viewContainerRef;
        this.elementRef = elementRef;
    }
    MenuDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.menu.closeChange.subscribe(function () {
            _this.close();
        });
        this.close();
        this.elementRef.nativeElement.addEventListener('click', function (event) {
            var pos = _this.elementRef.nativeElement;
            pos = pos.getBoundingClientRect();
            var position = {
                'x': pos.left,
                'y': pos.top,
            };
            _this.render(position);
        });
        document.addEventListener('mouseup', function (e) {
            if (_this.elementRef.nativeElement !== e.target) {
                _this.close();
            }
        });
        document.addEventListener('resize', function (e) {
            if (_this.elementRef.nativeElement !== e.target) {
                _this.close();
            }
        });
        document.addEventListener('scroll', function (e) {
            if (_this.elementRef.nativeElement !== e.target) {
                _this.close();
            }
        });
        document.addEventListener('touchend', function (e) {
            if (_this.elementRef.nativeElement !== e.target) {
                _this.close();
            }
        });
    };
    MenuDirective.prototype.render = function (coordinate) {
        this.viewRef = this.viewContainerRef.createEmbeddedView(this.menu.templateRef);
        this.viewRef.detectChanges();
        this.viewRef.rootNodes.forEach(function (rootNode) {
            rootNode.style = 'position: absolute; top:' + (coordinate.y + 35) + 'px;' + 'left:' + (coordinate.x - 140) + 'px;';
            rootNode.classList = 'open';
            document.body.appendChild(rootNode);
            if (rootNode.clientWidth) {
            }
        });
    };
    MenuDirective.prototype.close = function () {
        var _this = this;
        if (this.viewContainerRef.length) {
            var viewRef_1 = this.viewRef;
            viewRef_1.rootNodes.forEach(function (rootNode) {
                if (rootNode.classList) {
                    // rootNode.classList.remove('open');
                }
            });
            setTimeout(function () { return _this.viewContainerRef.remove(_this.viewContainerRef.indexOf(viewRef_1)); }, 50);
        }
    };
    return MenuDirective;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Input */])('menu'),
    __metadata("design:type", Object)
], MenuDirective.prototype, "menu", void 0);
MenuDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Directive */])({
        selector: '[menu]'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ViewContainerRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ViewContainerRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _b || Object])
], MenuDirective);

var _a, _b;
//# sourceMappingURL=menu.directive.js.map

/***/ }),

/***/ "../../../../../src/app/components/menu/menu.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_component__ = __webpack_require__("../../../../../src/app/components/menu/menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu_directive__ = __webpack_require__("../../../../../src/app/components/menu/menu.directive.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MenuModule = (function () {
    function MenuModule() {
    }
    return MenuModule;
}());
MenuModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["k" /* CommonModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__menu_component__["a" /* MenuComponent */],
            __WEBPACK_IMPORTED_MODULE_3__menu_directive__["a" /* MenuDirective */]
        ], exports: [
            __WEBPACK_IMPORTED_MODULE_2__menu_component__["a" /* MenuComponent */],
            __WEBPACK_IMPORTED_MODULE_3__menu_directive__["a" /* MenuDirective */]
        ]
    })
], MenuModule);

//# sourceMappingURL=menu.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/popup-confirmacao/popup-confirmacao.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "section {\r\n  position: fixed;\r\n  z-index: 25;\r\n  width: 280px;\r\n  /*height: 112px;*/\r\n  background-color: #FFF;\r\n  top: calc(50vh - 100px);\r\n  left: calc(50vw - 140px);\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  overflow: hidden;\r\n  box-shadow: 0px 24px 38px rgba(0,0,0,.14),\r\n              0px 9px 46px rgba(0,0,0,.12),\r\n              0px 11px 15px rgba(0,0,0,.20);\r\n}\r\nheader {\r\n  padding: 24px 24px 20px 24px;\r\n  color: #000;\r\n  width: 100%;\r\n  box-sizing: border-box;\r\n\r\n}\r\nsection .conteudo {\r\n  padding: 0 24px 24px 24px;\r\n  color: #444;\r\n  width: 100%;\r\n  box-sizing: border-box;\r\n}\r\nsection .buttons {\r\n  padding: 8px 16px 8px 0;\r\n  height: 36px;\r\n  width: 100%;\r\n  background-color: #FFF;\r\n}\r\n\r\n.background {\r\n  width: 100vw;\r\n  height: 100vh;\r\n  position: fixed;\r\n  background-color: rgba(0, 0, 0, .7);\r\n  z-index: 24;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/popup-confirmacao/popup-confirmacao.component.html":
/***/ (function(module, exports) {

module.exports = "<section #popup>\r\n  <header>\r\n    {{ service.titulo }}\r\n  </header>\r\n  <div class=\"conteudo\">\r\n    {{ service.mensagem }}\r\n  </div>\r\n  <div class=\"buttons\">\r\n    <button class=\"denseButton\" (click)=\"project.delProject(service.id)\" style=\"float: right; background-color: transparent; color: #2196F3; font-weight: 600;\">EXCLUIR</button>\r\n    <button class=\"denseButton\" (click)=\"service.fechaPopUpConfirmacao()\" style=\"float: right; background-color: transparent; color: #2196F3; font-weight: 600;\">CANCELAR</button>\r\n  </div>\r\n</section>\r\n\r\n<section class=\"background\"></section>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/components/popup-confirmacao/popup-confirmacao.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__popup_confirmacao_service__ = __webpack_require__("../../../../../src/app/components/popup-confirmacao/popup-confirmacao.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__projects_projects_service_service__ = __webpack_require__("../../../../../src/app/projects/projects-service.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopupConfirmacaoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PopupConfirmacaoComponent = (function () {
    function PopupConfirmacaoComponent(service, project) {
        this.service = service;
        this.project = project;
    }
    PopupConfirmacaoComponent.prototype.ngOnInit = function () {
        var _this = this;
        document.addEventListener('mousedown', function (e) {
            _this.closeChangeProjects(e);
        });
    };
    PopupConfirmacaoComponent.prototype.closeChangeProjects = function (event) {
        if (event.target.className == 'background') {
            this.service.fechaPopUpConfirmacao();
        }
    };
    return PopupConfirmacaoComponent;
}());
PopupConfirmacaoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-popup-confirmacao',
        template: __webpack_require__("../../../../../src/app/components/popup-confirmacao/popup-confirmacao.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/popup-confirmacao/popup-confirmacao.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__popup_confirmacao_service__["a" /* PopupConfirmacaoService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__popup_confirmacao_service__["a" /* PopupConfirmacaoService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__projects_projects_service_service__["a" /* ProjectsServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__projects_projects_service_service__["a" /* ProjectsServiceService */]) === "function" && _b || Object])
], PopupConfirmacaoComponent);

var _a, _b;
//# sourceMappingURL=popup-confirmacao.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/popup-confirmacao/popup-confirmacao.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popup_confirmacao_component__ = __webpack_require__("../../../../../src/app/components/popup-confirmacao/popup-confirmacao.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__popup_confirmacao_service__ = __webpack_require__("../../../../../src/app/components/popup-confirmacao/popup-confirmacao.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopupConfirmacaoModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PopupConfirmacaoModule = (function () {
    function PopupConfirmacaoModule() {
    }
    return PopupConfirmacaoModule;
}());
PopupConfirmacaoModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["k" /* CommonModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__popup_confirmacao_component__["a" /* PopupConfirmacaoComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_3__popup_confirmacao_service__["a" /* PopupConfirmacaoService */]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__popup_confirmacao_component__["a" /* PopupConfirmacaoComponent */]]
    })
], PopupConfirmacaoModule);

//# sourceMappingURL=popup-confirmacao.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/popup-confirmacao/popup-confirmacao.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopupConfirmacaoService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PopupConfirmacaoService = (function () {
    function PopupConfirmacaoService() {
        this.situacao = false;
        this.titulo = '';
        this.mensagem = '';
        this.id = '';
    }
    PopupConfirmacaoService.prototype.ativaPopUpConfirmacao = function (titulo, mensagem, id) {
        if (this.situacao == false) {
            this.situacao = !this.situacao;
            this.titulo = titulo;
            this.mensagem = mensagem;
            this.id = id;
        }
    };
    PopupConfirmacaoService.prototype.fechaPopUpConfirmacao = function () {
        if (this.situacao == true) {
            this.situacao = !this.situacao;
        }
    };
    return PopupConfirmacaoService;
}());
PopupConfirmacaoService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], PopupConfirmacaoService);

//# sourceMappingURL=popup-confirmacao.service.js.map

/***/ }),

/***/ "../../../../../src/app/components/snackbars/snackbars.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".containerSnackbars {\r\n  position: fixed;\r\n  bottom: 0px;\r\n  left: 0;\r\n  width: 100vw;\r\n  /*height: 50px;*/\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: reverse;\r\n      -ms-flex-direction: column-reverse;\r\n          flex-direction: column-reverse;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  transition: all 480ms ease;\r\n  z-index: 25;\r\n}\r\n\r\n\r\n.snackbars {\r\n  height: 48px;\r\n  min-width: 264px;\r\n  max-width: 544px;\r\n  border-radius: 2px;\r\n  font-family: 'Roboto';\r\n  font-size: 14px;\r\n  background-color: #323232;\r\n  padding-left: 24px;\r\n  line-height: 48px;\r\n  color: #f4f4f4;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  margin: 5px 0;\r\n  cursor: default;\r\n  /*position: fixed;*/\r\n  /*bottom: -60px;*/\r\n  -webkit-transform: translateY(60px);\r\n          transform: translateY(60px);\r\n  transition: all 800ms ease;\r\n}\r\n.climb {\r\n  -webkit-transform: translateY(0px);\r\n          transform: translateY(0px);\r\n\r\n}\r\n.leave {\r\n  -webkit-transform: translateY(60px);\r\n          transform: translateY(60px);\r\n}\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/snackbars/snackbars.component.html":
/***/ (function(module, exports) {

module.exports = "  <div class=\"containerSnackbars\" #HTMLSnack>\r\n\r\n    <div *ngFor=\"let snack of snackbarsService.notificacoes; let index = index\">\r\n      <!--<div [@mostra]=\"snackbarsService.situacao\" class=\"snackbars\" #HTMLsnackbar>-->\r\n      <div class=\"snackbars\" #HTMLsnackbar>\r\n        {{ snack.text }}\r\n      </div>\r\n    </div>\r\n\r\n\r\n  </div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/snackbars/snackbars.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__snackbars_service__ = __webpack_require__("../../../../../src/app/components/snackbars/snackbars.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SnackbarsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SnackbarsComponent = (function () {
    function SnackbarsComponent(snackbarsService) {
        this.snackbarsService = snackbarsService;
    }
    SnackbarsComponent.prototype.ngAfterViewInit = function () {
        this.snackbarsService.snackbar = this.HTMLsnackbar;
        this.snackbarsService.snack = this.HTMLSnack;
    };
    return SnackbarsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLsnackbar'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object)
], SnackbarsComponent.prototype, "HTMLsnackbar", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLSnack'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _b || Object)
], SnackbarsComponent.prototype, "HTMLSnack", void 0);
SnackbarsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-snackbars',
        template: __webpack_require__("../../../../../src/app/components/snackbars/snackbars.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/snackbars/snackbars.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__snackbars_service__["a" /* SnackbarsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__snackbars_service__["a" /* SnackbarsService */]) === "function" && _c || Object])
], SnackbarsComponent);

var _a, _b, _c;
//# sourceMappingURL=snackbars.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/snackbars/snackbars.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__snackbars_component__ = __webpack_require__("../../../../../src/app/components/snackbars/snackbars.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__snackbars_service__ = __webpack_require__("../../../../../src/app/components/snackbars/snackbars.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SnackbarsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SnackbarsModule = (function () {
    function SnackbarsModule() {
    }
    return SnackbarsModule;
}());
SnackbarsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["k" /* CommonModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__snackbars_component__["a" /* SnackbarsComponent */]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__snackbars_component__["a" /* SnackbarsComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_3__snackbars_service__["a" /* SnackbarsService */]]
    })
], SnackbarsModule);

//# sourceMappingURL=snackbars.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/snackbars/snackbars.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SnackbarsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SnackbarsService = (function () {
    function SnackbarsService() {
        this.situacao = 'inativo';
        this.estado = 'inativo';
        this.notificacoes = [];
    }
    SnackbarsService.prototype.inserirSnackbar = function (text) {
        var obj = { text: text, delay: 2000 };
        this.notificacoes.push(obj);
        if (this.notificacoes.length === 1) {
            this.loop();
        }
    };
    SnackbarsService.prototype.loop = function () {
        var _this = this;
        var bar = this.notificacoes[0];
        this.setTime2 = setTimeout(function () {
            document.querySelector('.snackbars').className = 'snackbars climb';
        }, 50);
        this.setTime = setTimeout(function () {
            document.querySelector('.snackbars').className = 'snackbars leave';
            _this.setTime3 = setTimeout(function () {
                _this.notificacoes.shift();
                if (_this.notificacoes.length) {
                    _this.loop();
                }
                else {
                    _this.again = false;
                }
            }, 800);
        }, bar.delay);
    };
    return SnackbarsService;
}());
SnackbarsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], SnackbarsService);

//# sourceMappingURL=snackbars.service.js.map

/***/ }),

/***/ "../../../../../src/app/drag-drop/drag-drop.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".projeto {\r\n  width: 100vw;\r\n  min-height: 100px;\r\n  float: left;\r\n  margin-top: 10px;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n}\r\n\r\n.projeto .img {\r\n  width: 90px;\r\n  height: 90px;\r\n  border-radius: 50%;\r\n  background-color: #26C6DA;\r\n  color: #FFF;\r\n  margin-top: 5px;\r\n  margin-left: 10%;\r\n  float: left;\r\n  line-height: 90px;\r\n  text-align: center;\r\n  font-size: 48px;\r\n  font-family: \"Roboto\";\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n\r\n}\r\n\r\n.projeto h1 {\r\n  float: left;\r\n  margin-left: 15px;\r\n  margin-top: 30px;\r\n  color: #444444;\r\n  cursor: pointer;\r\n  font-family: \"Roboto\";\r\n  font-weight: 500;\r\n}\r\n\r\n.container {\r\n  max-width: 100%;\r\n  height: calc(100vh - 60px);\r\n  margin-top: 10px;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  float: left;\r\n  font-family: 'Roboto';\r\n  cursor: default;\r\n  box-sizing: border-box;\r\n  overflow: hidden;\r\n}\r\n\r\n.container #dragDrop {\r\n  width: 100%;\r\n  height: 100%;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  overflow-x: scroll;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  background-color: #EEEEEE;\r\n\r\n}\r\n\r\n.caixa {\r\n  max-width: 250px;\r\n  min-width: 250px;\r\n  max-height: calc(100% - 20px);\r\n  overflow: hidden;\r\n  float: left;\r\n  border-radius: 2px;\r\n  margin: 10px;\r\n  position: relative;\r\n\r\n}\r\n\r\n.caixa header {\r\n  width: 100%;\r\n  height: 35px;\r\n  color: #444;\r\n  text-align: center;\r\n  line-height: 35px;\r\n  position: static;\r\n  z-index: 1;\r\n  font-family: \"Roboto\";\r\n  font-weight: 500;\r\n  font-size: 16px;\r\n  text-transform: capitalize;\r\n  margin: 0;\r\n  padding: 0;\r\n  background-color: rgba(0, 0, 0, .09);\r\n  overflow: hidden;\r\n}\r\n\r\n.caixa header .nome {\r\n  background-color: transparent;\r\n  border: 0;\r\n  outline: none;\r\n  font-size: 16px;\r\n  font-family: \"Roboto\";\r\n  font-weight: 500;\r\n}\r\n\r\n.caixa header .delete {\r\n  height: 100%;\r\n  cursor: pointer;\r\n  float: right;\r\n  font-size: 8px;\r\n  color: #FAFAFA;\r\n  line-height: 35px;\r\n  overflow-x: hidden;\r\n  text-align: center;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  transition: All ease 480ms;\r\n}\r\n\r\n.caixa header .delete i {\r\n  color: rgba(0, 0, 0, .42);\r\n  font-size: 22px;\r\n}\r\n\r\n.caixa .body {\r\n  width: calc(100% + 20px);\r\n  overflow-y: scroll;\r\n  max-height: calc(100% - 35px);\r\n  background-color: rgba(0, 0, 0, .09);\r\n  box-shadow: 0 0px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 4px 0 rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.20);\r\n\r\n}\r\n\r\n.caixa .popup {\r\n  width: 150px;\r\n  height: 70px;\r\n  position: absolute;\r\n  top: 35px;\r\n  right: 5px;\r\n  overflow: hidden;\r\n  display: block;\r\n  -webkit-transform-origin: top right;\r\n          transform-origin: top right;\r\n  -webkit-transform: scale(0);\r\n          transform: scale(0);\r\n  z-index: 24;\r\n  transition: all ease 180ms;\r\n}\r\n\r\n.caixa .popup .item {\r\n  width: 100%;\r\n  height: 35px;\r\n  background-color: #9E9E9E;\r\n  color: #FFF;\r\n  float: left;\r\n  overflow: hidden;\r\n  padding-left: 10px;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.caixa .popupOn {\r\n  width: 150px;\r\n  height: 70px;\r\n  position: absolute;\r\n  top: 35px;\r\n  right: 5px;\r\n  overflow: hidden;\r\n  display: block;\r\n  -webkit-transform-origin: top right;\r\n          transform-origin: top right;\r\n  -webkit-transform: scale(1);\r\n          transform: scale(1);\r\n  z-index: 24;\r\n  transition: all ease 180ms;\r\n  background-color: #111;\r\n}\r\n\r\n.elemento {\r\n  width: 90%;\r\n  margin: 0 5%;\r\n  height: auto;\r\n  line-height: 25px;\r\n  background-color: #FFFFFF;\r\n  border-radius: 2px;\r\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14),\r\n  0 4px 5px 0 rgba(0, 0, 0, 0.12),\r\n  0 1px 10px 0 rgba(0, 0, 0, 0.20);\r\n  margin-top: 5px;\r\n  cursor: move;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  padding: 5px 5px 5px 15px;\r\n  box-sizing: border-box;\r\n  overflow: hidden;\r\n  position: relative;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: horizontal;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: row;\r\n          flex-direction: row;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n}\r\n\r\n.elemento .nome {\r\n  font-family: \"Roboto\";\r\n  font-weight: 400;\r\n  font-size: 14px;\r\n  width: 100%;\r\n}\r\n\r\n.elemento .infoEl {\r\n  width: 100%;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  -webkit-box-orient: horizontal;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: row;\r\n          flex-direction: row;\r\n  line-height: 32px;\r\n}\r\n\r\n.elemento .infoEl .prazo {\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/watch_later.svg") + ");\r\n  background-repeat: no-repeat;\r\n  background-size: 14px 14px;\r\n  background-position: left center;\r\n  padding-left: 16px;\r\n  height: 30px;\r\n  line-height: 32px;\r\n  overflow: hidden;\r\n  font-size: 14px;\r\n  font-family: 'Roboto';\r\n  margin: 0 2px;\r\n}\r\n\r\n.elemento .infoEl .comentarios {\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/mode_comment.svg") + ");\r\n  background-repeat: no-repeat;\r\n  background-size: 14px 14px;\r\n  background-position: left center;\r\n  padding-left: 16px;\r\n  margin: 0 2px;\r\n\r\n}\r\n\r\n.elemento .infoEl .anexos {\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/attach_file.svg") + ");\r\n  background-repeat: no-repeat;\r\n  background-size: 14px 14px;\r\n  background-position: left center;\r\n  padding-left: 16px;\r\n  margin: 0 2px;\r\n}\r\n\r\n.elemento .infoMembers {\r\n  width: 100%;\r\n  /*height: 32px;*/\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  -webkit-box-orient: horizontal;\r\n  -webkit-box-direction: reverse;\r\n      -ms-flex-direction: row-reverse;\r\n          flex-direction: row-reverse;\r\n  line-height: 32px;\r\n  overflow: hidden;\r\n}\r\n\r\n.elemento .infoMembers .img {\r\n  width: 32px;\r\n  height: 32px;\r\n  border-radius: 50%;\r\n  /*margin-right: 8px;*/\r\n  background-size: cover;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  background-color: #9E9E9E;\r\n  line-height: 32px;\r\n  text-align: center;\r\n  font-family: 'Roboto';\r\n  font-size: 14px;\r\n  color: #FFFFFF;\r\n  cursor: pointer;\r\n  margin: 8px 4px;\r\n}\r\n\r\n.elemento .infoMembers .more {\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/more_vert.svg") + ");\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n  background-size: 24px;\r\n  background-color: transparent;\r\n}\r\n\r\n.elemento .editElemento {\r\n  float: right;\r\n  width: 30px;\r\n  height: 30px;\r\n  overflow: hidden;\r\n  cursor: pointer;\r\n  /*background-color: transparent;*/\r\n  border-radius: 2px;\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/edit.svg") + ");\r\n  background-position: center;\r\n  background-size: 16px;\r\n  background-repeat: no-repeat;\r\n  /*display: none;*/\r\n  opacity: 0;\r\n  transition: All ease 180ms;\r\n  position: absolute;\r\n  top: 2px;\r\n  right: 2px;\r\n}\r\n\r\n.elemento .editElemento img {\r\n  float: left;\r\n}\r\n\r\n.elemento:hover > .editElemento {\r\n  /*display: block;*/\r\n  opacity: 1;\r\n}\r\n\r\n.addElemento {\r\n  width: 100%;\r\n  height: auto;\r\n  padding: 5px 0px;\r\n  /*text-align: center;*/\r\n  box-sizing: border-box;\r\n  color: rgba(0, 0, 0, .65);\r\n  cursor: pointer;\r\n}\r\n\r\n.addElemento .addEl {\r\n  width: 100%;\r\n  text-align: center;\r\n  height: 35px;\r\n  line-height: 35px;\r\n}\r\n\r\n.addElemento .addInfoEl {\r\n  width: 90%;\r\n  margin-left: 5%;\r\n  margin-top: 8px;\r\n  height: 110px;\r\n  padding: 20px 20px;\r\n  box-sizing: border-box;\r\n  background-color: #FAFAFA;\r\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14), 0 4px 5px 0 rgba(0, 0, 0, 0.12), 0 1px 10px 0 rgba(0, 0, 0, 0.20);\r\n}\r\n\r\n.addBloco {\r\n  line-height: 40px;\r\n  text-align: center;\r\n  border: none;\r\n  font-size: 14px;\r\n  color: rgba(0, 0, 0, .42);\r\n  margin-top: 0px;\r\n  cursor: pointer;\r\n  height: 40px;\r\n  padding: 0;\r\n  box-shadow: none;\r\n  margin: 0;\r\n  width: 100%;\r\n  background-color: transparent;\r\n}\r\n\r\n.addBlocoInfo {\r\n  background-color: #FAFAFA;\r\n  height: 80px;\r\n  padding: 0 16px;\r\n  margin: 0px 0 0 0;\r\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14), 0 4px 5px 0 rgba(0, 0, 0, 0.12), 0 1px 10px 0 rgba(0, 0, 0, 0.20);\r\n\r\n}\r\n\r\n/deep/ .sombra {\r\n  width: 90%;\r\n  margin-left: 5%;\r\n  height: 60px;\r\n  background-color: #CCC;\r\n  border-radius: 4px;\r\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14),\r\n  0 4px 5px 0 rgba(0, 0, 0, 0.12),\r\n  0 1px 10px 0 rgba(0, 0, 0, 0.20);\r\n  margin-top: 5px;\r\n  cursor: move;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  -webkit-tap-highlight-color: rgba(0,0,0,0);\r\n}\r\n\r\n.addFloating {\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/add.svg") + ");\r\n}\r\n\r\n.menuBloco {\r\n  position: absolute;\r\n  background-color: #FAFAFA;\r\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14), 0 4px 5px 0 rgba(0, 0, 0, 0.12), 0 1px 10px 0 rgba(0, 0, 0, 0.20);\r\n  z-index: 24;\r\n  width: 20vw;\r\n  top: 5px;\r\n  right: 5px;\r\n}\r\n\r\n.menuBloco ul {\r\n  list-style: none;\r\n}\r\n\r\n@media screen and (max-width: 480px) {\r\n  .projeto {\r\n    min-height: 60px;\r\n  }\r\n\r\n  .projeto .img {\r\n    width: 50px;\r\n    height: 50px;\r\n    line-height: 50px;\r\n    font-size: 28px;\r\n  }\r\n\r\n  .projeto h1 {\r\n    margin-left: 15px;\r\n    margin-top: 25px;\r\n    color: #444444;\r\n    cursor: pointer;\r\n    font-family: \"Roboto\";\r\n    font-weight: 500;\r\n    font-size: 18px;\r\n  }\r\n\r\n  .caixa {\r\n    /*min-width: 200px;*/\r\n    min-width: 90vw;\r\n    max-width: 90vw;\r\n  }\r\n\r\n  .caixa header {\r\n    width: auto;\r\n    /*min-width: 140px;*/\r\n    font-size: 12px;\r\n    /*overflow: hidden;*/\r\n  }\r\n\r\n  .caixa .body {\r\n    width: calc(100%);\r\n  }\r\n\r\n  .menuBloco {\r\n    width: 90vw;\r\n  }\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/drag-drop/drag-drop.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"container\" #container>\r\n  <div id=\"dragDrop\" #dragDrop>\r\n\r\n    <section class=\"caixa\" *ngFor=\"let caixas of dragDropService.blocks; let i = index\" data-id=\"{{caixas.idblock}}\">\r\n      <header>\r\n        <input type=\"text\" class=\"nome\" [value]=\"caixas.nameblock\" (blur)=\"dragDropService.changeBlock($event)\">\r\n        <!--<div class=\"more_horiz\" (click)=\"dragDropService.ativaMenuBloco(caixas.idblock)\"></div>-->\r\n        <div class=\"delete\" (mousedown)=\"dragDropService.deletarBloco(caixas.idblock)\"><i class=\"material-icons\">delete</i></div>\r\n\r\n        <!--<div [hidden]=\"!dragDropService.menuBloco || caixas.idblock != dragDropService.referenciaMenuBloco \"-->\r\n             <!--class=\"menuBloco\">-->\r\n          <!--<ul>-->\r\n            <!--<li (click)=\"dragDropService.teste()\">Alterar Bloco</li>-->\r\n            <!--<li \">Excluir Bloco</li>-->\r\n          <!--</ul>-->\r\n        <!--</div>-->\r\n      </header>\r\n      <section class=\"body\">\r\n        <article class=\"elemento\" *ngFor=\"let elementos of dragDropService.blocks[i].tasks; let e = index\" data-id=\"{{elementos.id_task}}\">\r\n          <span class=\"nome\">\r\n            {{ elementos.name_task }}\r\n          </span>\r\n          <section class=\"infoEl\">\r\n              <span class=\"prazo\" *ngIf=\"elementos.final_date\">\r\n                {{ elementos.final_date | date: 'dd/MM/yyyy' }}\r\n              </span>\r\n              <span class=\"comentarios\" *ngIf=\"elementos.comments\">\r\n                {{ elementos.comments }}\r\n              </span>\r\n              <span class=\"anexos\" *ngIf=\"elementos.attachments\">\r\n                {{ elementos.attachments }}\r\n              </span>\r\n          </section>\r\n          <!--<section class=\"infoMembers\">-->\r\n          <section class=\"infoMembers\" >\r\n            <!--profile_img: \"/imgsUser/picture_25.png\"-->\r\n            <section class=\"img more\" *ngIf=\"dragDropService.blocks[i].tasks[e].teamtask.length > 3\"></section>\r\n            <section class=\"membro\" *ngFor=\"let membrosDaTarefa of dragDropService.blocks[i].tasks[e].teamtask; let indexTeam = index\">\r\n              <section class=\"img\" *ngIf=\"membrosDaTarefa.profile_img == '/imgsUser/default.png' && indexTeam < 3\">{{ membrosDaTarefa.name.charAt(0) | uppercase }}</section>\r\n              <section *ngIf=\"membrosDaTarefa.profile_img != '/imgsUser/default.png'\" [style.background-image]=\"'url('+ 'http://' + core.ipDaApi + membrosDaTarefa.profile_img +')'\" class=\"img\"></section>\r\n            </section>\r\n\r\n            <!--<section class=\"img\" *ngIf=\"elementos.profile_img == '/imgsUser/default.png'\">{{ elementos.name.charAt(0) | uppercase }}</section>-->\r\n            <!--<section *ngIf=\"elementos.profile_img != '/imgsUser/default.png'\" [style.background-image]=\"'url('+ 'http://' + core.ipDaApi + elementos.profile_img +')'\" class=\"img\"></section>-->\r\n          </section>\r\n\r\n          <div class=\"editElemento\" (click)=\"dragDropService.onOptionsTasks(elementos.id_task)\">\r\n          </div>\r\n        </article>\r\n        <article class=\"addElemento\">\r\n          <div [hidden]=\"dragDropService.addElemento && dragDropService.idBlock == caixas.idblock\" class=\"addEl\"\r\n               (click)=\"dragDropService.onAddElemento($event, caixas.idblock)\">Adicionar Elemento\r\n          </div>\r\n          <section [hidden]=\"!dragDropService.addElemento || dragDropService.idBlock != caixas.idblock\"\r\n                   class=\"addInfoEl\">\r\n            <div style='position: relative;'>\r\n              <input type='text' class='textFields' [(ngModel)]=\"dragDropService.nomeTarefa\"\r\n                     (keyup.enter)=\"addTarefa()\">\r\n              <label class='labelText'>Nome</label>\r\n              <div class='border'></div>\r\n            </div>\r\n            <div style=\"margin-top: 40px;\">\r\n              <img class=\"float-right\" (click)=\"addTarefa()\" src=\"../../assets/done.svg\">\r\n              <img class=\"float-right\" (click)=\"fechaAddElemento()\" src=\"../../assets/clear.svg\">\r\n            </div>\r\n          </section>\r\n        </article>\r\n      </section>\r\n    </section>\r\n\r\n    <!-- Adicionar Novas Caixas -->\r\n    <section class=\"caixa\">\r\n      <article [hidden]=\"!!dragDropService.situacaoAddBloco\" class=\"addBloco\"\r\n               (click)=\"dragDropService.onAddBloco($event)\">\r\n        Adicionar Caixa\r\n      </article>\r\n      <section [hidden]=\"!dragDropService.situacaoAddBloco\" class=\"addBlocoInfo\">\r\n        <div style='position: relative;'>\r\n          <input type='text' class='textFields' [(ngModel)]=\"dragDropService.nomeAddBloco\" #nomeBloco\r\n                 (keyup.enter)=\"dragDropService.addBloco()\">\r\n          <div class='border'></div>\r\n        </div>\r\n\r\n        <div style=\"float: left; width: 100%; margin-top: 45px;\">\r\n          <img class=\"float-right\" (click)=\"dragDropService.addBloco()()\" src=\"../../assets/done.svg\">\r\n          <img class=\"float-right\" (click)=\"dragDropService.offAddBloco(null)\" src=\"../../assets/clear.svg\">\r\n        </div>\r\n\r\n      </section>\r\n\r\n    </section>\r\n  </div>\r\n</section>\r\n<!--<button class=\"floatingButton\">-->\r\n  <!--<i class=\"material-icons\">add</i>-->\r\n<!--</button>-->\r\n<app-options-tasks *ngIf=\"dragDropService.optionsTasks\"></app-options-tasks>\r\n"

/***/ }),

/***/ "../../../../../src/app/drag-drop/drag-drop.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__projects_projects_service_service__ = __webpack_require__("../../../../../src/app/projects/projects-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drag_drop_service__ = __webpack_require__("../../../../../src/app/drag-drop/drag-drop.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_core_service__ = __webpack_require__("../../../../../src/app/Services/core.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DragDropComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DragDropComponent = (function () {
    function DragDropComponent(projects, route, dragDropService, projectsService, core) {
        this.projects = projects;
        this.route = route;
        this.dragDropService = dragDropService;
        this.projectsService = projectsService;
        this.core = core;
    }
    DragDropComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dragDropService.onInitSocket();
        // this.socket.connect();
        window.addEventListener('resize', function () {
            _this.dragDropService.setTamanhos();
        });
        this.dragDropService.idProjeto = this.route.snapshot.params['id'];
        this.projects.viewDetailProject(this.dragDropService.idProjeto);
        this.projects.searchBlocks(this.dragDropService.idProjeto)
            .subscribe(function (res) {
            // console.log(res);
            _this.dragDropService.blocks = res;
        }, function (error) {
            // console.log(error);
        }, function () {
            _this.dragDropService.container = _this.container;
            _this.dragDropService.inputNomeBloco = _this.nomeBloco;
            _this.dragDropService.dragDrop = _this.dragDrop;
            _this.dragDropService.listenerInit();
            /* ADD BLOCOS */
            document.addEventListener('mousedown', function (event) {
                _this.dragDropService.offPopupAddElementos(event);
                _this.dragDropService.offAddBloco(event);
                _this.dragDropService.desativaMenuBloco(event);
            });
            /* ADD ELEMENTOS */
        });
    };
    DragDropComponent.prototype.addTarefa = function () {
        this.dragDropService.addTarefa();
    };
    DragDropComponent.prototype.fechaAddElemento = function () {
        this.dragDropService.addElemento = false;
        this.dragDropService.idBlock = null;
    };
    return DragDropComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('container'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object)
], DragDropComponent.prototype, "container", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('nomeBloco'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _b || Object)
], DragDropComponent.prototype, "nomeBloco", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('dragDrop'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _c || Object)
], DragDropComponent.prototype, "dragDrop", void 0);
DragDropComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-drag-drop',
        template: __webpack_require__("../../../../../src/app/drag-drop/drag-drop.component.html"),
        styles: [__webpack_require__("../../../../../src/app/drag-drop/drag-drop.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__projects_projects_service_service__["a" /* ProjectsServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__projects_projects_service_service__["a" /* ProjectsServiceService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__drag_drop_service__["a" /* DragDropService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__drag_drop_service__["a" /* DragDropService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__projects_projects_service_service__["a" /* ProjectsServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__projects_projects_service_service__["a" /* ProjectsServiceService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4__Services_core_service__["a" /* CoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_core_service__["a" /* CoreService */]) === "function" && _h || Object])
], DragDropComponent);

var _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=drag-drop.component.js.map

/***/ }),

/***/ "../../../../../src/app/drag-drop/drag-drop.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drag_drop_component__ = __webpack_require__("../../../../../src/app/drag-drop/drag-drop.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_menu_menu_module__ = __webpack_require__("../../../../../src/app/components/menu/menu.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__drag_drop_service__ = __webpack_require__("../../../../../src/app/drag-drop/drag-drop.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__options_tasks_options_tasks_component__ = __webpack_require__("../../../../../src/app/drag-drop/options-tasks/options-tasks.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pesquisa_de_membros_do_projeto_pipe__ = __webpack_require__("../../../../../src/app/drag-drop/pesquisa-de-membros-do-projeto.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_arrow_back_arrow_back_module__ = __webpack_require__("../../../../../src/app/components/arrow-back/arrow-back.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DragDropModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var DragDropModule = (function () {
    function DragDropModule() {
    }
    return DragDropModule;
}());
DragDropModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["k" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__components_menu_menu_module__["a" /* MenuModule */],
            __WEBPACK_IMPORTED_MODULE_8__components_arrow_back_arrow_back_module__["a" /* ArrowBackModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__drag_drop_service__["a" /* DragDropService */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__drag_drop_component__["a" /* DragDropComponent */],
            __WEBPACK_IMPORTED_MODULE_6__options_tasks_options_tasks_component__["a" /* OptionsTasksComponent */],
            __WEBPACK_IMPORTED_MODULE_7__pesquisa_de_membros_do_projeto_pipe__["a" /* PesquisaDeMembrosDoProjetoPipe */]
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_2__drag_drop_component__["a" /* DragDropComponent */]]
    })
], DragDropModule);

//# sourceMappingURL=drag-drop.module.js.map

/***/ }),

/***/ "../../../../../src/app/drag-drop/drag-drop.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_core_service__ = __webpack_require__("../../../../../src/app/Services/core.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_dados_de_usuario_service__ = __webpack_require__("../../../../../src/app/Services/dados-de-usuario.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_socket_io__ = __webpack_require__("../../../../ng-socket-io/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__projects_projects_service_service__ = __webpack_require__("../../../../../src/app/projects/projects-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_snackbars_snackbars_service__ = __webpack_require__("../../../../../src/app/components/snackbars/snackbars.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__notification_notification_service__ = __webpack_require__("../../../../../src/app/notification/notification.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DragDropService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var DragDropService = (function () {
    function DragDropService(core, usuarioService, http, socket, projects, snackbar, notificationService) {
        this.core = core;
        this.usuarioService = usuarioService;
        this.http = http;
        this.socket = socket;
        this.projects = projects;
        this.snackbar = snackbar;
        this.notificationService = notificationService;
        this.situacaoAddBloco = false;
        this.menuBloco = false;
    }
    // INICIO DRAGDROP
    DragDropService.prototype.listenerInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.setTamanhos();
            var self = _this;
            _this.Down = function (e) {
                self.getPosInicial(e);
            };
            _this.Move = function (e) {
                self.getMouseMove(e);
            };
            _this.Up = function (e) {
                self.getPosFinal(e);
            };
            var elemento = document.querySelectorAll('.elemento');
            for (var i = 0; i < elemento.length; i++) {
                elemento[i].addEventListener('mousedown', _this.Down);
                elemento[i].addEventListener('touchstart', _this.Down);
            }
            document.addEventListener('mousemove', _this.Move);
            document.addEventListener('mouseup', _this.Up);
            document.addEventListener('touchmove', _this.Move);
            document.addEventListener('touchend', _this.Up);
        }, 100);
    };
    DragDropService.prototype.setTamanhos = function () {
        this.sizes = {
            widthCaixa: document.querySelectorAll('.caixa') && document.querySelectorAll('.caixa').length > 0 ? document.querySelectorAll('.caixa')[0].clientWidth : 0,
            widthDragdrop: document.querySelector('#dragDrop').clientWidth,
            heightDragdrop: document.querySelector('#dragDrop').clientHeight
        };
    };
    DragDropService.prototype.getPosInicial = function (event) {
        var _this = this;
        if (event.button === 0 || event.touches) {
            if (event.target.className === 'elemento') {
                this.bloco = event.target;
                this.caixa = event.target.parentNode;
            }
            else if (event.target.parentNode.className === 'elemento') {
                this.bloco = event.target.parentNode;
                this.caixa = event.target.parentNode.parentNode;
            }
            else {
                this.reset();
            }
            this.scrollMove = {
                X: 0,
                Y: 0
            };
            this.longClickInterval = setTimeout(function () {
                _this.started = true;
                _this.posInicial = {
                    X: (event.clientX || event.changedTouches['0'].clientX) + _this.getScrollX(),
                    Y: (event.clientY || event.changedTouches['0'].clientY) + _this.getScrollY()
                };
                if (_this.bloco) {
                    _this.posicaoBloco = {
                        X: _this.bloco.getBoundingClientRect().left,
                        Y: _this.bloco.getBoundingClientRect().top
                    };
                    // GERANDO A SOMBRA
                    _this.sombra = document.createElement('article');
                    _this.sombra.className = 'sombra';
                    _this.sombra.setAttribute('_ngcontent-c4', '');
                    _this.sombra.setAttribute('style', 'height:' + _this.bloco.offsetHeight + 'px');
                }
            }, 300);
        }
    };
    DragDropService.prototype.getMouseMove = function (event) {
        if (this.started) {
            // event.preventDefault();
            this.disableScroll();
            try {
                this.currentPosition = {
                    XS: (event.clientX || event.changedTouches['0']) && (event.clientX || event.changedTouches['0'].clientX) + this.getScrollX(),
                    YS: (event.clientY || event.changedTouches['0']) && (event.clientY || event.changedTouches['0'].clientY) + this.getScrollY(),
                    X: (event.clientX || event.changedTouches['0'].clientX),
                    Y: (event.clientY || event.changedTouches['0'].clientY)
                };
            }
            catch (e) {
                throw 'DEU RUIM';
            }
            this.doScroll(false);
            this.doScroll(true);
            this.diferenca = {
                XSM: (this.currentPosition['XS'] - this.posInicial['X']) - this.scrollMove['X'],
                YSM: (this.currentPosition['YS'] - this.posInicial['Y']) - this.scrollMove['Y'],
                X: (this.currentPosition['XS'] - this.posInicial['X']),
                Y: (this.currentPosition['YS'] - this.posInicial['Y'])
            };
            this.positionBlocoMove = {
                X: this.bloco.getBoundingClientRect().left,
                Y: this.bloco.getBoundingClientRect().top
            };
            this.bloco.style.opacity = '0.7';
            this.bloco.style.position = 'fixed';
            this.bloco.style.zIndex = '24';
            this.bloco.style.width = (this.sizes['widthCaixa'] * 0.9) + 'px';
            this.bloco.style.margin = 0;
            this.bloco.style.left = this.posicaoBloco['X'] + 'px';
            this.bloco.style.top = this.posicaoBloco['Y'] + 'px';
            this.bloco.style.transform = 'translate(' + (this.diferenca['XSM']) + 'px, ' + (this.diferenca['Y']) + 'px) rotate(7deg)';
            if (this.caixaDestino()) {
                if (this.pegaLocalNaOrdem(event)) {
                    this.caixaDestino().insertBefore(this.sombra, this.pegaLocalNaOrdem(event));
                }
                else {
                    this.caixaDestino().insertBefore(this.sombra, this.caixaDestino().querySelector('.addElemento'));
                }
            }
            this.mouseStart = true;
        }
    };
    DragDropService.prototype.getPosFinal = function (event) {
        if (event.button === 0 || event.touches) {
            clearTimeout(this.longClickInterval);
            if (!this.started && this.bloco) {
                this.onOptionsTasks(this.bloco.id);
            }
            if (this.mouseStart) {
                this.caixa.removeChild(this.bloco);
                if (this.pegaLocalNaOrdem(event)) {
                    this.caixaDestino().insertBefore(this.bloco, this.pegaLocalNaOrdem(event));
                }
                else {
                    this.caixaDestino().insertBefore(this.bloco, this.caixaDestino().querySelector('.addElemento'));
                }
                this.caixaDestino().removeChild(this.sombra);
                this.bloco.style = '';
                var previous = [];
                var current = [];
                for (var i = 0; i < this.caixa.querySelectorAll('.elemento').length; i++) {
                    previous.push(parseInt(this.caixa.querySelectorAll('.elemento')[i].id));
                }
                for (var i = 0; i < this.caixaDestino().querySelectorAll('.elemento').length; i++) {
                    current.push(parseInt(this.caixaDestino().querySelectorAll('.elemento')[i].id));
                }
                this.changePositions(previous, current, this.bloco.id, this.caixaDestino().parentNode.id);
            }
            clearInterval(this.intervalPrev);
            clearInterval(this.intervalNext);
            this.reset();
        }
    };
    DragDropService.prototype.getScrollX = function () {
        var scroll = document.querySelector('#dragDrop').scrollLeft;
        return scroll;
    };
    DragDropService.prototype.getScrollY = function () {
        var scroll = document.querySelector('#dragDrop').scrollTop;
        return scroll;
    };
    // doScroll(parm) {
    //   // TRUE is vertical || FALSE is horizontal
    //   clearInterval(this.intervalNext);
    //   clearInterval(this.intervalPrev);
    //   if (this.started) {
    //     if (parm) {
    //       const areaDeScroll = this.sizes['heightDragdrop'] * 0.1;
    //       if (this.currentPosition['Y'] > this.sizes['heightDragdrop'] - areaDeScroll &&
    //         this.caixaDestino().scrollTop < this.caixaDestino().scrollHeight - this.caixaDestino().clientHeight) {
    //         this.caixaDestino().scrollBy(0, 5);
    //         this.scrollMove['Y'] += 5;
    //         clearInterval(this.intervalPrev);
    //         this.intervalNext = setInterval(() => {
    //           this.caixaDestino().scrollBy(0, 5);
    //           this.scrollMove['Y'] += 5;
    //           if (this.caixaDestino().scrollTop >= this.caixaDestino().scrollHeight - this.caixaDestino().clientHeight) {
    //             clearInterval(this.intervalNext);
    //           }
    //         }, 35);
    //       } else if (this.areaDeScroll > this.currentPosition['Y'] && this.caixaDestino().scrollTop > 5) {
    //         this.caixaDestino().scrollBy(0, -5);
    //         this.scrollMove['Y'] -= 5;
    //         clearInterval(this.intervalNext);
    //         this.intervalPrev = setInterval(() => {
    //           this.caixaDestino().scrollBy(0, -5);
    //           this.scrollMove['Y'] -= 5;
    //           if (this.getScrollX() <= 0) {
    //             clearInterval(this.intervalPrev);
    //           }
    //         }, 35);
    //       }
    //
    //     } else {
    //       this.areaDeScroll = this.sizes['widthDragdrop'] * 0.1;
    //       const dragdrop = <any>this.dragDrop.nativeElement;
    //       if (this.currentPosition['X'] > this.sizes['widthDragdrop'] - this.areaDeScroll &&
    //         this.getScrollX() < dragdrop.scrollWidth - dragdrop.clientWidth) {
    //         dragdrop.scrollBy(5, 0);
    //         this.scrollMove['X'] += 5;
    //         clearInterval(this.intervalPrev);
    //         this.intervalNext = setInterval(() => {
    //           dragdrop.scrollBy(5, 0);
    //           this.scrollMove['X'] += 5;
    //           if (this.getScrollX() >= dragdrop.scrollWidth - dragdrop.clientWidth) {
    //             clearInterval(this.intervalNext);
    //           }
    //         }, 35);
    //       } else if (this.areaDeScroll > this.currentPosition['X'] && this.getScrollX() > 5) {
    //         dragdrop.scrollBy(-5, 0);
    //         this.scrollMove['X'] -= 5;
    //         clearInterval(this.intervalNext);
    //         this.intervalPrev = setInterval(() => {
    //           dragdrop.scrollBy(-5, 0);
    //           this.scrollMove['X'] -= 5;
    //           if (this.getScrollX() <= 0) {
    //             clearInterval(this.intervalPrev);
    //           }
    //         }, 35);
    //       }
    //     }
    //   }
    // }
    DragDropService.prototype.doScroll = function (parm) {
        var _this = this;
        if (this.started) {
            this.currentPosition;
            var dragdrop_1 = this.dragDrop.nativeElement;
            var sizeScrollX_1 = this.sizes['widthDragdrop'] * 0.10;
            var sizeScrollY_1 = dragdrop_1.querySelector('.caixa').getBoundingClientRect().height * 0.10;
            if (parm) {
                if (this.currentPosition['X'] < sizeScrollX_1 && this.getScrollX() > 5) {
                    if (!this.roll) {
                        this.roll = true;
                        this.intervalScroll = setInterval(function () {
                            dragdrop_1.scrollBy(-5, 0);
                            _this.scrollMove['X'] -= 5;
                            if (_this.currentPosition['X'] >= sizeScrollX_1) {
                                clearInterval(_this.intervalScroll);
                                _this.roll = false;
                            }
                        }, 20);
                    }
                }
                else if (this.currentPosition['X'] > this.sizes['widthDragdrop'] - sizeScrollX_1 &&
                    this.getScrollX() < dragdrop_1.scrollWidth - dragdrop_1.clientWidth) {
                    if (!this.roll) {
                        this.roll = true;
                        this.intervalScroll = setInterval(function () {
                            dragdrop_1.scrollBy(5, 0);
                            _this.scrollMove['X'] += 5;
                            if (_this.currentPosition['X'] <= _this.sizes['widthDragdrop'] - sizeScrollX_1) {
                                clearInterval(_this.intervalScroll);
                                _this.roll = false;
                            }
                        }, 20);
                    }
                }
            }
            else {
                var top_1 = dragdrop_1.querySelector('.caixa').getBoundingClientRect().top;
                var height_1 = dragdrop_1.querySelector('.caixa').getBoundingClientRect().height;
                // const div = document.createElement('div');
                // div.setAttribute('style', 'position:fixed; top:' + height + 'px; right: 0; background-color: #F00; height: ' + sizeScrollY + 'px; width: 100%;');
                // const drag = document.querySelector('#dragDrop');
                // drag.appendChild(div);
                if (this.currentPosition['Y'] > top_1 && this.currentPosition['Y'] < top_1 + sizeScrollY_1 &&
                    this.caixaDestino() && this.caixaDestino().scrollTop > 5) {
                    if (!this.roll) {
                        this.roll = true;
                        this.intervalScroll = setInterval(function () {
                            _this.caixaDestino().scrollBy(0, -5);
                            _this.scrollMove['Y'] -= 5;
                            if (_this.currentPosition['Y'] < top_1 || _this.currentPosition['Y'] > top_1 + sizeScrollY_1) {
                                clearInterval(_this.intervalScroll);
                                _this.roll = false;
                            }
                        }, 30);
                    }
                }
                else if (this.currentPosition['Y'] > height_1 && this.currentPosition['Y'] < height_1 + sizeScrollY_1) {
                    if (!this.roll) {
                        this.roll = true;
                        this.intervalScroll = setInterval(function () {
                            _this.caixaDestino().scrollBy(0, 5);
                            _this.scrollMove['Y'] += 5;
                            if (_this.currentPosition['Y'] < height_1 || _this.currentPosition['Y'] > height_1 + sizeScrollY_1) {
                                clearInterval(_this.intervalScroll);
                                _this.roll = false;
                            }
                        }, 30);
                    }
                }
            }
        }
    };
    DragDropService.prototype.pegaLocalNaOrdem = function (event) {
        if (this.caixaDestino()) {
            var els = this.caixaDestino().querySelectorAll('.elemento');
            var verificacao = false;
            var local = null;
            for (var i = 0; i < els.length; i++) {
                var posicaoEl = els[i].getBoundingClientRect().top;
                if (this.positionBlocoMove['Y'] < posicaoEl && this.bloco !== els[i]) {
                    if (verificacao === false) {
                        verificacao = true;
                        local = els[i];
                    }
                }
            }
            if (els && els.length === 0) {
                local = null;
            }
            return local;
        }
    };
    DragDropService.prototype.caixaDestino = function () {
        if (this.diferenca) {
            if (this.diferenca['X'] && this.diferenca['X'] > this.sizes['widthCaixa']) {
                var quantidadeDeIrmaos = Math.floor(this.diferenca['X'] / this.sizes['widthCaixa']);
                this.cxDestino = this.caixa.parentNode.nextElementSibling.querySelector('.body');
                for (var i = 1; i < quantidadeDeIrmaos; i++) {
                    if (this.cxDestino) {
                        this.cxDestino = this.cxDestino.parentNode.nextElementSibling.querySelector('.body');
                    }
                }
                if (!this.cxDestino) {
                    this.cxDestino = this.dragDrop.nativeElement.querySelectorAll('.body')[this.dragDrop.nativeElement.querySelectorAll('.body').length - 1];
                }
            }
            else if (this.diferenca['X'] && this.diferenca['X'] < -this.sizes['widthCaixa']) {
                var quantidadeDeIrmaos = Math.floor(this.diferenca['X'] / -this.sizes['widthCaixa']);
                this.cxDestino = this.caixa.parentNode.previousElementSibling.querySelector('.body');
                for (var i = 1; i < quantidadeDeIrmaos; i++) {
                    this.cxDestino = this.cxDestino.parentNode.previousElementSibling.querySelector('.body');
                }
                if (!this.cxDestino) {
                    this.cxDestino = this.dragDrop.nativeElement.querySelectorAll('.body')[this.dragDrop.nativeElement.querySelectorAll('.body').length - 1];
                }
            }
            else {
                this.cxDestino = this.caixa;
            }
            return this.cxDestino;
        }
    };
    DragDropService.prototype.reset = function () {
        if (this.posInicial) {
            this.posInicial['X'] = 0;
            this.posInicial['Y'] = 0;
        }
        if (this.posicaoBloco) {
            this.posicaoBloco['X'] = 0;
            this.posicaoBloco['Y'] = 0;
        }
        this.posFinalX = 0;
        this.posFinalY = 0;
        this.bloco = null;
        this.caixa = null;
        this.diferencaX = 0;
        this.diferencaY = 0;
        this.sombra = null;
        this.mouseStart = false;
        this.started = false;
        this.newListener();
        this.roll = false;
        try {
            this.scrollMove['X'] = 0;
            this.scrollMove['Y'] = 0;
        }
        catch (e) {
        }
        try {
            this.diferenca['X'] = 0;
            this.diferenca['Y'] = 0;
        }
        catch (e) {
        }
        clearInterval(this.intervalScroll);
        this.enableScroll();
    };
    DragDropService.prototype.newListener = function () {
        var elemento = document.querySelectorAll('.elemento');
        for (var i = 0; i < elemento.length; i++) {
            elemento[i].removeEventListener('mousedown', this.Down, false);
            elemento[i].removeEventListener('touchstart', this.Down, false);
        }
        for (var i = 0; i < elemento.length; i++) {
            elemento[i].addEventListener('mousedown', this.Down);
            elemento[i].addEventListener('touchstart', this.Down);
        }
    };
    DragDropService.prototype.disableScroll = function () {
        if (window.addEventListener) {
            window.addEventListener('DOMMouseScroll', this.preventDefault, false);
        }
        window.onwheel = this.preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
        window.ontouchmove = this.preventDefault; // mobile
        document.onkeydown = this.preventDefaultForScrollKeys;
    };
    DragDropService.prototype.preventDefault = function (e) {
        e = e || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.returnValue = false;
    };
    DragDropService.prototype.preventDefaultForScrollKeys = function (e) {
        var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
        if (keys[e.keyCode]) {
            this.preventDefault(e);
            return false;
        }
    };
    DragDropService.prototype.enableScroll = function () {
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
        }
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    };
    // FIM DRAGDROP
    DragDropService.prototype.teste = function () {
        // alert('A');
    };
    DragDropService.prototype.onAddElemento = function (event, idBlock) {
        this.addElemento = true;
        this.idBlock = idBlock;
        this.addInfoEl = event.target.parentNode;
        setTimeout(function () {
            event.target.parentNode.querySelector('input').focus();
        }, 50);
    };
    DragDropService.prototype.offPopupAddElementos = function (event) {
        if (this.addInfoEl != event.target.parentNode.parentNode.parentNode) {
            this.addElemento = false;
            this.idBlock = null;
        }
    };
    DragDropService.prototype.onAddBloco = function (event) {
        var _this = this;
        this.situacaoAddBloco = true;
        /* NÂO FUNCIONA SEM O TIMEOUT*/
        setTimeout(function () {
            _this.inputNomeBloco.nativeElement.focus();
        }, 50);
        var drag = document.querySelector('#dragDrop');
        drag.scrollBy(drag.scrollWidth - drag.getBoundingClientRect().width, 0);
    };
    DragDropService.prototype.offAddBloco = function (event) {
        if (event == null) {
            this.situacaoAddBloco = false;
            return;
        }
        else if (event.target.className != 'addBlocoInfo' && event.target.parentNode.className != 'addBlocoInfo' && event.target.parentNode.parentNode.className != 'addBlocoInfo') {
            this.situacaoAddBloco = false;
        }
    };
    DragDropService.prototype.addBloco = function () {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/blocks/' + this.idProjeto;
        var json = JSON.stringify({
            nameBlock: this.nomeAddBloco,
        });
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
        return this.http.post(url, params, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            // BUSCA OS BLOCOS NOVAMENTE
            _this.projects.searchBlocks(_this.idProjeto)
                .subscribe(function (res) {
                _this.blocks = res;
                _this.situacaoAddBloco = false;
                _this.nomeAddBloco = '';
                _this.socket.emit('changeTask', {
                    idProject: _this.idProjeto
                });
                _this.snackbar.inserirSnackbar('Bloco adicionada com sucesso!');
                _this.notificationService.searchNotification();
            }, function (error) {
                console.error(error);
            });
        }, function (error) {
        });
    };
    DragDropService.prototype.changeBlock = function (event) {
        var _this = this;
        var idBlock = event.target.parentNode.parentNode.id;
        var name = event.target.value;
        var url = 'http://' + this.core.ipDaApi + '/blocks/' + idBlock;
        var json = JSON.stringify({
            newName: name,
        });
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
        return this.http.put(url, params, { headers: headers })
            .subscribe(function (res) {
            _this.socket.emit('changeTask', {
                idProject: _this.idProjeto
            });
            _this.snackbar.inserirSnackbar('Bloco alterado com sucesso!');
            _this.notificationService.searchNotification();
        }, function (error) {
        });
    };
    DragDropService.prototype.addTarefa = function () {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/blocks/task/' + this.idBlock;
        if (this.dataTarefa) {
            var date = this.dataTarefa.split('/');
            date = date[2] + '-' + date[1] + '-' + date[0];
            var json = JSON.stringify({
                nameTask: this.nomeTarefa,
                finalDate: date
            });
        }
        else {
            var json = JSON.stringify({
                nameTask: this.nomeTarefa,
                finalDate: null
            });
        }
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.usuarioService.getCookieTokken());
        return this.http.post(url, params, { headers: headers })
            .subscribe(function (res) {
            _this.addElemento = false;
            // BUSCA OS BLOCOS NOVAMENTE
            _this.projects.searchBlocks(_this.idProjeto)
                .subscribe(function (res) {
                _this.blocks = res;
                _this.nomeTarefa = '';
                _this.dataTarefa = '';
                _this.snackbar.inserirSnackbar('Tarefa adicionada com sucesso!');
                _this.notificationService.searchNotification();
                _this.socket.emit('changeTask', {
                    idProject: _this.idProjeto
                });
            }, function (error) {
                console.error(error);
            }, function () {
                _this.newListener();
            });
        }, function (error) {
            console.error(error);
        });
    };
    DragDropService.prototype.ativaMenuBloco = function (referencia) {
        this.menuBloco = true;
        this.referenciaMenuBloco = referencia;
    };
    DragDropService.prototype.desativaMenuBloco = function (event) {
        var _this = this;
        if (event.target.className != 'menuBloco' && event.target.parentNode.parentNode.className != 'menuBloco') {
            this.menuBloco = false;
            this.referenciaMenuBloco = '';
        }
        else {
            setTimeout(function () {
                _this.menuBloco = false;
                _this.referenciaMenuBloco = '';
            }, 50);
        }
    };
    DragDropService.prototype.deletarBloco = function (idblock) {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/blocks/' + idblock;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
        return this.http.delete(url, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.projects.searchBlocks(_this.idProjeto)
                .subscribe(function (res) {
                _this.blocks = res;
                _this.socket.emit('changeTask', {
                    idProject: _this.idProjeto
                });
                _this.snackbar.inserirSnackbar('Bloco deletado com sucesso!');
                _this.notificationService.searchNotification();
            }, function (error) {
            });
        }, function (error) {
        });
    };
    DragDropService.prototype.offOptionsTasks = function () {
        this.optionsTasks = false;
    };
    DragDropService.prototype.onOptionsTasks = function (idTasks) {
        var _this = this;
        this.optionsTasks = true;
        this.idTask = idTasks;
        this.getInfoOptionsTasks(idTasks)
            .subscribe(function (res) {
            _this.infoOptionTask = res;
        }, function (error) {
        }, function () {
            setTimeout(function () {
                var textarea = document.querySelectorAll('textarea');
                for (var i = 0; i < textarea.length; i++) {
                    _this.autoHeight(textarea[i]);
                }
            }, 50);
        });
    };
    DragDropService.prototype.getInfoOptionsTasks = function (idTasks) {
        var url = 'http://' + this.core.ipDaApi + '/blocks/task/' + idTasks;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
        return this.http.get(url, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DragDropService.prototype.newCommentTask = function () {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/task/comment/';
        var json = JSON.stringify({
            idTask: this.idTask,
            comment: this.addComment
        });
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
        return this.http.post(url, params, { headers: headers })
            .subscribe(function (res) {
            _this.getInfoOptionsTasks(_this.idTask)
                .subscribe(function (res) {
                _this.infoOptionTask = res;
                _this.projects.searchBlocks(_this.idProjeto)
                    .subscribe(function (res) {
                    _this.blocks = res;
                    _this.snackbar.inserirSnackbar('Comentario adicionado com sucesso!');
                    _this.notificationService.searchNotification();
                }, function (error) {
                });
                _this.socket.emit('changeTask', {
                    idProject: _this.idProjeto
                });
            }, function (error) {
            });
        }, function (error) {
        }, function () {
            _this.addComment = '';
            setTimeout(function () {
                var textarea = document.querySelectorAll('textarea');
                for (var i = 0; i < textarea.length; i++) {
                    _this.autoHeight(textarea[i]);
                }
            }, 50);
        });
    };
    DragDropService.prototype.delCommentTask = function (idComment) {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/task/comment/' + idComment;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
        return this.http.delete(url, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.addComment = '';
            _this.getInfoOptionsTasks(_this.idTask)
                .subscribe(function (res) {
                _this.infoOptionTask = res;
                _this.projects.searchBlocks(_this.idProjeto)
                    .subscribe(function (res) {
                    _this.blocks = res;
                    _this.snackbar.inserirSnackbar('Comentario deletado com sucesso!');
                    _this.notificationService.searchNotification();
                }, function (error) {
                });
                _this.socket.emit('changeTask', {
                    idProject: _this.idProjeto
                });
            }, function (error) {
            });
        }, function (error) {
        }, function () {
            setTimeout(function () {
                var textarea = document.querySelectorAll('textarea');
                for (var i = 0; i < textarea.length; i++) {
                    _this.autoHeight(textarea[i]);
                }
            }, 50);
        });
    };
    DragDropService.prototype.changeCommentTask = function (comment, idComent) {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/task/comment/' + idComent;
        var json = JSON.stringify({
            comment: comment,
        });
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
        return this.http.put(url, params, { headers: headers })
            .subscribe(function (res) {
            _this.socket.emit('changeTask', {
                idProject: _this.idProjeto
            });
            _this.snackbar.inserirSnackbar('Comentario alterado com sucesso!');
            _this.notificationService.searchNotification();
        }, function (error) {
        });
    };
    DragDropService.prototype.changeTask = function (nameTask, finalDate, description) {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/blocks/task/' + this.idTask;
        var json = JSON.stringify({
            nameTask: nameTask,
            finalDate: finalDate,
            description: description
        });
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
        return this.http.put(url, params, { headers: headers })
            .subscribe(function (res) {
            // console.log(res);
            _this.projects.searchBlocks(_this.idProjeto)
                .subscribe(function (res) {
                // console.log(res);
                _this.blocks = res;
                _this.snackbar.inserirSnackbar('Tarefa alterada com sucesso!');
                _this.notificationService.searchNotification();
            }, function (error) {
                // console.log(error);
            });
            _this.socket.emit('changeTask', {
                idProject: _this.idProjeto
            });
        }, function (error) {
            // console.log(error);
        });
    };
    DragDropService.prototype.changeSituationCheckbox = function (idCheck) {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/task/checklistStatus/' + idCheck;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
        return this.http.put(url, null, { headers: headers })
            .subscribe(function (res) {
            // console.log(res.json());
            _this.snackbar.inserirSnackbar('Checklist foi ' + res.json().result + ' com sucesso!');
            _this.notificationService.searchNotification();
        }, function (error) {
            // console.log(error);
        });
    };
    DragDropService.prototype.newChecklist = function (nome) {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/task/checklist/';
        var json = JSON.stringify({
            jsonChecklists: [
                {
                    namechecklist: nome,
                    idTask: this.idTask,
                    checked: false
                }
            ]
        });
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
        return this.http.post(url, params, { headers: headers })
            .subscribe(function (res) {
            // console.log(res);
            _this.getInfoOptionsTasks(_this.idTask)
                .subscribe(function (res) {
                // console.log(res);
                _this.infoOptionTask = res;
                _this.snackbar.inserirSnackbar('Checklist criada com sucesso!');
                _this.notificationService.searchNotification();
            }, function (error) {
            }, function () {
                _this.addNewChecklist = '';
            });
        }, function (error) {
            // console.log(error);
        });
    };
    DragDropService.prototype.delChecklist = function (idCheck) {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/task/checklist/' + idCheck;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
        return this.http.delete(url, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            // console.log(res);
            _this.addComment = '';
            _this.getInfoOptionsTasks(_this.idTask)
                .subscribe(function (res) {
                _this.infoOptionTask = res;
                _this.snackbar.inserirSnackbar('Checklist deletada com sucesso!');
                _this.notificationService.searchNotification();
            }, function (error) {
            });
        }, function (error) {
            // console.log(error);
        });
    };
    DragDropService.prototype.changeChecklistTask = function (checklist, idChecklist) {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/task/checklistName/' + idChecklist;
        var json = JSON.stringify({
            name: checklist,
        });
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
        return this.http.put(url, params, { headers: headers })
            .subscribe(function (res) {
            // console.log(res);
            _this.snackbar.inserirSnackbar('Checklist alterada com sucesso!');
            _this.notificationService.searchNotification();
        }, function (error) {
            // console.log(error);
        });
    };
    DragDropService.prototype.newAttachment = function (base64, fileName, size, fileType) {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/task/attachment/' + this.idTask;
        var json = JSON.stringify({
            file: base64,
            fileName: fileName,
            size: size,
            fileType: fileType
        });
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
        return this.http.post(url, params, { headers: headers })
            .subscribe(function (res) {
            // console.log(res);
            _this.getInfoOptionsTasks(_this.idTask)
                .subscribe(function (res) {
                _this.infoOptionTask = res;
                _this.snackbar.inserirSnackbar('Anexo adicionado com sucesso!');
                _this.notificationService.searchNotification();
            }, function (error) {
                // console.log(error);
            });
        }, function (error) {
            // console.log(error);
        });
    };
    DragDropService.prototype.delMemberTask = function (idMemberTask) {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/task/team/' + idMemberTask;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
        return this.http.delete(url, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            // console.log(res);
            _this.getInfoOptionsTasks(_this.idTask)
                .subscribe(function (res) {
                _this.infoOptionTask = res;
                _this.projects.searchBlocks(_this.idProjeto)
                    .subscribe(function (res) {
                    // console.log(res);
                    _this.blocks = res;
                    _this.snackbar.inserirSnackbar('Membro deletado com sucesso!');
                    _this.notificationService.searchNotification();
                }, function (error) {
                    // console.log(error);
                });
                _this.socket.emit('changeTask', {
                    idProject: _this.idProjeto
                });
            }, function (error) {
            });
        }, function (error) {
            // console.log(error);
        });
    };
    DragDropService.prototype.addMemberTask = function (idMember) {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/task/team/' + this.idTask;
        var json = JSON.stringify({
            idUser: idMember,
        });
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
        return this.http.post(url, params, { headers: headers })
            .subscribe(function (res) {
            // console.log(res);
            _this.getInfoOptionsTasks(_this.idTask)
                .subscribe(function (res) {
                _this.infoOptionTask = res;
                _this.projects.searchBlocks(_this.idProjeto)
                    .subscribe(function (res) {
                    // console.log(res);
                    _this.blocks = res;
                    _this.snackbar.inserirSnackbar('Membro adicionado com sucesso!');
                    _this.notificationService.searchNotification();
                }, function (error) {
                    // console.log(error);
                });
                _this.socket.emit('changeTask', {
                    idProject: _this.idProjeto
                });
            }, function (error) {
            }, function () {
                _this.addNewChecklist = '';
            });
        }, function (error) {
            // console.log(error);
        });
    };
    DragDropService.prototype.changePositions = function (previous, current, idTask, idBlock) {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/task/move/' + idTask;
        var json = JSON.stringify({
            idBlock: idBlock,
            positions: current,
            oldPositions: previous
        });
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
        return this.http.put(url, params, { headers: headers })
            .subscribe(function (res) {
            // console.log(res);
            _this.socket.emit('changeTask', {
                idProject: _this.idProjeto
            });
            _this.snackbar.inserirSnackbar('Tarefa movida com sucesso!');
            _this.notificationService.searchNotification();
        }, function (error) {
            // console.log(error);
        });
    };
    DragDropService.prototype.onInitSocket = function () {
        var _this = this;
        this.socket.on('updateTask', function (data) {
            if (data.idProject === _this.idProjeto) {
                _this.projects.searchBlocks(_this.idProjeto)
                    .subscribe(function (res) {
                    // console.log(res);
                    _this.blocks = res;
                }, function (error) {
                    // console.log(error);
                });
                _this.notificationService.searchNotification();
            }
        });
    };
    DragDropService.prototype.delTask = function () {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/blocks/task/' + this.idTask;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
        return this.http.delete(url, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            // console.log(res);
            _this.projects.searchBlocks(_this.idProjeto)
                .subscribe(function (res) {
                // console.log(res);
                _this.blocks = res;
                _this.offOptionsTasks();
                _this.snackbar.inserirSnackbar('Tarefa deletada com sucesso!');
                _this.notificationService.searchNotification();
                _this.socket.emit('changeTask', {
                    idProject: _this.idProjeto
                });
            }, function (error) {
            });
        }, function (error) {
        });
    };
    DragDropService.prototype.autoHeight = function (el) {
        el.style.height = 'auto';
        el.style.height = (el.scrollHeight) + 'px';
    };
    DragDropService.prototype.delAttachment = function (id) {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/task/attachment/' + id;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
        return this.http.delete(url, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.getInfoOptionsTasks(_this.idTask)
                .subscribe(function (res) {
                _this.infoOptionTask = res;
                _this.snackbar.inserirSnackbar('Anexo deletado com sucesso!');
                _this.notificationService.searchNotification();
            }, function (error) {
            });
        }, function (error) {
        });
    };
    return DragDropService;
}());
DragDropService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__Services_core_service__["a" /* CoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_core_service__["a" /* CoreService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ng_socket_io__["Socket"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ng_socket_io__["Socket"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__projects_projects_service_service__["a" /* ProjectsServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__projects_projects_service_service__["a" /* ProjectsServiceService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__components_snackbars_snackbars_service__["a" /* SnackbarsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__components_snackbars_snackbars_service__["a" /* SnackbarsService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__notification_notification_service__["a" /* NotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__notification_notification_service__["a" /* NotificationService */]) === "function" && _g || Object])
], DragDropService);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=drag-drop.service.js.map

/***/ }),

/***/ "../../../../../src/app/drag-drop/options-tasks/options-tasks.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\r\n  width: 600px;\r\n  height: 400px;\r\n  position: fixed;\r\n  top: calc(50% - 200px);\r\n  left: calc(50% - 300px);\r\n  background-color: #FAFAFA;\r\n  border-radius: 2px;\r\n  box-shadow: 0px 24px 38px rgba(0, 0, 0, .14),\r\n  0px 9px 46px rgba(0, 0, 0, .12),\r\n  0px 11px 15px rgba(0, 0, 0, .20);\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: horizontal;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: row;\r\n          flex-direction: row;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  overflow: hidden;\r\n  z-index: 24;\r\n}\r\n\r\n.container .buttons {\r\n  width: 80px;\r\n  height: 400px;\r\n  position: fixed;\r\n  top: calc(50% - 200px);\r\n  left: calc(50% - 400px);\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  -webkit-box-pack: justify;\r\n      -ms-flex-pack: justify;\r\n          justify-content: space-between;\r\n  background-color: #FAFAFA;\r\n  border-radius: 2px;\r\n  box-shadow: 0px 24px 38px rgba(0, 0, 0, .14),\r\n  0px 9px 46px rgba(0, 0, 0, .12),\r\n  0px 11px 15px rgba(0, 0, 0, .20);\r\n\r\n}\r\n\r\n.container .buttons section {\r\n  height: 80px;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  background-color: transparent;\r\n}\r\n\r\n.container .buttons section i {\r\n  cursor: pointer;\r\n}\r\n\r\n.container .pages {\r\n  width: 100%;\r\n  height: 100%;\r\n  transition: All 480ms ease;\r\n\r\n}\r\n\r\n.container .pages .page {\r\n  width: 100%;\r\n  height: 100%;\r\n  padding: 32px 16px;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.container .pages .page header h1 {\r\n  color: rgba(0, 0, 0, .8);\r\n  font-family: 'Roboto';\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  font-size: 16px;\r\n  font-weight: 600;\r\n  text-align: center;\r\n  padding: 4px;\r\n}\r\n\r\n.container .pages .basicas {\r\n}\r\n\r\n.container .pages .basicas .nome {\r\n  width: 100%;\r\n  height: 40px;\r\n  margin-top: 10px;\r\n}\r\n\r\n.container .pages .basicas .nome div {\r\n  position: relative;\r\n}\r\n\r\n.container .pages .basicas .descricao {\r\n  width: 100%;\r\n  height: 120px;\r\n  margin-top: 20px;\r\n}\r\n\r\n.container .pages .basicas .descricao > div {\r\n  position: relative;\r\n}\r\n\r\n.container .pages .basicas .descricao > div textarea {\r\n  height: 100px;\r\n}\r\n\r\n.container .pages .basicas .data {\r\n  width: 100%;\r\n  height: 40px;\r\n}\r\n\r\n.container .pages .basicas .data > div {\r\n  position: relative;\r\n}\r\n\r\n.container .pages .basicas .delete {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-align: end;\r\n      -ms-flex-align: end;\r\n          align-items: flex-end;\r\n  -webkit-box-pack: end;\r\n      -ms-flex-pack: end;\r\n          justify-content: flex-end;\r\n}\r\n\r\n.container .pages .basicas .delete i {\r\n  width: 40px;\r\n  height: 40px;\r\n  background-color: #FAFAFA;\r\n  color: #111;\r\n  border-radius: 50%;\r\n  line-height: 40px;\r\n  text-align: center;\r\n  cursor: pointer;\r\n  transition: All 480ms ease;\r\n}\r\n\r\n.container .pages .basicas .delete i:hover {\r\n  -webkit-transform: scale(1.1);\r\n          transform: scale(1.1);\r\n}\r\n\r\n.container .pages .comentarios {\r\n  background-color: #FAFAFA;\r\n}\r\n\r\n.container .pages .comentarios .lista {\r\n  height: 100%;\r\n  overflow: hidden;\r\n}\r\n\r\n.container .pages .comentarios .lista .scroll {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: horizontal;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: row;\r\n          flex-direction: row;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  -webkit-box-align: start;\r\n      -ms-flex-align: start;\r\n          align-items: flex-start;\r\n  max-width: 600px;\r\n  max-height: 300px;\r\n  overflow-y: auto;\r\n\r\n}\r\n\r\n.container .pages .comentarios .lista .scroll .comentario {\r\n  width: 95%;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  margin: 5px 2.5%;\r\n  position: relative;\r\n\r\n}\r\n\r\n.container .pages .comentarios .lista .scroll .comentario .addComentario {\r\n  margin: 10px 0 35px 0;\r\n  width: 100%;\r\n}\r\n\r\n.container .pages .comentarios .lista .scroll .comentario .addComentario div {\r\n  position: relative;\r\n}\r\n\r\n.container .pages .comentarios textarea {\r\n  width: 100%;\r\n  height: auto;\r\n  overflow: hidden;\r\n  font-family: 'Roboto';\r\n  font-size: 16px;\r\n  background-color: #FAFAFA;\r\n  outline: none;\r\n  border: none;\r\n  padding: 8px;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n  box-shadow: 0px 0px 4px rgba(0, 0, 0, .14),\r\n  0px 3px 4px rgba(0, 0, 0, .12),\r\n  0px 1px 5px rgba(0, 0, 0, .20);\r\n}\r\n\r\n.container .pages .comentarios textarea:focus {\r\n  background-color: #EEEEEE;\r\n  border-bottom: 2px solid #006064;\r\n}\r\n\r\n.container .pages .comentarios textarea:focus + i {\r\n  display: none;\r\n}\r\n\r\n.container .pages .comentarios i {\r\n  color: rgba(0, 0, 0, .64);\r\n  cursor: pointer;\r\n  font-size: 14px;\r\n  position: absolute;\r\n  top: 4px;\r\n  right: 4px;\r\n}\r\n\r\n.container .pages .checklist {\r\n  background-color: #FAFAFA;\r\n}\r\n\r\n.container .pages .checklist .scroll {\r\n  width: 100%;\r\n  max-height: 300px;\r\n  overflow: hidden;\r\n}\r\n\r\n.container .pages .checklist .scroll ul {\r\n  width: 100%;\r\n  height: 100%;\r\n  overflow-y: auto;\r\n  list-style: none;\r\n}\r\n\r\n.container .pages .checklist .scroll ul li {\r\n  padding: 0 16px;\r\n  min-height: 48px;\r\n  line-height: 48px;\r\n  box-sizing: border-box;\r\n  margin-top: 8px;\r\n  position: relative;\r\n}\r\n\r\n.container .pages .checklist .scroll ul li .fieldCheckbox {\r\n  width: 450px;\r\n  color: #444444;\r\n  font-family: 'Roboto';\r\n  font-size: 16px;\r\n  border: none;\r\n  outline: none;\r\n  background-color: transparent;\r\n  padding: 8px;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n}\r\n\r\n.container .pages .checklist .scroll ul li .fieldCheckbox + i {\r\n  color: rgba(0, 0, 0, .64);\r\n  cursor: pointer;\r\n  font-size: 18px;\r\n  position: absolute;\r\n  top: 16px;\r\n  right: 4px;\r\n}\r\n\r\n.container .pages .checklist .scroll ul li .fieldCheckbox:focus {\r\n  /*background-color: #EEEEEE;*/\r\n  border-bottom: 2px solid #006064;\r\n}\r\n\r\n.container .pages .checklist .scroll ul li .fieldCheckbox:focus + i {\r\n  display: none;\r\n}\r\n\r\n.container .pages .checklist .scroll ul li input[type=\"checkbox\"] {\r\n  display: none;\r\n}\r\n\r\n.container .pages .checklist .scroll ul li input[type=\"checkbox\"]:checked ~ label .img {\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/check_box.svg") + ");\r\n}\r\n\r\n.container .pages .checklist .scroll .img {\r\n  width: 48px;\r\n  height: 48px;\r\n  /*margin-top: 10px;*/\r\n  float: left;\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/check_box_outline.svg") + ");\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n  cursor: pointer;\r\n}\r\n\r\n.container .pages .checklist .scroll ul li span {\r\n  max-width: calc(100% - 30px);\r\n  float: left;\r\n}\r\n\r\n.container .pages .checklist .scroll ul li .del {\r\n  width: 30px;\r\n  height: 30px;\r\n  position: absolute;\r\n  right: 16px;\r\n  bottom: 8px;\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/delete.svg") + ");\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  cursor: pointer;\r\n  display: table-cell;\r\n  vertical-align: middle;\r\n}\r\n\r\n.container .pages .checklist .scroll ul .addCheckbox div {\r\n  padding: 0;\r\n  min-height: auto;\r\n  line-height: normal;\r\n  position: relative;\r\n}\r\n\r\n.container .pages .anexos {\r\n  background-color: #FAFAFA;\r\n}\r\n\r\n.container .pages .anexos .lista {\r\n  width: 100%;\r\n  max-height: 300px;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  -webkit-box-pack: start;\r\n      -ms-flex-pack: start;\r\n          justify-content: flex-start;\r\n  -webkit-box-align: start;\r\n      -ms-flex-align: start;\r\n          align-items: flex-start;\r\n  overflow-y: scroll;\r\n}\r\n\r\n.container .pages .anexos .lista .anexo {\r\n  width: 130px;\r\n  height: 130px;\r\n  margin: 0;\r\n  position: relative;\r\n}\r\n\r\n.container .pages .anexos .lista .anexo .img {\r\n  width: 100%;\r\n  height: 75%;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n}\r\n\r\n.container .pages .anexos .lista .anexo .img .icon {\r\n  width: 50px;\r\n  height: 50px;\r\n  background-size: cover;\r\n}\r\n\r\n.container .pages .anexos .lista .anexo .img .image {\r\n  width: 130px;\r\n  height: 130px;\r\n  background-size: cover;\r\n}\r\n\r\n.container .pages .anexos .lista .anexo h1 {\r\n  max-width: 130px;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  font-size: 12px;\r\n  font-family: 'Roboto';\r\n  font-weight: normal;\r\n  width: 12em;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  text-align: center;\r\n}\r\n\r\n.container .pages .anexos .lista .anexo i {\r\n  width: 100%;\r\n  font-size: 48px;\r\n  text-align: center;\r\n  line-height: 130px;\r\n  color: rgba(0, 0, 0, .8);\r\n  cursor: pointer;\r\n}\r\n\r\n.container .pages .anexos .lista .anexo .delete {\r\n  width: auto;\r\n  height: auto;\r\n  line-height: normal;\r\n  font-size: 18px;\r\n  color: #111111;\r\n  cursor: pointer;\r\n  position: absolute;\r\n  top: 8px;\r\n  right: 8px;\r\n  border-radius: 50%;\r\n  padding: 4px;\r\n  background-color: #FAFAFA;\r\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14), 0 4px 5px 0 rgba(0, 0, 0, 0.12), 0 1px 10px 0 rgba(0, 0, 0, 0.20);\r\n}\r\n\r\n.container .pages .anexos .lista .anexo #addAnexo {\r\n  display: none;\r\n}\r\n\r\n.container .pages .time {\r\n  background-color: #FAFAFA;\r\n}\r\n\r\n.container .pages .time .membros {\r\n  width: 100%;\r\n  height: 300px;\r\n  padding: 16px;\r\n  box-sizing: border-box;\r\n  position: relative;\r\n}\r\n\r\n.container .pages .time .membros .search {\r\n  position: relative;\r\n}\r\n\r\n.container .pages .time .chips {\r\n  width: 100%;\r\n  margin-top: 60px;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n}\r\n\r\n.container .pages .time .membros .chip {\r\n  width: auto;\r\n  height: 32px;\r\n  margin: 2px 2px;\r\n  border-radius: 32px;\r\n  padding-right: 12px;\r\n  background-color: #E0E0E0;\r\n  cursor: default;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n}\r\n\r\n.container .pages .time .membros .chip .img {\r\n  width: 32px;\r\n  height: 32px;\r\n  margin-right: 8px;\r\n  background-size: cover;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  background-color: #009587;\r\n  border-radius: 50%;\r\n  line-height: 32px;\r\n  text-align: center;\r\n  font-family: 'Roboto';\r\n  font-size: 16px;\r\n  color: #FFFFFF;\r\n}\r\n\r\n.container .pages .time .membros .chip .name {\r\n  float: left;\r\n  font-size: 16px;\r\n  padding: 8px 0;\r\n  font-family: \"Roboto\";\r\n  font-weight: 500;\r\n  font-weight: normal;\r\n  color: rgba(0, 0, 0, .54);\r\n}\r\n\r\n.container .pages .time .membros .chip .delete {\r\n  margin-left: 4px;\r\n  margin-top: 4px;\r\n  box-sizing: border-box;\r\n  height: 24px;\r\n  width: 24px;\r\n  border-radius: 50%;\r\n  background-color: #BDBDBD;\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/clearWhite.svg") + ");\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  transition: All 280ms ease-out;\r\n  cursor: pointer;\r\n}\r\n\r\n.container .pages .time .membros .chip .delete:hover {\r\n  background-color: #424242;\r\n}\r\n\r\n.container .pages .time .membros .chipsFocus {\r\n  width: calc(100% - 32px);\r\n  max-height: 220px;\r\n  position: absolute;\r\n  top: 55px;\r\n  background-color: #f4f4f4;\r\n  color: #000;\r\n  box-shadow: 0px 8px 10px rgba(0, 0, 0, .14),\r\n  0px 3px 14px rgba(0, 0, 0, .12),\r\n  0px 4px 15px rgba(0, 0, 0, .20);\r\n  overflow: hidden;\r\n}\r\n\r\n.container .pages .time .membros .chipFocus {\r\n  width: 100%;\r\n  height: 72px;\r\n  padding: 16px;\r\n  box-sizing: border-box;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  font-weight: normal;\r\n  cursor: pointer;\r\n}\r\n\r\n.container .pages .time .membros .chipFocus .img {\r\n  width: 40px;\r\n  height: 40px;\r\n  border-radius: 50%;\r\n  margin-right: 8px;\r\n  background-size: cover;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  background-color: #009587;\r\n  line-height: 40px;\r\n  text-align: center;\r\n  font-family: 'Roboto';\r\n  font-size: 16px;\r\n  color: #FFFFFF;\r\n}\r\n\r\n.container .pages .time .hgroup {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  margin-left: 8px;\r\n  color: rgba(0, 0, 0, .54);\r\n}\r\n\r\n.container .pages .time .membros .chipFocus h1 {\r\n  color: rgba(0, 0, 0, .65);\r\n  font-size: 16px;\r\n  font-family: \"Roboto\";\r\n  font-weight: 500;\r\n}\r\n\r\n.container .pages .time .membros .chipFocus h2 {\r\n  font-size: 14px;\r\n  font-family: 'Roboto';\r\n\r\n}\r\n\r\n.background {\r\n  width: 100vw;\r\n  height: 100vh;\r\n  position: fixed;\r\n  background-color: rgba(0, 0, 0, .7);\r\n  z-index: 23;\r\n}\r\n\r\n.floatingButton {\r\n  z-index: 24;\r\n}\r\n\r\n@media screen and (max-width: 480px) {\r\n\r\n  .container {\r\n    width: 100vw;\r\n    height: 100vh;\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    box-shadow: none;\r\n    overflow-y: scroll;\r\n  }\r\n\r\n  .container .buttons {\r\n    display: none;\r\n  }\r\n\r\n  .container .pages .page {\r\n    height: auto;\r\n    padding: 16px;\r\n  }\r\n  .container .pages .checklist .scroll ul li .fieldCheckbox {\r\n    width: 250px;\r\n  }\r\n\r\n\r\n\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/drag-drop/options-tasks/options-tasks.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<section class=\"container\">-->\r\n<!--<nav class=\"tab\">-->\r\n<!--<ul>-->\r\n<!--<li (click)=\"navbasicos()\">Basicas</li>-->\r\n<!--<li (click)=\"navComentarios()\">Comentarios</li>-->\r\n<!--<li (click)=\"navChecklist()\">Checklist</li>-->\r\n<!--<li (click)=\"navMembros()\">Time</li>-->\r\n<!--<li (click)=\"navAnexos()\">Anexos</li>-->\r\n<!--</ul>-->\r\n<!--</nav>-->\r\n<!--<section class=\"conteudo\">-->\r\n<!--<div class=\"conteudoNav\" #conteudoNav>-->\r\n<!--<div class=\"basicas\">-->\r\n<!--<div style=\"position: relative\">-->\r\n<!--<input type=\"text\" class=\"textFields\" #HTMLNameTask [(ngModel)]=\"nome\"-->\r\n<!--(blur)=\"verificaInputs(); alteraDadosBasicos();\">-->\r\n<!--<div class=\"labelText\">Nome</div>-->\r\n<!--<div class=\"border\"></div>-->\r\n<!--</div>-->\r\n\r\n<!--<div style=\"position: relative; margin-top: 50px;\">-->\r\n<!--<input type=\"text\" class=\"textFields\" #HTMLFinalDate [(ngModel)]=\"data\" (keyup)='formatarData()'-->\r\n<!--(blur)=\"verificaInputs(); alteraDadosBasicos();\">-->\r\n<!--<div class=\"labelText\">Data</div>-->\r\n<!--<div class=\"border\"></div>-->\r\n<!--</div>-->\r\n<!--<div style=\"position: relative; margin-top: 100px\">-->\r\n<!--<textarea class=\"textFieldsMult\" #HTMLDescription style=\"min-height: 120px\" (blur)=\"alteraDadosBasicos()\">{{ descricao }}</textarea>-->\r\n<!--&lt;!&ndash;<div class=\"labelTextMult\">Descrição</div>&ndash;&gt;-->\r\n<!--<div class=\"border\"></div>-->\r\n<!--</div>-->\r\n<!--<p class=\"excluirTarefa\" (click)=\"dragDropService.delTask()\">Excluir Tarefa</p>-->\r\n<!--&lt;!&ndash;</div>&ndash;&gt;-->\r\n<!--<div class=\"comentarios\">-->\r\n<!--<div style=\"position: relative; margin-top: 10px; width: 90%; margin-left: 5%; float: left\">-->\r\n<!--<input type=\"text\" class=\"textFields\" id=\"addComentario\" #HTMLInputComment-->\r\n<!--[(ngModel)]=\"dragDropService.addComment\" (keyup.enter)=\"dragDropService.newCommentTask()\"-->\r\n<!--(blur)=\"inputComment()\">-->\r\n<!--<label class=\"labelText\" for=\"addComentario\">Adicionar Comentario</label>-->\r\n<!--<div class=\"border\"></div>-->\r\n<!--</div>-->\r\n<!--<div class=\"scrollComentarios\">-->\r\n<!--<ul>-->\r\n<!--<li *ngFor=\"let comentario of dragDropService?.infoOptionTask?.comments\">-->\r\n<!--<span *ngIf=\"!modifyComment || idModifyComment != comentario.id_comment\">{{ comentario.comment }}</span>-->\r\n<!--<input *ngIf=\"modifyComment && idModifyComment == comentario.id_comment\" class=\"textFields modifyComments\"-->\r\n<!--style=\"width: calc(100% - 100px);\"-->\r\n<!--(blur)=\"dragDropService.changeCommentTask(comentario.comment, comentario.id_comment)\"-->\r\n<!--[(ngModel)]=\"comentario.comment\">-->\r\n<!--<div class=\"more\" (click)=\"onMoreOptionsComments(comentario.id_comment)\"></div>-->\r\n<!--<div [hidden]=\"!moreOptionsComments || comentario.id_comment != idMoreOptionsComments\"-->\r\n<!--class=\"optionsMore\">-->\r\n<!--<ul>-->\r\n<!--<li (click)=\"onModifyComment(comentario.id_comment)\">Alterar Comentario</li>-->\r\n<!--<li (click)=\"dragDropService.delCommentTask(comentario.id_comment)\">Excluir Comentario</li>-->\r\n<!--</ul>-->\r\n<!--</div>-->\r\n<!--</li>-->\r\n<!--</ul>-->\r\n<!--</div>-->\r\n<!--</div>-->\r\n<!--<div class=\"checklist\">-->\r\n<!--<div style=\"position: relative; margin-top: 10px; width: 90%; margin-left: 5%; float: left\">-->\r\n<!--<input type=\"text\" class=\"textFields\" #HTMLInputChecklist (blur)=\"inputChecklist()\"-->\r\n<!--[(ngModel)]=\"dragDropService.addNewChecklist\"-->\r\n<!--(keyup.enter)=\"dragDropService.newChecklist(dragDropService.addNewChecklist)\">-->\r\n<!--<label class=\"labelText\">Adicionar Checklist</label>-->\r\n<!--<div class=\"border\"></div>-->\r\n<!--</div>-->\r\n<!--<div class=\"scrollChecklist\">-->\r\n<!--<ul>-->\r\n<!--<li *ngFor=\"let checklist of dragDropService?.infoOptionTask?.checklists\">-->\r\n<!--<input type=\"checkbox\" id=\"{{ 'check' + checklist.id_checklist }}\" [checked]=\"checklist.checked\">-->\r\n<!--<label [for]=\"'check' + checklist.id_checklist\"-->\r\n<!--(click)=\"dragDropService.changeSituationCheckbox(checklist.id_checklist)\">-->\r\n<!--<div class=\"img\"></div>-->\r\n<!--</label>-->\r\n<!--<span *ngIf=\"!modifyChecklist || idModifyChecklist != checklist.id_checklist\">{{ checklist.name_checklist }}</span>-->\r\n<!--<input *ngIf=\"modifyChecklist && idModifyChecklist == checklist.id_checklist\" class=\"textFields modifyChecklist\"-->\r\n<!--style=\"width: calc(100% - 100px);\" (blur)=\"dragDropService.changeChecklistTask(checklist.name_checklist, checklist.id_checklist)\" [(ngModel)]=\"checklist.name_checklist\">-->\r\n\r\n<!--<div class=\"more moreCheckbox\" (click)=\"onMoreOptionsChecklist(checklist.id_checklist)\"></div>-->\r\n<!--<div [hidden]=\"!moreOptionsChecklist || checklist.id_checklist != idMoreOptionsChecklist\"-->\r\n<!--class=\"optionsMore\">-->\r\n<!--<ul>-->\r\n<!--<li (click)=\"onModifyChecklist(checklist.id_checklist)\">Alterar Checklist</li>-->\r\n<!--<li (click)=\"dragDropService.delChecklist(checklist.id_checklist)\">Excluir Checklist</li>-->\r\n<!--</ul>-->\r\n<!--</div>-->\r\n<!--</li>-->\r\n<!--</ul>-->\r\n<!--</div>-->\r\n<!--</div>-->\r\n<!--<div class=\"membros\">-->\r\n<!--<section class=\"search\">-->\r\n<!--<input type=\"text\" class=\"textFields\" (focus)=\"showSearchMembros()\" (blur)=\"hideSearchMembros()\"-->\r\n<!--[(ngModel)]=\"search\" #HTMLSearch>-->\r\n<!--<label class=\"labelText\">Nome</label>-->\r\n<!--<div class=\"border\"></div>-->\r\n<!--</section>-->\r\n<!--<section class=\"chipsFocus\" *ngIf=\"searchMembros\">-->\r\n<!--<article class=\"chipFocus\"-->\r\n<!--*ngFor=\"let membro of projectService?.project?.team | pesquisaDeMembrosDoProjeto: search: dragDropService?.infoOptionTask?.team\"-->\r\n<!--(mousedown)=\"dragDropService.addMemberTask(membro.id_user)\">-->\r\n<!--<section class=\"img\" *ngIf=\"membro.profile_img == '/imgsUser/default.png'\">{{ membro.name.charAt(0) | uppercase-->\r\n<!--}}-->\r\n<!--</section>-->\r\n<!--<section *ngIf=\"membro.profile_img != '/imgsUser/default.png'\"-->\r\n<!--[style.background-image]=\"'url('+ 'http://' + core.ipDaApi + membro.profile_img +')'\"-->\r\n<!--class=\"img\"></section>-->\r\n<!--<section class=\"hgroup\">-->\r\n<!--<h1 class=\"name\">{{ membro.name }}</h1>-->\r\n<!--<h2 class=\"email\">{{ membro.email }}</h2>-->\r\n<!--</section>-->\r\n\r\n<!--</article>-->\r\n<!--</section>-->\r\n<!--<section class=\"chips\">-->\r\n<!--<article class=\"chip\" *ngFor=\"let membro of dragDropService?.infoOptionTask?.team\">-->\r\n<!--<section class=\"img\" *ngIf=\"membro.profile_img == '/imgsUser/default.png'\">{{ membro.name.charAt(0) | uppercase-->\r\n<!--}}-->\r\n<!--</section>-->\r\n<!--<section *ngIf=\"membro.profile_img != '/imgsUser/default.png'\"-->\r\n<!--[style.background-image]=\"'url('+ 'http://' + core.ipDaApi + membro.profile_img +')'\"-->\r\n<!--class=\"img\"></section>-->\r\n<!--<h1 class=\"name\">{{ membro.name }}</h1>-->\r\n<!--<section class=\"delete\" (click)=\"dragDropService.delMemberTask(membro.id_team_task)\"></section>-->\r\n<!--</article>-->\r\n<!--</section>-->\r\n<!--</div>-->\r\n\r\n\r\n<!--<div class=\"anexos\">-->\r\n<!--<div class=\"scrollAnexos\">-->\r\n<!--<ul>-->\r\n<!--<li (click)=\"openFileAnexo()\">Adicionar Anexo</li>-->\r\n<!--<input type=\"file\" id=\"addAnexo\" (change)=\"getFile($event.target)\">-->\r\n<!--<li *ngFor=\"let anexo of dragDropService?.infoOptionTask?.attachment\">-->\r\n<!--<div class=\"icon\"></div>-->\r\n<!--<a [href]=\" 'http://' + core.ipDaApi +  anexo.path\" target=\"_blank\"> {{ anexo.file_name + '.' +-->\r\n<!--anexo.path.split(\".\")[1]}}</a>-->\r\n<!--</li>-->\r\n\r\n<!--</ul>-->\r\n\r\n<!--</div>-->\r\n<!--</div>-->\r\n<!--</div>-->\r\n<!--<button class=\"denseButton\" style=\"position: absolute; right: 16px; bottom: 60px;\"-->\r\n<!--(click)=\"dragDropService.offOptionsTasks()\"> FECHAR-->\r\n<!--</button>-->\r\n<!--</section>-->\r\n<!--</section>-->\r\n<!--<app-arrow-back (click)=\"dragDropService.offOptionsTasks()\"></app-arrow-back>-->\r\n\r\n<section class=\"floatingButton\" (click)=\"alteraDadosBasicos();\">\r\n  <i class=\"material-icons\">save</i>\r\n</section>\r\n\r\n<section class=\"container\">\r\n\r\n\r\n  <section class=\"buttons\">\r\n    <section class=\"basicas\" (click)=\"navbasicos()\">\r\n      <i class=\"material-icons\">info</i>\r\n    </section>\r\n    <section class=\"comentarios\" (click)=\"navComentarios()\">\r\n      <i class=\"material-icons\">comment</i>\r\n    </section>\r\n    <section class=\"checklist\" (click)=\"navChecklist()\">\r\n      <i class=\"material-icons\">check_box</i>\r\n    </section>\r\n    <section class=\"anexos\" (click)=\"navAnexos()\">\r\n      <i class=\"material-icons\">attach_file</i>\r\n    </section>\r\n    <section class=\"time\" (click)=\"navMembros()\">\r\n      <i class=\"material-icons\">people</i>\r\n    </section>\r\n  </section>\r\n  <section #conteudoNav class=\"pages\">\r\n    <section class=\"page basicas\">\r\n      <header>\r\n        <h1>Basicas</h1>\r\n      </header>\r\n      <div class=\"nome\">\r\n        <div>\r\n          <input type=\"text\" class=\"textFields\" #HTMLNameTask [(ngModel)]=\"nome\"\r\n                 (blur)=\"verificaInputs();\">\r\n          <label class=\"labelText\">Nome</label>\r\n          <div class=\"border\"></div>\r\n        </div>\r\n      </div>\r\n      <div class=\"descricao\">\r\n        <div>\r\n                <textarea class=\"textFieldsMult\" #HTMLDescription [(ngModel)]=\"descricao\"\r\n                          (blur)=\"verificaInputs()\"></textarea>\r\n          <label class=\"labelTextMult\">Descrição</label>\r\n          <div class=\"border\"></div>\r\n        </div>\r\n      </div>\r\n      <div class=\"data\">\r\n        <div>\r\n          <input type=\"text\" class=\"textFields\" #HTMLFinalDate [(ngModel)]=\"data\" (keyup)='formatarData()'\r\n                 (blur)=\"verificaInputs();\">\r\n          <div class=\"labelText\">Data</div>\r\n          <div class=\"border\"></div>\r\n        </div>\r\n      </div>\r\n      <section class=\"delete\">\r\n        <i class=\"material-icons\" (click)=\"dragDropService.delTask()\">delete</i>\r\n      </section>\r\n    </section>\r\n    <section class=\"page comentarios\">\r\n      <header>\r\n        <h1>Comentarios</h1>\r\n      </header>\r\n      <section class=\"lista\">\r\n        <div class=\"scroll\">\r\n          <section class=\"comentario\" *ngFor=\"let comentario of dragDropService?.infoOptionTask?.comments\">\r\n          <textarea spellcheck=\"false\" (keyup)=\"dragDropService.autoHeight($event.target)\" rows=\"1\"\r\n                    [(ngModel)]=\"comentario.comment\"\r\n                    (blur)=\"dragDropService.changeCommentTask(comentario.comment, comentario.id_comment)\">\r\na\r\n          </textarea>\r\n            <i class=\"material-icons\" (click)=\"dragDropService.delCommentTask(comentario.id_comment)\">clear</i>\r\n          </section>\r\n          <section class=\"comentario\">\r\n            <section class=\"addComentario\">\r\n              <div>\r\n              <textarea (keyup)=\"dragDropService.autoHeight($event.target)\" rows=\"1\" class=\"textFieldsMult\"\r\n                        [(ngModel)]=\"dragDropService.addComment\" (keyup.enter)=\"dragDropService.newCommentTask()\">\r\n\r\n              </textarea>\r\n                <label class=\"labelTextMult\">Adicionar Comentario</label>\r\n                <div class=\"border\"></div>\r\n              </div>\r\n            </section>\r\n          </section>\r\n        </div>\r\n      </section>\r\n    </section>\r\n    <section class=\"page checklist\">\r\n      <header>\r\n        <h1>Checklist</h1>\r\n      </header>\r\n      <section class=\"scroll\">\r\n        <ul>\r\n          <li *ngFor=\"let checklist of dragDropService?.infoOptionTask?.checklists\">\r\n            <input type=\"checkbox\" [id]=\"'check' + checklist.id_checklist\" [checked]=\"checklist.checked\">\r\n            <label [for]=\"'check' + checklist.id_checklist\">\r\n              <div class=\"img\"></div>\r\n            </label>\r\n            <input type=\"text\" class=\"fieldCheckbox\" [(ngModel)]=\"checklist.name_checklist\"\r\n                   (blur)=\"dragDropService.changeChecklistTask(checklist.name_checklist, checklist.id_checklist)\">\r\n            <i class=\"material-icons\" (click)=\"dragDropService.delChecklist(checklist.id_checklist)\">clear</i>\r\n          </li>\r\n\r\n          <li class=\"addCheckbox\">\r\n            <div>\r\n              <input type=\"text\" class=\"textFields\" [(ngModel)]=\"dragDropService.addNewChecklist\"\r\n                     (keyup.enter)=\"dragDropService.newChecklist(dragDropService.addNewChecklist)\">\r\n              <label class=\"labelText\"\r\n                     (click)=\"dragDropService.changeSituationCheckbox(checklist.id_checklist)\">\r\n                Adicionar Checkbox\r\n              </label>\r\n              <div class=\"border\"></div>\r\n            </div>\r\n          </li>\r\n        </ul>\r\n      </section>\r\n    </section>\r\n    <section class=\"page anexos\">\r\n      <header>\r\n        <h1>Anexos</h1>\r\n      </header>\r\n\r\n      <section class=\"lista\">\r\n        <section class=\"anexo\" *ngFor=\"let anexo of dragDropService?.infoOptionTask?.attachment\">\r\n          <div class=\"img\">\r\n\r\n            <a [href]=\"'http://'  + core.ipDaApi +  anexo.path\" target=\"_blank\">\r\n              <div class=\"icon\"\r\n                   *ngIf=\"anexo.path.split('.')[1] == 'zip' || anexo.path.split('.')[1] == 'rar' || anexo.path.split('.')[1] == '7z'\"\r\n                   [style.background-image]=\"'url( ../../../assets/icons/zip.svg)'\"\r\n              ></div>\r\n              <div class=\"icon\" *ngIf=\"anexo.path.split('.')[1] == 'psd'\"\r\n                   [style.background-image]=\"'url( ../../../assets/icons/photoshop.svg)'\"\r\n              ></div>\r\n              <div class=\"icon\" *ngIf=\"anexo.path.split('.')[1] == 'pdf'\"\r\n                   [style.background-image]=\"'url( ../../../assets/icons/pdf.svg)'\"\r\n              ></div>\r\n              <div class=\"icon\" *ngIf=\"anexo.path.split('.')[1] == 'mp3'\"\r\n                   [style.background-image]=\"'url( ../../../assets/icons/mp3.svg)'\"\r\n              ></div>\r\n              <div class=\"icon\" *ngIf=\"anexo.path.split('.')[1] == 'pptx'\"\r\n                   [style.background-image]=\"'url( ../../../assets/icons/ppt.svg)'\"\r\n              ></div>\r\n              <div class=\"icon\" *ngIf=\"anexo.path.split('.')[1] == 'svg'\"\r\n                   [style.background-image]=\"'url( ../../../assets/icons/svg.svg)'\"\r\n              ></div>\r\n              <div class=\"icon\" *ngIf=\"anexo.path.split('.')[1] == 'txt'\"\r\n                   [style.background-image]=\"'url( ../../../assets/icons/txt.svg)'\"\r\n              ></div>\r\n              <div class=\"icon\" *ngIf=\"anexo.path.split('.')[1] == 'doc' || anexo.path.split('.')[1] == 'docx'\"\r\n                   [style.background-image]=\"'url( ../../../assets/icons/doc.svg)'\"\r\n              ></div>\r\n              <div class=\"image\" *ngIf=\"anexo.path.split('.')[1] == 'png' || anexo.path.split('.')[1] == 'jpg' || anexo.path.split('.') == 'jpeg'\r\n                                || anexo.path.split('.') == 'gif'\"\r\n                   [style.background-image]=\"'url(http://' + core.ipDaApi +  anexo.path + ')'\"\r\n              ></div>\r\n            </a>\r\n\r\n          </div>\r\n          <h1 *ngIf=\"anexo.path.split('.')[1] != 'png' && anexo.path.split('.')[1] != 'jpg'\">{{ anexo.file_name }}</h1>\r\n          <i class=\"material-icons delete\" (click)=\"dragDropService.delAttachment(anexo.id_attachment)\">delete</i>\r\n        </section>\r\n\r\n\r\n        <section class=\"anexo\">\r\n          <input type=\"file\" id=\"addAnexo\" (change)=\"getFile($event.target)\">\r\n          <i class=\"material-icons\" (click)=\"openFileAnexo()\">add</i>\r\n        </section>\r\n\r\n      </section>\r\n    </section>\r\n    <section class=\"page time\">\r\n      <header>\r\n        <h1>Time</h1>\r\n      </header>\r\n\r\n      <div class=\"membros\">\r\n        <section class=\"search\">\r\n          <input type=\"text\" class=\"textFields\" (focus)=\"showSearchMembros()\" (blur)=\"hideSearchMembros()\"\r\n                 [(ngModel)]=\"search\" #HTMLSearch>\r\n          <label class=\"labelText\">Nome</label>\r\n          <div class=\"border\"></div>\r\n        </section>\r\n        <section class=\"chipsFocus\" *ngIf=\"searchMembros\">\r\n          <article class=\"chipFocus\"\r\n                   *ngFor=\"let membro of projectService?.project?.team | pesquisaDeMembrosDoProjeto: search: dragDropService?.infoOptionTask?.team\"\r\n                   (mousedown)=\"dragDropService.addMemberTask(membro.id_user)\">\r\n            <section class=\"img\" *ngIf=\"membro.profile_img == '/imgsUser/default.png'\">{{ membro.name.charAt(0) |\r\n              uppercase\r\n              }}\r\n            </section>\r\n            <section *ngIf=\"membro.profile_img != '/imgsUser/default.png'\"\r\n                     [style.background-image]=\"'url('+ 'http://' + core.ipDaApi + membro.profile_img +')'\"\r\n                     class=\"img\"></section>\r\n            <section class=\"hgroup\">\r\n              <h1 class=\"name\">{{ membro.name }}</h1>\r\n              <h2 class=\"email\">{{ membro.email }}</h2>\r\n            </section>\r\n\r\n          </article>\r\n        </section>\r\n        <section class=\"chips\">\r\n          <article class=\"chip\" *ngFor=\"let membro of dragDropService?.infoOptionTask?.team\">\r\n            <section class=\"img\" *ngIf=\"membro.profile_img == '/imgsUser/default.png'\">{{ membro.name.charAt(0) |\r\n              uppercase\r\n              }}\r\n            </section>\r\n            <section *ngIf=\"membro.profile_img != '/imgsUser/default.png'\"\r\n                     [style.background-image]=\"'url('+ 'http://' + core.ipDaApi + membro.profile_img +')'\"\r\n                     class=\"img\"></section>\r\n            <h1 class=\"name\">{{ membro.name }}</h1>\r\n            <section class=\"delete\" (click)=\"dragDropService.delMemberTask(membro.id_team_task)\"></section>\r\n          </article>\r\n        </section>\r\n      </div>\r\n\r\n\r\n    </section>\r\n  </section>\r\n</section>\r\n<div class=\"background\">\r\n\r\n</div>\r\n\r\n<app-arrow-back (click)=\"dragDropService.offOptionsTasks()\"></app-arrow-back>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/drag-drop/options-tasks/options-tasks.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drag_drop_service__ = __webpack_require__("../../../../../src/app/drag-drop/drag-drop.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_core_service__ = __webpack_require__("../../../../../src/app/Services/core.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__projects_projects_service_service__ = __webpack_require__("../../../../../src/app/projects/projects-service.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OptionsTasksComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var OptionsTasksComponent = (function () {
    function OptionsTasksComponent(dragDropService, projectService, core) {
        this.dragDropService = dragDropService;
        this.projectService = projectService;
        this.core = core;
        this.search = '';
    }
    OptionsTasksComponent.prototype.ngOnInit = function () {
        var _this = this;
        document.addEventListener('mouseup', function (e) {
            _this.hideMoreOptionsComments(e);
            _this.hideMoreOptionsChecklist(e);
            _this.offModifyComment(e);
            _this.offModifyChecklist(e);
        });
        document.addEventListener('mousedown', function (e) {
            _this.fechaAlterarTarefa(e);
        });
    };
    OptionsTasksComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.data = _this.dragDropService.infoOptionTask.finaldate;
            _this.nome = _this.dragDropService.infoOptionTask.nametask;
            _this.descricao = _this.dragDropService.infoOptionTask.description;
            if (_this.data) {
                _this.data = _this.data.substr(0, 10);
                _this.data = _this.data.split('-');
                _this.data = _this.data[2] + _this.data[1] + _this.data[0];
                _this.formatarData();
            }
            _this.verificaInputs();
        }, 200);
    };
    OptionsTasksComponent.prototype.formatarData = function () {
        if (!this.data) {
            return '';
        }
        this.data = this.data.toString().replace(/[^0-9]+/g, '');
        if (this.data.length > 2) {
            this.data = this.data.substring(0, 2) + '/' + this.data.substring(2);
        }
        if (this.data.length > 5) {
            this.data = this.data.substring(0, 5) + '/' + this.data.substring(5, 9);
        }
    };
    OptionsTasksComponent.prototype.navbasicos = function () {
        this.conteudoNav.nativeElement.style = 'transform: translateY(0);';
    };
    OptionsTasksComponent.prototype.navComentarios = function () {
        this.conteudoNav.nativeElement.style = 'transform: translateY(-100%);';
    };
    OptionsTasksComponent.prototype.navChecklist = function () {
        this.conteudoNav.nativeElement.style = 'transform: translateY(-200%);';
    };
    OptionsTasksComponent.prototype.navAnexos = function () {
        this.conteudoNav.nativeElement.style = 'transform: translateY(-300%);';
    };
    OptionsTasksComponent.prototype.navMembros = function () {
        this.conteudoNav.nativeElement.style = 'transform: translateY(-400%);';
    };
    OptionsTasksComponent.prototype.verificaInputs = function () {
        if (this.dragDropService.infoOptionTask.nametask) {
            this.dragDropService.infoOptionTask.nametask.length > 0 ? this.HTMLNameTask.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLNameTask.nativeElement.classList.remove('textFieldsPreenchido');
        }
        if (this.descricao) {
            this.descricao.length > 0 ? this.HTMLDescription.nativeElement.classList.add('textFieldsMultPreenchido') : this.HTMLDescription.nativeElement.classList.remove('textFieldsMultPreenchido');
        }
        if (this.data) {
            this.data.length > 0 ? this.HTMLFinalDate.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLFinalDate.nativeElement.classList.remove('textFieldsPreenchido');
        }
        if (this.search) {
            this.search.length > 0 ? this.HTMLSearch.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLSearch.nativeElement.classList.remove('textFieldsPreenchido');
        }
    };
    OptionsTasksComponent.prototype.alteraDadosBasicos = function () {
        var data;
        if (this.data) {
            data = this.data.split('/');
            data = data[2] + '-' + data[1] + '-' + data[0];
            data = new Date(data).toISOString();
        }
        if (this.nome != this.dragDropService.infoOptionTask.nametask
            || this.descricao != this.dragDropService.infoOptionTask.description ||
            data || this.dragDropService.infoOptionTask.finalDate) {
            this.dragDropService.changeTask(this.nome, this.data, this.descricao);
        }
        else if (data && this.dragDropService.infoOptionTask.finaldate) {
            if (data.substr(0, 10) != this.dragDropService.infoOptionTask.finaldate.substr(0, 10)) {
                this.dragDropService.changeTask(this.nome, this.data, this.descricao);
            }
        }
    };
    OptionsTasksComponent.prototype.inputComment = function () {
        if (this.dragDropService.addComment) {
            this.dragDropService.addComment.length > 0 ? this.HTMLInputComment.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLInputComment.nativeElement.classList.remove('textFieldsPreenchido');
        }
    };
    OptionsTasksComponent.prototype.inputChecklist = function () {
        if (this.dragDropService.addNewChecklist) {
            this.dragDropService.addNewChecklist.length > 0 ? this.HTMLInputChecklist.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLInputChecklist.nativeElement.classList.remove('textFieldsPreenchido');
        }
    };
    OptionsTasksComponent.prototype.openFileAnexo = function () {
        document.getElementById('addAnexo').click();
    };
    OptionsTasksComponent.prototype.getFile = function (file) {
        var _this = this;
        // const fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
        // let fSize = file.files[0].size;
        // let i = 0;
        // while (fSize > 900) {
        //   fSize = fSize / 1024;
        //   i++;
        // }
        // fSize = (Math.round(fSize * 100) / 100) + ' ' + fSExt[i];
        var reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file.files[0]);
        }
        reader.onloadend = function (e) {
            var name = file.files[0].name.split('.')[0];
            var size = file.files[0].size;
            var extensao = file.files[0].name.split('.')[1];
            var base64 = reader.result;
            if (name && size && extensao && base64) {
                _this.dragDropService.newAttachment(base64, name, size, extensao);
            }
        };
    };
    OptionsTasksComponent.prototype.onMoreOptionsComments = function (id) {
        this.moreOptionsComments = true;
        this.idMoreOptionsComments = id;
    };
    OptionsTasksComponent.prototype.hideMoreOptionsComments = function (event) {
        if (event.target.className != 'optionsMore' && event.target.parentNode.className != 'optionsMore') {
            this.moreOptionsComments = false;
        }
    };
    OptionsTasksComponent.prototype.onMoreOptionsChecklist = function (id) {
        this.moreOptionsChecklist = true;
        this.idMoreOptionsChecklist = id;
    };
    OptionsTasksComponent.prototype.hideMoreOptionsChecklist = function (event) {
        if (event.target.className != 'optionsMore' && event.target.parentNode.className != 'optionsMore') {
            this.moreOptionsChecklist = false;
        }
    };
    OptionsTasksComponent.prototype.onModifyComment = function (id) {
        this.modifyComment = true;
        this.idModifyComment = id;
    };
    OptionsTasksComponent.prototype.offModifyComment = function (event) {
        if (event.target.classList[1] != 'modifyComments') {
            this.modifyComment = false;
        }
    };
    OptionsTasksComponent.prototype.onModifyChecklist = function (id) {
        this.modifyChecklist = true;
        this.idModifyChecklist = id;
    };
    OptionsTasksComponent.prototype.offModifyChecklist = function (event) {
        if (event.target.classList[1] != 'modifyChecklist') {
            this.modifyChecklist = false;
        }
    };
    OptionsTasksComponent.prototype.showSearchMembros = function () {
        this.searchMembros = true;
    };
    OptionsTasksComponent.prototype.hideSearchMembros = function () {
        this.searchMembros = false;
    };
    OptionsTasksComponent.prototype.fechaAlterarTarefa = function (event) {
        if (event.target.className == 'background') {
            this.dragDropService.offOptionsTasks();
        }
    };
    return OptionsTasksComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('conteudoNav'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object)
], OptionsTasksComponent.prototype, "conteudoNav", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLNameTask'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _b || Object)
], OptionsTasksComponent.prototype, "HTMLNameTask", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLDescription'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _c || Object)
], OptionsTasksComponent.prototype, "HTMLDescription", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLFinalDate'),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _d || Object)
], OptionsTasksComponent.prototype, "HTMLFinalDate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLInputComment'),
    __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _e || Object)
], OptionsTasksComponent.prototype, "HTMLInputComment", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLInputChecklist'),
    __metadata("design:type", typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _f || Object)
], OptionsTasksComponent.prototype, "HTMLInputChecklist", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLSearch'),
    __metadata("design:type", typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _g || Object)
], OptionsTasksComponent.prototype, "HTMLSearch", void 0);
OptionsTasksComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-options-tasks',
        template: __webpack_require__("../../../../../src/app/drag-drop/options-tasks/options-tasks.component.html"),
        styles: [__webpack_require__("../../../../../src/app/drag-drop/options-tasks/options-tasks.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1__drag_drop_service__["a" /* DragDropService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__drag_drop_service__["a" /* DragDropService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_3__projects_projects_service_service__["a" /* ProjectsServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__projects_projects_service_service__["a" /* ProjectsServiceService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_2__Services_core_service__["a" /* CoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_core_service__["a" /* CoreService */]) === "function" && _k || Object])
], OptionsTasksComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=options-tasks.component.js.map

/***/ }),

/***/ "../../../../../src/app/drag-drop/pesquisa-de-membros-do-projeto.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PesquisaDeMembrosDoProjetoPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PesquisaDeMembrosDoProjetoPipe = (function () {
    function PesquisaDeMembrosDoProjetoPipe() {
    }
    PesquisaDeMembrosDoProjetoPipe.prototype.transform = function (membros, term, add) {
        if (term === undefined)
            return membros;
        return membros.filter(function (user) {
            for (var i = 0; i < add.length; i++) {
                if (user.id_user === add[i].id_user) {
                    return false;
                }
            }
            if (user.name.toUpperCase().indexOf(term.toUpperCase()) !== -1 || user.name.toUpperCase().indexOf(term.toUpperCase()) !== -1) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    return PesquisaDeMembrosDoProjetoPipe;
}());
PesquisaDeMembrosDoProjetoPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
        name: 'pesquisaDeMembrosDoProjeto'
    })
], PesquisaDeMembrosDoProjetoPipe);

//# sourceMappingURL=pesquisa-de-membros-do-projeto.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/esqueci-minha-senha/esqueceu-seu-senha-alterar/esqueceu-seu-senha-alterar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "container {\r\n  width: 100%;\r\n  height: 100vh;\r\n  /*background-image: url(\"./../../assets/background.jpg\");*/\r\n  background-color: #00BCD4;\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/pexels.jpg") + ");\r\n  background-size: 100% 100vh;\r\n  overflow:hidden;\r\n}\r\n.login {\r\n  margin: auto;\r\n  margin-top: calc(50vh - 75px);\r\n  width: 300px;\r\n  height: 150px;\r\n  background-color: rgba(255,255,255, .5);\r\n  position: relative;\r\n  overflow: hidden;\r\n  /*display: flex;*/\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/esqueci-minha-senha/esqueceu-seu-senha-alterar/esqueceu-seu-senha-alterar.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"position: relative; width: 200px; float:left; top: 10px; left: 50px;\">\r\n\r\n  <input id=\"senha\" #HTMLusuario [(ngModel)]=\"senha\" value=\"{{ senha }}\" (blur)=\"chama()\" class=\"textFields\" type=\"text\" name=\"senha\"/>\r\n  <label [style.color]=\"codeStatusUsuario == '404' ? '#F44336' : ''\" class=\"labelText\" for=\"senha\">Senha</label>\r\n  <div [style.background-color]=\"codeStatusUsuario == '404' ? '#F44336' : ''\" class=\"border\"></div>\r\n\r\n  <label\r\n    [style.color]=\"codeStatusUsuario == '404' ? '#F44336' : ''\"\r\n    [style.display]=\"codeStatusUsuario == '404' ? 'block' : 'none'\"\r\n    class=\"helperText\">{{ mensagemUsuario }}</label>\r\n\r\n</div>\r\n\r\n<div style=\"position: relative; width: 200px; float:left; top: 55px; left: 50px;\">\r\n\r\n  <input id=\"confirmaSenha\" #HTMLusuario [(ngModel)]=\"confirmaSenha\" value=\"{{ confirmaSenha }}\" (blur)=\"chama()\" class=\"textFields\" type=\"text\" name=\"usuario\"/>\r\n  <label [style.color]=\"codeStatusUsuario == '404' ? '#F44336' : ''\" class=\"labelText\" for=\"confirmaSenha\">Confirme a Senha</label>\r\n  <div [style.background-color]=\"codeStatusUsuario == '404' ? '#F44336' : ''\" class=\"border\"></div>\r\n\r\n  <label\r\n    [style.color]=\"codeStatusUsuario == '404' ? '#F44336' : ''\"\r\n    [style.display]=\"codeStatusUsuario == '404' ? 'block' : 'none'\"\r\n    class=\"helperText\">{{ mensagemUsuario }}</label>\r\n\r\n</div>\r\n\r\n<button\r\n  style=\"float:left; position: relative; width:200px; top:100px; left: 50px; \"\r\n  class=\"denseButton\"\r\n  (click)=\"verificaUsuario()\">\r\n  RECUPERAR\r\n</button>\r\n"

/***/ }),

/***/ "../../../../../src/app/esqueci-minha-senha/esqueceu-seu-senha-alterar/esqueceu-seu-senha-alterar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EsqueceuSeuSenhaAlterarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EsqueceuSeuSenhaAlterarComponent = (function () {
    function EsqueceuSeuSenhaAlterarComponent() {
    }
    EsqueceuSeuSenhaAlterarComponent.prototype.ngOnInit = function () {
    };
    return EsqueceuSeuSenhaAlterarComponent;
}());
EsqueceuSeuSenhaAlterarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-esqueceu-seu-senha-alterar',
        template: __webpack_require__("../../../../../src/app/esqueci-minha-senha/esqueceu-seu-senha-alterar/esqueceu-seu-senha-alterar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/esqueci-minha-senha/esqueceu-seu-senha-alterar/esqueceu-seu-senha-alterar.component.css")]
    }),
    __metadata("design:paramtypes", [])
], EsqueceuSeuSenhaAlterarComponent);

//# sourceMappingURL=esqueceu-seu-senha-alterar.component.js.map

/***/ }),

/***/ "../../../../../src/app/esqueci-minha-senha/esqueceu-sua-senha/esqueceu-sua-senha.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\r\n  width: 100%;\r\n  height: 100vh;\r\n  /*background-image: url(\"./../../assets/background.jpg\");*/\r\n  background-color: #00BCD4;\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/pexels.jpg") + ");\r\n  background-size: 100% 100vh;\r\n  overflow:hidden;\r\n}\r\n.login {\r\n  margin: auto;\r\n  margin-top: calc(50vh - 75px);\r\n  width: 300px;\r\n  height: 150px;\r\n  background-color: rgba(255,255,255, .5);\r\n  position: relative;\r\n  overflow: hidden;\r\n  /*display: flex;*/\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/esqueci-minha-senha/esqueceu-sua-senha/esqueceu-sua-senha.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n    <div style=\"width: auto; display: flex\">\r\n\r\n\r\n      <div class=\"tela\" style=\"min-width: calc(100% - 100px ); float: left; margin: 15px 50px;\">\r\n        <div style=\"color: rgba(0,0,0, .54); cursor: default; user-select: none; font-family: 'Roboto'; font-size: 15px; text-align: center; width: 100%; margin-bottom: 15px;\">Digite seu Usuario ou Email</div>\r\n        <div style=\"position: relative; width: 200px; float:left;\">\r\n\r\n          <input id=\"usuario\" #HTMLusuario [(ngModel)]=\"usuario\" value=\"{{ usuario }}\" (blur)=\"chama()\" class=\"textFields\" type=\"text\" name=\"usuario\"/>\r\n          <label [style.color]=\"codeStatusUsuario == '404' ? '#F44336' : ''\" class=\"labelText\" for=\"usuario\">Usuario</label>\r\n          <div [style.background-color]=\"codeStatusUsuario == '404' ? '#F44336' : ''\" class=\"border\"></div>\r\n\r\n          <label\r\n            [style.color]=\"codeStatusUsuario == '404' ? '#F44336' : ''\"\r\n            [style.display]=\"codeStatusUsuario == '404' ? 'block' : 'none'\"\r\n            class=\"helperText\">{{ mensagemUsuario }}</label>\r\n\r\n        </div>\r\n\r\n        <button\r\n                style=\"float:left; width:200px; margin-top:60px; \"\r\n                class=\"denseButton\"\r\n                (click)=\"verificaUsuario()\">\r\n          RECUPERAR\r\n        </button>\r\n      </div>\r\n    </div>\r\n\r\n<!--<app-snackbars>-->\r\n\r\n<!--</app-snackbars>-->\r\n"

/***/ }),

/***/ "../../../../../src/app/esqueci-minha-senha/esqueceu-sua-senha/esqueceu-sua-senha.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_core_service__ = __webpack_require__("../../../../../src/app/Services/core.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_snackbars_snackbars_service__ = __webpack_require__("../../../../../src/app/components/snackbars/snackbars.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EsqueceuSuaSenhaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EsqueceuSuaSenhaComponent = (function () {
    function EsqueceuSuaSenhaComponent(http, snackbarsService, core) {
        this.http = http;
        this.snackbarsService = snackbarsService;
        this.core = core;
        this.usuario = '';
        this.codeStatusUsuario = '';
        this.mensagemUsuario = '';
    }
    EsqueceuSuaSenhaComponent.prototype.ngOnInit = function () { };
    EsqueceuSuaSenhaComponent.prototype.chama = function () {
        if (this.usuario.length > 0) {
            this.HTMLusuario.nativeElement.classList.add('textFieldsPreenchido');
        }
        else {
            this.HTMLusuario.nativeElement.classList.remove('textFieldsPreenchido');
        }
    };
    EsqueceuSuaSenhaComponent.prototype.verificaUsuario = function () {
        var _this = this;
        if (this.usuario) {
            var url = 'http://' + this.core.ipDaApi + '/userinfo?user=' + this.usuario;
            return this.http.get(url)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.codeStatusUsuario = '200';
                _this.mensagemUsuario = res;
            }, function (error) {
                _this.codeStatusUsuario = error.status,
                    _this.emailInvalido();
            }, function () {
                _this.emailValido();
            });
        }
        else {
            this.codeStatusUsuario = '404';
            this.mensagemUsuario = 'Digite um usuario';
        }
    };
    EsqueceuSuaSenhaComponent.prototype.emailInvalido = function () {
        if (this.codeStatusUsuario == '404') {
            this.mensagemUsuario = 'Usuário inexistente';
        }
    };
    EsqueceuSuaSenhaComponent.prototype.emailValido = function () {
        var _this = this;
        this.snackbarsService.inserirSnackbar('Aguarde');
        var url = 'http://' + this.core.ipDaApi + '/newpass';
        var json = JSON.stringify({
            email: this.usuario,
        });
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(url, params, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.snackbarsService.inserirSnackbar('Email Enviado');
        }),
            function (error) {
            },
            function () {
            };
    };
    return EsqueceuSuaSenhaComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLusuario'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object)
], EsqueceuSuaSenhaComponent.prototype, "HTMLusuario", void 0);
EsqueceuSuaSenhaComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-esqueceu-sua-senha',
        template: __webpack_require__("../../../../../src/app/esqueci-minha-senha/esqueceu-sua-senha/esqueceu-sua-senha.component.html"),
        styles: [__webpack_require__("../../../../../src/app/esqueci-minha-senha/esqueceu-sua-senha/esqueceu-sua-senha.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__components_snackbars_snackbars_service__["a" /* SnackbarsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__components_snackbars_snackbars_service__["a" /* SnackbarsService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__Services_core_service__["a" /* CoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_core_service__["a" /* CoreService */]) === "function" && _d || Object])
], EsqueceuSuaSenhaComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=esqueceu-sua-senha.component.js.map

/***/ }),

/***/ "../../../../../src/app/esqueci-minha-senha/esqueci-minha-senha.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\r\n  width: 100%;\r\n  height: 100vh;\r\n  /*background-image: url(\"./../../assets/background.jpg\");*/\r\n  background-color: #0097A7;\r\n  /*background-image: url(\"../../assets/pexels.jpg\");*/\r\n  background-size: 100% 100vh;\r\n  overflow:hidden;\r\n}\r\n@media screen and (max-width: 1440px) {\r\n  .container {\r\n    background-size: 1642px 1088px;\r\n    background-position: center;\r\n  }\r\n}\r\n.login {\r\n  margin: auto;\r\n  margin-top: calc(50vh - 75px);\r\n  width: 300px;\r\n  height: 150px;\r\n  background-color: rgba(255,255,255, .5);\r\n  position: relative;\r\n  overflow: hidden;\r\n  /*display: flex;*/\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/esqueci-minha-senha/esqueci-minha-senha.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div class=\"login\" #login>\r\n    <router-outlet></router-outlet>\r\n  </div>\r\n</div>\r\n<app-snackbars>\r\n\r\n</app-snackbars>\r\n"

/***/ }),

/***/ "../../../../../src/app/esqueci-minha-senha/esqueci-minha-senha.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_snackbars_snackbars_module__ = __webpack_require__("../../../../../src/app/components/snackbars/snackbars.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__esqueci_minha_senha__ = __webpack_require__("../../../../../src/app/esqueci-minha-senha/esqueci-minha-senha.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__esqueceu_sua_senha_esqueceu_sua_senha_component__ = __webpack_require__("../../../../../src/app/esqueci-minha-senha/esqueceu-sua-senha/esqueceu-sua-senha.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__esqueceu_seu_senha_alterar_esqueceu_seu_senha_alterar_component__ = __webpack_require__("../../../../../src/app/esqueci-minha-senha/esqueceu-seu-senha-alterar/esqueceu-seu-senha-alterar.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EsqueciMinhaSenhaModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var EsqueciMinhaSenhaModule = (function () {
    function EsqueciMinhaSenhaModule() {
    }
    return EsqueciMinhaSenhaModule;
}());
EsqueciMinhaSenhaModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["k" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_4__components_snackbars_snackbars_module__["a" /* SnackbarsModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__esqueci_minha_senha__["a" /* EsqueciMinhaSenhaComponent */],
            __WEBPACK_IMPORTED_MODULE_6__esqueceu_sua_senha_esqueceu_sua_senha_component__["a" /* EsqueceuSuaSenhaComponent */],
            __WEBPACK_IMPORTED_MODULE_7__esqueceu_seu_senha_alterar_esqueceu_seu_senha_alterar_component__["a" /* EsqueceuSeuSenhaAlterarComponent */]
        ]
    })
], EsqueciMinhaSenhaModule);

//# sourceMappingURL=esqueci-minha-senha.module.js.map

/***/ }),

/***/ "../../../../../src/app/esqueci-minha-senha/esqueci-minha-senha.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EsqueciMinhaSenhaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EsqueciMinhaSenhaComponent = (function () {
    function EsqueciMinhaSenhaComponent() {
    }
    EsqueciMinhaSenhaComponent.prototype.ngOnInit = function () { };
    return EsqueciMinhaSenhaComponent;
}());
EsqueciMinhaSenhaComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-esqueceu-sua-senha',
        template: __webpack_require__("../../../../../src/app/esqueci-minha-senha/esqueci-minha-senha.html"),
        styles: [__webpack_require__("../../../../../src/app/esqueci-minha-senha/esqueci-minha-senha.css")]
    }),
    __metadata("design:paramtypes", [])
], EsqueciMinhaSenhaComponent);

//# sourceMappingURL=esqueci-minha-senha.js.map

/***/ }),

/***/ "../../../../../src/app/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".topo {\r\n  width: 100%;\r\n  height: 56px;\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  background-color: #006064;\r\n  box-shadow: 0px 0px 4px rgba(0, 0, 0, .14),\r\n  0px 3px 4px rgba(0, 0, 0, .12),\r\n  0px 1px 5px rgba(0, 0, 0, .20);\r\n  /*text-shadow: 1px 1px rgba(0,0,0,.14);*/\r\n  color: #FAFAFA;\r\n\r\n}\r\n\r\n.cadastrese {\r\n  float: right;\r\n  margin-top: 12px;\r\n  margin-right: 15px;\r\n  background-color: #0097A7;\r\n  color: #FAFAFA;\r\n  line-height: 32px;\r\n}\r\n\r\n.login {\r\n  float: right;\r\n  margin-top: 12px;\r\n  margin-right: 15px;\r\n  background-color: transparent;\r\n  color: #FAFAFA;\r\n  line-height: 32px;\r\n}\r\n\r\n.meio1 {\r\n  width: 100%;\r\n  min-height: 100vh;\r\n  background-color: #0097A7;\r\n  /*background-image: url(\"./../../assets/pexels.jpg\");*/\r\n  background-size: 100% 100%;\r\n  text-align: center;\r\n  overflow: hidden;\r\n}\r\n\r\nh1 {\r\n  font-size: 58px;\r\n  margin: 40px 0 16px 0;\r\n}\r\n\r\n.meio1 .conteudo {\r\n  width: 100%;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  height: calc(100vh - 48px);\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n\r\n}\r\n\r\n.meio1 .sub {\r\n\r\n  float: left;\r\n  margin-top: 70px;\r\n  color: #EEEEEE;\r\n  font-family: 'Roboto';\r\n  padding: 50px 20px;\r\n  font-size: 23px;\r\n  cursor: default;\r\n  /*background-color: rgba(0,0,0,0.12);*/\r\n}\r\n\r\n.divisoria {\r\n  width: 100%;\r\n  height: 50vh;\r\n  background-color: #03A9F4;\r\n}\r\n\r\n.meio2 {\r\n  width: 100%;\r\n  height: 100vh;\r\n  background-color: #0057e7;\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/pexels2.png") + ");\r\n  background-size: 100% 100%;\r\n}\r\n\r\n@media screen and (max-width: 1440px) {\r\n  .meio1 {\r\n    background-size: 1642px 1088px;\r\n    background-position: center;\r\n  }\r\n}\r\n\r\n@media screen and (max-width: 480px) {\r\n  h1 {\r\n    font-size: 42px;\r\n    margin: 40px 0 16px 0;\r\n  }\r\n\r\n}\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div class=\"topo\">\r\n      <a routerLink=\"/cadastro\" class=\"denseButton cadastrese\"\r\n         style=\"\">\r\n        CADASTRAR-SE\r\n      </a>\r\n    <a routerLink=\"/login\" class=\"denseButton login\">\r\n      FAZER LOGIN\r\n    </a>\r\n  </div>\r\n\r\n  <div class=\"meio1\">\r\n    <div class=\"conteudo\">\r\n\r\n      <div class=\"sub\">\r\n        <h1>A Melhor Maneira de Organizar seus projetos</h1>\r\n        <p>Acabe com as excessivas trocas de e-mails, dados desatualizados, papeis que não acabam mais e softwares complicados\r\n          WebPost organiza tudo isso pra você.\r\n        </p>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_dados_de_usuario_service__ = __webpack_require__("../../../../../src/app/Services/dados-de-usuario.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_menu_menu_component__ = __webpack_require__("../../../../../src/app/components/menu/menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomeComponent = (function () {
    // @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
    // @Output() closeChange: EventEmitter<any> = new EventEmitter();
    function HomeComponent(dadosDeUsuarioService, elementRef, router) {
        this.dadosDeUsuarioService = dadosDeUsuarioService;
        this.elementRef = elementRef;
        this.router = router;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        // FAZ O LOGIN QUANDO O USUARIO JÁ ESTÁ AUTENTICADO
        if (this.dadosDeUsuarioService.getCookieTokken()) {
            this.dadosDeUsuarioService.logar()
                .subscribe(function (res) {
                _this.router.navigate(['/main']);
            });
        }
    };
    return HomeComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Input */])('menu'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__components_menu_menu_component__["a" /* MenuComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__components_menu_menu_component__["a" /* MenuComponent */]) === "function" && _a || Object)
], HomeComponent.prototype, "menu", void 0);
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-home',
        template: __webpack_require__("../../../../../src/app/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _d || Object])
], HomeComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\r\n  width: 100%;\r\n  height: 100vh;\r\n  background-color: #006064;\r\n  background-size: 100% 100vh;\r\n  overflow: hidden;\r\n}\r\n\r\n.login {\r\n  margin: auto;\r\n  margin-top: calc(50vh - 75px);\r\n  width: 300px;\r\n  height: 150px;\r\n  background-color: #FAFAFA;\r\n  position: relative;\r\n  overflow: hidden;\r\n  padding: 10px 0;\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, .15), 0 2px 6px rgba(0, 0, 0, .2);\r\n}\r\n\r\n.tela1 {\r\n  min-width: 100%;\r\n  float: left;\r\n  padding: 15px 25px;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.tela2 {\r\n  min-width: calc(100% - 100px);\r\n  float: left;\r\n  margin: 15px 50px;\r\n}\r\n\r\n@media screen and (max-width: 1440px) {\r\n  .container {\r\n    background-size: 1642px 1088px;\r\n    background-position: center;\r\n  }\r\n}\r\n\r\n.login img {\r\n  float: left;\r\n  width: 16px;\r\n  margin-left: 25%;\r\n  margin-top: -20%;\r\n}\r\n\r\na {\r\n  color: #323232;\r\n}\r\n\r\na:hover {\r\n  text-decoration: underline;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div class=\"login\" #login>\r\n    <div #telas style=\"width: auto; display: flex\">\r\n      <div #tela1 class=\"tela1\">\r\n\r\n        <div style=\"position: relative; width: 250px; float:left;\">\r\n          <input id=\"usuario\" #HTMLusuario [(ngModel)]=\"usuario\" (blur)=\"chama()\" (keyup.enter)=\"verificaUsuario()\"\r\n                 value=\"{{ usuario }}\" class=\"textFields\" type=\"text\" name=\"usuario\"/>\r\n          <label [style.color]=\"codeStatusUsuario == '404' ? '#F44336' : ''\" class=\"labelText\"\r\n                 for=\"usuario\">Usuario</label>\r\n          <div [style.background-color]=\"codeStatusUsuario == '404' ? '#F44336' : ''\" class=\"border\"></div>\r\n\r\n          <label\r\n            [style.color]=\"codeStatusUsuario == '404' ? '#F44336' : ''\"\r\n            [style.display]=\"codeStatusUsuario == '404' ? 'block' : 'none'\"\r\n            class=\"helperText\">{{ mensagemUsuario }}\r\n          </label>\r\n        </div>\r\n        <button (click)=\"verificaUsuario()\"\r\n                style=\"float:left; width:250px; margin-top:55px;\"\r\n                class=\"denseButton\">\r\n          PROXIMO\r\n        </button>\r\n\r\n        <span style=\"width:250px; float: left; margin-top: 15px; text-align: right; font-size: 13px; color: #ff0000\">\r\n          <a routerLink=\"/cadastro\">\r\n            Cadastrar-se\r\n        </a></span>\r\n\r\n      </div>\r\n\r\n\r\n      <div #tela2 class=\"tela2\">\r\n        <!--<img src=\"./../../../assets/arrow_back.svg\" #arrowBack (click)=\"voltaAoEmail()\">-->\r\n        <i class=\"material-icons pointer\" #arrowBack (click)=\"voltaAoEmail()\">arrow_back</i>\r\n        <div style=\"position: relative; width: 225px; float:left;\">\r\n\r\n          <input id=\"senha\" #HTMLsenha [(ngModel)]=\"senha\" (blur)=\"chama()\" (keyup.enter)=\"verificaSenha()\"\r\n                 value=\"{{ senha }}\" class=\"textFields\" type=\"password\" name=\"senha\"/>\r\n          <label [style.color]=\"codeStatusSenha == '401' ? '#F44336' : ''\" class=\"labelText\" for=\"senha\">Senha</label>\r\n          <div [style.background-color]=\"codeStatusSenha == '401' ? '#F44336' : ''\" class=\"border\"></div>\r\n\r\n          <label\r\n            [style.color]=\"codeStatusSenha == '401' ? '#F44336' : ''\"\r\n            [style.display]=\"codeStatusSenha == '401' ? 'block' : 'none'\"\r\n            class=\"helperText\">{{ mensagemSenha }}</label>\r\n\r\n          <label style=\"float:left; width:225px; text-align:right; margin-top:45px; font-size:12px; color:#333;\"><a\r\n            routerLink=\"/esqueciMinhaSenha\">Esqueci minha</a></label>\r\n        </div>\r\n\r\n        <button (click)=\"verificaSenha()\"\r\n                style=\"float:left; width:225px; margin-top:20px; \"\r\n                class=\"denseButton\">\r\n          ENTRAR\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<app-arrow-back routerLink=\"/home\"></app-arrow-back>\r\n"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_core_service__ = __webpack_require__("../../../../../src/app/Services/core.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_dados_de_usuario_service__ = __webpack_require__("../../../../../src/app/Services/dados-de-usuario.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginComponent = (function () {
    function LoginComponent(http, router, core, dadosService) {
        this.http = http;
        this.router = router;
        this.core = core;
        this.dadosService = dadosService;
        this.usuario = '';
        this.senha = '';
        this.tokken = '';
        this.mensagemUsuario = '';
        this.codeStatusUsuario = '';
        this.mensagemSenha = '';
        this.codeStatusSenha = '';
    }
    LoginComponent.prototype.chama = function () {
        this.usuario.length > 0 ? this.HTMLusuario.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLusuario.nativeElement.classList.remove('textFieldsPreenchido');
        this.senha.length > 0 ? this.HTMLsenha.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLsenha.nativeElement.classList.remove('textFieldsPreenchido');
    };
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        // FAZ O LOGIN QUANDO O USUARIO JÁ ESTÁ AUTENTICADO
        if (this.dadosService.getCookieTokken()) {
            this.dadosService.logar()
                .subscribe(function (res) {
                _this.router.navigate(['/main']);
            });
        }
        this.HTMLusuario.nativeElement.focus();
    };
    LoginComponent.prototype.verificaUsuario = function () {
        var _this = this;
        if (this.usuario) {
            this.dadosService.verificaUsuarioLogin(this.usuario)
                .subscribe(function (res) {
                _this.codeStatusUsuario = '200';
                _this.emailValido();
            }, function (error) {
                _this.codeStatusUsuario = error.status,
                    _this.emailInvalido();
            }, function () {
            });
        }
        else {
            this.codeStatusUsuario = '404';
            this.mensagemUsuario = 'Digite um usuario';
        }
    };
    LoginComponent.prototype.emailInvalido = function () {
        if (this.codeStatusUsuario == '404') {
            this.mensagemUsuario = 'Usuário inexistente';
        }
    };
    LoginComponent.prototype.emailValido = function () {
        var _this = this;
        this.telas.nativeElement.style = "transition: all 480ms ease-out; width:auto; display:flex; transform: translateX(-100%)";
        this.arrowBack.nativeElement.style = 'float: left; margin-left: -40px; margin-top:5px; width: 24px;';
        setTimeout(function () {
            _this.HTMLsenha.nativeElement.focus();
        }, 480);
    };
    LoginComponent.prototype.voltaAoEmail = function () {
        var _this = this;
        this.telas.nativeElement.style = 'transition: all 480ms ease-out; width:auto; display:flex; transform: translateX(0)';
        setTimeout(function () {
            _this.HTMLusuario.nativeElement.focus();
        }, 480);
    };
    LoginComponent.prototype.verificaSenha = function () {
        var _this = this;
        if (this.senha) {
            this.dadosService.gerarTokken(this.usuario, this.senha)
                .subscribe(function (data) {
                _this.tokken = data;
                _this.codeStatusSenha = '200';
                _this.dadosService.criarCookie(_this.tokken.token);
                // Limpa a variavel tokken
                _this.tokken = '';
                // FAZ O LOGIN
                _this.dadosService.logar()
                    .subscribe(function (res) {
                    _this.mensagemUsuario = res;
                }, function (error) {
                }, function () {
                    _this.router.navigate(['/main']);
                });
            }, function (error) {
                _this.codeStatusSenha = '401';
                _this.mensagemSenha = 'Senha incorreta';
            }, function () {
            });
        }
        else {
            this.codeStatusSenha = '401';
            this.mensagemSenha = 'Digite sua senha';
        }
    };
    return LoginComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLusuario'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object)
], LoginComponent.prototype, "HTMLusuario", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLsenha'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _b || Object)
], LoginComponent.prototype, "HTMLsenha", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('telas'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _c || Object)
], LoginComponent.prototype, "telas", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('tela1'),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _d || Object)
], LoginComponent.prototype, "tela1", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('tela2'),
    __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _e || Object)
], LoginComponent.prototype, "tela2", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('arrowBack'),
    __metadata("design:type", typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _f || Object)
], LoginComponent.prototype, "arrowBack", void 0);
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-login',
        template: __webpack_require__("../../../../../src/app/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/login/login.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_4__Services_core_service__["a" /* CoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_core_service__["a" /* CoreService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_5__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */]) === "function" && _k || Object])
], LoginComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/main/main.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@-webkit-keyframes notificacao {\r\n  0% {\r\n    -webkit-transform: rotate(0deg);\r\n            transform: rotate(0deg);\r\n  }\r\n  25% {\r\n    -webkit-transform: rotate(5deg);\r\n            transform: rotate(5deg);\r\n  }\r\n  50% {\r\n    -webkit-transform: rotate(0deg);\r\n            transform: rotate(0deg);\r\n  }\r\n  100% {\r\n    -webkit-transform: rotate(-5deg);\r\n            transform: rotate(-5deg);\r\n  }\r\n}\r\n\r\n@keyframes notificacao {\r\n  0% {\r\n    -webkit-transform: rotate(0deg);\r\n            transform: rotate(0deg);\r\n  }\r\n  25% {\r\n    -webkit-transform: rotate(5deg);\r\n            transform: rotate(5deg);\r\n  }\r\n  50% {\r\n    -webkit-transform: rotate(0deg);\r\n            transform: rotate(0deg);\r\n  }\r\n  100% {\r\n    -webkit-transform: rotate(-5deg);\r\n            transform: rotate(-5deg);\r\n  }\r\n}\r\n\r\nheader {\r\n  width: 100vw;\r\n  height: 56px;\r\n  background-color: #006064;\r\n  box-shadow: 0px 0px 4px rgba(0, 0, 0, .14),\r\n  0px 3px 4px rgba(0, 0, 0, .12),\r\n  0px 1px 5px rgba(0, 0, 0, .20);\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  box-sizing: border-box;\r\n  position: absolute;\r\n  z-index: 24;\r\n}\r\n\r\n.hamburger, .inverseHamburger {\r\n  float: left;\r\n  width: 48px;\r\n  height: 48px;\r\n  margin-top: 4px;\r\n  margin-left: 24px;\r\n  border-radius: 50%;\r\n  text-align: center;\r\n}\r\n\r\n.hamburger:hover {\r\n  background-color: rgba(255, 255, 255, 0.14)\r\n}\r\n\r\n.inverseHamburger:hover {\r\n  background-color: rgba(0, 0, 0, 0.14);\r\n}\r\n\r\n.hamburger img, .inverseHamburger img {\r\n  margin-top: 12px;\r\n}\r\n\r\n.campoDePesquisa {\r\n  position: absolute;\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/search.svg") + ");\r\n  background-repeat: no-repeat;\r\n  background-size: 24px 24px;\r\n  padding-left: 35px;\r\n  font-size: 18px;\r\n  color: #f4f4f4;\r\n  height: 24px;\r\n  background-color: transparent;\r\n  outline: none;\r\n  min-width: 150px;\r\n  max-width: 30%;\r\n  margin-left: 5px;\r\n  margin-top: 17px;\r\n  border: none\r\n}\r\n\r\n.campoDePesquisa ~ label {\r\n  position: absolute;\r\n  font-size: 16px;\r\n  top: 20px;\r\n  left: 110px;\r\n  color: #f4f4f4;\r\n}\r\n\r\nnav {\r\n  display: block;\r\n  position: absolute;\r\n  width: 320px;\r\n  left: -320px;\r\n  min-height: 100vh;\r\n  background-color: #F5F5F5;\r\n  box-shadow: 8px 0px 10px rgba(0, 0, 0, .14),\r\n  3px 0px 14px rgba(0, 0, 0, .12),\r\n  4px 0px 15px rgba(0, 0, 0, .20);\r\n  transition: All 480ms ease-in;\r\n  z-index: 24;\r\n}\r\n\r\nnav ul {\r\n  list-style: none;\r\n  margin-top: 50px;\r\n}\r\n\r\nnav li {\r\n  width: calc(90%);\r\n  height: 40px;\r\n  line-height: 40px;\r\n  background-color: #f4f4f4;\r\n  color: #111;\r\n  border-radius: 5px;\r\n  cursor: pointer;\r\n  margin: 5px 5%;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  overflow: hidden;\r\n  box-shadow: 0px 0px 4px rgba(0, 0, 0, .14),\r\n  0px 3px 4px rgba(0, 0, 0, .12),\r\n  0px 1px 5px rgba(0, 0, 0, .20);\r\n}\r\n\r\nnav li:hover {\r\n  background-color: rgba(255, 255, 255, 0.14);\r\n  transition: All 280ms ease-in\r\n}\r\n\r\nnav li span {\r\n  float: left;\r\n  width: 80%;\r\n  text-align: center;\r\n\r\n}\r\n\r\nnav li .img {\r\n  float: left;\r\n  width: 20%;\r\n  height: 40px;\r\n  background-color: #0097A7;\r\n  text-align: center;\r\n  line-height: 40px;\r\n  color: #fff;\r\n}\r\n\r\nnav li .img img {\r\n  width: 100%;\r\n}\r\n\r\nnav ul .titulo {\r\n  background-color: transparent;\r\n  color: #757575;\r\n  font-family: 'Roboto';\r\n  font-size: 13px;\r\n  height: 25px;\r\n  line-height: 25px;\r\n  border-radius: 0;\r\n  cursor: default;\r\n  margin: 5px 5%;\r\n  text-transform: uppercase;\r\n  box-shadow: none;\r\n}\r\n\r\n/*nav li:last-child {\r\n  width: calc(100% - 50px);\r\n  position: absolute;\r\n  bottom: 25px;\r\n  text-align: right;\r\n  padding-left: 0;\r\n  padding-right: 50px;\r\n  border: none;\r\n}*/\r\n.perfil {\r\n  float: right;\r\n  height: 46px;\r\n  padding: 0 10px;\r\n  margin-top: 5px;\r\n  margin-right: 16px;\r\n  overflow: hidden;\r\n  /*min-width: 100px;*/\r\n  cursor: pointer;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  border-radius: 50px;\r\n  text-transform: capitalize;\r\n}\r\n\r\n.perfil:hover {\r\n  background-color: rgba(255, 255, 255, 0.14);\r\n}\r\n\r\n.perfil .img {\r\n  width: 36px;\r\n  height: 36px;\r\n  margin-top: 5px;\r\n  border-radius: 50%;\r\n  background-color: #CFD8DC;\r\n  color: #FFF;\r\n  text-align: center;\r\n  line-height: 36px;\r\n  float: right;\r\n}\r\n\r\n.perfil span {\r\n  float: left;\r\n  /*min-width: 100px;*/\r\n  line-height: 36px;\r\n  margin-right: 10px;\r\n  margin-top: 5px;\r\n  color: #FFF;\r\n}\r\n\r\nheader .checkPerfil:checked ~ .opPerfil {\r\n  -webkit-transform: scale(1);\r\n          transform: scale(1);\r\n  transition: All 480ms ease-out;\r\n}\r\n\r\nheader .checkNav:checked ~ nav {\r\n  display: block;\r\n  position: absolute;\r\n  /*width: 20%;*/\r\n  left: 0;\r\n  height: 100%;\r\n  transition: All 480ms ease-out;\r\n}\r\n\r\n.notificacoes {\r\n  width: 48px;\r\n  height: 48px;\r\n  margin-top: 4px;\r\n  border-radius: 50%;\r\n  text-align: center;\r\n  float: right;\r\n  cursor: pointer;\r\n  position: relative;\r\n}\r\n\r\n.notificacoes:hover {\r\n  background-color: rgba(255, 255, 255, .14);\r\n}\r\n\r\n.notificacoes img {\r\n  width: 24px;\r\n  height: 24px;\r\n  margin-top: 12px;\r\n  margin-right: 12px;\r\n  float: right;\r\n  cursor: pointer;\r\n  transition: All 100ms ease-out;\r\n}\r\n\r\n.notificacoes img:hover {\r\n  -webkit-animation-name: notificacao;\r\n          animation-name: notificacao;\r\n  -webkit-animation-duration: 300ms;\r\n          animation-duration: 300ms;\r\n  -webkit-animation-iteration-count: infinite;\r\n          animation-iteration-count: infinite;\r\n}\r\n\r\n.notificacoes .qtdNotificacoes {\r\n  width: 8px;\r\n  height: 8px;\r\n  border-radius: 50%;\r\n  background-color: #f00;\r\n  position: absolute;\r\n  top: 8px;\r\n  right: 8px;\r\n}\r\n\r\n.container {\r\n  width: 100vw;\r\n  min-height: calc(100vh - 48px);\r\n  background-color: #EEE;\r\n  position: absolute;\r\n  /*z-index: 0;*/\r\n  top: 46px;\r\n}\r\n\r\n@media screen and (max-width: 480px) {\r\n  .perfil span {\r\n    display: none;\r\n  }\r\n\r\n  .perfil {\r\n    min-width: auto;\r\n  }\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/main/main.component.html":
/***/ (function(module, exports) {

module.exports = "<header>\r\n  <label for=\"check\">\r\n\r\n  </label>\r\n  <input class=\"checkNav\" type=\"checkbox\" id=\"check\" style=\"display:none\"/>\r\n\r\n  <nav>\r\n    <label for=\"check\">\r\n      <div class=\"inverseHamburger\">\r\n        <img src=\"../../assets/hamburger_black.svg\"/>\r\n      </div>\r\n    </label>\r\n\r\n    <ul>\r\n      <li class=\"titulo\">Configurações de Usuario</li>\r\n\r\n        <li *ngFor=\"let projeto of projects.projects\">\r\n\r\n          <div class=\"img\" *ngIf=\"projeto.img != '/imgsProjects/default.png'\">\r\n          <img src=\"{{'http://' + core.ipDaApi + projeto.img}}\" id=\"preview\"/>\r\n          </div>\r\n          <div class=\"img\" *ngIf=\"projeto.img == '/imgsProjects/default.png'\">{{projeto.namep.charAt(0)}}</div>\r\n\r\n          <span>{{ projeto.namep }}</span>\r\n        </li>\r\n\r\n    </ul>\r\n\r\n  </nav>\r\n\r\n<div style=\"position: relative; z-index: 1;\">\r\n  <!--<label for=\"perfil\">-->\r\n\r\n\r\n    <div class=\"perfil\" [menuInfoUser]=\"menuInfoUser\">\r\n\r\n      <div style=\"float: right\" *ngIf=\"dadosDoUsuario?.dados?.img != '/imgsUser/default.png'\">\r\n        <img class=\"img\" src=\"{{'http://' + core.ipDaApi + dadosDoUsuario?.dados?.img}}\"/>\r\n      </div>\r\n\r\n      <div *ngIf=\"dadosDoUsuario.dados?.img == '/imgsUser/default.png'\" class=\"img\">{{dadosDoUsuario.dados?.name.charAt(0)}}</div>\r\n\r\n      <span>{{dadosDoUsuario.dados?.name}}</span>\r\n\r\n    </div>\r\n\r\n</div>\r\n\r\n  <div class=\"notificacoes\" (click)=\"notificacao.changeVisibility(); notificacao.changeBooleanNotification()\">\r\n    <img src=\"../../assets/notificacoes.svg\">\r\n    <div class=\"qtdNotificacoes\" *ngIf=\"notificacao?.userNotification?.newNotifications\"></div>\r\n  </div>\r\n  <app-autenticacao *ngIf=\"!dadosDoUsuario?.dados?.statusauth\"></app-autenticacao>\r\n</header>\r\n\r\n<div class=\"container\">\r\n    <router-outlet></router-outlet>\r\n</div>\r\n<app-snackbars></app-snackbars>\r\n<app-menu-info-user #menuInfoUser>\r\n  <li routerLink=\"/main\"><img src=\"../../assets/home_black.svg\"/>\r\n  <span>Home</span>\r\n  </li>\r\n  <li routerLink=\"/alterarDados\"><img src=\"../../assets/account_circle_black.svg\"/>\r\n  <span >Alterar Dados</span>\r\n  </li>\r\n  <li routerLink=\"/alterarSenha\"><img src=\"../../assets/key.svg\"/>\r\n  <span >Alterar Senha</span>\r\n  </li>\r\n  <li (click)=\"logout()\"><img src=\"../../assets/logout.svg\"/>\r\n  <span >Logout</span>\r\n  </li>\r\n</app-menu-info-user>\r\n\r\n<app-notification></app-notification>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/main/main.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_dados_de_usuario_service__ = __webpack_require__("../../../../../src/app/Services/dados-de-usuario.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_core_service__ = __webpack_require__("../../../../../src/app/Services/core.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__projects_projects_service_service__ = __webpack_require__("../../../../../src/app/projects/projects-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__notification_notification_service__ = __webpack_require__("../../../../../src/app/notification/notification.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MainComponent = (function () {
    function MainComponent(router, http, dadosDoUsuario, core, projects, notificacao) {
        this.router = router;
        this.http = http;
        this.dadosDoUsuario = dadosDoUsuario;
        this.core = core;
        this.projects = projects;
        this.notificacao = notificacao;
        this.campoDePesquisa = '';
    }
    MainComponent.prototype.ngOnInit = function () {
        this.logar();
        this.dadosDoUsuario.recuperarDadosDeUsuario();
    };
    MainComponent.prototype.chama = function () {
        if (this.campoDePesquisa.length > 0) {
            this.HTMLCampoDePesquisa.nativeElement.style = 'visibility: hidden;';
        }
        else {
            this.HTMLCampoDePesquisa.nativeElement.style = 'visibility: visible;';
        }
    };
    MainComponent.prototype.logar = function () {
        var _this = this;
        if (this.dadosDoUsuario.getCookieTokken()) {
            var url = 'http://' + this.core.ipDaApi + '/session';
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
            headers.append('Authorization', 'Bearer ' + this.dadosDoUsuario.getCookieTokken());
            return this.http.get(url, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
            }, function (error) {
                _this.router.navigate(['/']);
            }, function () {
            });
        }
    };
    MainComponent.prototype.logout = function () {
        document.cookie = "tokken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.router.navigate(['/']);
    };
    return MainComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLCampoDePesquisa'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object)
], MainComponent.prototype, "HTMLCampoDePesquisa", void 0);
MainComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-main',
        template: __webpack_require__("../../../../../src/app/main/main.component.html"),
        styles: [__webpack_require__("../../../../../src/app/main/main.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__Services_core_service__["a" /* CoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_core_service__["a" /* CoreService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__projects_projects_service_service__["a" /* ProjectsServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__projects_projects_service_service__["a" /* ProjectsServiceService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__notification_notification_service__["a" /* NotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__notification_notification_service__["a" /* NotificationService */]) === "function" && _g || Object])
], MainComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=main.component.js.map

/***/ }),

/***/ "../../../../../src/app/notification/all-notification/all-notification.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\r\n  width: 100%;\r\n  height: 100%;\r\n  padding-top: 8px;\r\n  box-sizing: border-box;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n}\r\n\r\n\r\n.container .list {\r\n  margin-top: 50px;\r\n  /*width: 480px;*/\r\n  list-style: none;\r\n}\r\n\r\n.container .list .item {\r\n  min-height: 56px;\r\n  line-height: 56px;\r\n  padding: 8px 16px;\r\n  box-sizing: border-box;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n}\r\n\r\n.container .list .item:nth-of-type(odd) {\r\n  background-color: #BDBDBD;\r\n}\r\n.container .list .item:nth-of-type(even) {\r\n  background-color: #E0E0E0;\r\n}\r\n\r\n\r\n.container .list .item .image {\r\n  width: 42px;\r\n  height: 42px;\r\n  background-color: #006064;\r\n  border-radius: 50%;\r\n  color: #FAFAFA;\r\n  text-align: center;\r\n  line-height: 42px;\r\n  font-family: 'Roboto';\r\n  background-size: cover;\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n}\r\n\r\n.container .list .item .info {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  -webkit-box-orient: horizontal;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: row;\r\n          flex-direction: row;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  width: calc(100% - 42px);\r\n}\r\n\r\n.container .list .item .info .text {\r\n  box-sizing: border-box;\r\n  line-height: normal;\r\n  padding-left: 16px;\r\n}\r\n\r\n.container .list .item .info .data {\r\n  color: #000;\r\n  font-size: 12px;\r\n  padding-left: 16px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/notification/all-notification/all-notification.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"container\">\r\n\r\n\r\n  <section class=\"list\">\r\n    <section class=\"item\" *ngFor=\"let notification of notification?.userNotificationAll?.notifications;\">\r\n\r\n      <section class=\"image\" *ngIf=\"notification.imguser == '/imgsUser/default.png'\">{{ notification.nameuser.charAt(0) |\r\n        uppercase }}\r\n      </section>\r\n      <section *ngIf=\"notification.imguser != '/imgsUser/default.png'\"\r\n               [style.background-image]=\"'url('+ 'http://' + core.ipDaApi + notification.imguser +')'\"\r\n               class=\"image\"></section>\r\n\r\n\r\n      <section class=\"info\">\r\n        <section class=\"data\">\r\n          {{ notification.date | date: 'dd/MM/yyyy' }} ás {{ notification.date | date: 'HH:mm:ss'}}\r\n        </section>\r\n\r\n        <!-- TYPE 01 -->\r\n        <section class=\"text\" *ngIf=\"notification.type == 1 && notification.targettype == 1\">{{ notification.nameuser }}\r\n          criou o bloco <b>{{ notification.nameblock }}</b> em <b>{{notification.nameproject}}</b></section>\r\n        <section class=\"text\" *ngIf=\"notification.type == 1 && notification.targettype == 2\">{{ notification.nameuser }}\r\n          criou <b>{{ notification.nametask }}</b> no bloco <b>{{ notification.nameblock }}</b> em <b>{{notification.nameproject}}</b>\r\n        </section>\r\n        <section class=\"text\" *ngIf=\"notification.type == 1 && notification.targettype == 3\">{{ notification.nameuser }}\r\n          criou um comentario em <b>{{ notification.nametask }}</b> no bloco <b>{{ notification.nameblock }}</b> em <b>{{notification.nameproject}}</b>\r\n        </section>\r\n        <section class=\"text\" *ngIf=\"notification.type == 1 && notification.targettype == 4\">{{ notification.nameuser }}\r\n          criou uma lista em <b>{{ notification.nametask }}</b> no bloco <b>{{ notification.nameblock }}</b> em <b>{{notification.nameproject}}</b>\r\n        </section>\r\n        <section class=\"text\" *ngIf=\"notification.type == 1 && notification.targettype == 5\">{{ notification.nameuser }}\r\n          criou um anexo em <b>{{ notification.nametask }}</b> no bloco <b>{{ notification.nameblock }}</b> em <b>{{notification.nameproject}}</b>\r\n        </section>\r\n        <!-- TYPE 02 -->\r\n        <section class=\"text\" *ngIf=\"notification.type == 2 && notification.targettype == 1\">{{ notification.nameuser }}\r\n          alterou o nome do projeto de <b>{{ notification.oldname}}</b> para <b>{{ notification.newname}}</b> em <b>{{notification.nameproject}}</b>\r\n        </section>\r\n        <section class=\"text\" *ngIf=\"notification.type == 2 && notification.targettype == 2 && notification.newname\">{{\r\n          notification.nameuser }} alterou a tarefa <b>{{ notification.oldname}}</b> para <b>{{ notification.newname}}</b>\r\n          em <b>{{notification.nameproject}}</b></section>\r\n        <section class=\"text\" *ngIf=\"notification.type == 2 && notification.targettype == 2 && !notification.newname\">{{\r\n          notification.nameuser }} alterou a tarefa <b>{{ notification.nametask}}</b> em <b>{{notification.nameproject}}</b>\r\n        </section>\r\n        <section class=\"text\" *ngIf=\"notification.type == 2 && notification.targettype == 3\">{{ notification.nameuser }}\r\n          alterou um comentario na tarefa <b>{{ notification.nametask}}</b> em <b>{{notification.nameproject}}</b></section>\r\n        <section class=\"text\" *ngIf=\"notification.type == 2 && notification.targettype == 4\">{{ notification.nameuser }}\r\n          alterou uma lista na tarefa <b>{{ notification.nametask}}</b> em <b>{{notification.nameproject}}</b></section>\r\n        <section class=\"text\" *ngIf=\"notification.type == 2 && notification.targettype == 5\">{{ notification.nameuser }}\r\n          alterou um anexo na tarefa <b>{{ notification.nametask}}</b> em <b>{{notification.nameproject}}</b></section>\r\n        <section class=\"text\" *ngIf=\"notification.type == 2 && notification.targettype == 6 && notification.newname\">{{\r\n          notification.nameuser }} alterou o nome do projeto de <b>{{ notification.oldname}}</b> para <b>{{notification.newname}}</b>\r\n        </section>\r\n        <section class=\"text\" *ngIf=\"notification.type == 2 && notification.targettype == 6 && !notification.newname\">{{\r\n          notification.nameuser }} alterou o projeto <b>{{ notification.oldname}}</b></section>\r\n\r\n        <section class=\"text\" *ngIf=\"notification.type == 3 && notification.targettype == 1\">{{ notification.nameuser }}\r\n          deletou o bloco <b>{{ notification.oldname}}</b> em <b>{{ notification.nameproject}}</b></section>\r\n        <section class=\"text\" *ngIf=\"notification.type == 3 && notification.targettype == 2\">{{ notification.nameuser }}\r\n          deletou a tarefa <b>{{ notification.oldname}}</b> em <b>{{ notification.nameblock}}</b> no <b>{{\r\n            notification.nameproject}}</b></section>\r\n        <section class=\"text\" *ngIf=\"notification.type == 3 && notification.targettype == 3\">{{ notification.nameuser }}\r\n          deletou um comentario na <b>{{ notification.nametask}}</b> no bloco <b>{{ notification.nameblock}}</b> em <b>{{\r\n            notification.nameproject}}</b></section>\r\n        <section class=\"text\" *ngIf=\"notification.type == 3 && notification.targettype == 4\">{{ notification.nameuser }}\r\n          deletou uma lista na <b>{{ notification.nametask}}</b> no bloco <b>{{ notification.nameblock}}</b> em <b>{{\r\n            notification.nameproject}}</b></section>\r\n        <section class=\"text\" *ngIf=\"notification.type == 3 && notification.targettype == 5\">{{ notification.nameuser }}\r\n          deletou um anexo na <b>{{ notification.nametask}}</b> no bloco <b>{{ notification.nameblock}}</b> em <b>{{\r\n            notification.nameproject}}</b></section>\r\n\r\n        <section class=\"text\" *ngIf=\"notification.type == 4 && notification.targettype == 2\">{{ notification.nameuser }}\r\n          moveu a tarefa <b>{{ notification.nametask}}</b> do bloco <b>{{ notification.nameblock}}</b> para <b>{{\r\n            notification.nameblockfinal }}</b> em <b>{{ notification.nameproject}}</b></section>\r\n\r\n        <section class=\"text\" *ngIf=\"notification.type == 5 && notification.targettype == 4\">{{ notification.nameuser }}\r\n          marcou uma lista em <b>{{ notification.nametask}}</b> do bloco <b>{{ notification.nameblock}}</b> em <b>{{\r\n            notification.nameproject}}</b></section>\r\n\r\n        <section class=\"text\" *ngIf=\"notification.type == 6 && notification.targettype == 4\">{{ notification.nameuser }}\r\n          desmarcou uma lista em <b>{{ notification.nametask}}</b> do bloco <b>{{ notification.nameblock}}</b> em <b>{{\r\n            notification.nameproject}}</b></section>\r\n\r\n        <section class=\"text\" *ngIf=\"notification.type == 7 && notification.targettype == 2\"><b>{{ notification.nameuser\r\n          }}</b> adicionou <b>{{ notification.namenewuser }}</b> a tarefa <b>{{ notification.nametask}}</b> do bloco <b>{{\r\n          notification.nameblock}}</b> em <b>{{ notification.nameproject}}</b></section>\r\n        <section class=\"text\" *ngIf=\"notification.type == 7 && notification.targettype == 6\"><b>{{ notification.nameuser\r\n          }}</b> adicionou <b>{{ notification.namenewuser }}</b> ao projeto\r\n        </section>\r\n\r\n        <section class=\"text\" *ngIf=\"notification.type == 8 && notification.targettype == 2\"><b>{{ notification.nameuser\r\n          }}</b> saiu da tareda <b>{{ notification.nametask}}</b> do bloco <b>{{ notification.nameblock}}</b> em <b>{{\r\n          notification.nameproject}}</b></section>\r\n        <section class=\"text\" *ngIf=\"notification.type == 8 && notification.targettype == 6\"><b>{{ notification.nameuser\r\n          }}</b> saiu do projeto\r\n        </section>\r\n\r\n        <section class=\"text\" *ngIf=\"notification.type == 9 && notification.targettype == 6\"><b>{{ notification.nameuser\r\n          }}</b> promoveu <b>{{ notification.namenewuser }}</b> em <b>{{ notification.nameproject}}</b></section>\r\n\r\n        <section class=\"text\" *ngIf=\"notification.type == 10 && notification.targettype == 6\"><b>{{ notification.nameuser\r\n          }}</b> rebaixou <b>{{ notification.namenewuser }}</b> em <b>{{ notification.nameproject}}</b></section>\r\n\r\n        <section class=\"text\" *ngIf=\"notification.type == 11 && notification.targettype == 2\"><b>{{ notification.nameuser\r\n          }}</b> removeu <b>{{ notification.namenewuser }}</b> da tarefa <b>{{ notification.nametask }}</b> em <b>{{\r\n          notification.nameproject}}</b></section>\r\n\r\n\r\n\r\n      </section>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n      <!--<p>Alterou o nome da tarefa Teste para Teste2 em fakeTrello</p>-->\r\n    </section>\r\n\r\n  </section>\r\n</section>\r\n"

/***/ }),

/***/ "../../../../../src/app/notification/all-notification/all-notification.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notification_service__ = __webpack_require__("../../../../../src/app/notification/notification.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_core_service__ = __webpack_require__("../../../../../src/app/Services/core.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllNotificationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AllNotificationComponent = (function () {
    function AllNotificationComponent(notification, core) {
        this.notification = notification;
        this.core = core;
    }
    AllNotificationComponent.prototype.ngOnInit = function () {
        this.notification.searchNotificationAll();
    };
    return AllNotificationComponent;
}());
AllNotificationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-all-notification',
        template: __webpack_require__("../../../../../src/app/notification/all-notification/all-notification.component.html"),
        styles: [__webpack_require__("../../../../../src/app/notification/all-notification/all-notification.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__notification_service__["a" /* NotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__notification_service__["a" /* NotificationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__Services_core_service__["a" /* CoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_core_service__["a" /* CoreService */]) === "function" && _b || Object])
], AllNotificationComponent);

var _a, _b;
//# sourceMappingURL=all-notification.component.js.map

/***/ }),

/***/ "../../../../../src/app/notification/notification.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".notificacoes {\r\n  width: 300px;\r\n  background-color: #FAFAFA;\r\n  position: fixed;\r\n  top: 47px;\r\n  right: 16px;\r\n  z-index: 26;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  overflow: hidden;\r\n  border-radius: 2px;\r\n  box-shadow: 0px 16px 24px rgba(0, 0, 0, .14),\r\n  12px 0px 6px rgba(0, 0, 0, .12),\r\n  0px 8px 10px rgba(0, 0, 0, .12);\r\n  -webkit-transform: scale(0);\r\n          transform: scale(0);\r\n  -webkit-transform-origin: right top;\r\n          transform-origin: right top;\r\n  transition: All 220ms ease;\r\n}\r\n\r\n.visibility {\r\n  -webkit-transform: scale(1);\r\n          transform: scale(1);\r\n}\r\n\r\n.notificacoes header {\r\n  height: 40px;\r\n  width: 100%;\r\n  text-align: center;\r\n  line-height: 40px;\r\n\r\n  -webkit-user-select: none;\r\n\r\n     -moz-user-select: none;\r\n\r\n      -ms-user-select: none;\r\n\r\n          user-select: none;\r\n  cursor: default;\r\n  border-bottom: 1px solid #9E9E9E;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  -ms-flex-pack: distribute;\r\n      justify-content: space-around;\r\n}\r\n.notificacoes header h1 {\r\n  color: #006064;\r\n  font-family: 'Roboto';\r\n  font-weight: 400;\r\n  font-size: 16px;\r\n}\r\n\r\n.notificacoes header i {\r\n  line-height: 40px;\r\n  display: none;\r\n}\r\n\r\n.notificacoes .vejaMais {\r\n  height: 40px;\r\n  width: 100%;\r\n  text-align: center;\r\n  line-height: 40px;\r\n  font-size: 14px;\r\n  color: #006064;\r\n  font-family: 'Roboto';\r\n  font-weight: 400;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.notificacao {\r\n  width: 100%;\r\n  min-height: 100px;\r\n  padding: 5px 12px;\r\n  box-sizing: border-box;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  cursor: pointer;\r\n  border-bottom: 1px solid #9E9E9E;\r\n}\r\n\r\n.notificacao .img {\r\n  width: 42px;\r\n  height: 42px;\r\n  background-color: #006064;\r\n  border-radius: 50%;\r\n  color: #FAFAFA;\r\n  text-align: center;\r\n  line-height: 42px;\r\n  font-family: 'Roboto';\r\n  background-size: cover;\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n}\r\n\r\n.notificacao .text {\r\n  width: 214px;\r\n  padding: 12px;\r\n  box-sizing: border-box;\r\n  word-wrap: break-word;\r\n  /*text-align: justify;*/\r\n  font-size: 14px;\r\n}\r\n\r\n.notificacao .data {\r\n  width: 100%;\r\n  color: #006064;\r\n  text-align: right;\r\n  font-size: 12px;\r\n}\r\n\r\n.emptyStates {\r\n  width: 100%;;\r\n  display: -webkit-box;;\r\n  display: -ms-flexbox;;\r\n  display: flex;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  -ms-grid-column-align: center;\r\n      justify-items: center;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n}\r\n\r\n.emptyStates section {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n}\r\n\r\n.emptyStates p {\r\n  width: 100%;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  font-family: 'Roboto';\r\n  font-size: 14px;\r\n  text-align: center;\r\n  padding: 8px;\r\n}\r\n\r\n@media screen and (max-width: 480px) {\r\n  .notificacoes {\r\n    width: 100%;\r\n    height: 100%;\r\n    top: 0;\r\n    left: 0;\r\n    overflow-y: auto;\r\n  }\r\n  .notificacoes header i {\r\n    display: block;\r\n  }\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/notification/notification.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"notificacoes\" #notificacoes>\r\n\r\n  <header>\r\n    <i class=\"material-icons\">arrow_back</i>\r\n    <h1>Notificações</h1>\r\n    <i></i>\r\n  </header>\r\n\r\n  <section class=\"notificacao\" *ngFor=\"let notification of service?.userNotification?.notifications; let i=index\">\r\n\r\n    <section class=\"img\" *ngIf=\"notification.imguser == '/imgsUser/default.png'\">{{ notification.nameuser.charAt(0) |\r\n      uppercase }}\r\n    </section>\r\n    <section *ngIf=\"notification.imguser != '/imgsUser/default.png'\"\r\n             [style.background-image]=\"'url('+ 'http://' + core.ipDaApi + notification.imguser +')'\"\r\n             class=\"img\"></section>\r\n\r\n    <!-- TYPE 01 -->\r\n    <section class=\"text\" *ngIf=\"notification.type == 1 && notification.targettype == 1\">{{ notification.nameuser }}\r\n      criou o bloco <b>{{ notification.nameblock }}</b> em <b>{{notification.nameproject}}</b></section>\r\n    <section class=\"text\" *ngIf=\"notification.type == 1 && notification.targettype == 2\">{{ notification.nameuser }}\r\n      criou <b>{{ notification.nametask }}</b> no bloco <b>{{ notification.nameblock }}</b> em <b>{{notification.nameproject}}</b>\r\n    </section>\r\n    <section class=\"text\" *ngIf=\"notification.type == 1 && notification.targettype == 3\">{{ notification.nameuser }}\r\n      criou um comentario em <b>{{ notification.nametask }}</b> no bloco <b>{{ notification.nameblock }}</b> em <b>{{notification.nameproject}}</b>\r\n    </section>\r\n    <section class=\"text\" *ngIf=\"notification.type == 1 && notification.targettype == 4\">{{ notification.nameuser }}\r\n      criou uma lista em <b>{{ notification.nametask }}</b> no bloco <b>{{ notification.nameblock }}</b> em <b>{{notification.nameproject}}</b>\r\n    </section>\r\n    <section class=\"text\" *ngIf=\"notification.type == 1 && notification.targettype == 5\">{{ notification.nameuser }}\r\n      criou um anexo em <b>{{ notification.nametask }}</b> no bloco <b>{{ notification.nameblock }}</b> em <b>{{notification.nameproject}}</b>\r\n    </section>\r\n    <!-- TYPE 02 -->\r\n    <section class=\"text\" *ngIf=\"notification.type == 2 && notification.targettype == 1\">{{ notification.nameuser }}\r\n      alterou o nome do projeto de <b>{{ notification.oldname}}</b> para <b>{{ notification.newname}}</b> em <b>{{notification.nameproject}}</b>\r\n    </section>\r\n    <section class=\"text\" *ngIf=\"notification.type == 2 && notification.targettype == 2 && notification.newname\">{{\r\n      notification.nameuser }} alterou a tarefa <b>{{ notification.oldname}}</b> para <b>{{ notification.newname}}</b>\r\n      em <b>{{notification.nameproject}}</b></section>\r\n    <section class=\"text\" *ngIf=\"notification.type == 2 && notification.targettype == 2 && !notification.newname\">{{\r\n      notification.nameuser }} alterou a tarefa <b>{{ notification.nametask}}</b> em <b>{{notification.nameproject}}</b>\r\n    </section>\r\n    <section class=\"text\" *ngIf=\"notification.type == 2 && notification.targettype == 3\">{{ notification.nameuser }}\r\n      alterou um comentario na tarefa <b>{{ notification.nametask}}</b> em <b>{{notification.nameproject}}</b></section>\r\n    <section class=\"text\" *ngIf=\"notification.type == 2 && notification.targettype == 4\">{{ notification.nameuser }}\r\n      alterou uma lista na tarefa <b>{{ notification.nametask}}</b> em <b>{{notification.nameproject}}</b></section>\r\n    <section class=\"text\" *ngIf=\"notification.type == 2 && notification.targettype == 5\">{{ notification.nameuser }}\r\n      alterou um anexo na tarefa <b>{{ notification.nametask}}</b> em <b>{{notification.nameproject}}</b></section>\r\n    <section class=\"text\" *ngIf=\"notification.type == 2 && notification.targettype == 6 && notification.newname\">{{\r\n      notification.nameuser }} alterou o nome do projeto de <b>{{ notification.oldname}}</b> para <b>{{notification.newname}}</b>\r\n    </section>\r\n    <section class=\"text\" *ngIf=\"notification.type == 2 && notification.targettype == 6 && !notification.newname\">{{\r\n      notification.nameuser }} alterou o projeto <b>{{ notification.oldname}}</b></section>\r\n\r\n    <section class=\"text\" *ngIf=\"notification.type == 3 && notification.targettype == 1\">{{ notification.nameuser }}\r\n      deletou o bloco <b>{{ notification.oldname}}</b> em <b>{{ notification.nameproject}}</b></section>\r\n    <section class=\"text\" *ngIf=\"notification.type == 3 && notification.targettype == 2\">{{ notification.nameuser }}\r\n      deletou a tarefa <b>{{ notification.oldname}}</b> em <b>{{ notification.nameblock}}</b> no <b>{{\r\n        notification.nameproject}}</b></section>\r\n    <section class=\"text\" *ngIf=\"notification.type == 3 && notification.targettype == 3\">{{ notification.nameuser }}\r\n      deletou um comentario na <b>{{ notification.nametask}}</b> no bloco <b>{{ notification.nameblock}}</b> em <b>{{\r\n        notification.nameproject}}</b></section>\r\n    <section class=\"text\" *ngIf=\"notification.type == 3 && notification.targettype == 4\">{{ notification.nameuser }}\r\n      deletou uma lista na <b>{{ notification.nametask}}</b> no bloco <b>{{ notification.nameblock}}</b> em <b>{{\r\n        notification.nameproject}}</b></section>\r\n    <section class=\"text\" *ngIf=\"notification.type == 3 && notification.targettype == 5\">{{ notification.nameuser }}\r\n      deletou um anexo na <b>{{ notification.nametask}}</b> no bloco <b>{{ notification.nameblock}}</b> em <b>{{\r\n        notification.nameproject}}</b></section>\r\n\r\n    <section class=\"text\" *ngIf=\"notification.type == 4 && notification.targettype == 2\">{{ notification.nameuser }}\r\n      moveu a tarefa <b>{{ notification.nametask}}</b> do bloco <b>{{ notification.nameblock}}</b> para <b>{{\r\n        notification.nameblockfinal }}</b> em <b>{{ notification.nameproject}}</b></section>\r\n\r\n    <section class=\"text\" *ngIf=\"notification.type == 5 && notification.targettype == 4\">{{ notification.nameuser }}\r\n      marcou uma lista em <b>{{ notification.nametask}}</b> do bloco <b>{{ notification.nameblock}}</b> em <b>{{\r\n        notification.nameproject}}</b></section>\r\n\r\n    <section class=\"text\" *ngIf=\"notification.type == 6 && notification.targettype == 4\">{{ notification.nameuser }}\r\n      desmarcou uma lista em <b>{{ notification.nametask}}</b> do bloco <b>{{ notification.nameblock}}</b> em <b>{{\r\n        notification.nameproject}}</b></section>\r\n\r\n    <section class=\"text\" *ngIf=\"notification.type == 7 && notification.targettype == 2\"><b>{{ notification.nameuser\r\n      }}</b> adicionou <b>{{ notification.namenewuser }}</b> a tarefa <b>{{ notification.nametask}}</b> do bloco <b>{{\r\n      notification.nameblock}}</b> em <b>{{ notification.nameproject}}</b></section>\r\n    <section class=\"text\" *ngIf=\"notification.type == 7 && notification.targettype == 6\"><b>{{ notification.nameuser\r\n      }}</b> adicionou <b>{{ notification.namenewuser }}</b> ao projeto\r\n    </section>\r\n\r\n    <section class=\"text\" *ngIf=\"notification.type == 8 && notification.targettype == 2\"><b>{{ notification.nameuser\r\n      }}</b> saiu da tareda <b>{{ notification.nametask}}</b> do bloco <b>{{ notification.nameblock}}</b> em <b>{{\r\n      notification.nameproject}}</b></section>\r\n    <section class=\"text\" *ngIf=\"notification.type == 8 && notification.targettype == 6\"><b>{{ notification.nameuser\r\n      }}</b> saiu do projeto\r\n    </section>\r\n\r\n    <section class=\"text\" *ngIf=\"notification.type == 9 && notification.targettype == 6\"><b>{{ notification.nameuser\r\n      }}</b> promoveu <b>{{ notification.namenewuser }}</b> em <b>{{ notification.nameproject}}</b></section>\r\n\r\n    <section class=\"text\" *ngIf=\"notification.type == 10 && notification.targettype == 6\"><b>{{ notification.nameuser\r\n      }}</b> rebaixou <b>{{ notification.namenewuser }}</b> em <b>{{ notification.nameproject}}</b></section>\r\n\r\n    <section class=\"text\" *ngIf=\"notification.type == 11 && notification.targettype == 2\"><b>{{ notification.nameuser\r\n      }}</b> removeu <b>{{ notification.namenewuser }}</b> da tarefa <b>{{ notification.nametask }}</b> em <b>{{\r\n      notification.nameproject}}</b></section>\r\n\r\n    <section class=\"data\">{{ notification.date | date: 'dd/MM/yyyy' }} ás {{ notification.date | date: 'HH:mm:ss'}}\r\n    </section>\r\n\r\n  </section>\r\n\r\n  <section class=\"emptyStates\" *ngIf=\"service?.userNotification && service?.userNotification?.length == 0\">\r\n    <section>\r\n      <p>Você não tem nenhuma notificação</p>\r\n    </section>\r\n  </section>\r\n\r\n\r\n  <section routerLink=\"/notification\" class=\"vejaMais\" *ngIf=\"!service?.userNotification || service?.userNotification?.length != 0\">\r\n    Ver todas\r\n  </section>\r\n\r\n</section>\r\n"

/***/ }),

/***/ "../../../../../src/app/notification/notification.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_dados_de_usuario_service__ = __webpack_require__("../../../../../src/app/Services/dados-de-usuario.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_core_service__ = __webpack_require__("../../../../../src/app/Services/core.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__notification_service__ = __webpack_require__("../../../../../src/app/notification/notification.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NotificationComponent = (function () {
    function NotificationComponent(http, router, dados, core, service) {
        this.http = http;
        this.dados = dados;
        this.core = core;
        this.service = service;
    }
    NotificationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.arrowBack = this.arrowBack;
        this.service.notification = this.notificacoes;
        document.addEventListener('mousedown', function (event) {
            _this.hiddenNotification(event);
        });
        this.service.searchNotification();
    };
    NotificationComponent.prototype.hiddenNotification = function (event) {
        if (event.target.className != 'vejaMais' && this.service.visibility === true) {
            this.service.visibility = false;
            this.service.hiddenVisibility();
        }
    };
    return NotificationComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('notificacoes'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object)
], NotificationComponent.prototype, "notificacoes", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('arrowBack'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _b || Object)
], NotificationComponent.prototype, "arrowBack", void 0);
NotificationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-notification',
        template: __webpack_require__("../../../../../src/app/notification/notification.component.html"),
        styles: [__webpack_require__("../../../../../src/app/notification/notification.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__Services_core_service__["a" /* CoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_core_service__["a" /* CoreService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__notification_service__["a" /* NotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__notification_service__["a" /* NotificationService */]) === "function" && _g || Object])
], NotificationComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=notification.component.js.map

/***/ }),

/***/ "../../../../../src/app/notification/notification.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notification_component__ = __webpack_require__("../../../../../src/app/notification/notification.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notification_service__ = __webpack_require__("../../../../../src/app/notification/notification.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_arrow_back_arrow_back_module__ = __webpack_require__("../../../../../src/app/components/arrow-back/arrow-back.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__all_notification_all_notification_component__ = __webpack_require__("../../../../../src/app/notification/all-notification/all-notification.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var NotificationModule = (function () {
    function NotificationModule() {
    }
    return NotificationModule;
}());
NotificationModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["k" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_4__components_arrow_back_arrow_back_module__["a" /* ArrowBackModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_router__["b" /* RouterModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_3__notification_service__["a" /* NotificationService */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__notification_component__["a" /* NotificationComponent */], __WEBPACK_IMPORTED_MODULE_5__all_notification_all_notification_component__["a" /* AllNotificationComponent */]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__notification_component__["a" /* NotificationComponent */]]
    })
], NotificationModule);

//# sourceMappingURL=notification.module.js.map

/***/ }),

/***/ "../../../../../src/app/notification/notification.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_core_service__ = __webpack_require__("../../../../../src/app/Services/core.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_dados_de_usuario_service__ = __webpack_require__("../../../../../src/app/Services/dados-de-usuario.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NotificationService = (function () {
    function NotificationService(http, dados, core) {
        this.http = http;
        this.dados = dados;
        this.core = core;
    }
    NotificationService.prototype.changeVisibility = function () {
        this.visibility = !this.visibility;
        this.hiddenVisibility();
    };
    NotificationService.prototype.hiddenVisibility = function () {
        if (this.visibility) {
            this.notification.nativeElement.className = 'notificacoes visibility';
            try {
                document.querySelector('.container[_ngcontent-c1]').classList.add('overflowHidden');
                document.querySelector('.container[_ngcontent-c1]').classList.remove('overflowAuto');
            }
            catch (e) {
            }
        }
        else {
            this.notification.nativeElement.className = 'notificacoes';
            try {
                document.querySelector('.container[_ngcontent-c1]').classList.remove('overflowHidden');
                document.querySelector('.container[_ngcontent-c1]').classList.add('overflowAuto');
            }
            catch (e) {
            }
        }
    };
    NotificationService.prototype.searchNotification = function () {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/user/notifications?all=false';
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]();
        headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
        return this.http.get(url, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            // console.log(res);
            _this.userNotification = res;
        }, function (error) {
            // console.log(error);
        });
    };
    NotificationService.prototype.searchNotificationAll = function () {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/user/notifications?all=true';
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]();
        headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
        return this.http.get(url, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            // console.log(res);
            _this.userNotificationAll = res;
        }, function (error) {
            // console.log(error);
        });
    };
    NotificationService.prototype.changeBooleanNotification = function () {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/user/notifications';
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]();
        headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
        return this.http.put(url, null, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            // console.log(res);
            _this.searchNotification();
        }, function (error) {
            // console.log(error);
        });
    };
    return NotificationService;
}());
NotificationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__Services_core_service__["a" /* CoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_core_service__["a" /* CoreService */]) === "function" && _c || Object])
], NotificationService);

var _a, _b, _c;
//# sourceMappingURL=notification.service.js.map

/***/ }),

/***/ "../../../../../src/app/page-not-found/page-not-found.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\r\n  width: 100%;\r\n  height: 100vh;\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/background.jpg") + ");\r\n  background-size: 100% 100vh;\r\n  overflow:hidden;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/page-not-found/page-not-found.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <h3 style=\"color:#FFF; width:100%; text-align:center; margin-top:20%;\">404 - Essa pagina não foi encontrada!</h3>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/page-not-found/page-not-found.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageNotFoundComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageNotFoundComponent = (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
    };
    return PageNotFoundComponent;
}());
PageNotFoundComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-page-not-found',
        template: __webpack_require__("../../../../../src/app/page-not-found/page-not-found.component.html"),
        styles: [__webpack_require__("../../../../../src/app/page-not-found/page-not-found.component.css")]
    }),
    __metadata("design:paramtypes", [])
], PageNotFoundComponent);

//# sourceMappingURL=page-not-found.component.js.map

/***/ }),

/***/ "../../../../../src/app/pagina-inicial/pagina-inicial.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "a {\r\n  color: #111;\r\n}\r\n\r\n.container {\r\n  width: 100vw;\r\n  margin: 0 auto;\r\n  padding: 20px 0;\r\n  overflow-x: hidden;\r\n  box-sizing: border-box;\r\n  background-color: #EEEEEE;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  -ms-flex-line-pack: start;\r\n      align-content: flex-start;\r\n  font-family: 'Roboto';\r\n}\r\n\r\n.project-card {\r\n  width: 20%;\r\n  margin: 20px 2.5%;\r\n  box-shadow: 0px 0px 4px rgba(0, 0, 0, .14),\r\n  0px 3px 4px rgba(0, 0, 0, .12),\r\n  0px 1px 5px rgba(0, 0, 0, .20);\r\n  border-radius: 2px;\r\n  overflow: hidden;\r\n  /*float: left;*/\r\n  background-color: #FAFAFA;\r\n  cursor: pointer;\r\n  transition: All 180ms ease-in;\r\n}\r\n\r\n.project-card:hover {\r\n  box-shadow: 0px 8px 10px rgba(0, 0, 0, .14),\r\n  0px 3px 14px rgba(0, 0, 0, .12),\r\n  0px 4px 15px rgba(0, 0, 0, .20);\r\n}\r\n\r\n.project-card .img {\r\n  width: 100%;\r\n  /*height: calc(100% / 16);*/\r\n  height: 196px;\r\n  background-color: #CCC;\r\n  text-align: center;\r\n  box-sizing: border-box;\r\n  overflow: hidden;\r\n  position: relative;\r\n}\r\n\r\n.project-card .img div {\r\n  /*margin: 0 auto;*/\r\n  font-size: 60px;\r\n  width: 100%;\r\n  height: 196px;\r\n  line-height: 196px;\r\n  float: left;\r\n  box-sizing: border-box;\r\n  color: #FAFAFA;\r\n  background-color: #006064;\r\n  background-size: cover;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n}\r\n\r\n.project-card .info {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n}\r\n\r\n.project-card .info .title {\r\n  width: 100%;\r\n  box-sizing: border-box;\r\n  padding: 5px 10px 0px 10px;\r\n  font-weight: 400;\r\n  font-size: 22px;\r\n}\r\n\r\n.project-card .info .descrip {\r\n  width: 100%;\r\n  height: 40px;\r\n  padding: 5px 10px;\r\n  box-sizing: border-box;\r\n  font-size: 14px;\r\n}\r\n\r\n.project-card .buttons {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: horizontal;\r\n  -webkit-box-direction: reverse;\r\n      -ms-flex-direction: row-reverse;\r\n          flex-direction: row-reverse;\r\n  height: 50px;\r\n  padding: 8px;\r\n  margin: auto 8px;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.project-card .buttons img {\r\n  margin: auto 2px;\r\n  width: 24px;\r\n  height: 24px;\r\n}\r\n\r\n.add-project {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  background-color: transparent;\r\n  box-shadow: none;\r\n}\r\n\r\n.add-project:hover {\r\n  box-shadow: none;\r\n}\r\n\r\n.add-project i {\r\n  font-size: 125px;\r\n  color: #757575;\r\n\r\n}\r\n\r\n.emptyStates {\r\n  width: 100%;\r\n  height: calc(100vh - 56px - 80px);\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  -ms-grid-column-align: center;\r\n      justify-items: center;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n}\r\n\r\n.emptyStates section {\r\n  height: 80px;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n}\r\n\r\n.emptyStates h1 {\r\n  width: 100%;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  font-family: 'Roboto';\r\n  font-size: 24px;\r\n  text-align: center;\r\n}\r\n.emptyStates p {\r\n  width: 100%;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  font-family: 'Roboto';\r\n  font-size: 16px;\r\n  text-align: center;\r\n}\r\n\r\n@media screen and (max-width: 1024px) {\r\n  .project-card {\r\n    width: 25%;\r\n    margin: 0 4.1%;\r\n  }\r\n}\r\n\r\n@media screen and (max-width: 768px) {\r\n  .project-card {\r\n    /*margin-left: calc(50vw - 110px);*/\r\n    /*width: 220px;*/\r\n    width: 90%;\r\n    margin: 10px 5% 0 5%;\r\n    min-width: auto;\r\n  }\r\n}\r\n\r\n/*.project-card .acoes {*/\r\n/*width: 100%;*/\r\n/*height: 50px;*/\r\n/*background-color: #FFFFFF;*/\r\n/*padding: 8px;*/\r\n/*text-align: center;*/\r\n/*line-height: 30px;*/\r\n/*color: #444;*/\r\n/*box-sizing: border-box;*/\r\n/*}*/\r\n/*.project-card .acoes .icon {*/\r\n/*padding: 5px;*/\r\n/*float: right;*/\r\n/*cursor: pointer;*/\r\n/*transition: All 80ms ease-in;*/\r\n/*}*/\r\n/*.project-card .acoes .icon:hover {*/\r\n/*transform: scale(1.1);*/\r\n/*transition: All 80ms ease-out;*/\r\n/*}*/\r\n\r\n\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pagina-inicial/pagina-inicial.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <section class=\"project-card\" *ngFor=\"let projeto of projects.projects\">\r\n    <div class=\"img\" [routerLink]=\"['/project' ,projeto.id_project]\" [title]=\"projeto.namep\">\r\n      <div *ngIf=\"projeto.img != '/imgsProjects/default.png'\" [style.background-image]=\"'url('+ 'http://' + core.ipDaApi + '/' + projeto.img + ')'\"></div>\r\n      <div *ngIf=\"projeto.img == '/imgsProjects/default.png'\">{{ projeto.namep.charAt(0) + projeto.namep.charAt(1) | uppercase }}</div>\r\n    </div>\r\n    <section class=\"buttons\">\r\n      <img class=\"icon\" (click)=\"projects.detailProject(projeto.id_project)\" src=\"../../assets/settings.svg\">\r\n      <img class=\"icon\" *ngIf=\"projeto.permission\" (click)=\"popupConfirmacao.ativaPopUpConfirmacao('Alerta', 'Tem certeza que deseja Excluir?', projeto.id_project)\" src=\"../../assets/delete.svg\">\r\n    </section>\r\n  </section>\r\n\r\n  <section class=\"emptyStates\" *ngIf=\"projects.projects && projects.projects.length == 0\">\r\n    <section>\r\n      <h1>Oops.</h1>\r\n      <p>Você ainda não tem projetos</p>\r\n    </section>\r\n  </section>\r\n\r\n\r\n\r\n  <!--<section class=\"project-card add-project\" (click)=\"projects.ativaAddProjets()\" title=\"Adicionar Projeto\">-->\r\n\r\n    <!--<i class=\"material-icons\">add</i>-->\r\n  <!--</section>-->\r\n</div>\r\n\r\n\r\n\r\n<app-popup-confirmacao *ngIf=\"popupConfirmacao.situacao\"></app-popup-confirmacao>\r\n<app-add-projects *ngIf=\"projects.situacaoAddProjects\"></app-add-projects>\r\n<button class=\"floatingButton\" (click)=\"projects.ativaAddProjets()\">\r\n  <i class=\"material-icons\">add</i>\r\n</button>\r\n<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "../../../../../src/app/pagina-inicial/pagina-inicial.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_popup_confirmacao_popup_confirmacao_service__ = __webpack_require__("../../../../../src/app/components/popup-confirmacao/popup-confirmacao.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__projects_projects_service_service__ = __webpack_require__("../../../../../src/app/projects/projects-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_core_service__ = __webpack_require__("../../../../../src/app/Services/core.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaginaInicialComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PaginaInicialComponent = (function () {
    function PaginaInicialComponent(popupConfirmacao, projects, core) {
        this.popupConfirmacao = popupConfirmacao;
        this.projects = projects;
        this.core = core;
    }
    PaginaInicialComponent.prototype.ngOnInit = function () {
        this.projects.searchProjects();
    };
    return PaginaInicialComponent;
}());
PaginaInicialComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-pagina-inicial',
        template: __webpack_require__("../../../../../src/app/pagina-inicial/pagina-inicial.component.html"),
        styles: [__webpack_require__("../../../../../src/app/pagina-inicial/pagina-inicial.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__components_popup_confirmacao_popup_confirmacao_service__["a" /* PopupConfirmacaoService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__components_popup_confirmacao_popup_confirmacao_service__["a" /* PopupConfirmacaoService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__projects_projects_service_service__["a" /* ProjectsServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__projects_projects_service_service__["a" /* ProjectsServiceService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__Services_core_service__["a" /* CoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_core_service__["a" /* CoreService */]) === "function" && _c || Object])
], PaginaInicialComponent);

var _a, _b, _c;
//# sourceMappingURL=pagina-inicial.component.js.map

/***/ }),

/***/ "../../../../../src/app/projects/add-projects/add-projects.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "app-arrow-back {\r\n  display: none;\r\n}\r\n\r\n.container {\r\n  width: 400px;\r\n  height: 305px;\r\n  background-color: #FAFAFA;\r\n  position: fixed;\r\n  top: calc(50vh - 152px);\r\n  left: calc(50vw - 200px);\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  overflow: hidden;\r\n  box-shadow: 0px 24px 38px rgba(0, 0, 0, .14),\r\n  0px 9px 46px rgba(0, 0, 0, .12),\r\n  0px 11px 15px rgba(0, 0, 0, .20);\r\n  z-index: 25;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  -webkit-box-align: start;\r\n      -ms-flex-align: start;\r\n          align-items: flex-start;\r\n  -ms-flex-line-pack: start;\r\n      align-content: flex-start;\r\n}\r\n\r\n.container .image {\r\n  width: 100%;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  position: relative;\r\n  padding: 8px;\r\n}\r\n\r\n.container .image .imageUser {\r\n  width: 140px;\r\n  height: 140px;\r\n  background-color: #006064;\r\n  color: #FFF;\r\n  border-radius: 50%;\r\n  line-height: 140px;\r\n  text-align: center;\r\n  font-family: 'Roboto';\r\n  font-size: 72px;\r\n  background-size: cover;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/addPhoto.svg") + ");\r\n  background-repeat: no-repeat;\r\n  background-size: cover;\r\n  background-position: center;\r\n}\r\n\r\n.container .image .addImageUser {\r\n  width: 45px;\r\n  height: 45px;\r\n  background-color: #FAFAFA;\r\n  color: #006064;\r\n  border-radius: 50%;\r\n  position: absolute;\r\n  top: 115px;\r\n  left: 210px;\r\n  line-height: 45px;\r\n  text-align: center;\r\n  font-size: 30px;\r\n  cursor: pointer;\r\n  box-shadow: 0px 0px 4px rgba(0, 0, 0, .14), 0px 3px 4px rgba(0, 0, 0, .12), 0px 1px 5px rgba(0, 0, 0, .20);\r\n}\r\n\r\n.container .campos {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  -webkit-box-orient: horizontal;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: row;\r\n          flex-direction: row;\r\n  width: 100%;\r\n  height: 100px;\r\n  padding: 8px;\r\n}\r\n\r\n.container .campos .nome {\r\n  width: 100%;\r\n  height: 45px;\r\n}\r\n\r\n.container .campos .descricao {\r\n  width: 100%;\r\n  height: 45px;\r\n  margin-top: 10px;\r\n}\r\n\r\n.container .campos .button {\r\n  width: 100%;\r\n  height: 35px;\r\n}\r\n\r\n.background {\r\n  width: 100vw;\r\n  height: 100vh;\r\n  position: fixed;\r\n  background-color: rgba(0, 0, 0, .7);\r\n  z-index: 24;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n\r\n.floatingButton {\r\n  z-index: 24;\r\n}\r\n\r\n@media screen and (max-width: 480px) {\r\n  app-arrow-back {\r\n    display: block;\r\n  }\r\n\r\n  .container {\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100vh;\r\n  }\r\n\r\n  .container {\r\n    width: 100%;\r\n    height: 100vh;\r\n  }\r\n\r\n  .container .image {\r\n    height: 30vh;\r\n    padding: 0;\r\n  }\r\n\r\n  .container .image .imageUser {\r\n    width: 100%;\r\n    height: 100%;\r\n    line-height: 35vh;\r\n    border-radius: 0;\r\n    margin-left: 0;\r\n    margin: 0;\r\n    border: none;\r\n  }\r\n\r\n  .container .image .addImageUser {\r\n    width: 24px;\r\n    height: 24px;\r\n    top: 16px;\r\n    line-height: 24px;\r\n    left: auto;\r\n    right: 16px;\r\n    color: #FAFAFA;\r\n    background-color: transparent;\r\n    box-shadow: none;\r\n  }\r\n\r\n  .container .campos {\r\n    float: left;\r\n    margin: 10px 0 20px 0;\r\n    width: 100%;\r\n    height: 70vh;\r\n    z-index: 24;\r\n    -ms-flex-line-pack: start;\r\n        align-content: flex-start;\r\n    overflow-y: auto;\r\n  }\r\n\r\n  .container .campos .nome {\r\n    width: 80%;\r\n    margin-left: 10%;\r\n  }\r\n\r\n  .container .campos .descricao {\r\n    width: 80%;\r\n    margin-left: 10%;\r\n  }\r\n\r\n  .container .campos .descricao div textarea {\r\n    max-height: 50px;\r\n  }\r\n\r\n}\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/projects/add-projects/add-projects.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"container\">\r\n    <section class=\"image\">\r\n      <input type=\"file\" (change)=\"previewFile($event.target)\" id=\"file\" style=\"display: none;\">\r\n\r\n      <div *ngIf=\"img64\" class=\"imageUser\" id=\"preview\" [style.background-image]=\"'url('+ img64 +')'\"></div>\r\n      <div *ngIf=\"!img64\" class=\"imageUser\" style=\"background-size: 80px;\"></div>\r\n\r\n      <div class=\"addImageUser\" (click)=\"chamaFile()\">+</div>\r\n    </section>\r\n\r\n\r\n    <div class=\"campos\">\r\n      <div class=\"nome\">\r\n        <div class=\"relative\">\r\n          <input class=\"textFields\" [(ngModel)]=\"nome\" value=\"{{ nome }}\" (blur)=\"inputs()\" type=\"text\" id=\"nome\"\r\n                 #HTMLNome/>\r\n          <label class=\"labelText\" for=\"nome\">Nome</label>\r\n          <div class=\"border\"></div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"descricao\">\r\n        <div class=\"relative\">\r\n          <textarea [(ngModel)]=\"descricao\" #HTMLDescricao class=\"textFieldsMult\" id=\"descricao\"\r\n                    (blur)=\"inputs()\"\r\n                    rows=\"1\"\r\n          ></textarea>\r\n          <label class=\"labelTextMult\" for=\"descricao\">Descrição</label>\r\n        </div>\r\n      </div>\r\n\r\n      <section class=\"button\">\r\n        <button class=\"denseButton fullwidth\" (click)=\"criarProject()\">CADASTRAR</button>\r\n      </section>\r\n\r\n    </div>\r\n  </section>\r\n\r\n<section class=\"background\"></section>\r\n\r\n\r\n<app-arrow-back (click)=\"projects.fechaAddProjets(null)\"></app-arrow-back>\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/projects/add-projects/add-projects.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__projects_service_service__ = __webpack_require__("../../../../../src/app/projects/projects-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_snackbars_snackbars_service__ = __webpack_require__("../../../../../src/app/components/snackbars/snackbars.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__drag_drop_drag_drop_service__ = __webpack_require__("../../../../../src/app/drag-drop/drag-drop.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddProjectsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddProjectsComponent = (function () {
    function AddProjectsComponent(router, projects, snackbar, dragDropService) {
        this.router = router;
        this.projects = projects;
        this.snackbar = snackbar;
        this.dragDropService = dragDropService;
        this.img64 = '';
        this.nome = '';
        this.descricao = '';
    }
    AddProjectsComponent.prototype.ngOnInit = function () {
        var _this = this;
        document.addEventListener('mousedown', function (e) {
            _this.projects.fechaAddProjets(e);
        });
    };
    AddProjectsComponent.prototype.inputs = function () {
        // console.log(this.HTMLNome);
        this.nome.length > 0 ? this.HTMLNome.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLNome.nativeElement.classList.remove('textFieldsPreenchido');
        this.descricao.length > 0 ? this.HTMLDescricao.nativeElement.classList.add('textFieldsMultPreenchido') : this.HTMLDescricao.nativeElement.classList.remove('textFieldsMultPreenchido');
    };
    AddProjectsComponent.prototype.chamaFile = function () {
        var el = document.getElementById('file');
        el.click();
    };
    AddProjectsComponent.prototype.previewFile = function (el) {
        var _this = this;
        // console.log(el)
        var reader = new FileReader();
        reader.onloadend = function (e) {
            // preview.src = reader.result;
            // console.log(reader.result);
            _this.img64 = reader.result;
        };
        if (el) {
            reader.readAsDataURL(el.files[0]);
        }
        else {
        }
    };
    AddProjectsComponent.prototype.criarProject = function () {
        var _this = this;
        this.projects.criaProject(this.nome, this.descricao, this.img64)
            .subscribe(function (res) {
            _this.projects.fechaAddProjets(null);
            _this.snackbar.inserirSnackbar('Projeto Criado Com Sucesso!');
            _this.projects.searchProjects();
        }, function (error) {
            console.log(error);
        });
    };
    return AddProjectsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLNome'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object)
], AddProjectsComponent.prototype, "HTMLNome", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLDescricao'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _b || Object)
], AddProjectsComponent.prototype, "HTMLDescricao", void 0);
AddProjectsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-add-projects',
        template: __webpack_require__("../../../../../src/app/projects/add-projects/add-projects.component.html"),
        styles: [__webpack_require__("../../../../../src/app/projects/add-projects/add-projects.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__projects_service_service__["a" /* ProjectsServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__projects_service_service__["a" /* ProjectsServiceService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__components_snackbars_snackbars_service__["a" /* SnackbarsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__components_snackbars_snackbars_service__["a" /* SnackbarsService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__drag_drop_drag_drop_service__["a" /* DragDropService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__drag_drop_drag_drop_service__["a" /* DragDropService */]) === "function" && _f || Object])
], AddProjectsComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=add-projects.component.js.map

/***/ }),

/***/ "../../../../../src/app/projects/alterar-projects/alterar-projects.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".relative {\r\n  position: relative;\r\n}\r\n\r\n/*app-arrow-back {*/\r\n  /*display: none;*/\r\n/*}*/\r\n\r\n.container {\r\n  width: 500px;\r\n  height: 635px;\r\n  background-color: #FAFAFA;\r\n  position: fixed;\r\n  top: calc(50% - 315px);\r\n  left: calc(50% - 250px);\r\n  box-shadow: 0px 24px 38px rgba(0, 0, 0, .14),\r\n  0px 9px 46px rgba(0, 0, 0, .12),\r\n  0px 11px 15px rgba(0, 0, 0, .20);\r\n  z-index: 25;\r\n  padding: 8px;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.images {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n}\r\n\r\n.images .img {\r\n  width: 140px;\r\n  height: 140px;\r\n  border-radius: 50%;\r\n  background-color: #006064;\r\n  color: #FAFAFA;\r\n  background-repeat: no-repeat;\r\n  background-size: cover;\r\n  background-position: center;\r\n  text-align: center;\r\n  line-height: 140px;\r\n  font-size: 72px;\r\n  font-family: 'Roboto';\r\n  font-weight: 400;\r\n  box-shadow: 0px 0px 4px rgba(0, 0, 0, .14),\r\n  0px 3px 4px rgba(0, 0, 0, .12),\r\n  0px 1px 5px rgba(0, 0, 0, .20);\r\n  cursor: default;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n}\r\n\r\n.images .addImg {\r\n  width: 45px;\r\n  height: 45px;\r\n  background-color: #FAFAFA;\r\n  color: #006064;\r\n  border-radius: 50%;\r\n  position: absolute;\r\n  top: 115px;\r\n  left: 275px;\r\n  line-height: 45px;\r\n  text-align: center;\r\n  font-size: 30px;\r\n  cursor: pointer;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  box-shadow: 0px 0px 4px rgba(0, 0, 0, .14),\r\n  0px 3px 4px rgba(0, 0, 0, .12),\r\n  0px 1px 5px rgba(0, 0, 0, .20);\r\n}\r\n\r\n.nome {\r\n  width: 100%;\r\n  margin-top: 20px;\r\n  position: relative;\r\n}\r\n\r\n.descricao {\r\n  margin-top: 60px;\r\n  position: relative;\r\n  height: 120px;\r\n}\r\n\r\n.descricao textarea {\r\n  height: 120px;\r\n}\r\n\r\n.membros .search {\r\n  height: 45px;\r\n}\r\n\r\n.membros .listMembers {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  max-width: 100%;\r\n}\r\n\r\n.membros .listMembers .scroll {\r\n  height: 220px;\r\n  overflow-y: auto;\r\n}\r\n\r\n.membros .listMembers .scroll .membro {\r\n  width: 100%;\r\n  padding: 8px;\r\n  box-sizing: border-box;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  cursor: default;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  position: relative;\r\n}\r\n\r\n.membros .listMembers .scroll .membro .img {\r\n  width: 40px;\r\n  height: 40px;\r\n  border-radius: 50%;\r\n  background-color: #006064;\r\n  color: #FAFAFA;\r\n  background-repeat: no-repeat;\r\n  background-size: cover;\r\n  background-position: center;\r\n  text-align: center;\r\n  line-height: 40px;\r\n  font-size: 18px;\r\n  font-family: 'Roboto';\r\n  font-weight: 400;\r\n  box-shadow: 0px 0px 4px rgba(0, 0, 0, .14),\r\n  0px 3px 4px rgba(0, 0, 0, .12),\r\n  0px 1px 5px rgba(0, 0, 0, .20);\r\n  cursor: default;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n}\r\n\r\n.membros .listMembers .scroll .membro .name {\r\n  font-family: 'Roboto';\r\n  font-weight: normal;\r\n  height: 40px;\r\n  line-height: 40px;\r\n  padding: 0 16px;\r\n  font-size: 16px;\r\n  color: rgba(0, 0, 0, 0.87);\r\n}\r\n\r\n.membros .listMembers .scroll .membro i {\r\n  position: absolute;\r\n  right: 8px;\r\n  top: 15px;\r\n  color: rgba(0, 0, 0, 0.87);\r\n  cursor: pointer;\r\n}\r\n\r\n.buttons {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: horizontal;\r\n  -webkit-box-direction: reverse;\r\n      -ms-flex-direction: row-reverse;\r\n          flex-direction: row-reverse;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n}\r\n\r\n.buttons button i {\r\n  color: #FAFAFA;\r\n}\r\n\r\n.optionsUser {\r\n  position: fixed;\r\n  width: 120px;\r\n  background-color: #FAFAFA;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  box-shadow: 0px 0px 4px rgba(0, 0, 0, .14),\r\n  0px 3px 4px rgba(0, 0, 0, .12),\r\n  0px 1px 5px rgba(0, 0, 0, .20);\r\n  transition: all 480ms ease;\r\n  -webkit-transform-origin: right top;\r\n          transform-origin: right top;\r\n  z-index: 24;\r\n}\r\n\r\n.optionsUser span {\r\n  font-size: 16px;\r\n  font-family: 'Roboto';\r\n  color: rgba(0, 0, 0, 0.87);\r\n  padding: 8px;\r\n  cursor: pointer;\r\n  transition: background 480ms ease;\r\n}\r\n\r\n.optionsUser span:hover {\r\n  background-color: #F5F5F5;\r\n}\r\n\r\n.optionsUserOff {\r\n  -webkit-transform: scale(0);\r\n          transform: scale(0);\r\n}\r\n\r\n.background {\r\n  width: 100vw;\r\n  height: 100vh;\r\n  position: fixed;\r\n  background-color: rgba(0, 0, 0, .7);\r\n  z-index: 24;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n\r\n\r\n@media screen and (max-width: 480px) {\r\n  app-arrow-back {\r\n    display: block;\r\n  }\r\n\r\n  .container {\r\n    width: 100%;\r\n    height: 100%;\r\n    top: 0;\r\n    left: 0;\r\n    padding: 0 0 16px 0;\r\n    overflow-y: auto;\r\n  }\r\n\r\n  .images .img {\r\n    height: 200px;\r\n    line-height: 170px;\r\n    border-radius: 0;\r\n    width: 100%;\r\n  }\r\n\r\n  .images .addImg {\r\n    top: 175px;\r\n    left: auto;\r\n    right: 16px;\r\n  }\r\n\r\n  .nome {\r\n    width: calc(100% - 20px);\r\n    margin-left: 10px;\r\n  }\r\n\r\n  .descricao {\r\n    width: calc(100% - 20px);\r\n    margin-left: 10px;\r\n  }\r\n\r\n  .membros .search {\r\n    width: calc(100% - 20px);\r\n    margin-left: 10px;\r\n  }\r\n\r\n  .membros .listMembers .scroll {\r\n    height: 120px;\r\n    overflow-y: auto;\r\n  }\r\n\r\n  .buttons {\r\n    margin-top: 8px;\r\n  }\r\n\r\n}\r\n\r\n\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/projects/alterar-projects/alterar-projects.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"container\">\r\n  <section class=\"images\">\r\n    <input type=\"file\" (change)=\"previewFile($event.target)\" id=\"file\" style=\"display: none;\">\r\n    <section *ngIf=\"img64\" id=\"preview\" class=\"img\" [style.background-image]=\"'url('+ img64 +')'\"></section>\r\n\r\n    <section *ngIf=\"projects?.project?.img != '/imgsProjects/default.png' && !img64\" id=\"preview\" class=\"img\"\r\n             [style.background-image]=\"'url('+ 'http://' + core.ipDaApi + projects?.project?.img +')'\"></section>\r\n\r\n    <section *ngIf=\"projects?.project?.img == '/imgsProjects/default.png' && !img64\" class=\"img\">\r\n      {{projects?.project?.namep.charAt(0) | uppercase }}\r\n    </section>\r\n    <div class=\"addImg\" (click)=\"chamaFile()\">+</div>\r\n  </section>\r\n  <section class=\"nome\">\r\n    <input class=\"textFields\" type=\"text\" id=\"nome\" [(ngModel)]=\"name\"/>\r\n    <!--<label class=\"labelText\" for=\"nome\" >{{ projects?.project?.namep }}</label>-->\r\n    <div class=\"border\"></div>\r\n    <label class=\"helperText\"></label>\r\n  </section>\r\n  <section class=\"descricao\">\r\n    <textarea class=\"textFieldsMult\" id=\"descricao\" [(ngModel)]=\"descri\">{{ descri }}</textarea>\r\n    <!--<label class=\"labelTextMult\" for=\"descricao\">{{ projects?.project?.descrip }}</label>-->\r\n  </section>\r\n\r\n  <section class=\"membros\">\r\n    <section class=\"search\">\r\n      <div class=\"relative\">\r\n        <input type=\"text\" id=\"search\" class=\"textFields\" (keyup)=\"projects.pesquisarMembros(id)\"\r\n               (blur)=\"input()\" #HTMLSearch\r\n               [(ngModel)]=\"projects.campoDePesquisa\">\r\n        <label class=\"labelText\" for=\"search\">Pesquisar Membros</label>\r\n        <div class=\"border\"></div>\r\n      </div>\r\n    </section>\r\n\r\n    <section class=\"listMembers\">\r\n      <section class=\"scroll\" *ngIf=\"!projects?.campoDePesquisa\">\r\n        <section class=\"membro\" *ngFor=\"let membro of projects?.project?.team\">\r\n          <section class=\"img\" *ngIf=\"membro.profile_img == '/imgsUser/default.png'\">{{ membro.name.charAt(0) |\r\n            uppercase }}\r\n          </section>\r\n          <section class=\"img\" *ngIf=\"membro.profile_img != '/imgsUser/default.png'\"\r\n                   [style.background-image]=\"'url('+ 'http://' + core.ipDaApi + membro.profile_img +')'\"></section>\r\n          <section class=\"name\">{{ membro.name }}</section>\r\n          <i class=\"material-icons\" *ngIf=\"projects.project.loggeduserpermission || membro.id_user == idUser\"\r\n             (click)=\"openMenuUser($event)\">more_vert</i>\r\n          <section class=\"optionsUser optionsUserOff\"\r\n                   [ngStyle]=\"{'top': positionMenu?.top + 'px', 'left': positionMenu?.left + 'px'}\">\r\n                    <span\r\n                      *ngIf=\"!membro.permissions && membro.id_user != idUser && projects?.project?.loggeduserpermission\"\r\n                      (mousedown)=\"projects.permissaoUserProject(id, membro.id_user)\">Promover</span>\r\n            <span *ngIf=\"membro.permissions && membro.id_user != idUser && projects?.project?.loggeduserpermission\"\r\n                  (mousedown)=\"projects.permissaoUserProject(id, membro.id_user)\">Rebaixar</span>\r\n            <span *ngIf=\"membro.id_user != idUser && projects?.project?.loggeduserpermission\"\r\n                  (mousedown)=\"projects.delUserProject(id, membro.id_user)\">Remover</span>\r\n            <span *ngIf=\"membro.id_user == idUser\" (mousedown)=\"projects.sairUserProject(id)\">Sair</span>\r\n          </section>\r\n        </section>\r\n      </section>\r\n\r\n      <section class=\"scroll\" *ngIf=\"projects?.campoDePesquisa\">\r\n        <section class=\"membro\" *ngFor=\"let membro of projects?.pesquisaMembros\">\r\n          <section class=\"img\" *ngIf=\"membro.imguser == '/imgsUser/default.png'\">{{ membro.nameuser.charAt(0) |\r\n            uppercase }}\r\n          </section>\r\n          <section class=\"img\" *ngIf=\"membro.imguser != '/imgsUser/default.png'\"\r\n                   [style.background-image]=\"'url('+ 'http://' + core.ipDaApi + membro.imguser +')'\"></section>\r\n          <section class=\"name\">{{ membro.nameuser }}</section>\r\n          <i class=\"material-icons\" (click)=\"projects.addMembrosProject(membro.iduser, id)\">add_circle</i>\r\n        </section>\r\n      </section>\r\n\r\n    </section>\r\n  </section>\r\n\r\n  <section class=\"buttons\">\r\n    <button class=\"denseButton fullwidth\" (click)=\"projects.changeProject(id, name, descri, img64)\">SALVAR</button>\r\n  </section>\r\n\r\n</section>\r\n<section class=\"background\"></section>\r\n<app-arrow-back (click)=\"projects.fechaDetailProject()\"></app-arrow-back>\r\n\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/projects/alterar-projects/alterar-projects.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_snackbars_snackbars_service__ = __webpack_require__("../../../../../src/app/components/snackbars/snackbars.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__projects_service_service__ = __webpack_require__("../../../../../src/app/projects/projects-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_core_service__ = __webpack_require__("../../../../../src/app/Services/core.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_dados_de_usuario_service__ = __webpack_require__("../../../../../src/app/Services/dados-de-usuario.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlterarProjectsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AlterarProjectsComponent = (function () {
    function AlterarProjectsComponent(router, route, projects, snackbar, core, dadossDeUsuario) {
        this.router = router;
        this.route = route;
        this.projects = projects;
        this.snackbar = snackbar;
        this.core = core;
        this.dadossDeUsuario = dadossDeUsuario;
    }
    AlterarProjectsComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.positionMenu = {
                top: document.querySelector('.optionsUserOff').getBoundingClientRect().top,
                left: document.querySelector('.optionsUserOff').getBoundingClientRect().left
            };
        }, 200);
        this.id = this.route.snapshot.params['id'];
        this.projects.detailProject(this.id);
        this.dadossDeUsuario.recuperarDadosDeUsuario();
        setTimeout(function () {
            _this.name = _this.projects.project.namep;
            _this.descri = _this.projects.project.descrip;
        }, 100);
        document.addEventListener('mousedown', function (e) {
            _this.closeMenuUser();
            _this.closeChangeProjects(e);
        });
        window.addEventListener('resize', function (e) {
            _this.closeMenuUser();
        });
    };
    /* IMAGEM  IMAGEM */
    AlterarProjectsComponent.prototype.chamaFile = function () {
        var el = document.getElementById('file');
        el.click();
    };
    AlterarProjectsComponent.prototype.previewFile = function (el) {
        var _this = this;
        var reader = new FileReader();
        reader.onloadend = function (e) {
            _this.img64 = reader.result;
        };
        if (el) {
            reader.readAsDataURL(el.files[0]);
        }
        else {
        }
    };
    /* IMAGEM  IMAGEM */
    AlterarProjectsComponent.prototype.focus = function (el) {
        var elem = el.target;
        elem.focus();
        var pai = document.querySelector('.all');
        var posEl = elem.getBoundingClientRect().y + pai.scrollTop;
        pai.scrollTo(0, posEl);
    };
    AlterarProjectsComponent.prototype.input = function () {
        this.projects.campoDePesquisa.length > 0 ? this.HTMLSearch.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLSearch.nativeElement.classList.remove('textFieldsPreenchido');
    };
    // OnResSearch() {
    //   const value = this.projects.campoDePesquisa;
    //   const membros = document.querySelector('.membros');
    //   const resSearch = document.querySelector('#resSearch');
    // if (value.length > 0) {
    //     resSearch.setAttribute('style', 'display: block');
    //     membros.setAttribute('style', 'display: none');
    //
    // } else {
    //   resSearch.setAttribute('style', 'display: none');
    //   membros.setAttribute('style', 'display: block');
    // }
    //
    // }
    AlterarProjectsComponent.prototype.openMenuUser = function (event) {
        this.positionMenu = {
            top: event.clientY,
            left: event.clientX - 120 // 120 == Tamanho do menu
        };
        this.menuUser = true;
        var membro = event.target.parentNode;
        membro.querySelector('.optionsUserOff').className = 'optionsUser';
    };
    AlterarProjectsComponent.prototype.closeMenuUser = function () {
        if (this.menuUser) {
            this.menuUser = false;
            var menus = document.querySelectorAll('.optionsUser');
            for (var i = 0; i < menus.length; i++) {
                menus[i].className = 'optionsUser optionsUserOff';
            }
        }
    };
    AlterarProjectsComponent.prototype.closeChangeProjects = function (event) {
        if (event.target.className == 'background') {
            this.projects.fechaDetailProject();
        }
    };
    return AlterarProjectsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('HTMLSearch'),
    __metadata("design:type", Object)
], AlterarProjectsComponent.prototype, "HTMLSearch", void 0);
AlterarProjectsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-alterar-projects',
        template: __webpack_require__("../../../../../src/app/projects/alterar-projects/alterar-projects.component.html"),
        styles: [__webpack_require__("../../../../../src/app/projects/alterar-projects/alterar-projects.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__projects_service_service__["a" /* ProjectsServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__projects_service_service__["a" /* ProjectsServiceService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__components_snackbars_snackbars_service__["a" /* SnackbarsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__components_snackbars_snackbars_service__["a" /* SnackbarsService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__Services_core_service__["a" /* CoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_core_service__["a" /* CoreService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */]) === "function" && _f || Object])
], AlterarProjectsComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=alterar-projects.component.js.map

/***/ }),

/***/ "../../../../../src/app/projects/projects-service.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_core_service__ = __webpack_require__("../../../../../src/app/Services/core.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_dados_de_usuario_service__ = __webpack_require__("../../../../../src/app/Services/dados-de-usuario.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_popup_confirmacao_popup_confirmacao_service__ = __webpack_require__("../../../../../src/app/components/popup-confirmacao/popup-confirmacao.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_snackbars_snackbars_service__ = __webpack_require__("../../../../../src/app/components/snackbars/snackbars.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__notification_notification_service__ = __webpack_require__("../../../../../src/app/notification/notification.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectsServiceService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ProjectsServiceService = (function () {
    function ProjectsServiceService(http, router, core, dados, popupConfirmacao, snackbar, notificationService) {
        this.http = http;
        this.router = router;
        this.core = core;
        this.dados = dados;
        this.popupConfirmacao = popupConfirmacao;
        this.snackbar = snackbar;
        this.notificationService = notificationService;
        this.situacaoAddProjects = false;
        this.situacaoDetailProject = false;
        this.campoDePesquisa = '';
    }
    ProjectsServiceService.prototype.ativaAddProjets = function () {
        this.situacaoAddProjects = true;
    };
    ProjectsServiceService.prototype.fechaAddProjets = function (event) {
        if (event) {
            if (event.target.className == 'background') {
                if (this.situacaoAddProjects == true) {
                    this.situacaoAddProjects = !this.situacaoAddProjects;
                }
            }
        }
        else if (event === null) {
            if (this.situacaoAddProjects == true) {
                this.situacaoAddProjects = !this.situacaoAddProjects;
            }
        }
    };
    ProjectsServiceService.prototype.criaProject = function (nome, descricao, img64) {
        var url = 'http://' + this.core.ipDaApi + '/project';
        var json = JSON.stringify({
            nameProject: nome,
            description: descricao,
            imgBase64: img64
        });
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
        return this.http.post(url, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ProjectsServiceService.prototype.searchProjects = function () {
        var _this = this;
        if (this.dados.getCookieTokken()) {
            var url = 'http://' + this.core.ipDaApi + '/project';
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]();
            headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
            return this.http.get(url, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.projects = res;
                // console.log(res);
            }, function (error) {
                console.log(error);
            });
        }
    };
    ProjectsServiceService.prototype.detailProject = function (id) {
        var _this = this;
        this.situacaoDetailProject = true;
        try {
            var page = document.querySelector('.container[_ngcontent-c6]');
            page.classList.remove('overflowAuto');
            page.classList.add('overflowHidden');
        }
        catch (e) {
        }
        this.router.navigate(['main/alterarProject/' + id]);
        if (this.dados.getCookieTokken()) {
            var url = 'http://' + this.core.ipDaApi + '/project/' + id;
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]();
            headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
            return this.http.get(url, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.project = res;
                // console.log(res);
            }, function (error) {
                // console.log(error);
            });
        }
    };
    ProjectsServiceService.prototype.viewDetailProject = function (id) {
        var _this = this;
        if (this.dados.getCookieTokken()) {
            var url = 'http://' + this.core.ipDaApi + '/project/' + id;
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]();
            headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
            return this.http.get(url, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.project = res;
                // console.log(res);
            }, function (error) {
                // console.log(error);
            });
        }
    };
    ProjectsServiceService.prototype.delProject = function (id) {
        var _this = this;
        if (this.dados.getCookieTokken()) {
            var url = 'http://' + this.core.ipDaApi + '/project/' + id;
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]();
            headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
            return this.http.delete(url, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.popupConfirmacao.fechaPopUpConfirmacao();
                _this.searchProjects();
                _this.snackbar.inserirSnackbar('Excluido com sucesso!');
                // console.log(res);
            }, function (error) {
                // console.log(error);
            });
        }
    };
    ProjectsServiceService.prototype.fechaDetailProject = function () {
        this.situacaoDetailProject = false;
        this.router.navigate(['main']);
        try {
            var page = document.querySelector('.container[_ngcontent-c6]');
            page.classList.add('overflowAuto');
            page.classList.remove('overflowHidden');
        }
        catch (e) {
        }
    };
    ProjectsServiceService.prototype.pesquisarMembros = function (idproject) {
        var _this = this;
        var parm = this.campoDePesquisa;
        if (parm.length > 0) {
            if (this.dados.getCookieTokken()) {
                var url = 'http://' + this.core.ipDaApi + '/searchMembers/' + idproject;
                var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]();
                headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
                headers.append('Search', parm);
                return this.http.get(url, { headers: headers })
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    _this.pesquisaMembros = res;
                    // console.log(res);
                }, function (error) {
                    _this.pesquisaMembros = null;
                    // console.log(error);
                });
            }
        }
        else {
            this.pesquisaMembros = null;
        }
    };
    ProjectsServiceService.prototype.addMembrosProject = function (idUser, idProject) {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/insertUser/' + idProject;
        var json = JSON.stringify({
            idUser: idUser,
            permission: false
        });
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
        return this.http.post(url, params, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            // console.log(res)
            _this.snackbar.inserirSnackbar('Usuario Adicionado Com Sucesso!');
            _this.campoDePesquisa = '';
            _this.detailProject(idProject);
        }, function (error) {
            // console.log(error);
            _this.pesquisaMembros = '';
        });
    };
    ProjectsServiceService.prototype.delUserProject = function (idProject, idUser) {
        var _this = this;
        if (this.dados.getCookieTokken()) {
            var url = 'http://' + this.core.ipDaApi + '/userTeam/' + idProject;
            var json = JSON.stringify({
                idusertarget: idUser
            });
            var params = json;
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.dados.getCookieTokken()
            });
            var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers, body: params });
            return this.http.delete(url, options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                // console.log(res);
                _this.detailProject(idProject);
            }, function (error) {
                // console.log(error);
            });
        }
    };
    ProjectsServiceService.prototype.permissaoUserProject = function (idProject, idUser) {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/promoteUser/' + idProject;
        var json = JSON.stringify({
            idusertarget: idUser,
        });
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
        return this.http.put(url, params, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.detailProject(idProject);
            // console.log(res)
        }, function (error) {
            // console.log(error);
        });
    };
    ProjectsServiceService.prototype.sairUserProject = function (idProject) {
        var _this = this;
        if (this.dados.getCookieTokken()) {
            var url = 'http://' + this.core.ipDaApi + '/exitProject/' + idProject;
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.dados.getCookieTokken()
            });
            var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
            return this.http.delete(url, options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                // console.log(res);
                _this.router.navigate(['/main']);
                _this.searchProjects();
            }, function (error) {
                // console.log(error);
            });
        }
    };
    ProjectsServiceService.prototype.searchBlocks = function (id) {
        if (this.dados.getCookieTokken()) {
            var url = 'http://' + this.core.ipDaApi + '/project/blocks/' + id;
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]();
            headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
            return this.http.get(url, { headers: headers })
                .map(function (res) { return res.json(); });
        }
    };
    ProjectsServiceService.prototype.changeProject = function (idProject, name, descrip, base64) {
        var _this = this;
        var url = 'http://' + this.core.ipDaApi + '/project/' + idProject;
        var json = JSON.stringify({
            nameProject: name,
            description: descrip,
            imgBase64: base64
        });
        // console.log(json);
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
        return this.http.put(url, params, { headers: headers })
            .subscribe(function (res) {
            console.log(res.json());
            _this.snackbar.inserirSnackbar('Projeto alterado com sucesso!');
            _this.notificationService.searchNotification();
        }, function (error) {
            // console.log(error);
        });
    };
    return ProjectsServiceService;
}());
ProjectsServiceService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__Services_core_service__["a" /* CoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_core_service__["a" /* CoreService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_dados_de_usuario_service__["a" /* DadosDeUsuarioService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__components_popup_confirmacao_popup_confirmacao_service__["a" /* PopupConfirmacaoService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__components_popup_confirmacao_popup_confirmacao_service__["a" /* PopupConfirmacaoService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__components_snackbars_snackbars_service__["a" /* SnackbarsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__components_snackbars_snackbars_service__["a" /* SnackbarsService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__notification_notification_service__["a" /* NotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__notification_notification_service__["a" /* NotificationService */]) === "function" && _g || Object])
], ProjectsServiceService);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=projects-service.service.js.map

/***/ }),

/***/ "../../../../../src/app/projects/projects.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_projects_add_projects_component__ = __webpack_require__("../../../../../src/app/projects/add-projects/add-projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__projects_service_service__ = __webpack_require__("../../../../../src/app/projects/projects-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_snackbars_snackbars_module__ = __webpack_require__("../../../../../src/app/components/snackbars/snackbars.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__alterar_projects_alterar_projects_component__ = __webpack_require__("../../../../../src/app/projects/alterar-projects/alterar-projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_arrow_back_arrow_back_module__ = __webpack_require__("../../../../../src/app/components/arrow-back/arrow-back.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var ProjectsModule = (function () {
    function ProjectsModule() {
    }
    return ProjectsModule;
}());
ProjectsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["k" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_5__components_snackbars_snackbars_module__["a" /* SnackbarsModule */],
            __WEBPACK_IMPORTED_MODULE_7__components_arrow_back_arrow_back_module__["a" /* ArrowBackModule */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__add_projects_add_projects_component__["a" /* AddProjectsComponent */],
            __WEBPACK_IMPORTED_MODULE_6__alterar_projects_alterar_projects_component__["a" /* AlterarProjectsComponent */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__projects_service_service__["a" /* ProjectsServiceService */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__add_projects_add_projects_component__["a" /* AddProjectsComponent */],
            __WEBPACK_IMPORTED_MODULE_6__alterar_projects_alterar_projects_component__["a" /* AlterarProjectsComponent */]
        ]
    })
], ProjectsModule);

//# sourceMappingURL=projects.module.js.map

/***/ }),

/***/ "../../../../../src/assets/add.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "add.a52d6449804e1e2467b7.svg";

/***/ }),

/***/ "../../../../../src/assets/addPhoto.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "addPhoto.af79c8d2942a340a5455.svg";

/***/ }),

/***/ "../../../../../src/assets/attach_file.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "attach_file.b6f5199c7a34a7b99902.svg";

/***/ }),

/***/ "../../../../../src/assets/background.jpg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "background.71bd1f639a349be73e3a.jpg";

/***/ }),

/***/ "../../../../../src/assets/check_box.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "check_box.bf6bcdce523dee923e23.svg";

/***/ }),

/***/ "../../../../../src/assets/check_box_outline.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "check_box_outline.ef946faec2c3abe5705d.svg";

/***/ }),

/***/ "../../../../../src/assets/clearWhite.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "clearWhite.0ce9e32ee0ce7894c805.svg";

/***/ }),

/***/ "../../../../../src/assets/delete.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "delete.7a379a139a59610e4c1b.svg";

/***/ }),

/***/ "../../../../../src/assets/edit.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "edit.f8b92f4ba094e42f8d44.svg";

/***/ }),

/***/ "../../../../../src/assets/mode_comment.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "mode_comment.71ad6e8fcb250dba762a.svg";

/***/ }),

/***/ "../../../../../src/assets/more_vert.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "more_vert.5bdb12bafc0daf99d59a.svg";

/***/ }),

/***/ "../../../../../src/assets/pexels.jpg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pexels.f94d892aa6d7d7e7ddb5.jpg";

/***/ }),

/***/ "../../../../../src/assets/pexels2.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pexels2.e0ec6510bef77f936f55.png";

/***/ }),

/***/ "../../../../../src/assets/search.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "search.3e2c1e2654fb8283c459.svg";

/***/ }),

/***/ "../../../../../src/assets/watch_later.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "watch_later.6f36f5d57831be91cd65.svg";

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false,
    ipSocket: '192.168.52.3:3000'
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[1]);
//# sourceMappingURL=main.bundle.js.map