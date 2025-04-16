"use strict";
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
var pokedex_persistence_1 = require("./pokedex-persistence");
var readline = require("readline");
var PokedexUI = /** @class */ (function () {
    function PokedexUI() {
        this.pokedex = new pokedex_persistence_1.PokedexWithPersistence();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    PokedexUI.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pokedex.initialize()];
                    case 1:
                        _a.sent();
                        this.showMainMenu();
                        return [2 /*return*/];
                }
            });
        });
    };
    PokedexUI.prototype.showMainMenu = function () {
        var _this = this;
        console.log('\n=== MENU PRINCIPAL POKEDEX ===');
        console.log('1. Listar Pokémon');
        console.log('2. Adicionar Pokémon');
        console.log('3. Remover Pokémon');
        console.log('4. Treinar Pokémon');
        console.log('5. Descansar Pokémon');
        console.log('6. Batalhar');
        console.log('7. Salvar manualmente');
        console.log('8. Sair');
        this.rl.question('Escolha uma opção: ', function (answer) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = answer;
                        switch (_a) {
                            case '1': return [3 /*break*/, 1];
                            case '2': return [3 /*break*/, 3];
                            case '3': return [3 /*break*/, 5];
                            case '4': return [3 /*break*/, 7];
                            case '5': return [3 /*break*/, 9];
                            case '6': return [3 /*break*/, 11];
                            case '7': return [3 /*break*/, 13];
                            case '8': return [3 /*break*/, 15];
                        }
                        return [3 /*break*/, 16];
                    case 1: return [4 /*yield*/, this.listPokemons()];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 3: return [4 /*yield*/, this.addPokemon()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 5: return [4 /*yield*/, this.removePokemon()];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 7: return [4 /*yield*/, this.trainPokemon()];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 9: return [4 /*yield*/, this.restPokemon()];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 11: return [4 /*yield*/, this.battlePokemon()];
                    case 12:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 13: return [4 /*yield*/, this.manualSave()];
                    case 14:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 15:
                        this.exit();
                        return [2 /*return*/];
                    case 16:
                        console.log('Opção inválida!');
                        this.showMainMenu();
                        _b.label = 17;
                    case 17: return [2 /*return*/];
                }
            });
        }); });
    };
    PokedexUI.prototype.listPokemons = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pokemons;
            return __generator(this, function (_a) {
                pokemons = this.pokedex.listarPokemons();
                if (pokemons.length === 0) {
                    console.log('\nNenhum Pokémon cadastrado!');
                }
                else {
                    console.log('\n=== LISTA DE POKÉMONS ===');
                    pokemons.forEach(function (p) {
                        console.log("#".concat(p.id, " ").concat(p.nome, " - N\u00EDvel ").concat(p.nivel, " (").concat(p.tipo.join('/'), ")"));
                        console.log("   Ataque: ".concat(p.ataque, " | Defesa: ").concat(p.defesa, " | Energia: ").concat(p.energia, "/100"));
                        console.log("   XP: ".concat(p.experiencia, "/").concat(p.nivel * 100, " | Cadastrado em: ").concat(p.dataCadastro.toLocaleDateString()));
                        if (p.ultimoTreino) {
                            console.log("   \u00DAltimo treino: ".concat(p.ultimoTreino.toLocaleDateString()));
                        }
                    });
                }
                this.showMainMenu();
                return [2 /*return*/];
            });
        });
    };
    PokedexUI.prototype.addPokemon = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.rl.question('Nome do Pokémon: ', function (nome) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        this.rl.question('Tipos (separados por vírgula): ', function (tiposInput) { return __awaiter(_this, void 0, void 0, function () {
                            var tipos;
                            var _this = this;
                            return __generator(this, function (_a) {
                                tipos = tiposInput.split(',').map(function (t) { return t.trim(); });
                                this.rl.question('Nível: ', function (nivelStr) { return __awaiter(_this, void 0, void 0, function () {
                                    var nivel, pokemon, error_1;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                nivel = parseInt(nivelStr);
                                                _a.label = 1;
                                            case 1:
                                                _a.trys.push([1, 3, , 4]);
                                                pokemon = this.pokedex.adicionarPokemon(nome, tipos, nivel);
                                                console.log("\n".concat(pokemon.nome, " foi adicionado com sucesso!"));
                                                return [4 /*yield*/, this.pokedex.saveToFile()];
                                            case 2:
                                                _a.sent();
                                                return [3 /*break*/, 4];
                                            case 3:
                                                error_1 = _a.sent();
                                                console.error("\nErro: ".concat(error_1.message));
                                                return [3 /*break*/, 4];
                                            case 4:
                                                this.showMainMenu();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    PokedexUI.prototype.removePokemon = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pokemons;
            var _this = this;
            return __generator(this, function (_a) {
                pokemons = this.pokedex.listarPokemons();
                if (pokemons.length === 0) {
                    console.log('\nNenhum Pokémon para remover!');
                    this.showMainMenu();
                    return [2 /*return*/];
                }
                console.log('\n=== REMOVER POKÉMON ===');
                pokemons.forEach(function (p) {
                    console.log("#".concat(p.id, " - ").concat(p.nome, " (N\u00EDvel ").concat(p.nivel, ")"));
                });
                this.rl.question('ID do Pokémon a remover (ou 0 para cancelar): ', function (idStr) { return __awaiter(_this, void 0, void 0, function () {
                    var id, success;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                id = parseInt(idStr);
                                if (id === 0) {
                                    this.showMainMenu();
                                    return [2 /*return*/];
                                }
                                success = this.pokedex.removerPokemon(id);
                                if (!success) return [3 /*break*/, 2];
                                console.log('\nPokémon removido com sucesso!');
                                return [4 /*yield*/, this.pokedex.saveToFile()];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                console.log('\nID inválido!');
                                _a.label = 3;
                            case 3:
                                this.showMainMenu();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    PokedexUI.prototype.trainPokemon = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pokemons;
            var _this = this;
            return __generator(this, function (_a) {
                pokemons = this.pokedex.listarPokemons();
                if (pokemons.length === 0) {
                    console.log('\nNenhum Pokémon para treinar!');
                    this.showMainMenu();
                    return [2 /*return*/];
                }
                console.log('\n=== TREINAR POKÉMON ===');
                pokemons.forEach(function (p) {
                    console.log("#".concat(p.id, " - ").concat(p.nome, " (Energia: ").concat(p.energia, "/100)"));
                });
                this.rl.question('ID do Pokémon a treinar: ', function (idStr) { return __awaiter(_this, void 0, void 0, function () {
                    var id;
                    var _this = this;
                    return __generator(this, function (_a) {
                        id = parseInt(idStr);
                        this.rl.question('XP ganho no treino: ', function (xpStr) { return __awaiter(_this, void 0, void 0, function () {
                            var xp, result, error_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        xp = parseInt(xpStr);
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        result = this.pokedex.treinarPokemon(id, xp);
                                        console.log("\n".concat(result.pokemon.nome, " treinou e ganhou ").concat(xp, " XP!"));
                                        if (result.subiuNivel) {
                                            console.log("Parab\u00E9ns! ".concat(result.pokemon.nome, " subiu para o n\u00EDvel ").concat(result.pokemon.nivel, "!"));
                                        }
                                        return [4 /*yield*/, this.pokedex.saveToFile()];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_2 = _a.sent();
                                        console.error("\nErro: ".concat(error_2.message));
                                        return [3 /*break*/, 4];
                                    case 4:
                                        this.showMainMenu();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    PokedexUI.prototype.restPokemon = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pokemons;
            var _this = this;
            return __generator(this, function (_a) {
                pokemons = this.pokedex.listarPokemons();
                if (pokemons.length === 0) {
                    console.log('\nNenhum Pokémon para descansar!');
                    this.showMainMenu();
                    return [2 /*return*/];
                }
                console.log('\n=== DESCANSO POKÉMON ===');
                pokemons.forEach(function (p) {
                    console.log("#".concat(p.id, " - ").concat(p.nome, " (Energia: ").concat(p.energia, "/100)"));
                });
                this.rl.question('ID do Pokémon que vai descansar: ', function (idStr) { return __awaiter(_this, void 0, void 0, function () {
                    var id;
                    var _this = this;
                    return __generator(this, function (_a) {
                        id = parseInt(idStr);
                        this.rl.question('Horas de descanso (padrão: 8): ', function (horasStr) { return __awaiter(_this, void 0, void 0, function () {
                            var horas, pokemon, error_3;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        horas = horasStr ? parseInt(horasStr) : 8;
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        pokemon = this.pokedex.descansarPokemon(id, horas);
                                        console.log("\n".concat(pokemon.nome, " descansou por ").concat(horas, " horas e recuperou energia!"));
                                        console.log("Energia atual: ".concat(pokemon.energia, "/100"));
                                        return [4 /*yield*/, this.pokedex.saveToFile()];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_3 = _a.sent();
                                        console.error("\nErro: ".concat(error_3.message));
                                        return [3 /*break*/, 4];
                                    case 4:
                                        this.showMainMenu();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    PokedexUI.prototype.battlePokemon = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pokemons;
            var _this = this;
            return __generator(this, function (_a) {
                pokemons = this.pokedex.listarPokemons();
                if (pokemons.length === 0) {
                    console.log('\nNenhum Pokémon para batalhar!');
                    this.showMainMenu();
                    return [2 /*return*/];
                }
                console.log('\n=== BATALHA POKÉMON ===');
                pokemons.forEach(function (p) {
                    console.log("#".concat(p.id, " - ").concat(p.nome, " (N\u00EDvel ").concat(p.nivel, ", Energia: ").concat(p.energia, "/100)"));
                });
                this.rl.question('ID do seu Pokémon para batalha: ', function (idStr) { return __awaiter(_this, void 0, void 0, function () {
                    var id;
                    var _this = this;
                    return __generator(this, function (_a) {
                        id = parseInt(idStr);
                        this.rl.question('Nível do oponente (deixe em branco para aleatório): ', function (nivelStr) { return __awaiter(_this, void 0, void 0, function () {
                            var nivel, _a, vencedor, perdedor, xpGanho, error_4;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        nivel = nivelStr ? parseInt(nivelStr) : undefined;
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 4, , 5]);
                                        console.log('\nIniciando batalha...');
                                        return [4 /*yield*/, this.pokedex.iniciarBatalha(id, nivel)];
                                    case 2:
                                        _a = _b.sent(), vencedor = _a.vencedor, perdedor = _a.perdedor, xpGanho = _a.xpGanho;
                                        console.log("\n=== RESULTADO DA BATALHA ===");
                                        console.log("Vencedor: ".concat(vencedor.nome, " (N\u00EDvel ").concat(vencedor.nivel, ")"));
                                        console.log("Perdedor: ".concat(perdedor.nome, " (N\u00EDvel ").concat(perdedor.nivel, ")"));
                                        if (vencedor.id === id) {
                                            console.log("Seu Pok\u00E9mon ganhou ".concat(xpGanho, " XP!"));
                                        }
                                        return [4 /*yield*/, this.pokedex.saveToFile()];
                                    case 3:
                                        _b.sent();
                                        return [3 /*break*/, 5];
                                    case 4:
                                        error_4 = _b.sent();
                                        console.error("\nErro: ".concat(error_4.message));
                                        return [3 /*break*/, 5];
                                    case 5:
                                        this.showMainMenu();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    PokedexUI.prototype.manualSave = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pokedex.saveToFile()];
                    case 1:
                        _a.sent();
                        console.log('\nDados salvos com sucesso!');
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.error('\nErro ao salvar:', error_5);
                        return [3 /*break*/, 3];
                    case 3:
                        this.showMainMenu();
                        return [2 /*return*/];
                }
            });
        });
    };
    PokedexUI.prototype.exit = function () {
        console.log('\nSaindo da Pokédex...');
        this.rl.close();
        process.exit(0);
    };
    return PokedexUI;
}());
// Inicia a aplicação
var ui = new PokedexUI();
ui.start().catch(console.error);
