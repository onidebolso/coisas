"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokedexWithPersistence = void 0;
exports.createPokedexWithPersistence = createPokedexWithPersistence;
var fs_1 = require("fs");
var path = require("path");
var pokedex_1 = require("./pokedex");
var SAVE_DIR = path.resolve(__dirname);
var SAVE_FILE = path.join(SAVE_DIR, 'pokedex-data.json');
var PokedexWithPersistence = /** @class */ (function (_super) {
    __extends(PokedexWithPersistence, _super);
    function PokedexWithPersistence() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PokedexWithPersistence.prototype.ensureDirectoryExists = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 4]);
                        return [4 /*yield*/, fs_1.promises.access(SAVE_DIR)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        _a = _b.sent();
                        return [4 /*yield*/, fs_1.promises.mkdir(SAVE_DIR, { recursive: true })];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // MUDANÇA: Método agora é público para ser acessível pela UI
    PokedexWithPersistence.prototype.saveToFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.ensureDirectoryExists()];
                    case 1:
                        _a.sent();
                        data = {
                            pokemons: _super.prototype.listarPokemons.call(this),
                            proximoId: this.proximoId
                        };
                        return [4 /*yield*/, fs_1.promises.writeFile(SAVE_FILE, JSON.stringify(data, null, 2), 'utf-8')];
                    case 2:
                        _a.sent();
                        console.log("Dados salvos em: ".concat(SAVE_FILE));
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Erro ao salvar dados:', error_1);
                        throw error_1; // Propaga o erro para quem chamou
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PokedexWithPersistence.prototype.loadFromFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rawData, _a, pokemons, proximoId, restoredPokemons, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fs_1.promises.access(SAVE_FILE)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, fs_1.promises.readFile(SAVE_FILE, 'utf-8')];
                    case 2:
                        rawData = _b.sent();
                        if (!rawData.trim()) {
                            console.log('Arquivo vazio - iniciando nova Pokedex');
                            return [2 /*return*/];
                        }
                        _a = JSON.parse(rawData), pokemons = _a.pokemons, proximoId = _a.proximoId;
                        if (!Array.isArray(pokemons) || typeof proximoId !== 'number') {
                            throw new Error('Formato inválido dos dados salvos');
                        }
                        restoredPokemons = pokemons.map(function (p) { return (__assign(__assign({}, p), { dataCadastro: new Date(p.dataCadastro), ultimoTreino: p.ultimoTreino ? new Date(p.ultimoTreino) : undefined, ultimoDescanso: p.ultimoDescanso ? new Date(p.ultimoDescanso) : undefined })); });
                        this.pokemons = restoredPokemons;
                        this.proximoId = proximoId;
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        if (error_2.code === 'ENOENT') {
                            console.log('Arquivo não encontrado - criando nova Pokedex');
                        }
                        else {
                            console.error('Erro ao carregar:', error_2);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PokedexWithPersistence.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadFromFile()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Métodos com salvamento automático
    PokedexWithPersistence.prototype.adicionarPokemon = function (nome, tipos, nivel) {
        var result = _super.prototype.adicionarPokemon.call(this, nome, tipos, nivel);
        this.saveToFile().catch(function (e) { return console.error('Erro ao salvar:', e); });
        return result;
    };
    PokedexWithPersistence.prototype.treinarPokemon = function (id, experienciaGanha) {
        var result = _super.prototype.treinarPokemon.call(this, id, experienciaGanha);
        this.saveToFile().catch(function (e) { return console.error('Erro ao salvar:', e); });
        return result;
    };
    PokedexWithPersistence.prototype.descansarPokemon = function (id, horas) {
        if (horas === void 0) { horas = 8; }
        var result = _super.prototype.descansarPokemon.call(this, id, horas);
        this.saveToFile().catch(function (e) { return console.error('Erro ao salvar:', e); });
        return result;
    };
    PokedexWithPersistence.prototype.iniciarBatalha = function (idPokemonHeroi, nivelOponente) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.iniciarBatalha.call(this, idPokemonHeroi, nivelOponente)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, this.saveToFile()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    PokedexWithPersistence.prototype.removerPokemon = function (id) {
        var result = _super.prototype.removerPokemon.call(this, id);
        this.saveToFile().catch(function (e) { return console.error('Erro ao salvar:', e); });
        return result;
    };
    return PokedexWithPersistence;
}(pokedex_1.Pokedex));
exports.PokedexWithPersistence = PokedexWithPersistence;
function createPokedexWithPersistence() {
    var pokedex = new PokedexWithPersistence();
    pokedex.initialize();
    return pokedex;
}
