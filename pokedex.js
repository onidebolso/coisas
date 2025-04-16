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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokedex = void 0;
var faker_1 = require("@faker-js/faker");
var Pokedex = /** @class */ (function () {
    function Pokedex() {
        this.EXPERIENCIA_POR_NIVEL = 100;
        this.ENERGIA_MAXIMA = 100;
        this.ENERGIA_POR_TREINO = 10;
        this.ENERGIA_POR_DESCANSO = 30;
        this.BONUS_DESCANSO = 1.2;
        this.XP_VITORIA = 2;
        this.XP_DERROTA = 0.1;
        this.pokemons = [];
        this.proximoId = 1;
    }
    Pokedex.prototype.adicionarPokemon = function (nome, tipos, nivel) {
        if (nivel <= 0) {
            throw new Error("Nível deve ser maior que zero");
        }
        if (tipos.length === 0) {
            throw new Error("Pokémon deve ter pelo menos um tipo");
        }
        var novoPokemon = {
            id: this.proximoId++,
            nome: nome,
            tipo: tipos,
            nivel: nivel,
            experiencia: 0,
            energia: this.ENERGIA_MAXIMA,
            ataque: 50 + Math.floor(Math.random() * 20),
            defesa: 50 + Math.floor(Math.random() * 20),
            dataCadastro: new Date(),
            emBatalha: false
        };
        this.pokemons.push(novoPokemon);
        return novoPokemon;
    };
    Pokedex.prototype.gerarPokemonAleatorio = function (nivel) {
        var tipos = ['Fogo', 'Água', 'Planta', 'Elétrico', 'Psíquico', 'Voador', 'Venenoso', 'Pedra'];
        var tipo1 = faker_1.faker.helpers.arrayElement(tipos);
        var tipo2 = faker_1.faker.helpers.arrayElement(__spreadArray(__spreadArray([], tipos, true), [undefined], false));
        if (tipo2 === tipo1) {
            tipo2 = undefined;
        }
        var tiposPokemon = tipo2 ? [tipo1, tipo2] : [tipo1];
        var nivelAleatorio = nivel || faker_1.faker.number.int({ min: 1, max: 50 });
        return {
            id: this.proximoId++,
            nome: faker_1.faker.person.firstName(),
            tipo: tiposPokemon,
            nivel: nivelAleatorio,
            experiencia: 0,
            energia: this.ENERGIA_MAXIMA,
            ataque: 50 + Math.floor(Math.random() * 20),
            defesa: 50 + Math.floor(Math.random() * 20),
            dataCadastro: new Date(),
            emBatalha: false
        };
    };
    Pokedex.prototype.treinarPokemon = function (id, experienciaGanha) {
        var pokemon = this.obterPokemonPorId(id);
        if (pokemon.emBatalha) {
            throw new Error("".concat(pokemon.nome, " est\u00E1 em batalha e n\u00E3o pode treinar agora!"));
        }
        if (experienciaGanha <= 0) {
            throw new Error("Experiência ganha deve ser maior que zero");
        }
        if (pokemon.energia < this.ENERGIA_POR_TREINO) {
            throw new Error("".concat(pokemon.nome, " est\u00E1 cansado e precisa descansar antes de treinar (Energia: ").concat(pokemon.energia, "/").concat(this.ENERGIA_MAXIMA, ")"));
        }
        var subiuNivel = false;
        var experienciaEfetiva = experienciaGanha;
        if (pokemon.ultimoDescanso &&
            new Date().getTime() - pokemon.ultimoDescanso.getTime() < 24 * 60 * 60 * 1000) {
            experienciaEfetiva = Math.floor(experienciaGanha * this.BONUS_DESCANSO);
            console.log("".concat(pokemon.nome, " est\u00E1 descansado e ganha 20% mais XP!"));
        }
        pokemon.experiencia += experienciaEfetiva;
        pokemon.energia -= this.ENERGIA_POR_TREINO;
        pokemon.ultimoTreino = new Date();
        while (pokemon.experiencia >= this.EXPERIENCIA_POR_NIVEL * pokemon.nivel) {
            pokemon.experiencia -= this.EXPERIENCIA_POR_NIVEL * pokemon.nivel;
            pokemon.nivel++;
            pokemon.ataque += 5 + Math.floor(Math.random() * 3);
            pokemon.defesa += 5 + Math.floor(Math.random() * 3);
            subiuNivel = true;
            console.log("Parab\u00E9ns! ".concat(pokemon.nome, " subiu para o n\u00EDvel ").concat(pokemon.nivel, "!"));
        }
        return { pokemon: pokemon, subiuNivel: subiuNivel };
    };
    Pokedex.prototype.descansarPokemon = function (id, horas) {
        if (horas === void 0) { horas = 8; }
        var pokemon = this.obterPokemonPorId(id);
        if (pokemon.emBatalha) {
            throw new Error("".concat(pokemon.nome, " est\u00E1 em batalha e n\u00E3o pode descansar agora!"));
        }
        if (horas <= 0) {
            throw new Error("Tempo de descanso deve ser maior que zero");
        }
        var energiaRecuperada = Math.min(this.ENERGIA_POR_DESCANSO * horas, this.ENERGIA_MAXIMA - pokemon.energia);
        pokemon.energia += energiaRecuperada;
        pokemon.ultimoDescanso = new Date();
        console.log("".concat(pokemon.nome, " descansou por ").concat(horas, " horas e recuperou ").concat(energiaRecuperada, " de energia."));
        console.log("Energia atual: ".concat(pokemon.energia, "/").concat(this.ENERGIA_MAXIMA));
        return pokemon;
    };
    Pokedex.prototype.iniciarBatalha = function (idPokemonHeroi, nivelOponente) {
        return __awaiter(this, void 0, void 0, function () {
            var heroi, oponente, turno, atacante, defensor, dado, vencedor, perdedor, xpGanho, xpPerdido, resultado;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        heroi = this.obterPokemonPorId(idPokemonHeroi);
                        if (heroi.energia < 5) {
                            throw new Error("".concat(heroi.nome, " est\u00E1 com energia muito baixa para batalhar!"));
                        }
                        if (heroi.emBatalha) {
                            throw new Error("".concat(heroi.nome, " j\u00E1 est\u00E1 em uma batalha!"));
                        }
                        oponente = this.gerarPokemonAleatorio(nivelOponente);
                        console.log("Um selvagem ".concat(oponente.nome, " (N\u00EDvel ").concat(oponente.nivel, ") apareceu!"));
                        console.log("Batalha entre ".concat(heroi.nome, " (N\u00EDvel ").concat(heroi.nivel, ") vs ").concat(oponente.nome, " (N\u00EDvel ").concat(oponente.nivel, ")"));
                        heroi.emBatalha = true;
                        oponente.emBatalha = true;
                        turno = 1;
                        _b.label = 1;
                    case 1:
                        if (!(heroi.energia >= 5 && oponente.energia > 0)) return [3 /*break*/, 6];
                        console.log("\n--- Turno ".concat(turno, " ---"));
                        dado = faker_1.faker.number.int({ min: 1, max: 100 });
                        if (dado <= 50) {
                            atacante = heroi;
                            defensor = oponente;
                            console.log("".concat(heroi.nome, " ataca primeiro neste turno!"));
                        }
                        else {
                            atacante = oponente;
                            defensor = heroi;
                            console.log("".concat(oponente.nome, " ataca primeiro neste turno!"));
                        }
                        return [4 /*yield*/, this.realizarAtaque(atacante, defensor)];
                    case 2:
                        _b.sent();
                        if (defensor.energia <= (defensor === heroi ? 5 : 0)) {
                            return [3 /*break*/, 6];
                        }
                        _a = [defensor, atacante], atacante = _a[0], defensor = _a[1];
                        if (!(defensor.energia > (defensor === heroi ? 5 : 0))) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.realizarAtaque(atacante, defensor)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        turno++;
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 1];
                    case 6:
                        xpGanho = 0;
                        if (heroi.energia < 5) {
                            heroi.energia = 1;
                            vencedor = oponente;
                            perdedor = heroi;
                            xpPerdido = Math.floor(perdedor.experiencia * this.XP_DERROTA);
                            perdedor.experiencia = Math.max(0, perdedor.experiencia - xpPerdido);
                            console.log("\n".concat(heroi.nome, " foi derrotado e perdeu ").concat(xpPerdido, " XP!"));
                        }
                        else {
                            oponente.energia = 0;
                            vencedor = heroi;
                            perdedor = oponente;
                            xpGanho = perdedor.nivel * this.XP_VITORIA;
                            vencedor.experiencia += xpGanho;
                            console.log("\n".concat(heroi.nome, " venceu a batalha e ganhou ").concat(xpGanho, " XP!"));
                            if (vencedor.experiencia >= this.EXPERIENCIA_POR_NIVEL * vencedor.nivel) {
                                resultado = this.treinarPokemon(vencedor.id, 0);
                                if (resultado.subiuNivel) {
                                    console.log("Parab\u00E9ns! ".concat(vencedor.nome, " subiu para o n\u00EDvel ").concat(vencedor.nivel, "!"));
                                }
                            }
                        }
                        heroi.emBatalha = false;
                        oponente.emBatalha = false;
                        console.log("\n--- Fim da Batalha ---");
                        console.log("Vencedor: ".concat(vencedor.nome, " (Energia: ").concat(vencedor.energia, "/").concat(this.ENERGIA_MAXIMA, ")"));
                        console.log("Perdedor: ".concat(perdedor.nome, " (Energia: ").concat(perdedor.energia, "/").concat(perdedor === oponente ? 0 : this.ENERGIA_MAXIMA, ")"));
                        return [2 /*return*/, { vencedor: vencedor, perdedor: perdedor, xpGanho: xpGanho }];
                }
            });
        });
    };
    Pokedex.prototype.realizarAtaque = function (atacante, defensor) {
        return __awaiter(this, void 0, void 0, function () {
            var ataqueTotal, defesaTotal, dano;
            return __generator(this, function (_a) {
                ataqueTotal = atacante.ataque * atacante.nivel;
                defesaTotal = defensor.defesa * defensor.nivel;
                dano = Math.max(1, Math.floor((ataqueTotal - defesaTotal * 0.5) / 10));
                dano = Math.floor(dano * faker_1.faker.number.float({ min: 0.8, max: 1.2 }));
                dano = Math.max(1, dano);
                defensor.energia = Math.max(defensor === atacante ? 0 : 5, defensor.energia - dano);
                console.log("".concat(atacante.nome, " atacou ").concat(defensor.nome, " e causou ").concat(dano, " de dano!"));
                console.log("".concat(defensor.nome, " energia: ").concat(defensor.energia, "/").concat(this.ENERGIA_MAXIMA));
                return [2 /*return*/];
            });
        });
    };
    Pokedex.prototype.obterPokemonPorId = function (id) {
        var pokemon = this.pokemons.find(function (p) { return p.id === id; });
        if (!pokemon)
            throw new Error("Pokémon não encontrado");
        return pokemon;
    };
    Pokedex.prototype.listarPokemons = function () {
        return __spreadArray([], this.pokemons, true);
    };
    Pokedex.prototype.buscarPorNome = function (nome) {
        return this.pokemons.filter(function (p) { return p.nome.toLowerCase().includes(nome.toLowerCase()); });
    };
    Pokedex.prototype.buscarPorTipo = function (tipo) {
        return this.pokemons.filter(function (p) { return p.tipo.some(function (t) { return t.toLowerCase() === tipo.toLowerCase(); }); });
    };
    Pokedex.prototype.removerPokemon = function (id) {
        var index = this.pokemons.findIndex(function (p) { return p.id === id; });
        if (index === -1)
            return false;
        this.pokemons.splice(index, 1);
        return true;
    };
    return Pokedex;
}());
exports.Pokedex = Pokedex;
var pokedex_factory_1 = require("./pokedex-factory");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var pokedex, pokemons;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, pokedex_factory_1.createPokedex)()];
                case 1:
                    pokedex = _a.sent();
                    pokemons = pokedex.listarPokemons();
                    console.log(pokemons);
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(console.error);
